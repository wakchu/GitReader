import AppLayout from '@/layouts/AppLayout';
import { Book, Chapter } from '@/types';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import { Icons } from '@/components/Icons';

interface Props {
    book: Book;
    chapter: Chapter;
    prevChapter?: { id: number, title: string };
    nextChapter?: { id: number, title: string };
    savedScrollPosition?: string;
}

export default function ChapterShow({ book, chapter, prevChapter, nextChapter, savedScrollPosition }: Props) {
    // Determine number of lines
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
            {/* Sticky Header with Breadcrumbs */}
            <div className="bg-[#0d1117] border-b border-[#30363d] sticky top-0 z-40">
                <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
                     <div className="flex items-center gap-2 text-sm text-[#7d8590] overflow-hidden whitespace-nowrap">
                         <div className="flex items-center hover:bg-[#1f242c] rounded px-2 py-1 transition-colors">
                            <Link href="/" className="text-blue-400 hover:underline">{book.author}</Link>
                         </div>
                         <span>/</span>
                         <div className="flex items-center hover:bg-[#1f242c] rounded px-2 py-1 transition-colors">
                            <Link href={`/${book.id}`} className="text-blue-400 hover:underline font-semibold">{book.title}</Link>
                         </div>
                         <span>/</span>
                         <div className="flex items-center hover:bg-[#1f242c] rounded px-2 py-1 transition-colors">
                            <span className="font-semibold text-[#e6edf3] truncate">{chapter.title}</span>
                         </div>
                     </div>
                     
                     {/* Sticky Actions */}
                     <div className="hidden md:flex items-center gap-2">
                        <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-[#c9d1d9] bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d] transition-colors">
                            Go to file
                        </button>
                     </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-6 max-w-[100vw] overflow-hidden">
                
                {/* File Header Bar */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                         <div className="flex items-center gap-2 text-xs text-[#7d8590] font-mono">
                            <span className="font-semibold text-[#e6edf3]">{book.author}</span>
                            <span>update {chapter.title}</span>
                         </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#7d8590]">
                        <span>Latests commit <span className="font-mono text-[#e6edf3]">view-history</span></span>
                        <div className="flex items-center gap-1 p-1 hover:bg-[#21262d] rounded cursor-pointer">
                            <Icons.History />
                            <span className="font-semibold text-[#e6edf3]">History</span>
                        </div>
                    </div>
                </div>

                {/* Blob Container */}
                <div className="border border-[#30363d] rounded-md bg-[#0d1117] flex flex-col">
                    
                    {/* Blob Header (Controls) */}
                    <div className="border-b border-[#30363d] bg-[#0d1117] p-2 flex items-center justify-between text-xs text-[#7d8590] rounded-t-md">
                        <div className="flex items-center gap-4">
                            <div className="flex bg-[#21262d] border border-[#30363d] rounded-md p-0.5">
                                <button className="px-3 py-1 bg-[#30363d] text-[#e6edf3] font-medium rounded-sm">Code</button>
                                <button className="px-3 py-1 hover:text-[#e6edf3] transition-colors">Blame</button>
                            </div>
                            <div className="hidden md:flex items-center gap-2 font-mono border-l border-[#30363d] pl-4">
                                <span className="text-[#e6edf3] font-semibold">{lineCount} lines</span>
                                <span>({lineCount} sloc)</span>
                                <span>{chapter.content.length} Bytes</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                             <div className="flex items-center border-r border-[#30363d] pr-2 mr-2 gap-1">
                                 <button className="p-1.5 hover:bg-[#21262d] rounded-md text-[#7d8590] hover:text-[#e6edf3]" aria-label="Raw">
                                    Raw
                                 </button>
                                 <button className="p-1.5 hover:bg-[#21262d] rounded-md text-[#7d8590] hover:text-[#e6edf3]" aria-label="Copy raw">
                                    <Icons.Copy />
                                 </button>
                                 <button className="p-1.5 hover:bg-[#21262d] rounded-md text-[#7d8590] hover:text-[#e6edf3]" aria-label="Download">
                                    <Icons.Download />
                                 </button>
                             </div>
                             <div className="flex items-center gap-1">
                                 <button className="p-1.5 hover:bg-[#21262d] rounded-md text-[#7d8590] hover:text-[#e6edf3]" aria-label="Edit">
                                    <Icons.Pencil />
                                 </button>
                                 <button className="p-1.5 hover:bg-[#21262d] rounded-md text-[#7d8590] hover:text-[#e6edf3]" aria-label="More actions">
                                    <Icons.TriangleDown />
                                 </button>
                             </div>
                        </div>
                    </div>

                    {/* Blob Content */}
                    <div ref={scrollContainerRef} className="flex overflow-x-auto text-sm max-h-[calc(100vh-200px)] overflow-y-auto bg-[#0d1117] rounded-b-md">
                        {/* Line Numbers */}
                        <div className="flex flex-col text-right select-none min-w-[50px] border-r border-[#30363d] py-4 bg-[#0d1117]">
                            {Array.from({ length: lineCount }).map((_, i) => (
                                <div key={i} className="px-3 text-[#6e7681] font-mono text-[12px] leading-[1.5] h-[24px]">
                                    {i + 1}
                                </div>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="w-full py-4 px-8 prose dark:prose-invert max-w-none 
                            prose-code:before:content-none prose-code:after:content-none 
                            prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0 prose-pre:border-0
                            prose-headings:border-b prose-headings:border-[#30363d] prose-headings:pb-2 prose-img:rounded-md
                            text-[#e6edf3] font-sans"
                        >
                            <div 
                                dangerouslySetInnerHTML={{ __html: chapter.content }} 
                                className="epub-content leading-[1.6]" // Slightly adjusting line height for readability
                            />
                        </div>
                    </div>
                </div>
                
                {/* Navigation Footer */}
                <div className="mt-4 flex justify-between">
                     {prevChapter ? (
                         <Link 
                            href={`/${book.id}/blob/${prevChapter.id}`} 
                            className="px-3 py-1 bg-[#21262d] border border-[#30363d] rounded-md text-[#c9d1d9] hover:bg-[#30363d] transition-colors text-xs font-medium"
                         >
                             Previous Chapter
                         </Link>
                     ) : (
                         <div></div>
                     )}
                     
                     {nextChapter ? (
                         <Link 
                            href={`/${book.id}/blob/${nextChapter.id}`} 
                            className="px-3 py-1 bg-[#21262d] border border-[#30363d] rounded-md text-[#c9d1d9] hover:bg-[#30363d] transition-colors text-xs font-medium"
                         >
                             Next Chapter
                         </Link>
                     ) : (
                         <div></div>
                     )}
                </div>

            </div>
        </AppLayout>
    );
}
