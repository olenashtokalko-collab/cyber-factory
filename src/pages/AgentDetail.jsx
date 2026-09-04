import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Bookmark, ChevronRight, Play, Sparkles } from 'lucide-react';
import IsoArt from '../components/IsoArt.jsx';
import AgentCard from '../components/AgentCard.jsx';
import { agentBySlug, agents, PLACEHOLDER_LONG } from '../data/catalog.js';
import { useBookmarks } from '../lib/useBookmarks.js';

export default function AgentDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const agent = agentBySlug(slug);
  const [saved, toggle] = useBookmarks(slug ?? '');

  if (!agent) return <Navigate to="/catalog" replace />;

  const related = agents.filter((a) => a.slug !== agent.slug && a.category === agent.category).slice(0, 5);
  const fill = related.length
    ? related
    : agents.filter((a) => a.slug !== agent.slug).slice(0, 5);

  return (
    <div className="agd">
      <div className="agd__glow" aria-hidden="true" />

      <div className="cf-shell">
        <nav className="cf-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link to="/catalog">Catalog</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{agent.name}</span>
        </nav>

        <div className="agd__hero">
          <div className="agd__info">
            <span className="cf-pill agd__cat">
              <span className="cf-pill__dot" aria-hidden="true" />
              {agent.category}
            </span>

            <h1 className="agd__title">{agent.name}</h1>
            <p className="agd__tagline">{agent.tagline}</p>

            <p className="agd__desc">
              {agent.name} — {agent.tagline} {PLACEHOLDER_LONG}
            </p>

            <div className="agd__actions">
              <button
                type="button"
                className="cf-btn cf-btn--primary"
                onClick={() => navigate(`/agents/${agent.slug}/run`)}
              >
                <Play size={15} />
                Launch
              </button>

              <button
                type="button"
                className={`cf-btn cf-btn--ghost${saved ? ' is-saved' : ''}`}
                onClick={toggle}
                aria-pressed={saved}
              >
                <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
                {saved ? 'Bookmarked' : 'Bookmark'}
              </button>

              <span className="agd__launches cf-mono">{agent.launches} launches</span>
            </div>
          </div>

          <div className="agd__preview">
            <div className="agd__preview-inner">
              <IsoArt motif={agent.motif} className="agd__art" />
              <div className="agd__preview-chip">
                <Sparkles size={13} />
                Preview — how this reads to a user
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="agd__related" aria-labelledby="rel-title">
        <div className="cf-shell">
          <p className="cf-eyebrow" id="rel-title">
            Related agents
          </p>
        </div>
        <div className="cf-shell">
          <div className="cf-grid cf-grid--bleed">
            {fill.map((a) => (
              <AgentCard
                key={a.slug}
                agent={a}
                onLaunch={(x) => navigate(`/agents/${x.slug}/run`)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
