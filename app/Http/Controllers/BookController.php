<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function show($id)
    {
        try {
            // Eager load chapters for the file list
            $book = Book::with('chapters')->findOrFail($id);
            $chapters = $book->chapters;
        } catch (\Exception $e) {
             // Mock Data Fallback
             $book = new Book([
                 'id' => $id,
                 'title' => 'The Pragmatic Programmer',
                 'author' => 'David Thomas, Andrew Hunt',
                 'total_chapters' => 12,
                 'created_at' => now(),
             ]);
             
             $chapters = collect([]);
             for($i=1; $i<=12; $i++) {
                 $chapters->push([
                     'id' => $i,
                     'title' => "Chapter {$i}.md",
                     'order_index' => $i,
                     'updated_at' => now()->subMinutes($i * 10),
                 ]);
             }
        }

        return Inertia::render('Book/Show', [
            'book' => $book,
            'chapters' => $chapters,
        ]);
    }
}
