import { useCallback, useEffect, useState } from 'react';

const KEY = 'cf-theme';

function read() {
  try {
    return localStorage.getItem(KEY) || 'dark';
  } catch {
    return 'dark';
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState(read);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* storage can be unavailable — the attribute above is enough */
    }
  }, [theme]);

  const setTheme = useCallback((next) => setThemeState(next), []);
  return [theme, setTheme];
}
