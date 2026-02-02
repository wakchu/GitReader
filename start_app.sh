#!/bin/bash

# GitReader Local Startup Script

echo "📚 Starting GitReader..."

# 1. Ensure dependencies (basic check)
if [ ! -d "vendor" ]; then
    echo "Installing Composer dependencies..."
    composer install
fi

if [ ! -d "node_modules" ]; then
    echo "Installing NPM dependencies..."
    npm install
fi

# 2. Setup Env if missing
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    php artisan key:generate
    sed -i 's/DB_CONNECTION=sqlite/DB_CONNECTION=sqlite/' .env
    touch database/database.sqlite
fi

# 3. Ensure Database is ready
echo "Migrating Database..."
touch database/database.sqlite # Ensure file exists
php artisan migrate --force --seed

# 4. Link Storage
if [ ! -d "public/storage" ]; then
    php artisan storage:link
fi

# 5. Start Servers
echo "🚀 GitReader is running!"
echo "Open http://127.0.0.1:8000 in your browser."
echo "Press Ctrl+C to stop."

# Run Vite and Laravel Serve in parallel
(trap 'kill 0' SIGINT; npm run build && php artisan serve --port=8000 & wait)
