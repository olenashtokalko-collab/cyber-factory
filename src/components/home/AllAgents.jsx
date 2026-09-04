import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import AgentCard from '../AgentCard.jsx';
import { agents, categories } from '../../data/catalog.js';

const SORTS = [
  { id: 'recent', label: 'Recently opened' },
  { id: 'popular', label: 'Most launched' },
  { id: 'az', label: 'A–Z' },
];

/* 06 — All agents.
   The existing catalogue, kept whole but given the hairline grid,
   category tabs and sort control from the approved catalog screen. */
export default function AllAgents({ onLaunch }) {
  const [cat, setCat] = useState('all');
  const [sort, setSort] = useState('recent');

  const list = useMemo(() => {
    const base = cat === 'all' ? agents : agents.filter((a) => a.category === cat);
    const out = [...base];
    if (sort === 'popular') out.sort((a, b) => b.launches - a.launches);
    if (sort === 'az') out.sort((a, b) => a.name.localeCompare(b.name));
    return out;
  }, [cat, sort]);

  return (
    <section className="cf-section cf-section--tight all" id="all-agents" aria-labelledby="all-title">
      <div className="cf-shell">
        <div className="cf-section-head">
          <div className="cf-section-head__copy">
            <p className="cf-eyebrow">05 — The catalogue</p>
            <h2 id="all-title" className="cf-h2">
              All agents
            </h2>
            <p className="cf-lede">
              Everything your organisation has access to, in one list. Filter by kind, or open the
              full catalogue for search and saved agents.
            </p>
          </div>
          <Link to="/catalog" className="cf-link-arrow">
            Open full catalogue
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="cf-toolbar">
          <div className="cf-tabs" role="tablist" aria-label="Filter agents by category">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={c.id === cat}
                className={`cf-pill${c.id === cat ? ' cf-pill--active' : ''}`}
                onClick={() => setCat(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>

          <label className="cf-select">
            <span className="cf-sr-only">Sort agents</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </label>
        </div>
      </div>

      <div className="cf-shell">
        {list.length > 0 ? (
          <div className="cf-grid cf-grid--bleed">
            {list.map((a) => (
              <AgentCard key={a.slug} agent={a} onLaunch={onLaunch} />
            ))}
          </div>
        ) : (
          <div className="cf-empty">
            <h3>No agents in this category yet</h3>
            <p>Try another filter, or open the full catalogue.</p>
          </div>
        )}
      </div>
    </section>
  );
}
