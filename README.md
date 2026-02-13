# GitReader

**The Stealth E-Reader for the Workplace.**

GitReader mimics the GitHub interface pixel-perfectly, allowing you to read EPUB books while appearing to review code.

## Features

- **Stealth Mode**: UI matches GitHub's design (Inter font, colors, layout).
- **EPUB Support**: Upload and read EPUB files.
- **Repository Metaphor**:
    - **Library** -> User Profile
    - **Book** -> Repository
    - **Chapter** -> File
    - **Reading History** -> Contribution Graph

## Tech Stack

- **Framework**: Laravel 12.x
- **Frontend**: React 19 (via Inertia.js 2.0)
- **Styling**: Tailwind CSS 4.0
- **Database**: SQLite / MySQL

## Installation

1. **Install Dependencies**

    ```bash
    composer install
    npm install
    ```

2. **Environment Setup**
    ```bash
    cp .env.example .env
    php artisan key:generate
    touch database/database.sqlite
    php artisan migrate
    ```

## Usage

Start the development server:

```bash
npm run dev
```

In a separate terminal, run the Laravel server:

```bash
php artisan serve
```

Visit `http://localhost:8000` to start reading.
