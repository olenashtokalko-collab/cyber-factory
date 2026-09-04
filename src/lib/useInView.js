import { useEffect, useRef, useState } from 'react';

/* Reports whether a node is on screen. Used by the demo animations so
   they only run while visible. */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    /* Synchronous first check. The observer's opening callback is
       delivered on a frame boundary, which a throttled or background
       tab may not reach for a while — anything already on screen
       should not be left hidden waiting for it. */
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    if (r.bottom > 0 && r.top < vh * 0.85) setInView(true);

    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.35,
      ...options,
    });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
