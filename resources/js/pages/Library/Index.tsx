
import AppLayout from '@/layouts/AppLayout';
import { Book, ReadingProgress } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

export default function LibraryIndex({ books }: { books: (Book & { progress?: ReadingProgress })[] }) {
    // Mock user data for stealth mode
    const user = {
        name: 'Bordoni Stefano',
        handle: 'wakchu',
        bio: 'Junior software developer.',
        followers: 12,
        following: 45,
        location: 'Italy',
        email: 'stfnbrdn@gmail.com',
        website: 'linkedin.com/in/stefano-bordoni',
        company: 'ITS Rizzoli'
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
        <AppLayout title={`${user.handle} (${user.name})`}>
            <div className="container mx-auto px-3 md:px-4 lg:px-5 mt-8 max-w-[1280px]">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    
                    {/* Left Sidebar (Profile) */}
                    <div className="flex flex-col md:w-[296px] shrink-0">
                        <div className="relative group mb-4">
                            <img 
                                src="https://avatars.githubusercontent.com/u/206829640?v=4" 
                                alt="Avatar" 
                                className="w-[296px] h-[296px] rounded-full border border-[var(--color-border-muted)] z-10 relative bg-[var(--color-canvas-default)]"
                            />
                            {/* Status Indicator (Optional) */}
                            <div className="absolute bottom-[10%] left-full -translate-x-[120%] bg-[var(--color-canvas-default)] border border-[var(--color-border-muted)] rounded-full w-[38px] h-[38px] flex items-center justify-center shadow-sm cursor-pointer md:hidden hover:text-blue-500">
                                <span className="text-lg">😀</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-0 mb-4">
                            <h1 className="text-[26px] font-semibold leading-tight text-[var(--color-fg-default)]">{user.name}</h1>
                            <span className="text-[20px] text-[var(--color-fg-muted)] font-light leading-6">{user.handle}</span>
                        </div>

                        <div className="text-[14px] text-[var(--color-fg-default)] mb-4 leading-normal">
                            {user.bio}
                        </div>
                        
                        <button 
                            onClick={() => setIsUploadOpen(!isUploadOpen)}
                            className="w-full py-[5px] px-4 border border-[var(--color-btn-border)] bg-[var(--color-btn-bg)] rounded-[6px] text-[14px] font-medium text-[var(--color-gh-text)] hover:bg-[var(--color-border-muted)] transition-colors text-center mb-2 transition duration-200 ease-in-out shadow-sm select-none"
                        >
                            {isUploadOpen ? 'Cancel' : 'Edit profile'}
                        </button>
                        
                        {/* Hidden Scan Button (Stealth) - Maybe label it "Sync with upstream" or something? */}
                        <button 
                            onClick={() => {
                                // @ts-ignore
                                import('@inertiajs/react').then(({ router }) => { router.post('/books/scan'); });
                            }}
                            className="w-full py-[5px] px-4 border border-transparent rounded-[6px] text-[12px] font-normal text-[var(--color-fg-muted)] hover:text-[var(--color-accent-fg)] hover:underline mb-4 text-center"
                        >
                            Sync repositories
                        </button>

                        {/* Upload Form mimicking Profile Edit */}
                        {isUploadOpen && (
                            <div className="mb-6 p-3 border border-[var(--color-border-default)] rounded-[6px] bg-[var(--color-canvas-subtle)] text-[14px]">
                                <h3 className="font-semibold mb-2">Import New Book (EPUB)</h3>
                                <form onSubmit={submitUpload} className="flex flex-col gap-3">
                                    <div className="flex flex-col">
                                        <label className="text-xs font-semibold mb-1">File</label>
                                        <input 
                                            type="file" 
                                            accept=".epub"
                                            onChange={handleFileChange}
                                            className="w-full text-xs text-[var(--color-fg-muted)]
                                            file:mr-2 file:py-1 file:px-2
                                            file:rounded-[4px] file:border-0
                                            file:text-xs file:font-semibold
                                            file:bg-[var(--color-accent-fg)] file:text-white
                                            hover:file:bg-blue-600 cursor-pointer"
                                        />
                                        {errors.file && <div className="text-[var(--color-danger-fg)] text-xs mt-1">{errors.file}</div>}
                                    </div>
                                    
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full py-1.5 px-3 bg-[#2da44e] text-white rounded-[6px] font-medium hover:bg-[#2c974b] disabled:opacity-50 border border-[rgba(27,31,36,0.15)] shadow-sm"
                                    >
                                        {processing ? 'Saving...' : 'Save'}
                                    </button>
                                </form>
                            </div>
                        )}
                        
                        <div className="flex items-center gap-1 text-[14px] text-[var(--color-fg-muted)] mb-4">
                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-[var(--color-fg-muted)]"><path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path></svg>
                            <span className="font-semibold text-[var(--color-fg-default)] hover:text-[var(--color-accent-fg)] cursor-pointer">{user.followers}</span> followers
                            <span>·</span>
                            <span className="font-semibold text-[var(--color-fg-default)] hover:text-[var(--color-accent-fg)] cursor-pointer">{user.following}</span> following
                        </div>
                        
                        <div className="flex flex-col gap-2 text-[14px] text-[var(--color-fg-default)]">
                            <div className="flex items-center gap-2">
                                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-[var(--color-fg-muted)]"><path d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-3.5a.766.766 0 0 1-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 0 1-.75-.75V14h-1v1.25a.75.75 0 0 1-.75.75Zm-.25-1.75c0 .138.112.25.25.25H4v-1.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v1.25h2.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25ZM3.75 6h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 3.75A.75.75 0 0 1 3.75 3h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 3.75Zm4 3A.75.75 0 0 1 7.75 6h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 7 6.75ZM7.75 3h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 9.75A.75.75 0 0 1 3.75 9h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 9.75ZM7.75 9h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Z"></path></svg>
                                {user.company}
                            </div>
                            <div className="flex items-center gap-2">
                                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-[var(--color-fg-muted)]"><path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path></svg>
                                {user.location}
                            </div>
                            <div className="flex items-center gap-2">
                                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-[var(--color-fg-muted)]"><path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z"></path></svg>
                                <a href={`mailto:${user.email}`} className="hover:text-[var(--color-accent-fg)] hover:underline truncate">{user.email}</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-[var(--color-fg-muted)]"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a2.002 2.002 0 0 0 0 2.83Z"></path></svg>
                                <a href="#" className="hover:text-[var(--color-accent-fg)] hover:underline truncate">{user.website}</a>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        
                        {/* Tab Navigation (Sticky?) */}
                        <div className="border-b border-[var(--color-gh-border)] mb-4 overflow-x-auto sticky top-0 bg-[var(--color-gh-bg)] z-20">
                            <nav className="flex gap-6 text-[14px]">
                                <a href="#" className="flex items-center gap-2 py-3 px-1 border-b-2 border-transparent hover:border-[var(--color-border-muted)] text-[var(--color-fg-default)]">
                                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-[var(--color-fg-muted)]"><path d="M10.68 11.74a6 6 0 0 1-7.922-8.98 6 6 0 0 1 8.98 7.92l3.19 3.19a.75.75 0 0 1-1.06 1.06l-3.192-3.19Zm-4.23-10.4a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"></path></svg>
                                    Overview
                                </a>
                                <a href="#" className="flex items-center gap-2 py-3 px-1 border-b-2 border-[#fd8c73] font-semibold text-[var(--color-fg-default)]">
                                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-[var(--color-fg-default)]"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
                                    Repositories <span className="bg-[var(--color-neutral-muted)]/20 text-xs px-1.5 rounded-full ml-1">{books.length}</span>
                                </a>
                                <a href="#" className="flex items-center gap-2 py-3 px-1 border-b-2 border-transparent hover:border-[var(--color-border-muted)] text-[var(--color-fg-default)]">
                                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-[var(--color-fg-muted)]"><path d="M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25ZM3.5 6.25a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75Zm.75 2.25h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1 0-1.5Z"></path></svg>
                                    Projects
                                </a>
                                <a href="#" className="flex items-center gap-2 py-3 px-1 border-b-2 border-transparent hover:border-[var(--color-border-muted)] text-[var(--color-fg-default)]">
                                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-[var(--color-fg-muted)]"><path d="m8.878.392 5.25 3.045c.54.314.872.89.872 1.514v6.098a1.75 1.75 0 0 1-.872 1.514l-5.25 3.045a1.75 1.75 0 0 1-1.756 0l-5.25-3.045A1.75 1.75 0 0 1 1 11.049V4.951c0-.624.332-1.201.872-1.514L7.122.392a1.75 1.75 0 0 1 1.756 0ZM7.875 1.69l-4.63 2.685L8 7.133l4.755-2.758-4.63-2.685a.248.248 0 0 0-.25 0ZM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432Zm6.25 8.271 4.625-2.683a.25.25 0 0 0 .125-.216V5.677L8.75 8.432Z"></path></svg>
                                    Packages
                                </a>
                                <a href="#" className="flex items-center gap-2 py-3 px-1 border-b-2 border-transparent hover:border-[var(--color-border-muted)] text-[var(--color-fg-default)]">
                                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-[var(--color-fg-muted)]"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path></svg>
                                    Stars
                                </a>
                            </nav>
                        </div>

                        {/* Popular Repositories / Pinned */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-[16px] font-normal text-[var(--color-fg-default)]">Pinned</h2>
                                <span className="text-xs text-[var(--color-fg-muted)] hover:text-[var(--color-accent-fg)] cursor-pointer">Customize your pins</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {books.map((book) => (
                                    <div key={book.id} className="p-4 border border-[var(--color-border-default)] rounded-[6px] flex flex-col justify-between h-[108px] bg-[var(--color-canvas-default)] hover:bg-[var(--color-canvas-subtle)] transition-colors group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 font-semibold text-[var(--color-accent-fg)] hover:underline cursor-pointer truncate">
                                                 <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-[var(--color-fg-muted)]"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
                                                 <Link href={`/${book.id}`} className="truncate">{book.title}</Link>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="p-1 text-[var(--color-fg-muted)] cursor-grab">
                                                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-current"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path></svg>
                                                </div>
                                            </div>
                                            <span className="text-xs text-[var(--color-fg-muted)] border border-[var(--color-border-default)] rounded-2xl px-2 opacity-100 group-hover:opacity-0 transition-opacity absolute right-4">Public</span>
                                        </div>
                                        <p className="text-xs text-[var(--color-fg-muted)] mt-2 truncate line-clamp-2">{book.author}</p>
                                        
                                        <div className="flex items-center gap-4 text-xs text-[var(--color-fg-muted)] mt-auto">
                                            <div className="flex items-center gap-1">
                                                <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black/10"></span>
                                                <span>EPUB</span>
                                            </div>
                                            {book.total_chapters > 0 && <Link href={`/${book.id}`} className="hover:text-[var(--color-accent-fg)] cursor-pointer">{book.total_chapters} chapters</Link>}
                                        </div>
                                    </div>
                                ))}
                                
                                {/* Placeholder for Empty State if needed */}
                            </div>
                        </div>

                        {/* Contribution Graph */}
                        <div className="border border-[var(--color-border-default)] rounded-[6px] p-4 bg-[var(--color-canvas-default)]">
                             <div className="flex justify-between items-center mb-2">
                                 <span className="text-[16px] font-normal text-[var(--color-fg-default)]">1,234 contributions in the last year</span>
                                 <div className="flex items-center gap-2 text-xs text-[var(--color-fg-muted)]">
                                     <span>Less</span>
                                     <div className="flex gap-0.5">
                                         <span className="w-[10px] h-[10px] bg-[var(--color-gh-contribution-level-0)] rounded-[2px]"></span>
                                         <span className="w-[10px] h-[10px] bg-[var(--color-gh-contribution-level-1)] rounded-[2px]"></span>
                                         <span className="w-[10px] h-[10px] bg-[var(--color-gh-contribution-level-2)] rounded-[2px]"></span>
                                         <span className="w-[10px] h-[10px] bg-[var(--color-gh-contribution-level-3)] rounded-[2px]"></span>
                                         <span className="w-[10px] h-[10px] bg-[var(--color-gh-contribution-level-4)] rounded-[2px]"></span>
                                     </div>
                                     <span>More</span>
                                 </div>
                             </div>
                             {/* Fake Grid */}
                             <div className="flex gap-1 overflow-hidden h-[128px] items-end pb-4">
                                  {/* Just a visual representation for now */}
                                  {Array.from({ length: 53 }).map((_, i) => (
                                      <div key={i} className="flex flex-col gap-1 h-full justify-end">
                                          {Array.from({ length: 7 }).map((_, j) => (
                                              <div 
                                                key={j} 
                                                className={`w-[10px] h-[10px] rounded-[2px] ${Math.random() > 0.8 ? 'bg-[var(--color-gh-contribution-level-2)]' : 'bg-[var(--color-gh-contribution-level-0)]'}`}
                                              ></div>
                                          ))}
                                      </div>
                                  ))}
                             </div>
                             <div className="flex justify-between text-xs text-[var(--color-fg-muted)] mt-2 border-t border-[var(--color-border-muted)] pt-2 md:border-none md:pt-0">
                                 <span>Learn how we count contributions</span>
                                 <span>2026</span>
                             </div>
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
