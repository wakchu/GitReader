<?php

namespace App\Services;

use App\Models\Book;
use App\Models\Chapter;
use Illuminate\Support\Facades\Storage;
use Kiwilan\Ebook\Ebook;
use Kiwilan\Ebook\Enums\EbookFormatEnum;
use Kiwilan\Ebook\Formats\Epub\EpubModule;

class EpubService
{
    /**
     * Parse an EPUB file and store it in the database.
     */
    public function import(string $filePath): ?Book
    {
        if (!file_exists($filePath)) {
            \Illuminate\Support\Facades\Log::error('EpubService: File does not exist at path: ' . $filePath);
            return null;
        }

        try {
            $ebook = Ebook::read($filePath);

            if (!$ebook) {
                \Illuminate\Support\Facades\Log::error('EpubService: Ebook::read returned null/false');
                return null;
            }
            
            if ($ebook->getFormat() !== EbookFormatEnum::EPUB) {
                \Illuminate\Support\Facades\Log::error('EpubService: Invalid format. Detected: ' . ($ebook->getFormat()?->value ?? 'unknown'));
                // Not an EPUB or invalid
                return null;
            }
            
            // Extract Metadata
            $title = $ebook->getTitle() ?? 'Untitled';
            $author = $ebook->getAuthorMain()?->getName() ?? 'Unknown Author';
            $description = $ebook->getDescription();
            
            // Handle Cover
            $coverPath = null;
            if ($ebook->hasCover()) {
                $cover = $ebook->getCover();
                $coverContents = $cover->getContents();
                if ($coverContents) {
                    $coverHash = md5($coverContents);
                    $coverFilename = "covers/{$coverHash}.jpg"; 
                    Storage::disk('public')->put($coverFilename, $coverContents);
                    $coverPath = $coverFilename;
                }
            }

            // Create Book Model
            $book = Book::create([
                'title' => $title,
                'author' => $author,
                'cover_image' => $coverPath,
                'file_path' => $filePath,
                'total_chapters' => 0, // Will update later
            ]);

            // Extract Chapters (Manual Robust Method)
            try {
                $this->processChaptersManually($book, $filePath);
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::error("Manual chapter extraction failed: " . $e->getMessage());
                \Illuminate\Support\Facades\Log::error($e->getTraceAsString());
            }

            return $book;

        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Epub parsing failed: ' . $e->getMessage());
            \Illuminate\Support\Facades\Log::error($e->getTraceAsString());
            return null;
        }
    }

    private function processChaptersManually(Book $book, string $filePath)
    {
         $zip = new \ZipArchive();
         if ($zip->open($filePath) !== TRUE) {
             throw new \Exception("Failed to open zip: " . $filePath);
         }

         // 1. Find .opf file path from META-INF/container.xml
         $containerXml = $zip->getFromName('META-INF/container.xml');
         if (!$containerXml) {
             $zip->close();
             throw new \Exception("container.xml not found");
         }

         $dom = new \DOMDocument();
         // Suppress warnings for malformed XML
         $originalErrors = libxml_use_internal_errors(true);
         $dom->loadXML($containerXml);
         libxml_clear_errors();
         libxml_use_internal_errors($originalErrors);

         $rootfiles = $dom->getElementsByTagName('rootfile');
         $opfPath = null;
         foreach ($rootfiles as $rootfile) {
             if ($rootfile->getAttribute('media-type') === 'application/oebps-package+xml') {
                 $opfPath = $rootfile->getAttribute('full-path');
                 break;
             }
         }

         if (!$opfPath) {
             $zip->close();
             throw new \Exception("OPF path not found in container.xml");
         }

         // Determine base directory of OPF (e.g., OEBPS/)
         $opfDir = dirname($opfPath) == '.' ? '' : dirname($opfPath) . '/';

         // 2. Parse OPF
         $opfContent = $zip->getFromName($opfPath);
         if (!$opfContent) {
            $zip->close();
             throw new \Exception("OPF file could not be read: " . $opfPath);
         }
         
         $opfDom = new \DOMDocument();
         $originalErrors = libxml_use_internal_errors(true);
         $opfDom->loadXML($opfContent);
         libxml_clear_errors();
         libxml_use_internal_errors($originalErrors);

         // 3. Map Manifest (id -> href)
         $manifest = [];
         $items = $opfDom->getElementsByTagName('item');
         foreach ($items as $item) {
             $id = $item->getAttribute('id');
             $href = $item->getAttribute('href');
             $manifest[$id] = $href;
         }

         // 4. Read Spine (order of ids)
         $spine = $opfDom->getElementsByTagName('spine')->item(0);
         if (!$spine) {
             $zip->close();
             return; 
         }
         
         $itemrefs = $spine->getElementsByTagName('itemref');
         
         $order = 0;
         foreach ($itemrefs as $itemref) {
             $idref = $itemref->getAttribute('idref');
             if (isset($manifest[$idref])) {
                 $fileHref = $manifest[$idref];
                 // Resolve path. Simple concat usually works for EPUBs, but let's be careful.
                 $fullPath = $opfDir . $fileHref; 
                 
                 $content = $zip->getFromName($fullPath);
                 if ($content) {
                     // Try to find a title from the content
                     $title = "Chapter " . ($order + 1);
                     
                     // Simple Regex fallback for Title
                     if (preg_match('/<title[^>]*>(.*?)<\/title>/si', $content, $matches)) {
                        $t = trim($matches[1]);
                        if (!empty($t)) $title = $t;
                     } else if (preg_match('/<h[1-2][^>]*>(.*?)<\/h[1-2]>/si', $content, $matches)) {
                         $cleanTitle = strip_tags($matches[1]);
                         $cleanTitle = trim(str_replace(["\r", "\n"], ' ', $cleanTitle));
                         if (!empty($cleanTitle) && strlen($cleanTitle) < 100) {
                             $title = $cleanTitle;
                         }
                     }
                     
                     // Sanitize title
                     $title = html_entity_decode($title);

                     \App\Models\Chapter::create([
                         'book_id' => $book->id,
                         'title' => $title,
                         // TODO: We might need to sanitize or fix image paths in content later
                         'content' => $content, 
                         'order_index' => $order++,
                     ]);
                     
                     \Illuminate\Support\Facades\Log::info("Imported chapter {$order}: {$title}");
                 } else {
                     \Illuminate\Support\Facades\Log::warning("Could not read chapter content: " . $fullPath);
                 }
             }
         }
         
         $book->update(['total_chapters' => $order]);
         $zip->close();
    }
}
