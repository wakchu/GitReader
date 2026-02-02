<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Chapter;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\ReadingProgress;
use Illuminate\Support\Facades\Auth;

class ChapterController extends Controller
{
    public function show($bookId, $chapterId)
    {
        $book = Book::findOrFail($bookId);
        $chapter = Chapter::where('book_id', $book->id)->findOrFail($chapterId);
        
        $progress = ReadingProgress::where('user_id', Auth::id() ?? 1)
            ->where('book_id', $book->id)
            ->where('current_chapter_id', $chapterId)
            ->first();

        // Get Previous/Next for pagination
        $prevChapter = Chapter::where('book_id', $book->id)
            ->where('order_index', '<', $chapter->order_index)
            ->orderBy('order_index', 'desc')
            ->first();
            
        $nextChapter = Chapter::where('book_id', $book->id)
            ->where('order_index', '>', $chapter->order_index)
            ->orderBy('order_index', 'asc')
            ->first();

        return Inertia::render('Chapter/Show', [
            'book' => $book,
            'chapter' => $chapter,
            'prevChapter' => $prevChapter,
            'nextChapter' => $nextChapter,
            'savedScrollPosition' => $progress?->scroll_position,
        ]);
    }
}
