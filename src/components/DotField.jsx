import { useEffect, useRef } from 'react';

/* ------------------------------------------------------------------
   Pointer-reactive dot field.

   Same grid as the agents section (20 x 17), drawn on a canvas rather
   than as a CSS tile, because each dot has to answer the cursor on
   its own. Dots inside the pointer's radius brighten and grow on a
   smoothstep falloff; the pointer itself is damped, so the light
   trails the cursor instead of snapping to it.

   The pointer is tracked on the window, not on the canvas's own box:
   the section's content sits above the field as a sibling, so events
   over the headline and buttons never reach it. Coordinates are
   converted to host-local and the influence is released once the
   pointer leaves the host's rect.

   The whole static field is one prebuilt Path2D filled in a single
   call, so only the ~500 dots near the cursor are ever drawn
   individually. The loop stops when the section is off screen and
   never starts under prefers-reduced-motion.
   ------------------------------------------------------------------ */

const GAP_X = 20;
const GAP_Y = 17;

/* Resting values are set against mesh3d's idle field, measured at a
   core alpha of 36/255 on roughly 1px dots spaced ~23px. Matching the
   alpha alone read far brighter here, because a 0.9px radius covers
   ~3x the area and this grid is denser — so the dot is smaller and
   fainter instead. */
const R_BASE = 0.65; // css px
const A_BASE = 0.07;

const R_LIT = 2.1;
const A_LIT = 0.92;

const RADIUS = 190; // influence radius, css px
const BASE = `rgba(234, 204, 160, ${A_BASE})`;
const EASE = 0.075; // pointer damping

export default function DotField({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const host = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    if (!ctx || !host) return;

    const reduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    /* With no hover there is nothing for the loop to react to, so the
       field is drawn once and left alone rather than holding a frame
       loop open on a phone. */
    const interactive = !reduced && !window.matchMedia('(hover: none)').matches;

    let dpr = 1;
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let offX = 0;
    let offY = 0;
    let basePath = null;

    /* pointer state: target, damped current, and how much influence
       it currently has (fades out when the pointer leaves) */
    let tx = -9999;
    let ty = -9999;
    let cx = -9999;
    let cy = -9999;
    let tAmt = 0;
    let amt = 0;

    let raf = 0;
    let running = false;
    let t0 = 0;

    function layout() {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      cols = Math.ceil(w / GAP_X) + 1;
      rows = Math.ceil(h / GAP_Y) + 1;
      // centre the grid so it does not crop unevenly on resize
      offX = (w - (cols - 1) * GAP_X) / 2;
      offY = (h - (rows - 1) * GAP_Y) / 2;

      basePath = new Path2D();
      for (let iy = 0; iy < rows; iy++) {
        const y = offY + iy * GAP_Y;
        for (let ix = 0; ix < cols; ix++) {
          const x = offX + ix * GAP_X;
          basePath.moveTo(x + R_BASE, y);
          basePath.arc(x, y, R_BASE, 0, Math.PI * 2);
        }
      }
      draw(performance.now());
    }

    function draw(now) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // the whole field in one fill, breathing very slowly
      const breath = reduced ? 1 : 0.9 + 0.1 * Math.sin((now - t0) / 2600);
      ctx.globalAlpha = breath;
      ctx.fillStyle = BASE;
      ctx.fill(basePath);
      ctx.globalAlpha = 1;

      if (amt <= 0.001) return;

      // only the dots the pointer can actually reach
      const ix0 = Math.max(0, Math.floor((cx - RADIUS - offX) / GAP_X));
      const ix1 = Math.min(cols - 1, Math.ceil((cx + RADIUS - offX) / GAP_X));
      const iy0 = Math.max(0, Math.floor((cy - RADIUS - offY) / GAP_Y));
      const iy1 = Math.min(rows - 1, Math.ceil((cy + RADIUS - offY) / GAP_Y));
      const r2 = RADIUS * RADIUS;

      for (let iy = iy0; iy <= iy1; iy++) {
        const y = offY + iy * GAP_Y;
        const dy = y - cy;
        for (let ix = ix0; ix <= ix1; ix++) {
          const x = offX + ix * GAP_X;
          const dx = x - cx;
          const d2 = dx * dx + dy * dy;
          if (d2 > r2) continue;

          let f = 1 - Math.sqrt(d2) / RADIUS;
          f = f * f * (3 - 2 * f); // smoothstep
          f *= amt;
          if (f < 0.02) continue;

          /* both ramps start from the resting values, so a lit dot
             fades into the field instead of leaving a visible edge at
             the influence boundary */
          ctx.beginPath();
          ctx.arc(x, y, R_BASE + (R_LIT - R_BASE) * f, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 240, 214, ${(A_BASE + (A_LIT - A_BASE) * f).toFixed(3)})`;
          ctx.fill();
        }
      }
    }

    function frame(now) {
      cx += (tx - cx) * EASE;
      cy += (ty - cy) * EASE;
      amt += (tAmt - amt) * EASE;
      draw(now);
      raf = running ? requestAnimationFrame(frame) : 0;
    }

    function start() {
      if (running || !interactive) return;
      running = true;
      t0 = performance.now();
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      const inside =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) {
        tAmt = 0;
        return;
      }
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (cx < -1000) {
        cx = tx;
        cy = ty;
      }
      tAmt = 1;
      // a pointer inside the host is reason enough to run, whether or
      // not the observer has reported visibility yet
      start();
    };
    const onLeave = () => {
      tAmt = 0;
    };

    layout();

    const ro = new ResizeObserver(layout);
    ro.observe(host);

    // static devices need no loop at all
    let io;
    if (!interactive) {
      // nothing further to wire up; layout() has already painted it
    } else if (typeof IntersectionObserver !== 'undefined') {
      /* Start from a synchronous rect check rather than waiting on the
         observer's opening callback — that arrives on a frame boundary,
         and the field must not sit frozen until then. The observer only
         handles visibility changes from here on. */
      const box = host.getBoundingClientRect();
      if (box.bottom > 0 && box.top < (window.innerHeight || 0)) start();

      io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { threshold: 0 },
      );
      io.observe(host);
    } else {
      start();
    }

    if (interactive) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerleave', onLeave);
    }

    return () => {
      stop();
      ro.disconnect();
      io?.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={`cf-dots ${className}`.trim()} aria-hidden="true" />;
}
