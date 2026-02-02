<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\ReadingProgress;
use App\Services\EpubService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LibraryController extends Controller
{
    public function index()
    {
        $books = Book::with(['readingProgress' => function($query) {
                $query->where('user_id', Auth::id() ?? 1);
            }])
            ->latest()
            ->get()
            ->map(function($book) {
                // Flatten progress
                $book->progress = $book->readingProgress->first();
                unset($book->readingProgress);
                return $book;
            });

        return Inertia::render('Library/Index', [
            'books' => $books,
        ]);
    }

    public function scan(EpubService $epubService)
    {
        $directory = storage_path('app/library');
        
        if (!file_exists($directory)) {
            mkdir($directory, 0755, true);
        }

        $files = glob($directory . '/*.epub');
        $imported = 0;

        foreach ($files as $file) {
            // Check if already imported
            $filename = basename($file);
            // Simple duplicate check by file path or title could be better, but for now this is okay
            // We can prevent duplicates by checking if a book with same file_path exists? 
            // OR move processed files to 'processed' folder?
            // Let's check strict duplicate by filename for now to avoid re-importing same file 100 times if logic is naive
            
            // Check if filepath exists in DB
            $existing = Book::where('file_path', $file)->first();
            if ($existing) {
                // FORCE DELETE for debugging chapters
                $existing->chapters()->delete();
                $existing->delete();
                \Illuminate\Support\Facades\Log::info("Deleted existing book to force re-import: " . $filename);
            }

            if ($epubService->import($file)) {
                $imported++;
            }
        }

        return redirect()->back()->with('success', "Scanned library. Imported {$imported} new books.");
    }

    public function store(Request $request, EpubService $epubService)
    {
        \Illuminate\Support\Facades\Log::info('📚 Upload Request Recieved', ['files' => $request->allFiles()]);

        $request->validate([
            'file' => ['required', 'file', 'mimes:epub,zip', 'max:10240'], // 10MB max
        ]);

        $file = $request->file('file');
        \Illuminate\Support\Facades\Log::info('File detected', ['name' => $file->getClientOriginalName(), 'mime' => $file->getMimeType()]);
        
        // Store temporarily
        $path = $file->storeAs('temp', $file->getClientOriginalName());
        
        // FIX: Ensure we use the correct absolute path based on the disk driver
        // Assuming 'local' driver for default.
        $fullPath = storage_path('app/' . $path);
        
        \Illuminate\Support\Facades\Log::info('File stored at: ' . $fullPath);

        $book = $epubService->import($fullPath);

        if ($book) {
             // Move to permanent library storage? Or keep in temp?
             // Better to move to library folder
             $newPath = 'library/' . $file->getClientOriginalName();
             \Illuminate\Support\Facades\Storage::move($path, $newPath);
             $book->update(['file_path' => storage_path('app/' . $newPath)]);

            \Illuminate\Support\Facades\Log::info('Book created successfully: ' . $book->id);
            return redirect()->back()->with('success', 'Book imported successfully.');
        }

        \Illuminate\Support\Facades\Log::error('Book creation failed (Service returned null)');
        return redirect()->back()->with('error', 'Failed to import book. Check logs.');
    }
}
