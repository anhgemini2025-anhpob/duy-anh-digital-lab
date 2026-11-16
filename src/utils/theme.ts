// Theme utility for DUY ANH LAB landing page
// Supports 'light' (default) and 'dark' modes with persistent localStorage

export type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'duyanh_lab_theme';

export function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  
  const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }
  // Default to 'light' as requested for bright, clear, easy-to-read landing page
  return 'light';
}

export function applyTheme(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  if (theme === 'light') {
    root.classList.remove('dark');
    root.classList.add('light');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {
    console.warn('Failed to save theme in localStorage', e);
  }

  // Dispatch custom event so all listeners can update
  window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }));
}

export function toggleTheme(): ThemeMode {
  const current = getInitialTheme();
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
  return next;
}
