import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import DotField from '../DotField.jsx';

/* ------------------------------------------------------------------
   Hero — Figma 122:14877.

   Ranged left on the 1200px measure, 170px below the header. The
   lockup leads with the lit sentence and drops to the dim one below
   it, 82px PP Mori Regular at 115% with -3% tracking, then a 20px
   supporting paragraph on an 858px measure and the two CTAs.

   The backdrop is the agents section's dot grid, moved onto a canvas
   so it can answer the cursor: dots near the pointer brighten and
   grow, on a damped follow, the way mesh3d.gallery leads its hero.
   See DotField for that.

   Entrance timings still come from the motion references: staged,
   600–2000ms on cubic-bezier(.16,1,.3,1), with 150ms interaction
   states.
   ------------------------------------------------------------------ */

const REDUCED =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

export default function Hero() {
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

  return (
    <section
      className={`hero${lit ? ' is-lit' : ''}${reduced ? ' is-still' : ''}`}
      aria-labelledby="hero-title"
    >
      <div className="hero__field">
        <DotField />
        <span className="hero__core" aria-hidden="true" />
      </div>

      <div className="hero__content">
        <div className="hero__lockup">
          <h1
            id="hero-title"
            className="hero__title"
            aria-label="Measurable cyber outcomes. One national system."
          >
            {/* Each part is its own block line, so the three stacked
                copies the lit treatment needs wrap identically to the
                face at any width. */}
            <span className="hero__line hero__line--lit cf-lit" aria-hidden="true">
              <span className="cf-lit__bloom">Measurable cyber outcomes.</span>
              <span className="cf-lit__shade">Measurable cyber outcomes.</span>
              <span className="cf-lit__face">Measurable cyber outcomes.</span>
            </span>
            <span className="hero__line hero__line--dim" aria-hidden="true">
              One national system.
            </span>
          </h1>

          <p className="hero__sub">
            CyberFactory brings cyber expertise, products and AI agents into one secure
            national system, helping organisations move from buying tools to achieving
            measurable outcomes.
          </p>
        </div>

        <div className="hero__ctas">
          <Link to="/catalog" className="cf-cta cf-cta--solid hero__cta">
            <Rocket size={20} aria-hidden="true" />
            Launch
          </Link>
          <Link to="/catalog" className="cf-cta cf-cta--ghost hero__cta">
            Explore the repository
          </Link>
        </div>
      </div>
    </section>
  );
}
