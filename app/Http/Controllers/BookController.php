<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\ReadingProgress;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    public function show($id)
    {
        // Eager load chapters for the file list
        $book = Book::with('chapters')->findOrFail($id);
        $chapters = $book->chapters;
        
        $progress = ReadingProgress::where('user_id', Auth::id() ?? 1)
            ->where('book_id', $book->id)
            ->first();

        return Inertia::render('Book/Show', [
            'book' => $book,
            'chapters' => $chapters,
            'readingProgress' => $progress,
        ]);
    }
}
