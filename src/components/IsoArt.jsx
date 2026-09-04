/* ------------------------------------------------------------------
   IsoArt — the isometric line illustration used on every agent card.

   Every agent shares the same isometric slab (as in the approved
   Figma catalog) and differs only by the motif sitting on top of it.
   One element per motif is drawn in the gold accent.
   ------------------------------------------------------------------ */

const BASE = 'var(--cf-iso-line, rgba(250,250,250,0.26))';
const GOLD = 'var(--cf-gold)';

function Slab() {
  return (
    <g stroke={BASE} strokeWidth="1.15" fill="none" strokeLinejoin="round">
      <path d="M120 60 L194 103 L120 146 L46 103 Z" />
      <path d="M46 103 L46 119 L120 162 L120 146" />
      <path d="M194 103 L194 119 L120 162 L120 146" />
      <path d="M57 112 L57 120" strokeLinecap="round" />
      <path d="M63 115 L63 123" strokeLinecap="round" />
      <path d="M69 119 L69 127" strokeLinecap="round" />
      <path d="M177 112 L183 109" strokeLinecap="round" />
      <ellipse cx="120" cy="103" rx="10" ry="5.6" opacity="0.5" />
    </g>
  );
}

/* Motifs are drawn in a 240x180 box, floating above the slab. */
const motifs = {
  radar: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="120" cy="86" rx="46" ry="26" stroke={BASE} strokeWidth="1.15" />
      <ellipse cx="120" cy="86" rx="30" ry="17" stroke={BASE} strokeWidth="1.15" />
      <ellipse cx="120" cy="86" rx="15" ry="8.5" stroke={BASE} strokeWidth="1.15" />
      <path d="M120 86 L158 74" stroke={GOLD} strokeWidth="1.6" />
      <circle cx="158" cy="74" r="3" fill={GOLD} stroke="none" />
      <path d="M120 86 L120 56" stroke={BASE} strokeWidth="1.15" />
    </g>
  ),
  'radar-wide': (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="120" cy="84" rx="58" ry="32" stroke={BASE} strokeWidth="1.15" />
      <ellipse cx="120" cy="84" rx="41" ry="23" stroke={BASE} strokeWidth="1.15" />
      <ellipse cx="120" cy="84" rx="24" ry="13" stroke={BASE} strokeWidth="1.15" />
      <path d="M120 84 L172 68" stroke={GOLD} strokeWidth="1.6" />
      <circle cx="172" cy="68" r="3.2" fill={GOLD} stroke="none" />
      <circle cx="86" cy="94" r="2.2" fill={BASE} stroke="none" />
      <circle cx="140" cy="99" r="2.2" fill={BASE} stroke="none" />
    </g>
  ),
  globe: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="120" cy="80" r="34" stroke={BASE} strokeWidth="1.15" />
      <ellipse cx="120" cy="80" rx="34" ry="13" stroke={BASE} strokeWidth="1.15" />
      <ellipse cx="120" cy="80" rx="15" ry="34" stroke={BASE} strokeWidth="1.15" />
      <path d="M88 70 L152 70 M88 90 L152 90" stroke={BASE} strokeWidth="1.15" />
      <path d="M120 46 A34 34 0 0 1 154 80" stroke={GOLD} strokeWidth="1.7" />
    </g>
  ),
  'magnifier-person': (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="112" cy="76" r="26" stroke={BASE} strokeWidth="1.15" />
      <path d="M131 95 L150 112" stroke={GOLD} strokeWidth="2" />
      <circle cx="112" cy="69" r="7" stroke={BASE} strokeWidth="1.15" />
      <path d="M100 90 a12 12 0 0 1 24 0" stroke={BASE} strokeWidth="1.15" />
      <rect x="146" y="52" width="26" height="19" rx="3" stroke={BASE} strokeWidth="1.15" />
      <path d="M152 59 h14 M152 64 h9" stroke={BASE} strokeWidth="1.15" />
      <rect x="66" y="60" width="20" height="15" rx="3" stroke={BASE} strokeWidth="1.15" />
    </g>
  ),
  'tag-warning': (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M96 58 l14 -8 l6 7 h14 l6 -7 l14 8 l-8 14 l-6 -3 v30 h-26 v-30 l-6 3 z"
        stroke={BASE}
        strokeWidth="1.15"
      />
      <path d="M150 74 l16 28 h-32 z" stroke={GOLD} strokeWidth="1.6" />
      <path d="M150 84 v8" stroke={GOLD} strokeWidth="1.6" />
      <circle cx="150" cy="97" r="1.4" fill={GOLD} stroke="none" />
    </g>
  ),
  'envelope-hook': (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M84 66 h72 v42 h-72 z" stroke={BASE} strokeWidth="1.15" />
      <path d="M84 66 l36 26 l36 -26" stroke={BASE} strokeWidth="1.15" />
      <path d="M138 46 v20 a9 9 0 0 1 -18 0" stroke={GOLD} strokeWidth="1.7" />
      <path d="M132 42 h10" stroke={GOLD} strokeWidth="1.7" />
    </g>
  ),
  'docs-stack': (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="84" y="56" width="52" height="40" rx="3" stroke={BASE} strokeWidth="1.15" />
      <rect x="93" y="49" width="52" height="40" rx="3" stroke={BASE} strokeWidth="1.15" />
      <rect x="102" y="42" width="52" height="40" rx="3" stroke={GOLD} strokeWidth="1.5" />
      <path d="M111 55 h34 M111 62 h26 M111 69 h30" stroke={BASE} strokeWidth="1.15" />
    </g>
  ),
  'doc-pencil': (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M92 46 h42 l14 14 v50 h-56 z" stroke={BASE} strokeWidth="1.15" />
      <path d="M134 46 v14 h14" stroke={BASE} strokeWidth="1.15" />
      <path d="M102 74 h28 M102 84 h34 M102 94 h20" stroke={BASE} strokeWidth="1.15" />
      <path d="M140 92 l16 -16 l8 8 l-16 16 l-10 2 z" stroke={GOLD} strokeWidth="1.6" />
    </g>
  ),
  microphone: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="108" y="40" width="24" height="42" rx="12" stroke={BASE} strokeWidth="1.15" />
      <path d="M98 72 a22 22 0 0 0 44 0" stroke={GOLD} strokeWidth="1.7" />
      <path d="M120 94 v14" stroke={BASE} strokeWidth="1.15" />
      <path d="M156 56 h10 M156 66 h16 M156 76 h8" stroke={BASE} strokeWidth="1.15" />
      <path d="M74 56 h10 M68 66 h16 M76 76 h8" stroke={BASE} strokeWidth="1.15" />
    </g>
  ),
  shield: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M120 40 l30 12 v26 c0 20 -14 32 -30 40 c-16 -8 -30 -20 -30 -40 v-26 z" stroke={BASE} strokeWidth="1.15" />
      <path d="M106 76 l10 10 l20 -22" stroke={GOLD} strokeWidth="1.8" />
    </g>
  ),
  'shield-magnifier': (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M112 38 l30 12 v26 c0 20 -14 32 -30 40 c-16 -8 -30 -20 -30 -40 v-26 z" stroke={BASE} strokeWidth="1.15" />
      <circle cx="146" cy="80" r="19" stroke={GOLD} strokeWidth="1.6" />
      <path d="M160 94 l12 12" stroke={GOLD} strokeWidth="1.9" />
    </g>
  ),
  translate: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="76" y="44" width="60" height="46" rx="6" stroke={BASE} strokeWidth="1.15" />
      <path d="M88 58 h22 M99 58 v20 M91 78 c8 0 16 -6 16 -14" stroke={BASE} strokeWidth="1.15" />
      <rect x="112" y="66" width="60" height="46" rx="6" stroke={GOLD} strokeWidth="1.5" />
      <path d="M128 100 l14 -24 l14 24 M133 92 h18" stroke={GOLD} strokeWidth="1.5" />
    </g>
  ),
  crosshair: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="120" cy="78" r="32" stroke={BASE} strokeWidth="1.15" />
      <circle cx="120" cy="78" r="18" stroke={BASE} strokeWidth="1.15" />
      <path d="M120 34 v18 M120 104 v18 M76 78 h18 M146 78 h18" stroke={BASE} strokeWidth="1.15" />
      <circle cx="120" cy="78" r="5" fill={GOLD} stroke="none" />
    </g>
  ),
  mirror: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="80" y="40" width="38" height="60" rx="4" stroke={BASE} strokeWidth="1.15" />
      <rect x="126" y="40" width="38" height="60" rx="4" stroke={GOLD} strokeWidth="1.5" />
      <path d="M88 56 h22 M88 66 h16 M88 76 h20" stroke={BASE} strokeWidth="1.15" />
      <path d="M134 56 h22 M134 66 h16 M134 76 h20" stroke={GOLD} strokeWidth="1.2" opacity="0.7" />
      <path d="M122 34 v72" stroke={BASE} strokeWidth="1.15" strokeDasharray="3 4" />
    </g>
  ),
};

export default function IsoArt({ motif = 'radar', className = '' }) {
  return (
    <svg
      className={`cf-iso ${className}`}
      viewBox="0 0 240 180"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <g className="cf-iso__motif">{motifs[motif] ?? motifs.radar}</g>
      <Slab />
    </svg>
  );
}
