import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import AgentCard from '../components/AgentCard.jsx';
import { agents, categories } from '../data/catalog.js';
import { bookmarkedSlugs, useBookmarks } from '../lib/useBookmarks.js';

const SORTS = [
  { id: 'recent', label: 'Recently opened' },
  { id: 'popular', label: 'Most launched' },
  { id: 'az', label: 'A–Z' },
];

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const savedOnly = params.get('view') === 'saved';

  const [cat, setCat] = useState('all');
  const [sort, setSort] = useState('recent');
  const [q, setQ] = useState(params.get('q') ?? '');

  // subscribing here keeps the saved-only list in step with the cards
  useBookmarks('__catalog__');
  const saved = bookmarkedSlugs();

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = agents.filter((a) => {
      if (cat !== 'all' && a.category !== cat) return false;
      if (savedOnly && !saved.has(a.slug)) return false;
      if (!needle) return true;
      return (
        a.name.toLowerCase().includes(needle) ||
        a.tagline.toLowerCase().includes(needle) ||
        a.tag.toLowerCase().includes(needle)
      );
    });
    out = [...out];
    if (sort === 'popular') out.sort((a, b) => b.launches - a.launches);
    if (sort === 'az') out.sort((a, b) => a.name.localeCompare(b.name));
    return out;
  }, [cat, sort, q, savedOnly, saved]);

  return (
    <div className="cat">
      <div className="cf-shell">
        <nav className="cf-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{savedOnly ? 'Saved' : 'Catalog'}</span>
        </nav>

        <header className="cat__head">
          <div>
            <h1 className="cat__title">{savedOnly ? 'Saved agents' : 'Agent catalogue'}</h1>
            <p className="cat__sub">
              {savedOnly
                ? 'Agents you bookmarked in this portal.'
                : 'Everything your organisation has access to.'}
            </p>
          </div>

          <div className="cat__searchwrap">
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              value={q}
              placeholder="Search agents…"
              aria-label="Search agents"
              onChange={(e) => {
                setQ(e.target.value);
                const next = new URLSearchParams(params);
                if (e.target.value) next.set('q', e.target.value);
                else next.delete('q');
                setParams(next, { replace: true });
              }}
            />
          </div>
        </header>

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
            <Link
              to={savedOnly ? '/catalog' : '/catalog?view=saved'}
              className={`cf-pill${savedOnly ? ' cf-pill--active' : ''}`}
            >
              Saved
            </Link>
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
              <AgentCard
                key={a.slug}
                agent={a}
                onLaunch={(agent) => navigate(`/agents/${agent.slug}/run`)}
              />
            ))}
          </div>
        ) : (
          <div className="cf-empty">
            <h3>{savedOnly ? 'No saved agents yet' : 'No agents match'}</h3>
            <p>
              {savedOnly
                ? 'Bookmark an agent to see it here.'
                : 'Try a different search or category.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
