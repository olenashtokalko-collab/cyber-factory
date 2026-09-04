import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="cf-shell">
      <div className="cf-empty" style={{ paddingBlock: '18vh' }}>
        <p className="cf-eyebrow">404</p>
        <h3>Page not found</h3>
        <p>The page you are looking for doesn&rsquo;t exist or has moved.</p>
        <Link to="/" className="cf-btn cf-btn--outline" style={{ marginTop: 8 }}>
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
