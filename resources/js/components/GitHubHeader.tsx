import { Link } from '@inertiajs/react';

export default function GitHubHeader() {
    return (
        <header className="sticky top-0 z-50 flex items-center gap-4 bg-gh-global-header-bg px-4 py-4 text-sm text-white md:px-6">
            {/* Logo */}
            <div className="flex items-center gap-4">
                <button className="text-gray-300 md:hidden">
                    <svg height="24" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true" className="fill-current">
                        <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
                    </svg>
                </button>

                <Link href="/" className="transition-opacity hover:opacity-70">
                    <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" className="fill-white">
                        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                    </svg>
                </Link>
            </div>

            {/* Search */}
            <div className="relative ml-2 hidden w-full max-w-[272px] items-center md:flex">
                <div className="flex w-full cursor-text items-center rounded-md border border-gray-600 bg-transparent px-2 py-0.5 text-sm text-gray-300 transition-colors focus-within:border-white focus-within:bg-white focus-within:text-black">
                    <span className="mr-2 text-gray-500">
                        <svg
                            aria-hidden="true"
                            height="16"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="16"
                            data-view-component="true"
                            className="fill-current"
                        >
                            <path d="M10.68 11.74a6 6 0 0 1-7.922-8.98 6 6 0 0 1 8.98 7.92l3.19 3.19a.75.75 0 0 1-1.06 1.06l-3.192-3.19Zm-4.23-10.4a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"></path>
                        </svg>
                    </span>
                    <span className="flex-1 text-xs">
                        Type{' '}
                        <kbd className="inline-block min-w-[20px] rounded border border-gray-600 px-1 text-center text-[10px] leading-tight">/</kbd>{' '}
                        to search
                    </span>
                </div>
            </div>

            {/* Nav Links (Desktop) */}
            <nav className="hidden gap-4 text-sm font-semibold text-white/90 md:flex">
                <Link href="/" className="transition-colors hover:text-gray-300">
                    Dashboard
                </Link>
                <span className="text-gray-500 cursor-not-allowed" title="Not available in local mode">Pull Requests</span>
                <span className="text-gray-500 cursor-not-allowed" title="Not available in local mode">Issues</span>
                <span className="text-gray-500 cursor-not-allowed" title="Not available in local mode">Codespaces</span>
                <span className="text-gray-500 cursor-not-allowed" title="Not available in local mode">Marketplace</span>
                <span className="text-gray-500 cursor-not-allowed" title="Not available in local mode">Explore</span>
            </nav>

            <div className="ml-auto flex items-center gap-3">
                {/* Static Local User Avatar */}
                <div className="flex items-center gap-2">
                     <span className="text-xs font-semibold hidden md:block">GitReader User</span>
                     <img
                        src="https://github.com/identicons/jasonlong.png"
                        alt="Avatar"
                        className="h-5 w-5 cursor-pointer rounded-full border border-gray-600 hover:opacity-80"
                        title="Local User"
                     />
                </div>
            </div>
        </header>
    );
}
