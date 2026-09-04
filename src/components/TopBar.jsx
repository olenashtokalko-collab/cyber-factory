import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Cpu, Cylinder, Globe, Moon, Search, Sun } from 'lucide-react';
import { agents } from '../data/catalog.js';
import { useTheme } from '../lib/useTheme.js';

function Logo() {
  return (
    <Link to="/" className="cf-logo" aria-label="Cyber Factory home">
      <img className="cf-logo__mark" src="/hero/logo.svg" width="26" height="15" alt="" aria-hidden="true" />
      <span className="cf-logo__word">Cyber Factory</span>
    </Link>
  );
}

export default function TopBar({ overHero = false }) {
  const [theme, setTheme] = useTheme();
  const [stuck, setStuck] = useState(false);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    return agents
      .filter(
        (a) =>
          a.name.toLowerCase().includes(needle) ||
          a.tagline.toLowerCase().includes(needle) ||
          a.tag.toLowerCase().includes(needle),
      )
      .slice(0, 6);
  }, [q]);

  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  /* The frame puts the header flat on the hero with no scrim. Now that
     it is pinned, it needs a ground once content starts passing under
     it — so the glass fades in past the first scroll and not before. */
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (slug) => {
    setOpen(false);
    setQ('');
    navigate(`/agents/${slug}`);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
      e.currentTarget.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (results[active]) go(results[active].slug);
      else if (q.trim()) {
        setOpen(false);
        navigate(`/catalog?q=${encodeURIComponent(q.trim())}`);
      }
    }
  };

  return (
    <header
      className={`cf-topbar${overHero ? ' cf-topbar--over' : ''}${stuck ? ' is-stuck' : ''}`}
    >
      <Logo />

      <div className="cf-topbar__search" ref={wrapRef}>
        <div className="cf-search">
          <Search size={16} className="cf-search__icon" aria-hidden="true" />
          <input
            type="search"
            value={q}
            placeholder="Search"
            aria-label="Search agents"
            aria-expanded={open && results.length > 0}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
              setActive(0);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
          />
        </div>

        {open && results.length > 0 && (
          <ul className="cf-search__pop" role="listbox" aria-label="Agent suggestions">
            {results.map((a, i) => (
              <li key={a.slug}>
                <button
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  className={`cf-search__item${i === active ? ' is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(a.slug)}
                >
                  <strong>{a.name}</strong>
                  <span>{a.tagline}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <nav className="cf-topbar__actions" aria-label="Account and tools">
        <button
          type="button"
          className="cf-iconbtn"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title="Theme"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button type="button" className="cf-iconbtn" aria-label="Notifications" title="Notifications">
          <Bell size={17} />
        </button>
        <Link to="/catalog?view=saved" className="cf-iconbtn" aria-label="Saved agents" title="Saved">
          <Cylinder size={17} />
        </Link>
        <Link to="/catalog" className="cf-iconbtn" aria-label="Agent repository" title="Repository">
          <Cpu size={17} />
        </Link>
        <button type="button" className="cf-iconbtn" aria-label="Language" title="Language">
          <Globe size={17} />
        </button>
        <span className="cf-avatar" aria-label="Signed in" title="Account">
          A
        </span>
      </nav>
    </header>
  );
}
