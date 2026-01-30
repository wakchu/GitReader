<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function show($id)
    {
        // Eager load chapters for the file list
        $book = Book::with('chapters')->findOrFail($id);
        $chapters = $book->chapters;
        
        return Inertia::render('Book/Show', [
            'book' => $book,
            'chapters' => $chapters,
        ]);
    }
}
