import { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useInView } from '../../lib/useInView.js';
import SectionHeadline from '../SectionHeadline.jsx';

/* ------------------------------------------------------------------
   Benefits — Figma 122:19892.

   Four points on a 2x2 grid of hairline cards, 24px apart. Each card
   opens with a 32px accent mark over the ExtraLight lead and the grey
   supporting line.

   The comp uses the same shield mark on all four cards; that is
   carried through here rather than substituted.
   ------------------------------------------------------------------ */

const BENEFITS = [
  {
    key: 'faster',
    title: 'Faster',
    body: 'Accelerates response times and automates security triage to intercept threats before impact occurs.',
  },
  {
    key: 'wider',
    title: 'Wider',
    body: 'Expands unified protective posture seamlessly across government entities and key national infrastructure.',
  },
  {
    key: 'smarter',
    title: 'Smarter',
    body: 'Leverages continuous learning loops to refine autonomous policy review and intelligence analysis.',
  },
  {
    key: 'sovereign',
    title: 'Sovereign',
    body: 'Ensures total technological independence and local ownership of cybersecurity capabilities.',
  },
];

export default function Benefits() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (inView) setShown(true);
  }, [inView]);

  return (
    <section
      className={`bn${shown ? ' is-in' : ''}`}
      id="benefits"
      aria-labelledby="bn-title"
      ref={ref}
    >
      <div className="cf-shell">
        <SectionHeadline
          id="bn-title"
          lead="Why it matters."
          rest="Build once. Protect many. Improve always."
          sub={['Four things change when every agent your team uses runs', 'in one place.']}
        />
      </div>

      <div className="cf-shell">
        <ol className="bn__grid">
          {BENEFITS.map((b, i) => (
            <li key={b.key} className="bn__item cf-tile" style={{ '--i': i }}>
              <span className="bn__icon" aria-hidden="true">
                <ShieldCheck size={32} strokeWidth={1.6} />
              </span>
              <h3 className="cf-item-title">{b.title}</h3>
              <p className="cf-item-body">{b.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
