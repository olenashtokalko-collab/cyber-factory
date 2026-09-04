/* ------------------------------------------------------------------
   Catalog data.

   Agent names and one-line descriptions are taken from the approved
   Figma screens and from the strings already present in the existing
   Cyber Factory build. Where the client has not supplied final copy
   for an agent, we reuse the placeholder convention that already
   appears in the approved design rather than inventing capabilities.
   ------------------------------------------------------------------ */

export const PLACEHOLDER_LONG =
  'This demo description outlines typical inputs, outputs, and guardrails; full copy is refined with the client during alignment.';

export const categories = [
  { id: 'all', name: 'All' },
  { id: 'monitoring', name: 'Monitoring' },
  { id: 'investigation', name: 'Investigation' },
  { id: 'reporting', name: 'Reporting' },
  { id: 'language', name: 'Language' },
  { id: 'testing', name: 'Testing' },
];

export const agents = [
  {
    slug: 'e-threats',
    name: 'E-threats',
    tag: 'Threats',
    category: 'monitoring',
    tagline: 'Continuous external threat intelligence across the open, deep, and dark web.',
    motif: 'radar-wide',
    launches: 1284,
    isNew: false,
    featured: true,
  },
  {
    slug: 'brand-protection',
    name: 'Brand Protection',
    tag: 'Monitoring',
    category: 'monitoring',
    tagline: 'Monitor and act on brand abuse across the open web.',
    motif: 'globe',
    launches: 720,
    isNew: false,
    featured: true,
  },
  {
    slug: 'arabify',
    name: 'Arabify',
    tag: 'Language',
    category: 'language',
    tagline: 'Translate Word documents into official Arabic, preserving structure.',
    motif: 'translate',
    launches: 964,
    isNew: false,
    featured: true,
  },
  {
    slug: 'phishing-domain-monitor',
    name: 'Phishing Domain Monitor',
    tag: 'Phishing',
    category: 'monitoring',
    tagline: 'Detect look-alike domains as they register.',
    motif: 'radar',
    launches: 512,
    isNew: false,
    featured: true,
  },
  {
    slug: 'social-impersonation-finder',
    name: 'Social Impersonation Finder',
    tag: 'Social',
    category: 'investigation',
    tagline: 'Find fake executive and brand accounts.',
    motif: 'magnifier-person',
    launches: 344,
    isNew: false,
  },
  {
    slug: 'counterfeit-listing-scanner',
    name: 'Counterfeit Listing Scanner',
    tag: 'Counterfeit',
    category: 'monitoring',
    tagline: 'Scan marketplaces for counterfeit listings.',
    motif: 'tag-warning',
    launches: 288,
    isNew: false,
  },
  {
    slug: 'phishing-email-scan',
    name: 'Phishing Email Scan',
    tag: 'Email',
    category: 'investigation',
    tagline: 'Detonate and explain suspicious emails.',
    motif: 'envelope-hook',
    launches: 803,
    isNew: false,
  },
  {
    slug: 'anti-web-monitor-tracker',
    name: 'Anti Web Monitor Tracker',
    tag: 'Monitoring',
    category: 'monitoring',
    tagline: 'Track mentions of your assets in dark web.',
    motif: 'globe',
    launches: 197,
    isNew: false,
  },
  {
    slug: 'ioc-extractor',
    name: 'IOC Extractor',
    tag: 'Ioc',
    category: 'investigation',
    tagline: 'Extract IP, domains, hashes from text feeds.',
    motif: 'docs-stack',
    launches: 431,
    isNew: false,
  },
  {
    slug: 'incident-report-writer',
    name: 'Incident Report Writer',
    tag: 'Incident',
    category: 'reporting',
    tagline: 'Draft incident reports from raw security logs.',
    motif: 'doc-pencil',
    launches: 356,
    isNew: false,
  },
  {
    slug: 'meeting-minutes-agent',
    name: 'Meeting Minutes Agent',
    tag: 'Meeting',
    category: 'reporting',
    tagline: 'Structured minutes with owners and actions.',
    motif: 'microphone',
    launches: 622,
    isNew: true,
  },
  {
    slug: 'security-policy-drafter',
    name: 'Security Policy Drafter',
    tag: 'Security',
    category: 'reporting',
    tagline: 'Draft and iterate security policies.',
    motif: 'shield',
    launches: 174,
    isNew: false,
  },
  {
    slug: 'evidence-pack-builder',
    name: 'Evidence Pack Builder',
    tag: 'Evidence',
    category: 'investigation',
    tagline: 'Assemble audit-ready evidence bundles.',
    motif: 'shield-magnifier',
    launches: 208,
    isNew: true,
  },
  {
    slug: 'ai-pentester',
    name: 'AI Pentester',
    tag: 'Testing',
    category: 'testing',
    tagline: 'Probe your own surfaces the way an attacker would.',
    motif: 'crosshair',
    launches: 265,
    isNew: false,
  },
  {
    slug: 'cyber-mirror',
    name: 'Cyber Mirror',
    tag: 'Exposure',
    category: 'investigation',
    tagline: 'See your organisation the way the outside world sees it.',
    motif: 'mirror',
    launches: 143,
    isNew: false,
  },
  {
    slug: 'arabic-translator',
    name: 'Arabic Translator',
    tag: 'Language',
    category: 'language',
    tagline: 'Translate working text between English and Arabic.',
    motif: 'translate',
    launches: 389,
    isNew: false,
  },
];

export const agentBySlug = (slug) => agents.find((a) => a.slug === slug);

/* Use cases are phrased around what a user is trying to get done,
   then mapped onto agents that already exist in the catalog. */
export const useCases = [
  {
    id: 'brand',
    need: 'Protect our brand online',
    body: 'Watch for look-alike domains, fake accounts, and counterfeit listings across the open web.',
    agents: ['brand-protection', 'counterfeit-listing-scanner', 'social-impersonation-finder', 'anti-web-monitor-tracker'],
  },
  {
    id: 'phishing',
    need: 'Stop phishing before it lands',
    body: 'Catch registrations early and explain suspicious mail to the people who receive it.',
    agents: ['phishing-domain-monitor', 'phishing-email-scan', 'e-threats'],
  },
  {
    id: 'investigate',
    need: 'Investigate an incident',
    body: 'Pull indicators out of noisy feeds and assemble what you found into something reviewable.',
    agents: ['ioc-extractor', 'evidence-pack-builder', 'cyber-mirror'],
  },
  {
    id: 'write',
    need: 'Write it up afterwards',
    body: 'Turn logs, calls, and decisions into reports, minutes, and policy your team can sign off.',
    agents: ['incident-report-writer', 'meeting-minutes-agent', 'security-policy-drafter'],
  },
  {
    id: 'language',
    need: 'Work across languages',
    body: 'Move documents and working text between English and Arabic without losing structure.',
    agents: ['arabify', 'arabic-translator'],
  },
  {
    id: 'test',
    need: 'Test our own defences',
    body: 'Look at your own surfaces the way someone outside the organisation would.',
    agents: ['ai-pentester', 'cyber-mirror'],
  },
];
