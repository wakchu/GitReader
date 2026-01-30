
import AppLayout from '@/layouts/AppLayout';
import { Book, Chapter } from '@/types';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function BookShow({ book, chapters }: { book: Book, chapters: Chapter[] }) {
    return (
        <AppLayout title={book.title}>
            <div className="bg-gh-canvas-subtle border-b border-gh-border sticky top-14 z-40">
                <div className="container mx-auto px-4 md:px-6 py-4">
                     <div className="flex items-center gap-2 text-xl">
                         <Link href="/" className="text-blue-500 hover:underline">{book.author}</Link>
                         <span className="text-gray-500">/</span>
                         <Link href={`/${book.id}`} className="font-bold text-blue-500 hover:underline">{book.title}</Link>
                         <span className="ml-2 text-xs border border-gh-border rounded-xl px-2 text-gray-500 font-normal">Public</span>
                     </div>
                     
                     {/* Tab Navigation (Repo Level) */}
                     <nav className="flex gap-6 text-sm mt-4 -mb-4">
                        <Link href={`/${book.id}`} className="flex items-center gap-2 py-2 px-1 border-b-2 border-orange-500 font-semibold text-gh-text">
                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-current"><path d="M14 11.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75H2a.75.75 0 0 1-.75-.75v-2.25a.75.75 0 0 1 .75-.75h12ZM14 3.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75H2a.75.75 0 0 1-.75-.75V4a.75.75 0 0 1 .75-.75h12Z"></path></svg>
                            Code
                        </Link>
                        <a href="#" className="flex items-center gap-2 py-2 px-1 border-b-2 border-transparent hover:border-gray-300">
                             <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path></svg>
                             Issues
                        </a>
                        {/* More tabs... */}
                     </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row gap-6">
                
                {/* Main Content: File List */}
                <div className="md:w-3/4">
                    
                    {/* Repo Info Header / Branch Selector */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 bg-gh-btn-bg border border-gh-btn-border rounded-md text-xs font-medium flex items-center gap-2 hover:bg-gray-100">
                                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500"><path d="M9.5 3.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V4h-6v8h.75a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75v-9a.75.75 0 0 1 .75-.75h7.75Z"></path><path d="M12.75 7a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 .75-.75Z"></path><path d="M6 7.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75ZM6 11.25a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75Z"></path></svg>
                                main
                                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="12" data-view-component="true" className="fill-gray-500"><path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"></path></svg>
                            </button>
                            
                             <div className="hidden md:flex items-center text-xs text-gray-500 gap-2">
                                 <strong>1</strong> branch
                                 <strong>0</strong> tags
                             </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                             <button className="px-3 py-1.5 bg-[#2da44e] text-white border border-[rgba(27,31,36,0.15)] rounded-md text-xs font-semibold hover:bg-[#2c974b] flex items-center gap-2">
                                 Code
                                 <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-white"><path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"></path></svg>
                             </button>
                        </div>
                    </div>

                    {/* File Table */}
                    <div className="border border-gh-border rounded-md overflow-hidden bg-white dark:bg-[#0d1117]">
                        {/* Table Header (Last Commit Info) */}
                        <div className="bg-gh-header-bg p-3 border-b border-gh-border flex items-center gap-2 text-xs text-gh-text">
                            <img src="https://github.com/identicons/jasonlong.png" alt="User" className="w-5 h-5 rounded-full" />
                            <span className="font-semibold">{book.author}</span>
                            <span className="text-gray-500">Initial commit (imported via GitReader)</span>
                            <span className="ml-auto text-gray-500">2 hours ago</span>
                            <div className="flex items-center gap-2 ml-4 text-gray-500">
                                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500"><path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5h-3.32Z"></path></svg>
                                <span>{chapters.length} commits</span>
                            </div>
                        </div>
                        
                        {/* File Rows */}
                        <div className="text-sm">
                            {/* .. Directory .. if we had deeper structure */}
                            
                            {chapters.length > 0 ? chapters.map((chapter) => (
                                <div key={chapter.id} className="border-t border-gh-border first:border-t-0 p-2 px-3 flex items-center hover:bg-gray-50 dark:hover:bg-[#161b22] transition-colors group">
                                    <div className="w-8 flex justify-center text-gray-400">
                                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-400"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V4.664a.25.25 0 0 0-.073-.177l-2.914-2.914a.25.25 0 0 0-.177-.073ZM8 3.25a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 8 3.25Z"></path></svg>
                                    </div>
                                    <div className="flex-1 truncate pr-4">
                                        <Link href={`/${book.id}/blob/${chapter.id}`} className="hover:text-blue-500 hover:underline">
                                            {chapter.title}
                                        </Link>
                                    </div>
                                    <div className="hidden md:block w-1/3 truncate text-gray-500">
                                        Added {chapter.title} content
                                    </div>
                                    <div className="text-right text-gray-500 text-xs w-24">
                                        Just now
                                    </div>
                                </div>
                            )) : (
                                <div className="p-8 text-center text-gray-500">
                                    This book has no chapters yet.
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Readme Section (could be book description) */}
                    <div className="mt-6 border border-gh-border rounded-md bg-white dark:bg-[#0d1117] overflow-hidden">
                        <div className="bg-gh-header-bg p-2 px-4 border-b border-gh-border sticky top-0 flex items-center gap-2 text-xs font-semibold">
                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500"><path d="M4.75 2.5c-.69 0-1.25.56-1.25 1.25v2.5c0 .69.56 1.25 1.25 1.25h2.5c.69 0 1.25-.56 1.25-1.25v-2.5c0-.69-.56-1.25-1.25-1.25h-2.5ZM2 3.75C2 2.231 3.231 1 4.75 1h2.5C8.769 1 10 2.231 10 3.75v2.5C10 7.769 8.769 9 7.25 9h-2.5C3.231 9 2 7.769 2 6.25v-2.5Zm10.5 8.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm-.75-2.75c1.519 0 2.75 1.231 2.75 2.75a2.75 2.75 0 1 1-5.5 0c0-1.519 1.231-2.75 2.75-2.75Z"></path></svg>
                            README.md
                        </div>
                        <div className="p-8 prose dark:prose-invert max-w-none text-sm">
                            <h1 className="text-2xl font-bold border-b border-gh-border pb-2 mb-4">{book.title}</h1>
                            <p className="mb-4"><strong>Author:</strong> {book.author}</p>
                            <p>This is a stealthy e-reader application. You are currently viewing a book as if it were a code repository.</p>
                        </div>
                    </div>

                </div>

                {/* Right Sidebar (Metadata) */}
                <div className="md:w-1/4 flex flex-col gap-6 text-xs text-gray-500">
                    <div>
                        <h3 className="font-semibold text-gh-text mb-2">About</h3>
                        <p className="mb-4">No description, website, or topics provided.</p>
                        
                        <div className="flex items-center gap-2 mb-2">
                             <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500"><path d="M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 0 1 0 1.5h-.427l2.111 4.224A.75.75 0 0 1 15.263 10h-2.652l-2-4H8.75v1.25a.75.75 0 0 1-1.5 0V.75a.75.75 0 0 1 1.5 0ZM7.75 10h-2.11l2.673 5.346a.75.75 0 1 1-1.342.67L4.72 11.5H1.75a.75.75 0 0 1-.75-.75v-1.127l1.378-2.068a.747.747 0 0 1 .458-.31l2.583-.491v.446l-2.463.469-.876 1.315v.266h4.67v.75ZM6 8.5v-1H4.498l1.341-.255.161.255Zm.146-2.909 2.104-.4V3.064l-1.921 1.642a.75.75 0 0 0-.183.885ZM9.25 3.328v1.637l2.42-1.383-2.42-.254Z"></path></svg>
                             Readme
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                             <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500"><path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5h-3.32Z"></path></svg>
                             Activity
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                             <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500"><path d="m8 1.472 5 2.144v1.884c0 3.33-1.879 6.276-4.908 7.746l-.092.044-.092-.044C4.879 11.78 3 8.835 3 5.5V3.616l5-2.144Zm0-.944-6 2.573v2.399c0 3.868 2.304 7.23 5.4 8.795l.6.289.6-.289C11.696 12.699 14 9.337 14 5.5V3.101l-6-2.573Z"></path></svg>
                             Security policy
                        </div>
                    </div>
                    
                    <div className="border-t border-gh-border pt-4">
                        <h3 className="font-semibold text-gh-text mb-2">Releases</h3>
                        <p>No releases published</p>
                    </div>

                    <div className="border-t border-gh-border pt-4">
                         <h3 className="font-semibold text-gh-text mb-2">Languages</h3>
                         <div className="flex bg-[#ecfdf5] rounded-full h-2 mb-2 overflow-hidden">
                             <div className="bg-yellow-400 h-full w-full"></div>
                         </div>
                         <div className="flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                             <span className="font-semibold text-gh-text">EPUB</span>
                             <span>100.0%</span>
                         </div>
                    </div>
                </div>
            
            </div>
        </AppLayout>
    );
}
