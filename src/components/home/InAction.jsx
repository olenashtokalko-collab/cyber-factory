import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  ClipboardList,
  Cpu,
  FileText,
  History,
  Languages,
  RotateCcw,
  UploadCloud,
} from 'lucide-react';
import { useInView, prefersReducedMotion } from '../../lib/useInView.js';

const RAIL = [
  { label: 'Translate', icon: Languages },
  { label: 'Glossary', icon: BookOpen },
  { label: 'Model Profiles', icon: Cpu },
  { label: 'History', icon: History },
  { label: 'Review queue', icon: ClipboardList },
];

/* Timeline for the demo, in ms after the block comes into view. */
const TIMELINE = [
  { at: 700, step: 1 }, // file lands on the dropzone
  { at: 1900, step: 2 }, // agent works
  { at: 4300, step: 3 }, // result
];

const LOG = [
  'Reading document structure',
  'Matching glossary terms',
  'Translating 14 sections',
  'Preserving headings and tables',
];

/* 05 — See agents in action.
   A replica of the real launched-agent workspace, played through one
   honest end-to-end run: drop a document in, watch the agent work,
   see what comes back. */
export default function InAction() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setStep(3);
      return;
    }
    if (!inView) return;
    setStep(0);
    const timers = TIMELINE.map((t) => setTimeout(() => setStep(t.step), t.at));
    return () => timers.forEach(clearTimeout);
  }, [inView, run, reduced]);

  return (
    <section className="cf-section act" id="in-action" aria-labelledby="act-title" ref={ref}>
      <div className="cf-shell">
        <div className="cf-section-head">
          <div className="cf-section-head__copy">
            <p className="cf-eyebrow">04 — In action</p>
            <h2 id="act-title" className="cf-h2">
              What a run actually looks like
            </h2>
            <p className="cf-lede">
              Arabify, opened from the catalogue. A Word document goes in, the agent works through
              it, and the translated file comes back with its structure intact.
            </p>
          </div>

          {!reduced && (
            <button type="button" className="cf-btn cf-btn--ghost cf-btn--sm" onClick={() => setRun((n) => n + 1)}>
              <RotateCcw size={14} />
              Replay
            </button>
          )}
        </div>

        <div className="act__frame" data-step={step}>
          <span className="act__badge cf-mono">Example run</span>

          {/* left rail — as in the launched-agent screen */}
          <aside className="act__rail" aria-hidden="true">
            <div className="act__agent">
              <span className="act__agent-mark">
                <Languages size={17} />
              </span>
              <strong>Arabify</strong>
            </div>

            <ul className="act__nav">
              {RAIL.map((r, i) => {
                const Icon = r.icon;
                return (
                  <li key={r.label} className={i === 0 ? 'is-active' : ''}>
                    <Icon size={15} />
                    <span>{r.label}</span>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* workspace */}
          <div className="act__work">
            <header className="act__work-head">
              <h3 className="act__work-title">Translate</h3>
              <p className="act__work-sub">
                Upload a Word (.docx) document to translate into official Arabic, preserving its
                structure
              </p>
            </header>

            <div className="act__langs" aria-hidden="true">
              <span className="act__lang">
                <Languages size={14} /> English
              </span>
              <ArrowRight size={15} className="act__lang-arrow" />
              <span className="act__lang">
                <Languages size={14} /> Arabic
              </span>
            </div>

            <div className="act__stage">
              {/* step 0–1: dropzone */}
              <div className={`act__drop${step >= 2 ? ' is-gone' : ''}`}>
                <UploadCloud size={30} className="act__drop-icon" />
                <p className="act__drop-title">Drag a .docx file here, or click to choose</p>
                <p className="act__drop-note">Word (.docx) files only</p>

                <div className={`act__file${step >= 1 ? ' is-in' : ''}`} aria-hidden="true">
                  <FileText size={16} />
                  <span className="act__file-name">Q3-security-review.docx</span>
                  <span className="act__file-size cf-mono">248 KB</span>
                </div>
              </div>

              {/* step 2: working */}
              <div className={`act__work-log${step === 2 ? ' is-in' : ''}`} aria-hidden="true">
                <p className="cf-eyebrow cf-eyebrow--gold">Working</p>
                <ul>
                  {LOG.map((line, i) => (
                    <li key={line} style={{ animationDelay: `${i * 420}ms` }}>
                      <Check size={13} />
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="act__bar">
                  <span />
                </div>
              </div>

              {/* step 3: result */}
              <div className={`act__result${step >= 3 ? ' is-in' : ''}`}>
                <p className="cf-eyebrow cf-eyebrow--gold">Result</p>

                <div className="act__result-file">
                  <FileText size={18} />
                  <span className="act__result-name">Q3-security-review-ar.docx</span>
                  <span className="act__result-badge">Ready</span>
                </div>

                <ul className="act__result-rows">
                  <li>
                    <span>Sections translated</span>
                    <strong className="cf-mono">14</strong>
                  </li>
                  <li>
                    <span>Glossary terms applied</span>
                    <strong className="cf-mono">37</strong>
                  </li>
                  <li>
                    <span>Structure preserved</span>
                    <strong className="cf-mono">Headings, tables</strong>
                  </li>
                </ul>

                <p className="act__result-note">
                  Flagged for review: 2 terms with no glossary match.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="act__caption">
          Every agent opens in this same workspace, so the portal works the same way whichever one
          you launch.
        </p>
      </div>
    </section>
  );
}
