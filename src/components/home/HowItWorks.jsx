import { useEffect, useState } from 'react';
import { useInView } from '../../lib/useInView.js';
import SectionHeadline from '../SectionHeadline.jsx';

/* ------------------------------------------------------------------
   How it works — Figma 122:19866.

   Discover → Launch → Get results, on three columns of 310 / 500 /
   310 with the middle copy centred in its wider bay. Above them the
   hairline path: a 1px rail between three ringed markers, at the
   positions the comp places them.

   The motion idea stays with Neon's branching timeline — a bright
   core travelling the rail and leaving the passed section lit, with a
   one-second hold at Launch before it runs on to Get results.
   ------------------------------------------------------------------ */

const STEPS = [
  {
    key: 'discover',
    title: 'Discover',
    body: 'Explore trusted cyber capabilities and agents, or find the right solution for your challenge.',
  },
  {
    key: 'launch',
    title: 'Launch',
    body: 'Select a capability, configure it for your organisation and launch it securely within the CyberFactory ecosystem.',
  },
  {
    key: 'results',
    title: 'Get results',
    body: 'See the outcome, track performance and turn what works into a capability that can be scaled.',
  },
];

export default function HowItWorks() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [ran, setRan] = useState(false);

  /* latch it: the run is a one-shot, not something that replays every
     time the section scrolls back into view */
  useEffect(() => {
    if (inView) setRan(true);
  }, [inView]);

  return (
    <section
      className={`hiw${ran ? ' is-in' : ''}`}
      id="how-it-works"
      aria-labelledby="hiw-title"
      ref={ref}
    >
      <div className="cf-shell">
        <SectionHeadline
          id="hiw-title"
          lead="How it works."
          rest={['Discover,', 'launch, get results.']}
          sub="From a real cyber need to a measurable outcome."
        />
      </div>

      <div className="cf-shell hiw__track">
        <div className="hiw__diagram" aria-hidden="true">
          {/* The path runs from marker 1 to marker 3 and stops there —
              there is nothing after "Get results", so the rail does not
              suggest one. Everything below is measured against this
              span, so the reveal is a plain 0 to 100%. */}
          <span className="hiw__span">
            <span className="hiw__rail" />

            {/* revealed left-to-right as the head travels */}
            <span className="hiw__lit">
              <span className="hiw__core" />
              <span className="hiw__sweep" />
            </span>

            <span className="hiw__head" />
          </span>

          {STEPS.map((s, i) => (
            <span key={s.key} className={`hiw__node hiw__node--${i + 1}`} />
          ))}
        </div>

        <ol className="hiw__steps">
          {STEPS.map((s, i) => (
            <li key={s.key} className={`hiw__step hiw__step--${i + 1}`}>
              <div className="hiw__step-inner">
                <h3 className="cf-item-title">{s.title}</h3>
                <p className="cf-item-body">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
