
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

export default function GitHubHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="flex h-[62px] items-center gap-4 bg-[#24292f] px-4 py-3 text-white md:px-6">
            {/* Left Section: Menu & Logo */}
            <div className="flex items-center gap-4">
                <button 
                    className="rounded-md border border-gray-600 p-1 text-gray-300 md:hidden hover:border-gray-400"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor" className="octicon octicon-three-bars">
                        <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
                    </svg>
                </button>

                <Link href="/" className="rounded-full hover:bg-white/20 transition-colors">
                    <svg aria-hidden="true" height="32" viewBox="0 0 16 16" version="1.1" width="32" fill="currentColor" className="octicon octicon-mark-github">
                        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                    </svg>
                </Link>

                {/* Breadcrumbs - Hidden on small mobile, visible on md */}
                <div className="hidden items-center gap-1 text-sm font-semibold md:flex">
                     <Link href="/" className="hover:underline hover:bg-white/10 px-2 py-1 rounded-md">wakchu</Link>
                </div>
            </div>

            {/* Center Section: Search */}
            <div className="flex flex-1 md:px-4">
                <div className="relative w-full max-w-[300px] transition-all focus-within:max-w-[500px]">
                    <div className="flex w-full items-center rounded-md border border-gray-500 bg-[#24292f] px-2 py-1 text-sm text-gray-300 focus-within:bg-white focus-within:text-gray-900 focus-within:border-white h-[32px]">
                        <button className="mr-2 text-gray-500 hover:text-gray-300 focus-within:text-gray-500">
                             <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor" className="octicon octicon-search">
                                <path d="M10.68 11.74a6 6 0 0 1-7.922-8.98 6 6 0 0 1 8.98 7.92l3.19 3.19a.75.75 0 0 1-1.06 1.06l-3.192-3.19Zm-4.23-10.4a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"></path>
                            </svg>
                        </button>
                        <input 
                            type="text" 
                            placeholder="Type / to search" 
                            className="w-full bg-transparent border-none p-0 text-inherit focus:ring-0 placeholder-gray-500 text-sm leading-tight"
                        />
                         <kbd className="hidden md:inline-block min-w-[20px] rounded border border-gray-600 px-1 text-center text-[10px] leading-tight text-gray-500">
                           /
                        </kbd>
                    </div>
                </div>
            </div>

            {/* Right Section: Actions & Profile */}
            <div className="flex items-center gap-3">
                 {/* Divider */}
                 <div className="hidden h-4 w-[1px] bg-gray-600 md:block"></div>

                {/* Create New */}
                <div className="relative hidden md:block">
                     <button className="flex items-center gap-1 rounded-md border border-gray-600 px-2 py-1 text-sm font-medium hover:bg-white/10">
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor" className="octicon octicon-plus">
                            <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path>
                        </svg>
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor" className="octicon octicon-triangle-down ml-1">
                            <path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"></path>
                        </svg>
                     </button>
                </div>

                {/* Issues */}
                <Link href="#" className="rounded-md p-1 hover:bg-white/10" aria-label="Issues">
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor" className="octicon octicon-issue-opened">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
                    </svg>
                </Link>

                {/* Pull Requests */}
                <Link href="#" className="rounded-md p-1 hover:bg-white/10" aria-label="Pull Requests">
                     <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor" className="octicon octicon-git-pull-request">
                        <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path>
                    </svg>
                </Link>

                {/* Inbox */}
                <Link href="#" className="rounded-md p-1 hover:bg-white/10" aria-label="Notifications">
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor" className="octicon octicon-inbox">
                         <path d="M2.8 2.06A1.75 1.75 0 0 1 4.41 1h7.18c.7 0 1.333.417 1.61 1.06l2.74 6.395c.04.093.06.194.06.295v4.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25v-4.5c0-.101.02-.202.06-.295Zm1.61.44a.25.25 0 0 0-.23.152L1.887 8H4.75a.75.75 0 0 1 .6.3L6.625 10h2.75l1.275-1.7a.75.75 0 0 1 .6-.3h2.863L11.82 2.652a.25.25 0 0 0-.23-.152Zm10.09 7h-2.875l-1.275 1.7a.75.75 0 0 1-.6.3h-3.5a.75.75 0 0 1-.6-.3L4.375 9.5H1.5v3.75c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25Z"></path>
                    </svg>
                </Link>

                {/* User Avatar */}
                <div className="ml-1">
                    <button className="flex items-center rounded-full border border-gray-600 hover:opacity-80">
                         <img 
                            src="https://github.com/identicons/jasonlong.png" 
                            alt="User" 
                            className="h-[20px] w-[20px] rounded-full"
                         />
                         <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor" className="octicon octicon-triangle-down ml-1 mr-1 text-gray-400">
                            <path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
