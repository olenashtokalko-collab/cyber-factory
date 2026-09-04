import { Link } from 'react-router-dom';
import { Bookmark, Play } from 'lucide-react';
import IsoArt from './IsoArt.jsx';
import { useBookmarks } from '../lib/useBookmarks.js';

/* The catalog card from the approved Figma screens: isometric art on
   top, name + one-liner, then a footer row with the category tag and
   a gold Launch button. Cards sit in a hairline grid, so the card
   itself carries no border of its own. */
export default function AgentCard({ agent, onLaunch }) {
  const [saved, toggle] = useBookmarks(agent.slug);

  return (
    <article className="cf-card">
      <Link to={`/agents/${agent.slug}`} className="cf-card__media" tabIndex={-1} aria-hidden="true">
        <IsoArt motif={agent.motif} />
      </Link>

      <button
        type="button"
        className={`cf-card__save${saved ? ' is-saved' : ''}`}
        onClick={toggle}
        aria-pressed={saved}
        aria-label={saved ? `Remove bookmark for ${agent.name}` : `Bookmark ${agent.name}`}
      >
        <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
      </button>

      {agent.isNew && <span className="cf-card__new">New</span>}

      <div className="cf-card__body">
        <h3 className="cf-card__name">
          <Link to={`/agents/${agent.slug}`}>{agent.name}</Link>
        </h3>
        <p className="cf-card__desc">{agent.tagline}</p>
      </div>

      <footer className="cf-card__foot">
        <span className="cf-tag">{agent.tag}</span>
        <button
          type="button"
          className="cf-btn cf-btn--outline cf-btn--sm"
          onClick={() => onLaunch?.(agent)}
        >
          <Play size={13} />
          Launch
        </button>
      </footer>
    </article>
  );
}
