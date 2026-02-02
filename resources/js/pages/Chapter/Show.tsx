
import AppLayout from '@/layouts/AppLayout';
import { Book, Chapter } from '@/types';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
    book: Book;
    chapter: Chapter;
    prevChapter?: { id: number, title: string };
    nextChapter?: { id: number, title: string };
    savedScrollPosition?: string;
}

export default function ChapterShow({ book, chapter, prevChapter, nextChapter, savedScrollPosition }: Props) {
    // Determine number of lines (fake)
    const lineCount = chapter.content.split('\n').length;
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Auto-restore scroll position
    useEffect(() => {
        if (savedScrollPosition && scrollContainerRef.current) {
            const percentage = parseFloat(savedScrollPosition);
            if (!isNaN(percentage)) {
                // Wait slightly for layout
                setTimeout(() => {
                    if (scrollContainerRef.current) {
                        const maxScroll = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
                        scrollContainerRef.current.scrollTop = maxScroll * (percentage / 100);
                    }
                }, 100);
            }
        }
    }, [savedScrollPosition, chapter.id]);

    // Save scroll position with debounce
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = debounce(() => {
            if (!container) return;
            const maxScroll = container.scrollHeight - container.clientHeight;
            const currentScroll = container.scrollTop;
            
            // Avoid division by zero
            const percentage = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;
            
            axios.post(`/books/${book.id}/progress`, {
                chapter_id: chapter.id,
                scroll_position: percentage.toFixed(2),
                progress_percent: 0 // Placeholder logic for now
            });
        }, 1000);

        container.addEventListener('scroll', handleScroll);
        return () => {
            handleScroll.cancel();
            container.removeEventListener('scroll', handleScroll);
        };
    }, [book.id, chapter.id]);
    
    return (
        <AppLayout title={`${chapter.title} - ${book.title}`}>
            <div className="bg-gh-canvas-subtle border-b border-gh-border sticky top-14 z-40">
                <div className="container mx-auto px-4 md:px-6 py-4">
                     <div className="flex items-center gap-2 text-xl truncate">
                         <Link href="/" className="text-blue-500 hover:underline">{book.author}</Link>
                         <span className="text-gray-500">/</span>
                         <Link href={`/${book.id}`} className="text-blue-500 hover:underline font-semibold">{book.title}</Link>
                         <span className="text-gray-500">/</span>
                         <span className="font-semibold text-gh-text truncate">{chapter.title}</span>
                     </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-6">
                
                {/* Blob Header */}
                <div className="border border-gh-border border-b-0 rounded-t-md bg-gh-header-bg p-3 flex items-center justify-between text-xs text-gh-text">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 font-mono">
                            <span className="font-semibold">{lineCount} lines</span>
                            <span className="text-gray-500">({lineCount} sloc)</span>
                        </div>
                        <span className="text-gray-500">{chapter.content.length} Bytes</span>
                    </div>

                    <div className="flex items-center gap-2">
                         <div className="flex items-center border border-gh-btn-border rounded-md overflow-hidden">
                             <button className="px-3 py-1 bg-white dark:bg-[#0d1117] font-medium border-r border-gh-btn-border">Code</button>
                             <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-[#21262d]">Blame</button>
                         </div>
                         
                         <div className="flex items-center gap-2">
                             {prevChapter ? (
                                 <Link 
                                    href={`/${book.id}/blob/${prevChapter.id}`} 
                                    className="px-3 py-1 bg-gh-btn-bg border border-gh-btn-border rounded-md hover:bg-gray-200 dark:hover:bg-[#30363d] transition-colors"
                                 >
                                     Prev
                                 </Link>
                             ) : (
                                 <button disabled className="px-3 py-1 bg-gh-btn-bg border border-gh-btn-border rounded-md opacity-50 cursor-not-allowed">Prev</button>
                             )}
                             
                             {nextChapter ? (
                                 <Link 
                                    href={`/${book.id}/blob/${nextChapter.id}`} 
                                    className="px-3 py-1 bg-gh-btn-bg border border-gh-btn-border rounded-md hover:bg-gray-200 dark:hover:bg-[#30363d] transition-colors"
                                 >
                                     Next
                                 </Link>
                             ) : (
                                 <button disabled className="px-3 py-1 bg-gh-btn-bg border border-gh-btn-border rounded-md opacity-50 cursor-not-allowed">Next</button>
                             )}
                         </div>
                    </div>
                </div>

                {/* Blob Content */}
                <div ref={scrollContainerRef} className="border border-gh-border rounded-b-md bg-white dark:bg-[#0d1117] overflow-x-auto flex text-sm max-h-[calc(100vh-250px)] overflow-y-auto">
                    {/* Line Numbers */}
                    <div className="bg-white dark:bg-[#0d1117] border-r border-gh-border text-right text-gray-400 select-none py-4 px-3 font-mono text-xs flex flex-col gap-[0.125rem] min-w-[50px]">
                        {Array.from({ length: lineCount }).map((_, i) => (
                            <span key={i} className="leading-6">{i + 1}</span>
                        ))}
                    </div>
                    
                    {/* Code / Content */}
                    <div className="p-8 w-full prose dark:prose-invert max-w-none prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gh-code-bg prose-pre:border prose-pre:border-gh-border">
                        <ReactMarkdown>
                            {chapter.content}
                        </ReactMarkdown>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}
