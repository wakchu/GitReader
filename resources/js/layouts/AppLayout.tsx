
import GitHubHeader from '@/components/GitHubHeader';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';

interface Props {
    title?: string;
    children: React.ReactNode;
}

export default function AppLayout({ title, children }: Props) {
    return (
        <div className="min-h-screen bg-gh-bg text-gh-text font-sans antialiased text-sm">
            <Head title={title} />
            
            <GitHubHeader />
            
            <main className="min-h-[calc(100vh-64px)] w-full">
                {/* Flash Messages */}
                {/* @ts-ignore */}
                {usePage().props.flash?.success && (
                    <div className="bg-[var(--color-accent-fg)] text-white px-4 py-3 mb-4 mx-auto max-w-[1280px] rounded-md mt-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {/* @ts-ignore */}
                        {usePage().props.flash.success}
                    </div>
                )}
                {/* @ts-ignore */}
                {usePage().props.flash?.error && (
                    <div className="bg-[var(--color-danger-fg)] text-white px-4 py-3 mb-4 mx-auto max-w-[1280px] rounded-md mt-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {/* @ts-ignore */}
                        {usePage().props.flash.error}
                    </div>
                )}

                {children}
            </main>
            
            {/* Footer */}
            <footer className="mt-12 py-10 px-4 md:px-10 border-t border-gh-border text-xs text-gray-500">
                <div className="flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto gap-4">
                     <div className="flex items-center gap-2">
                        <svg aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true" className="fill-gray-400 opacity-50">
                            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                        </svg>
                        <span>© 2025 GitReader, Inc.</span>
                     </div>
                     <div className="flex flex-wrap justify-center gap-4 text-blue-500">
                         <a href="#" className="hover:underline">Terms</a>
                         <a href="#" className="hover:underline">Privacy</a>
                         <a href="#" className="hover:underline">Security</a>
                         <a href="#" className="hover:underline">Status</a>
                         <a href="#" className="hover:underline">Docs</a>
                         <a href="#" className="hover:underline">Contact</a>
                     </div>
                </div>
            </footer>
        </div>
    );
}
