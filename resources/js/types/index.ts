export type * from './auth';

import type { Auth } from './auth';

export type SharedData = {
    name: string;
    auth: Auth;
    [key: string]: unknown;
};

export interface Book {
    id: number;
    title: string;
    author: string;
    cover_image: string | null;
    file_path: string;
    total_chapters: number;
    created_at: string;
    updated_at: string;
}

export interface Chapter {
    id: number;
    book_id: number;
    title: string;
    content: string;
    order_index: number;
    created_at: string;
    updated_at: string;
}
export interface ReadingProgress {
    id: number;
    user_id: number;
    book_id: number;
    current_chapter_id: number;
    scroll_position: number;
    last_read_at: string;
    created_at: string;
    updated_at: string;
}
