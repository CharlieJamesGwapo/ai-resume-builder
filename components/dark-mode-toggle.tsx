'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';

export function DarkModeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(storage.getSettings().theme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const newTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(newTheme);
    storage.setTheme(newTheme);

    const applyTheme = () => {
      const isDark =
        newTheme === 'dark' ||
        (newTheme === 'system' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);

      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme();
  };

  if (!mounted) {
    return null;
  }

  const icons = {
    light: '☀️',
    dark: '🌙',
    system: '💻',
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition text-lg"
      title={`Theme: ${theme}`}
    >
      {icons[theme]}
    </button>
  );
}
