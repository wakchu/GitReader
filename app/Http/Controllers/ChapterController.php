<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Chapter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChapterController extends Controller
{
    public function show($bookId, $chapterId)
    {
        try {
            $book = Book::findOrFail($bookId);
            $chapter = Chapter::where('book_id', $book->id)->findOrFail($chapterId);
            
            // Get Previous/Next for pagination
            $prevChapter = Chapter::where('book_id', $book->id)
                ->where('order_index', '<', $chapter->order_index)
                ->orderBy('order_index', 'desc')
                ->first();
                
            $nextChapter = Chapter::where('book_id', $book->id)
                ->where('order_index', '>', $chapter->order_index)
                ->orderBy('order_index', 'asc')
                ->first();

        } catch (\Exception $e) {
            // Mock Data Fallback
             $book = new Book([
                 'id' => $bookId,
                 'title' => 'The Pragmatic Programmer',
                 'author' => 'David Thomas, Andrew Hunt',
                 'total_chapters' => 12,
             ]);
             
             // Mock content wrapper to simulate a real book chapter
             $content = "# Chapter {$chapterId}\n\nThis is the content of chapter {$chapterId}. It is displayed in a way that mimics a markdown file on GitHub.\n\n## Section 1\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n```javascript\nconsole.log('Stealth Mode Activated');\n```\n\n## Section 2\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

             $chapter = new Chapter([
                 'id' => $chapterId,
                 'book_id' => $bookId,
                 'title' => "Chapter {$chapterId}.md",
                 'content' => $content,
                 'order_index' => (int)$chapterId,
                 'created_at' => now(),
             ]);
             
             $prevChapter = $chapterId > 1 ? ['id' => $chapterId - 1, 'title' => "Chapter " . ($chapterId - 1) . ".md"] : null;
             $nextChapter = $chapterId < 12 ? ['id' => $chapterId + 1, 'title' => "Chapter " . ($chapterId + 1) . ".md"] : null;
        }

        return Inertia::render('Chapter/Show', [
            'book' => $book,
            'chapter' => $chapter,
            'prevChapter' => $prevChapter,
            'nextChapter' => $nextChapter,
        ]);
    }
}
