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
