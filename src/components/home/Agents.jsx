import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import IsoArt from '../IsoArt.jsx';
import { agentBySlug } from '../../data/catalog.js';
import { useInView } from '../../lib/useInView.js';
import SectionHeadline from '../SectionHeadline.jsx';

/* ------------------------------------------------------------------
   Agents — Figma 122:19921.

   Three hairline cards 16px apart, each 24px padded: a 352x199
   illustration plate carrying the dot grid, then 40px down the name
   and its one-liner. The ghost "Browse all" button sits centred
   under the row.

   The cards render from the catalogue rather than from copy pasted
   into the section, so the homepage and /catalog can never disagree
   about what an agent is called or does.
   ------------------------------------------------------------------ */

/* the comp's three slots, in its order */
const SLUGS = ['arabify', 'brand-protection', 'security-policy-drafter'];

export default function Agents() {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (inView) setShown(true);
  }, [inView]);

  const agents = SLUGS.map(agentBySlug).filter(Boolean);

  return (
    <section
      className={`ag${shown ? ' is-in' : ''}`}
      id="agents"
      aria-labelledby="ag-title"
      ref={ref}
    >
      <div className="cf-shell">
        <SectionHeadline
          id="ag-title"
          lead="Start with these."
          rest={['The agents teams reach', 'for most often.']}
          sub="One platform. A growing portfolio of cyber capabilities."
          breakAfterLead
        />
      </div>

      <div className="cf-shell">
        <ul className="ag__grid">
          {agents.map((a, i) => (
            <li key={a.slug} className="ag__cell" style={{ '--i': i }}>
              <article className="ag__card cf-tile">
                <Link
                  to={`/agents/${a.slug}`}
                  className="ag__plate"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <span className="ag__dots" />
                  <IsoArt motif={a.motif} className="ag__art" />
                </Link>

                <div className="ag__text">
                  <h3 className="cf-item-title">
                    <Link to={`/agents/${a.slug}`}>{a.name}</Link>
                  </h3>
                  <p className="cf-item-body">{a.tagline}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <Link to="/catalog" className="cf-cta cf-cta--ghost ag__browse">
          Browse all
          <ArrowRight size={20} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
