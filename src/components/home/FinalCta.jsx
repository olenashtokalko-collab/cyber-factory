import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquarePlus } from 'lucide-react';
import { agents } from '../../data/catalog.js';

/* 08 — Final CTA. Back to the one thing the portal is for. */
export default function FinalCta() {
  return (
    <section className="cf-section fin" id="get-started" aria-labelledby="fin-title">
      <div className="fin__glow" aria-hidden="true" />
      <div className="cf-shell fin__inner">
        <p className="cf-eyebrow cf-eyebrow--gold">Ready when you are</p>
        <h2 id="fin-title" className="fin__title">
          Find an agent and launch it.
        </h2>
        <p className="cf-lede fin__lede">
          {agents.length} agents are in the catalogue right now. Open the one that fits, or tell us
          what is missing.
        </p>
        <div className="fin__ctas">
          <Link to="/catalog" className="cf-btn cf-btn--primary cf-btn--lg">
            Explore agents
            <ArrowRight size={16} />
          </Link>
          <Link to="/catalog?request=1" className="cf-btn cf-btn--ghost cf-btn--lg">
            <MessageSquarePlus size={16} />
            Request an agent
          </Link>
        </div>
      </div>
    </section>
  );
}
