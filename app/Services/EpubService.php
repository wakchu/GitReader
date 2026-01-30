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
            return null;
        }

        try {
            $ebook = Ebook::read($filePath);

            if (!$ebook || $ebook->getFormat() !== EbookFormatEnum::EPUB) {
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

            // Extract Chapters
            $parser = $ebook->getParser();
            if ($parser && $parser->getModule() instanceof EpubModule) {
                 /** @var EpubModule $module */
                 $module = $parser->getModule();
                 $chapters = $module->getChapters();
                 
                 $order = 0;
                 foreach ($chapters as $chapter) {
                     Chapter::create([
                         'book_id' => $book->id,
                         'title' => $chapter->getLabel() ?? "Chapter {$order}",
                         'content' => $chapter->getContent(),
                         'order_index' => $order++,
                     ]);
                 }

                 $book->update(['total_chapters' => $order]);
            }

            return $book;

        } catch (\Exception $e) {
            // Log error
            return null;
        }
    }
}
