import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import AgentDetail from './pages/AgentDetail.jsx';
import LaunchedAgent from './pages/LaunchedAgent.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const overHero = pathname === '/';

  return (
    <div className="cf-app">
      <ScrollToTop />
      <TopBar overHero={overHero} />
      <main className={`cf-main${overHero ? '' : ' cf-main--inset'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/agents/:slug" element={<AgentDetail />} />
          <Route path="/agents/:slug/run" element={<LaunchedAgent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!overHero && <Footer />}
    </div>
  );
}
