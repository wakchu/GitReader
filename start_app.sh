#!/bin/bash

# GitReader Local Startup Script

# 0. Ensure we are in the script's directory
cd "$(dirname "$0")" || {
    echo "Error: Could not change directory to $(dirname "$0")"
    read -p "Press Enter to exit..."
    exit 1
}

# Trap errors to keep window open
trap 'echo "An error occurred. Press Enter to exit..."; read' ERR

echo "📚 Starting GitReader in $(pwd)..."

# 1. Kill any existing server on port 8000 (cleanup previous runs)
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "Port 8000 occupied. Killing existing server..."
    fuser -k 8000/tcp
fi

# 2. Check Dependencies (fast check)
if [ ! -d "vendor" ]; then
    echo "Installing Composer dependencies..."
    composer install --quiet
fi
if [ ! -d "node_modules" ]; then
    echo "Installing NPM dependencies..."
    npm install --silent
fi

# 3. Setup Env & Database
if [ ! -f ".env" ]; then
    cp .env.example .env
    php artisan key:generate
    sed -i 's/DB_CONNECTION=sqlite/DB_CONNECTION=sqlite/' .env
    touch database/database.sqlite
fi
touch database/database.sqlite
php artisan migrate --force --seed > /dev/null

if [ ! -d "public/storage" ]; then
    php artisan storage:link > /dev/null
fi

# 4. Build Frontend
echo "Building frontend assets..."
npm run build

# 5. Open Browser (backgrounded) & Start Server (foreground)
echo "🚀 GitReader is ready!"
echo "Opening http://127.0.0.1:8000..."

# Detect OS and open browser
if which xdg-open > /dev/null; then
    (sleep 2 && xdg-open "http://127.0.0.1:8000") &
elif which open > /dev/null; then
    (sleep 2 && open "http://127.0.0.1:8000") &
fi

echo "Server logs will appear below. Close this window to stop GitReader."
echo "------------------------------------------------------------------"

# Run server in foreground to keep window open
php artisan serve --port=8000
