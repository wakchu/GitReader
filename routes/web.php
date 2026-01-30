<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\LibraryController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LibraryController::class, 'index'])->name('library.index');
Route::post('/books', [LibraryController::class, 'store'])->name('books.store');

// Repository View (Introduction / File List)
Route::get('/{book}', [BookController::class, 'show'])->name('books.show');

// Blob View (Reading a specific chapter)
Route::get('/{book}/blob/{chapter}', [ChapterController::class, 'show'])->name('chapters.show');
