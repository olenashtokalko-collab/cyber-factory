import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import IsoArt from '../IsoArt.jsx';
import Reveal from '../Reveal.jsx';
import { agents } from '../../data/catalog.js';

const featured = agents.filter((a) => a.featured).slice(0, 4);

/* 02 — Featured Agents.
   Bigger than a catalogue tile: each panel says what the agent helps
   you get done and opens straight into the product. */
export default function Featured({ onLaunch }) {
  return (
    <section className="cf-section" id="featured" aria-labelledby="featured-title">
      <div className="cf-shell">
        <div className="cf-section-head">
          <div className="cf-section-head__copy">
            <p className="cf-eyebrow">01 — Featured</p>
            <h2 id="featured-title" className="cf-h2">
              Start with these
            </h2>
            <p className="cf-lede">
              Four agents that cover the work teams reach for most often. Each one opens as a
              working tool, not a description of one.
            </p>
          </div>
          <Link to="/catalog" className="cf-link-arrow">
            Browse all {agents.length}
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="feat">
          {featured.map((a, i) => (
            <Reveal as="article" key={a.slug} className="feat__item" delay={i * 90}>
              <Link to={`/agents/${a.slug}`} className="feat__art" tabIndex={-1} aria-hidden="true">
                <IsoArt motif={a.motif} />
              </Link>

              <div className="feat__body">
                <p className="cf-eyebrow">{a.tag}</p>
                <h3 className="cf-h3">
                  <Link to={`/agents/${a.slug}`}>{a.name}</Link>
                </h3>
                <p className="feat__desc">{a.tagline}</p>

                <div className="feat__actions">
                  <button
                    type="button"
                    className="cf-btn cf-btn--outline cf-btn--sm"
                    onClick={() => onLaunch?.(a)}
                  >
                    <Play size={13} />
                    Launch
                  </button>
                  <Link to={`/agents/${a.slug}`} className="cf-link-arrow">
                    Details
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
