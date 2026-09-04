import { BadgeCheck, Bookmark, MessageSquarePlus, ShieldCheck } from 'lucide-react';
import Reveal from '../Reveal.jsx';

/* 07 — Why Cyber Factory.
   Four short statements, each describing something the portal already
   does. No metrics, no claims beyond existing behaviour. */
const points = [
  {
    icon: ShieldCheck,
    title: 'Invite-only',
    body: 'Access is granted per organisation, through an invitation or your existing single sign-on.',
  },
  {
    icon: BadgeCheck,
    title: 'A reviewed catalogue',
    body: 'Agents are published, updated and delisted through the console, so the list stays current.',
  },
  {
    icon: MessageSquarePlus,
    title: 'Ask for what is missing',
    body: 'If nothing fits, describe what you need and it becomes a request the team can pick up.',
  },
  {
    icon: Bookmark,
    title: 'Kept in one place',
    body: 'Bookmarks, notifications and launch history follow your account across the portal.',
  },
];

export default function Why() {
  return (
    <section className="cf-section why" id="why" aria-labelledby="why-title">
      <div className="cf-shell">
        <div className="cf-section-head">
          <div className="cf-section-head__copy">
            <p className="cf-eyebrow">06 — Why Cyber Factory</p>
            <h2 id="why-title" className="cf-h2">
              One portal, kept in order
            </h2>
          </div>
        </div>

        <div className="why__grid">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal as="article" key={p.title} className="why__item" delay={i * 80}>
                <span className="why__icon" aria-hidden="true">
                  <Icon size={19} />
                </span>
                <h3 className="why__title">{p.title}</h3>
                <p className="why__body">{p.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
