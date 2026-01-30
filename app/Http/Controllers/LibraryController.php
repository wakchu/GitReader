<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Services\EpubService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LibraryController extends Controller
{
    public function index()
    {
        try {
            $books = Book::query()
                ->latest()
                ->get();
        } catch (\Exception $e) {
            // Fallback mock data for preview/testing without DB
            $books = [
                [
                    'id' => 1,
                    'title' => 'The Pragmatic Programmer',
                    'author' => 'David Thomas, Andrew Hunt',
                    'cover_image' => null,
                    'total_chapters' => 12,
                    'file_path' => 'mock.epub',
                ],
                [
                    'id' => 2,
                    'title' => 'Clean Code',
                    'author' => 'Robert C. Martin',
                    'cover_image' => null,
                    'total_chapters' => 17,
                    'file_path' => 'mock2.epub',
                ]
            ];
        }

        return Inertia::render('Library/Index', [
            'books' => $books,
        ]);
    }

    public function store(Request $request, EpubService $epubService)
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:epub', 'max:10240'], // 10MB max
        ]);

        $file = $request->file('file');
        
        // Store temporarily
        $path = $file->storeAs('temp', $file->getClientOriginalName());
        $fullPath = storage_path('app/' . $path);

        $book = $epubService->import($fullPath);

        // Cleanup
        // Storage::delete($path); // Keeping it for now or move it? The service uses the path. 
        // Actually EpubService reads from path. 

        if ($book) {
            return redirect()->back()->with('success', 'Book imported successfully.');
        }

        return redirect()->back()->with('error', 'Failed to import book.');
    }
}
