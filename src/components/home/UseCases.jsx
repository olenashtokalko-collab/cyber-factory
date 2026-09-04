import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import IsoArt from '../IsoArt.jsx';
import { agentBySlug, useCases } from '../../data/catalog.js';

/* 04 — Use cases.
   Entry point is the job to be done, not the agent name. Picking a
   need swaps in the agents that already cover it. */
export default function UseCases({ onLaunch }) {
  const [active, setActive] = useState(useCases[0].id);
  const current = useCases.find((u) => u.id === active) ?? useCases[0];
  const list = current.agents.map(agentBySlug).filter(Boolean);

  return (
    <section className="cf-section uc" id="use-cases" aria-labelledby="uc-title">
      <div className="cf-shell">
        <div className="cf-section-head">
          <div className="cf-section-head__copy">
            <p className="cf-eyebrow">03 — Use cases</p>
            <h2 id="uc-title" className="cf-h2">
              Start from what you need done
            </h2>
            <p className="cf-lede">
              Pick the outcome you are after and see which agents in the catalogue already cover
              it.
            </p>
          </div>
        </div>

        <div className="uc__layout">
          <div className="uc__rail" role="tablist" aria-label="Use cases" aria-orientation="vertical">
            {useCases.map((u) => (
              <button
                key={u.id}
                type="button"
                role="tab"
                id={`uc-tab-${u.id}`}
                aria-selected={u.id === active}
                aria-controls={`uc-panel-${u.id}`}
                className={`uc__need${u.id === active ? ' is-active' : ''}`}
                onClick={() => setActive(u.id)}
              >
                <span className="uc__need-text">{u.need}</span>
                <span className="uc__need-count cf-mono">{u.agents.length}</span>
              </button>
            ))}
          </div>

          <div
            className="uc__panel"
            role="tabpanel"
            id={`uc-panel-${current.id}`}
            aria-labelledby={`uc-tab-${current.id}`}
            key={current.id}
          >
            <p className="uc__panel-body">{current.body}</p>

            <ul className="uc__agents">
              {list.map((a) => (
                <li key={a.slug} className="uc__agent">
                  <span className="uc__agent-art" aria-hidden="true">
                    <IsoArt motif={a.motif} />
                  </span>

                  <span className="uc__agent-copy">
                    <Link to={`/agents/${a.slug}`} className="uc__agent-name">
                      {a.name}
                    </Link>
                    <span className="uc__agent-desc">{a.tagline}</span>
                  </span>

                  <button
                    type="button"
                    className="cf-btn cf-btn--outline cf-btn--sm uc__agent-cta"
                    onClick={() => onLaunch?.(a)}
                  >
                    <Play size={13} />
                    Launch
                  </button>
                </li>
              ))}
            </ul>

            <Link to="/catalog" className="cf-link-arrow uc__all">
              See the full catalogue
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
