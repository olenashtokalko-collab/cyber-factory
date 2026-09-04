import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------
   Hero.

   Visual language stays with the approved Figma frame (94:19741):
   #0c0c0c ground, PP Mori, the "Cyber" lit / "Factory" in shadow
   lockup, the 2px-corner gold CTAs, the right-edge scroll mark and
   the same copy.

   The lamp is gone. In its place is the ambient light field the
   reference sites lead with — Cosmoq's drifting aurora columns over a
   wide horizon bloom, held to Neon's restraint: nothing loops fast,
   nothing competes with the headline. Built from gradients rather
   than the ~MB background video both sites ship, so it stays sharp at
   any size and costs nothing to load.

   Timings are the ones measured on those sites: a staged entrance of
   600–2000ms on cubic-bezier(.16,1,.3,1), ambient loops in the
   26–60s range, and 150ms interaction states.
   ------------------------------------------------------------------ */

/* Each column: x position, width, height, brightness, and its own
   drift period so the field never visibly repeats. */
const BEAMS = [
  { x: 8, w: 3.2, h: 44, o: 0.42, dur: 41, delay: 0 },
  { x: 14, w: 6.5, h: 58, o: 0.72, dur: 33, delay: -8 },
  { x: 19, w: 2.4, h: 38, o: 0.34, dur: 47, delay: -19 },
  { x: 26, w: 4.8, h: 66, o: 0.56, dur: 29, delay: -4 },
  { x: 33, w: 7.5, h: 50, o: 0.8, dur: 37, delay: -13 },
  { x: 39, w: 2.8, h: 40, o: 0.3, dur: 44, delay: -25 },
  { x: 47, w: 5.5, h: 70, o: 0.62, dur: 31, delay: -11 },
  { x: 55, w: 3.4, h: 46, o: 0.44, dur: 39, delay: -30 },
  { x: 62, w: 8, h: 60, o: 0.78, dur: 35, delay: -6 },
  { x: 70, w: 2.6, h: 42, o: 0.32, dur: 43, delay: -17 },
  { x: 77, w: 6, h: 54, o: 0.54, dur: 27, delay: -22 },
  { x: 86, w: 3.8, h: 44, o: 0.38, dur: 45, delay: -2 },
  { x: 93, w: 5, h: 36, o: 0.24, dur: 32, delay: -14 },
];

const REDUCED =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

/* Damped pointer parallax, written to custom properties so the work
   stays off the main thread. Deliberately small — the field should
   answer the cursor, not follow it. */
function useParallax(ref, enabled) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      el.style.setProperty('--px', cx.toFixed(4));
      el.style.setProperty('--py', cy.toFixed(4));
      raf =
        Math.abs(tx - cx) > 0.0005 || Math.abs(ty - cy) > 0.0005
          ? requestAnimationFrame(tick)
          : 0;
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [ref, enabled]);
}

export default function Hero() {
  const sectionRef = useRef(null);
  const [lit, setLit] = useState(false);
  const [reduced, setReduced] = useState(() => REDUCED?.matches ?? false);

  useEffect(() => {
    if (!REDUCED) return;
    const on = () => setReduced(REDUCED.matches);
    REDUCED.addEventListener('change', on);
    return () => REDUCED.removeEventListener('change', on);
  }, []);

  /* Hold the entrance until the web fonts have settled, so the
     wordmark does not reflow part-way through its rise. */
  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (!cancelled) setTimeout(() => setLit(true), 0);
    };
    if (document.fonts?.ready) {
      const t = setTimeout(start, 600);
      document.fonts.ready.then(() => {
        clearTimeout(t);
        start();
      });
      return () => {
        cancelled = true;
        clearTimeout(t);
      };
    }
    start();
    return () => {
      cancelled = true;
    };
  }, []);

  useParallax(sectionRef, lit && !reduced);

  return (
    <section
      ref={sectionRef}
      className={`hero${lit ? ' is-lit' : ''}${reduced ? ' is-still' : ''}`}
      aria-labelledby="hero-title"
    >
      <div className="hero__field" aria-hidden="true">
        <span className="hero__core" />
        <span className="hero__horizon" />
        <div className="hero__beams">
          {BEAMS.map((b, i) => (
            <span
              key={i}
              className="hero__beam"
              style={{
                '--x': `${b.x}%`,
                '--w': `${b.w}vw`,
                '--h': `${b.h}%`,
                '--o': b.o,
                '--dur': `${b.dur}s`,
                '--delay': `${b.delay}s`,
                '--in': `${240 + i * 110}ms`,
              }}
            />
          ))}
        </div>
        <span className="hero__veil" />
        <span className="hero__grain" />
      </div>

      <div className="hero__mark" aria-hidden="true">
        <img src="/hero/mark-lines.svg" width="32" height="36" alt="" />
      </div>

      <div className="hero__content">
        <div className="hero__lockup">
          <h1 id="hero-title" className="hero__title" aria-label="Cyber Factory">
            <span className="hero__word hero__word--lit" aria-hidden="true">
              <span className="hero__bloom">Cyber</span>
              <span className="hero__shade">Cyber</span>
              <span className="hero__face">Cyber</span>
            </span>
            <span className="hero__word hero__word--dim" aria-hidden="true">
              Factory
            </span>
          </h1>

          {/* two spans rather than a <br>: the frame's line break is kept
              on wide screens and the copy re-wraps naturally on narrow ones */}
          <p className="hero__sub">
            <span>Continuous external threat intelligence</span>{' '}
            <span>across the open, deep, and dark web.</span>
          </p>
        </div>

        <div className="hero__ctas">
          <Link to="/catalog" className="hero__cta hero__cta--solid">
            <img src="/hero/icon-play.svg" width="16" height="16" alt="" aria-hidden="true" />
            Launch
          </Link>
          <Link to="/catalog" className="hero__cta hero__cta--outline">
            <img
              src="/hero/icon-globe-gold.svg"
              width="16"
              height="16"
              alt=""
              aria-hidden="true"
            />
            Explore the repository
          </Link>
        </div>
      </div>
    </section>
  );
}
