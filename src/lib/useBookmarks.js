import { useCallback, useEffect, useState } from 'react';

const KEY = 'cf-bookmarks';

function readAll() {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) || '[]'));
  } catch {
    return new Set();
  }
}

function writeAll(set) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...set]));
  } catch {
    /* non-fatal: bookmarks simply do not persist */
  }
}

const listeners = new Set();
let cache = null;

function current() {
  if (!cache) cache = readAll();
  return cache;
}

export function useBookmarks(slug) {
  const [, force] = useState(0);

  useEffect(() => {
    const fn = () => force((n) => n + 1);
    listeners.add(fn);
    return () => listeners.delete(fn);
  }, []);

  const toggle = useCallback(() => {
    const set = current();
    if (set.has(slug)) set.delete(slug);
    else set.add(slug);
    writeAll(set);
    listeners.forEach((fn) => fn());
  }, [slug]);

  return [current().has(slug), toggle];
}

export function bookmarkedSlugs() {
  return current();
}
