import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="cf-footer">
      <div className="cf-shell cf-footer__inner">
        <p className="cf-footer__note">
          Cyber Factory — invite-only agent portal.{' '}
          <Link to="/catalog" className="cf-link-arrow" style={{ fontSize: 13 }}>
            Explore agents
          </Link>
        </p>
        <p className="cf-footer__word">
          Cyber
          <br />
          Factory
        </p>
      </div>
    </footer>
  );
}
