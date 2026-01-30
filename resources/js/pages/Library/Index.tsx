
import AppLayout from '@/layouts/AppLayout';
import { Book } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react'; // Added usePage if needed
import React, { useState } from 'react';

export default function LibraryIndex({ books }: { books: Book[] }) {
    // Mock user data
    const user = {
        name: 'GitReader User',
        handle: 'gitreader',
        bio: 'Reading documentation in stealth mode.',
        followers: 12,
        following: 45,
        location: 'Remote',
        website: 'gitreader.app'
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        file: null as File | null,
    });
    
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('file', e.target.files[0]);
        }
    };

    const submitUpload = (e: React.FormEvent) => {
        e.preventDefault();
        post('/books', {
            onSuccess: () => {
                setIsUploadOpen(false);
                reset();
            }
        });
    };

    return (
        <AppLayout title="GitReader">
            <div className="container mx-auto md:px-6 md:py-8 flex flex-col md:flex-row gap-6">
                
                {/* Left Sidebar (Profile) */}
                <div className="md:w-1/4 flex flex-col gap-4 px-4 md:px-0">
                    <div className="relative group">
                        <img 
                            src="https://github.com/identicons/jasonlong.png" 
                            alt="Avatar" 
                            className="w-16 h-16 md:w-[296px] md:h-[296px] rounded-full border border-gh-border z-10 relative bg-gh-bg"
                        />
                         {/* Status smiley? */}
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold leading-tight">{user.name}</h1>
                        <span className="text-xl text-gray-500 font-light">{user.handle}</span>
                    </div>

                    <div className="text-base">
                        {user.bio}
                    </div>
                    
                    <button 
                        onClick={() => setIsUploadOpen(!isUploadOpen)}
                        className="w-full py-1.5 px-3 border border-gh-btn-border bg-gh-btn-bg rounded-md text-sm font-medium hover:bg-gray-200 transition-colors text-center"
                    >
                        {isUploadOpen ? 'Cancel Import' : 'Edit profile'}
                    </button>
                    
                    {/* Mock Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="hover:text-blue-500 cursor-pointer"><b>{user.followers}</b> followers</span>
                        <span>·</span>
                        <span className="hover:text-blue-500 cursor-pointer"><b>{user.following}</b> following</span>
                    </div>
                    
                    <div className="flex flex-col gap-2 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                             <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500"><path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path></svg>
                             {user.location}
                        </div>
                        <div className="flex items-center gap-2">
                             <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a2.002 2.002 0 0 0 0 2.83Z"></path></svg>
                             <a href="#" className="hover:text-blue-500 hover:underline">{user.website}</a>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:w-3/4 px-4 md:px-0">
                    
                    {/* Tab Navigation (Sticky?) */}
                    <div className="border-b border-gh-border mb-4 overflow-x-auto">
                        <nav className="flex gap-6 text-sm">
                            <a href="#" className="flex items-center gap-2 py-3 px-1 border-b-2 border-transparent hover:border-gray-300">
                                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500"><path d="M10.68 11.74a6 6 0 0 1-7.922-8.98 6 6 0 0 1 8.98 7.92l3.19 3.19a.75.75 0 0 1-1.06 1.06l-3.192-3.19Zm-4.23-10.4a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"></path></svg>
                                Overview
                            </a>
                            <a href="#" className="flex items-center gap-2 py-3 px-1 border-b-2 border-orange-500 font-semibold text-gh-text">
                                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-current"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
                                Repositories <span className="bg-gray-200/50 text-xs px-1.5 rounded-full ml-1">{books.length}</span>
                            </a>
                            <a href="#" className="flex items-center gap-2 py-3 px-1 border-b-2 border-transparent hover:border-gray-300">
                                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500"><path d="M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25ZM3.5 6.25a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75Zm.75 2.25h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1 0-1.5Z"></path></svg>
                                Projects
                            </a>
                             {/* ... other tabs ... */}
                        </nav>
                    </div>

                    {/* Upload / "New" Area */}
                    {isUploadOpen && (
                        <div className="mb-6 p-4 border border-gh-border rounded-md bg-gh-canvas-subtle animate-in fade-in slide-in-from-top-2">
                             <h3 className="text-sm font-semibold mb-2">Import New Book (EPUB)</h3>
                             <form onSubmit={submitUpload} className="flex flex-col gap-3">
                                 <input 
                                    type="file" 
                                    accept=".epub"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-md file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-blue-500 file:text-white
                                      hover:file:bg-blue-600 cursor-pointer"
                                 />
                                 {errors.file && <div className="text-red-500 text-xs">{errors.file}</div>}
                                 
                                 <div className="flex justify-end gap-2">
                                     <button 
                                        type="button" 
                                        onClick={() => setIsUploadOpen(false)}
                                        className="px-3 py-1.5 text-xs font-medium border border-gh-border rounded-md hover:bg-gray-100"
                                     >
                                        Cancel
                                     </button>
                                     <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="px-3 py-1.5 text-xs font-medium bg-[#2da44e] text-white border border-[rgba(27,31,36,0.15)] rounded-md hover:bg-[#2c974b] disabled:opacity-50"
                                     >
                                        {processing ? 'Importing...' : 'Import Book'}
                                     </button>
                                 </div>
                             </form>
                        </div>
                    )}

                    {/* Popular Repositories / Pinned */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">Popular repositories</h2>
                            <span className="text-xs text-gray-500 hover:text-blue-500 cursor-pointer">Customize your pins</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {books.map((book) => (
                                <div key={book.id} className="p-4 border border-gh-border rounded-md flex flex-col justify-between h-[108px] bg-white dark:bg-[#0d1117] hover:bg-gray-50 dark:hover:bg-[#161b22] transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 font-semibold text-blue-500 hover:underline cursor-pointer truncate">
                                             <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
                                             <Link href={`/${book.id}`} className="truncate">{book.title}</Link>
                                        </div>
                                        <span className="text-xs text-gray-400 border border-gh-border rounded-xl px-2">Public</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 truncate line-clamp-2">{book.author}</p>
                                    
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-auto">
                                        <div className="flex items-center gap-1">
                                            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                                            <span>EPUB</span>
                                        </div>
                                        {book.total_chapters > 0 && <Link href={`/${book.id}`} className="hover:text-blue-500 cursor-pointer">{book.total_chapters} chapters</Link>}
                                    </div>
                                </div>
                            ))}
                            
                            {/* Empty State / Add Placeholders if needed */}
                        </div>
                    </div>

                    {/* Contribution Graph (Placeholder) */}
                    <div className="border border-gh-border rounded-md p-4 bg-white dark:bg-[#0d1117]">
                         <div className="flex justify-between items-center mb-2">
                             <span className="text-sm font-semibold">1,234 contributions in the last year</span>
                             <div className="flex items-center gap-2 text-xs text-gray-500">
                                 <span>Less</span>
                                 <div className="flex gap-0.5">
                                     <span className="w-2.5 h-2.5 bg-[#ebedf0] dark:bg-[#161b22] rounded-sm"></span>
                                     <span className="w-2.5 h-2.5 bg-[#9be9a8] dark:bg-[#0e4429] rounded-sm"></span>
                                     <span className="w-2.5 h-2.5 bg-[#40c463] dark:bg-[#006d32] rounded-sm"></span>
                                     <span className="w-2.5 h-2.5 bg-[#30a14e] dark:bg-[#26a641] rounded-sm"></span>
                                     <span className="w-2.5 h-2.5 bg-[#216e39] dark:bg-[#39d353] rounded-sm"></span>
                                 </div>
                                 <span>More</span>
                             </div>
                         </div>
                         {/* Fake Grid */}
                         <div className="flex gap-1 overflow-hidden h-32 items-end">
                              {/* Just a visual representation for now */}
                              {Array.from({ length: 53 }).map((_, i) => (
                                  <div key={i} className="flex flex-col gap-1">
                                      {Array.from({ length: 7 }).map((_, j) => (
                                          <div 
                                            key={j} 
                                            className={`w-2.5 h-2.5 rounded-sm ${Math.random() > 0.8 ? 'bg-[#40c463] dark:bg-[#006d32]' : 'bg-[#ebedf0] dark:bg-[#161b22]'}`}
                                          ></div>
                                      ))}
                                  </div>
                              ))}
                         </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
