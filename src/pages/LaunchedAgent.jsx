import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  Bookmark,
  BookOpen,
  ChevronRight,
  ClipboardList,
  Cpu,
  History,
  Languages,
  Play,
  Radar,
  Search as SearchIcon,
  Settings2,
  ShieldCheck,
  FileText,
  UploadCloud,
  X,
} from 'lucide-react';
import { agentBySlug } from '../data/catalog.js';
import { useBookmarks } from '../lib/useBookmarks.js';

/* Nav rails. Arabify matches the approved launched-agent screen; other
   agents fall back to the same shell with generic sections. */
const RAILS = {
  arabify: [
    { label: 'Translate', icon: Languages },
    { label: 'Glossary', icon: BookOpen },
    { label: 'Model Profiles', icon: Cpu },
    { label: 'History', icon: History },
    { label: 'Review queue', icon: ClipboardList },
  ],
  default: [
    { label: 'Run', icon: Play },
    { label: 'History', icon: History },
    { label: 'Settings', icon: Settings2 },
  ],
};

/* A small legible mark per kind of agent — the isometric artwork is
   built for card size and turns to mush at 44px. */
const MARKS = {
  monitoring: Radar,
  investigation: SearchIcon,
  reporting: FileText,
  language: Languages,
  testing: ShieldCheck,
};

export default function LaunchedAgent() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const agent = agentBySlug(slug);
  const [saved, toggle] = useBookmarks(slug ?? '');
  const [tab, setTab] = useState(0);

  if (!agent) return <Navigate to="/catalog" replace />;

  const rail = RAILS[agent.slug] ?? RAILS.default;
  const isDoc = agent.category === 'language';

  return (
    <div className="run">
      <div className="cf-shell">
        <nav className="cf-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link to="/catalog">Catalog</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{agent.name}</span>
        </nav>
      </div>

      <div className="run__frame">
        <aside className="run__rail">
          <div className="run__agent">
            <span className="run__agent-mark" aria-hidden="true">
              {(() => {
                const Mark = MARKS[agent.category] ?? Radar;
                return <Mark size={20} />;
              })()}
            </span>
            <strong className="run__agent-name">{agent.name}</strong>
          </div>

          <nav className="run__nav" aria-label={`${agent.name} sections`}>
            {rail.map((r, i) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.label}
                  type="button"
                  className={`run__nav-item${i === tab ? ' is-active' : ''}`}
                  aria-current={i === tab ? 'page' : undefined}
                  onClick={() => setTab(i)}
                >
                  <Icon size={15} aria-hidden="true" />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="run__work" aria-label={`${agent.name} workspace`}>
          <div className="run__work-actions">
            <button
              type="button"
              className="cf-iconbtn"
              onClick={toggle}
              aria-pressed={saved}
              aria-label={saved ? 'Remove bookmark' : 'Bookmark this agent'}
            >
              <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
            </button>
            <button
              type="button"
              className="cf-iconbtn run__close"
              onClick={() => navigate(`/agents/${agent.slug}`)}
              aria-label="Close the agent"
            >
              <X size={16} />
            </button>
          </div>

          <h1 className="run__title">{rail[tab].label}</h1>
          <p className="run__sub">{agent.tagline}</p>

          {isDoc ? (
            <>
              <div className="run__langs">
                <span className="cf-pill">
                  <Languages size={14} /> English
                </span>
                <ChevronRight size={16} aria-hidden="true" style={{ color: 'var(--cf-faint)' }} />
                <span className="cf-pill">
                  <Languages size={14} /> Arabic
                </span>
              </div>

              <div className="run__drop">
                <UploadCloud size={30} aria-hidden="true" />
                <p className="run__drop-title">Drag a .docx file here, or click to choose</p>
                <p className="run__drop-note">Word (.docx) files only</p>
              </div>
            </>
          ) : (
            <div className="run__panel">
              <label className="run__label" htmlFor="run-input">
                Describe what you want this agent to do
              </label>
              <textarea
                id="run-input"
                className="run__input"
                rows={7}
                placeholder={`Give ${agent.name} something to work on…`}
              />
              <div className="run__panel-foot">
                <span className="cf-tag">{agent.tag}</span>
                <button type="button" className="cf-btn cf-btn--primary">
                  <Play size={14} />
                  Run agent
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
