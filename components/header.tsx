'use client';

import Link from 'next/link';
import { DarkModeToggle } from './dark-mode-toggle';

export function Header() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex gap-8 items-center">
          <Link href="/" className="font-bold text-xl text-slate-900 dark:text-white">
            AI Resume Builder
          </Link>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            >
              Builder
            </Link>
            <Link
              href="/templates"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            >
              Templates
            </Link>
            <Link
              href="/my-resumes"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            >
              My Resumes
            </Link>
            <Link
              href="/settings"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            >
              Settings
            </Link>
          </div>
        </div>
        <DarkModeToggle />
      </nav>
    </header>
  );
}
