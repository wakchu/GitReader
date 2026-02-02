<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\ReadingProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReadingProgressController extends Controller
{
    public function store(Request $request, Book $book)
    {
        $validated = $request->validate([
            'chapter_id' => 'required|exists:chapters,id',
            'scroll_position' => 'nullable|string', // Expecting percentage as string or float
            'progress_percent' => 'nullable|integer|min:0|max:100', // Overall book progress
        ]);

        // Ensure the chapter belongs to the book
        if ($book->chapters()->where('id', $validated['chapter_id'])->doesntExist()) {
            return response()->json(['message' => 'Invalid chapter for this book'], 422);
        }

        $progress = ReadingProgress::updateOrCreate(
            [
                'user_id' => Auth::id() ?? 1, // Fallback to user 1 if no auth for local dev
                'book_id' => $book->id,
            ],
            [
                'current_chapter_id' => $validated['chapter_id'],
                'scroll_position' => $validated['scroll_position'] ?? '0',
                'last_read_at' => now(),
            ]
        );

        // Update Daily Activity (Contribution Graph logic placeholder)
        // DailyActivity::record(Auth::id(), 'read'); 

        return response()->json(['message' => 'Progress saved', 'progress' => $progress]);
    }
}
