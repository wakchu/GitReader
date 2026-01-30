<?php

use App\Http\Controllers\LibraryController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LibraryController::class, 'index'])->name('library.index');
Route::post('/books', [LibraryController::class, 'store'])->name('books.store');
