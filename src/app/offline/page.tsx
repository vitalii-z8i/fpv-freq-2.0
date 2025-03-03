'use client';

import React from 'react';
import Link from 'next/link';

export default function Offline() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-16 h-16 mb-6 text-zinc-600 dark:text-zinc-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>

      <h1 className="text-2xl font-bold mb-4">Ви не підключені до мережі</h1>
      <p className="mb-6 text-zinc-600 dark:text-zinc-400 max-w-md">
        Схоже, що у вас відсутнє підключення до інтернету. Деякі функції можуть бути недоступні.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Перейти на головну
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
        >
          Спробувати знову
        </button>
      </div>
    </div>
  );
}
