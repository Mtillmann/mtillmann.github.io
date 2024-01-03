<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CustomHMRHotFile
{
    /**
     * Allow for different HMR URLs, regardless of what vite-plugin generates.
     *
     * @see https://mtillmann.blog/posts/using-laravel-9-breeze-with-ddev-and-vite.html
     * @see https://github.com/laravel/vite-plugin/issues/156
     *
     * Install:
     * - copy this file to app/Http/Middleware/CustomHMRHotFile.php
     * - add `\App\Http\Middleware\CustomHMRHotFile::class` to app/Http/Kernel.php: Kernel::$middleware[]
     *
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse) $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (is_file(public_path('hot'))) {
            $originalContent = file_get_contents(public_path('hot'));
            $customContent = str_replace('http://', 'https://', $originalContent);
            if ($originalContent !== $customContent) {
                file_put_contents(public_path('hot'), $customContent);
            }
        }

        return $next($request);
    }
}