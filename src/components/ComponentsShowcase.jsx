import { useState, useMemo, useEffect, useCallback, useRef } from 'react';

// ─────────────────────────────────────────────
//  ALL 107 COMPONENTS DATA
// ─────────────────────────────────────────────
const ALL_COMPONENTS = [
  { id: 1,   name: 'Anime JS Scrollbar',          url: 'https://skiper-ui.com/v1/skiper1',   category: 'Scroll' },
  { id: 2,   name: 'Dynamic Island',               url: 'https://skiper-ui.com/v1/skiper2',   category: 'UI Elements' },
  { id: 3,   name: 'Apple Play Button',            url: 'https://skiper-ui.com/v1/skiper3',   category: 'UI Elements' },
  { id: 4,   name: 'Theme Toggle Buttons',         url: 'https://skiper-ui.com/v1/skiper4',   category: 'UI Elements' },
  { id: 5,   name: 'Things Drag & Scroll',         url: 'https://skiper-ui.com/v1/skiper5',   category: 'Scroll' },
  { id: 6,   name: 'Hover Members',                url: 'https://skiper-ui.com/v1/skiper6',   category: 'Hover' },
  { id: 7,   name: 'Nike Preloader',               url: 'https://skiper-ui.com/v1/skiper7',   category: 'Preloaders' },
  { id: 8,   name: 'Words Preloader',              url: 'https://skiper-ui.com/v1/skiper8',   category: 'Preloaders' },
  { id: 9,   name: 'Stairs Preloader',             url: 'https://skiper-ui.com/v1/skiper9',   category: 'Preloaders' },
  { id: 10,  name: 'Double Stairs Preloader',      url: 'https://skiper-ui.com/v1/skiper10',  category: 'Preloaders' },
  { id: 11,  name: 'Pixel Preloader',              url: 'https://skiper-ui.com/v1/skiper11',  category: 'Preloaders' },
  { id: 12,  name: 'Vercel Liquid Simulation',     url: 'https://skiper-ui.com/v1/skiper12',  category: 'Effects' },
  { id: 13,  name: 'Nike Menu',                    url: 'https://skiper-ui.com/v1/skiper13',  category: 'Navigation' },
  { id: 14,  name: 'ASCII Simulation',             url: 'https://skiper-ui.com/v1/skiper14',  category: 'Effects' },
  { id: 15,  name: 'Box Loading Preloader',        url: 'https://skiper-ui.com/v1/skiper15',  category: 'Preloaders' },
  { id: 16,  name: 'Card Stack Scroll',            url: 'https://skiper-ui.com/v1/skiper16',  category: 'Scroll' },
  { id: 17,  name: 'Card Stack GSAP Rotate',       url: 'https://skiper-ui.com/v1/skiper17',  category: 'Scroll' },
  { id: 18,  name: 'Image Cursor Trail',           url: 'https://skiper-ui.com/v1/skiper18',  category: 'Cursor' },
  { id: 19,  name: 'SVG Follow Scroll',            url: 'https://skiper-ui.com/v1/skiper19',  category: 'Scroll' },
  { id: 20,  name: 'UniSwap Country Dialog',       url: 'https://skiper-ui.com/v1/skiper20',  category: 'UI Elements' },
  { id: 21,  name: 'Family Wallet',                url: 'https://skiper-ui.com/v1/skiper21',  category: 'UI Elements' },
  { id: 22,  name: 'Aave Token Swap',              url: 'https://skiper-ui.com/v1/skiper22',  category: 'UI Elements' },
  { id: 23,  name: 'Minimal Card Expand',          url: 'https://skiper-ui.com/v1/skiper23',  category: 'Cards' },
  { id: 24,  name: 'Tik Tok Color List',           url: 'https://skiper-ui.com/v1/skiper24',  category: 'UI Elements' },
  { id: 25,  name: 'Music Toggle Button',          url: 'https://skiper-ui.com/v1/skiper25',  category: 'UI Elements' },
  { id: 26,  name: 'Theme Toggle Button',          url: 'https://skiper-ui.com/v1/skiper26',  category: 'UI Elements' },
  { id: 27,  name: 'Rolling Text',                 url: 'https://skiper-ui.com/v1/skiper27',  category: 'Text' },
  { id: 28,  name: '3D Perspective Text',          url: 'https://skiper-ui.com/v1/skiper28',  category: 'Text' },
  { id: 29,  name: 'Siena Parallax',               url: 'https://skiper-ui.com/v1/skiper29',  category: 'Parallax' },
  { id: 30,  name: 'Oliver Parallax',              url: 'https://skiper-ui.com/v1/skiper30',  category: 'Parallax' },
  { id: 31,  name: 'Text Scroll Animation',        url: 'https://skiper-ui.com/v1/skiper31',  category: 'Text' },
  { id: 32,  name: 'Scroll Images Reveal 001',     url: 'https://skiper-ui.com/v1/skiper32',  category: 'Scroll' },
  { id: 33,  name: 'Scroll Images Reveal 002',     url: 'https://skiper-ui.com/v1/skiper33',  category: 'Scroll' },
  { id: 34,  name: 'Scroll Images Reveal 003',     url: 'https://skiper-ui.com/v1/skiper34',  category: 'Scroll' },
  { id: 35,  name: 'Hover Expand',                 url: 'https://skiper-ui.com/v1/skiper35',  category: 'Hover' },
  { id: 36,  name: 'Interactive 3D Hero',          url: 'https://skiper-ui.com/v1/skiper36',  category: 'Effects' },
  { id: 37,  name: 'Animated Number',              url: 'https://skiper-ui.com/v1/skiper37',  category: 'Animations' },
  { id: 38,  name: 'Apple Navbar V001',            url: 'https://skiper-ui.com/v1/skiper38',  category: 'Navigation' },
  { id: 39,  name: 'Canvas Crowd',                 url: 'https://skiper-ui.com/v1/skiper39',  category: 'Effects' },
  { id: 40,  name: 'CSS Link',                     url: 'https://skiper-ui.com/v1/skiper40',  category: 'UI Elements' },
  { id: 41,  name: 'Progressive Blur',             url: 'https://skiper-ui.com/v1/skiper41',  category: 'Effects' },
  { id: 42,  name: 'Animated Icons 001',           url: 'https://skiper-ui.com/v1/skiper42',  category: 'Animations' },
  { id: 43,  name: 'Vercel Tooltip',               url: 'https://skiper-ui.com/v1/skiper43',  category: 'UI Elements' },
  { id: 44,  name: 'Vercel Scroll with Blur',      url: 'https://skiper-ui.com/v1/skiper44',  category: 'Scroll' },
  { id: 45,  name: 'Family Receive Button',        url: 'https://skiper-ui.com/v1/skiper45',  category: 'UI Elements' },
  { id: 46,  name: 'Next.js Gooey Menu',           url: 'https://skiper-ui.com/v1/skiper46',  category: 'Navigation' },
  { id: 47,  name: 'Perspective Carousel',         url: 'https://skiper-ui.com/v1/skiper47',  category: 'Carousels' },
  { id: 48,  name: 'Card Swipe Carousel',          url: 'https://skiper-ui.com/v1/skiper48',  category: 'Carousels' },
  { id: 49,  name: 'Inverted Perspective Carousel',url: 'https://skiper-ui.com/v1/skiper49',  category: 'Carousels' },
  { id: 50,  name: 'Creative Carousel 001',        url: 'https://skiper-ui.com/v1/skiper50',  category: 'Carousels' },
  { id: 51,  name: 'Creative Carousel 002',        url: 'https://skiper-ui.com/v1/skiper51',  category: 'Carousels' },
  { id: 52,  name: 'Expand On Hover',              url: 'https://skiper-ui.com/v1/skiper52',  category: 'Hover' },
  { id: 53,  name: 'Expand On Hover Vertical',     url: 'https://skiper-ui.com/v1/skiper53',  category: 'Hover' },
  { id: 54,  name: 'Shadcn Clip-Path Carousel',    url: 'https://skiper-ui.com/v1/skiper54',  category: 'Carousels' },
  { id: 55,  name: 'Parallax Image',               url: 'https://skiper-ui.com/v1/skiper55',  category: 'Parallax' },
  { id: 56,  name: 'Devouring Details Sign In',    url: 'https://skiper-ui.com/v1/skiper56',  category: 'UI Elements' },
  { id: 57,  name: 'Vercel Navigation Bar',        url: 'https://skiper-ui.com/v1/skiper57',  category: 'Navigation' },
  { id: 58,  name: 'Text Roll Navigation',         url: 'https://skiper-ui.com/v1/skiper58',  category: 'Navigation' },
  { id: 59,  name: 'Drawing Cursor Effect',        url: 'https://skiper-ui.com/v1/skiper59',  category: 'Cursor' },
  { id: 60,  name: 'Side Scroll Navigation',       url: 'https://skiper-ui.com/v1/skiper60',  category: 'Navigation' },
  { id: 61,  name: 'Mouse Follow Animations',      url: 'https://skiper-ui.com/v1/skiper61',  category: 'Cursor' },
  { id: 62,  name: 'Loop Animation Hook',          url: 'https://skiper-ui.com/v1/skiper62',  category: 'Animations' },
  { id: 63,  name: 'Apple Squircle Effect',        url: 'https://skiper-ui.com/v1/skiper63',  category: 'Effects' },
  { id: 64,  name: 'Gooey Effect',                 url: 'https://skiper-ui.com/v1/skiper64',  category: 'Effects' },
  { id: 65,  name: 'Breakpoint Indicator',         url: 'https://skiper-ui.com/v1/skiper65',  category: 'UI Elements' },
  { id: 66,  name: 'SVG Clip-Path Mask',           url: 'https://skiper-ui.com/v1/skiper66',  category: 'Effects' },
  { id: 67,  name: 'Video Player 001',             url: 'https://skiper-ui.com/v1/skiper67',  category: 'Media' },
  { id: 68,  name: 'Animated Number Input',        url: 'https://skiper-ui.com/v1/skiper68',  category: 'Inputs' },
  { id: 69,  name: 'Skiper Number Flow',           url: 'https://skiper-ui.com/v1/skiper69',  category: 'Animations' },
  { id: 70,  name: 'Text Reveal Box',              url: 'https://skiper-ui.com/v1/skiper70',  category: 'Text' },
  { id: 71,  name: 'Image Reveal',                 url: 'https://skiper-ui.com/v1/skiper71',  category: 'Effects' },
  { id: 72,  name: 'Horizontal Text Reveal',       url: 'https://skiper-ui.com/v1/skiper72',  category: 'Text' },
  { id: 73,  name: 'Infinite Canvas',              url: 'https://skiper-ui.com/v1/skiper73',  category: 'Effects' },
  { id: 74,  name: 'Timeline Calendar',            url: 'https://skiper-ui.com/v1/skiper74',  category: 'UI Elements' },
  { id: 75,  name: 'Apple Navbar V002',            url: 'https://skiper-ui.com/v1/skiper75',  category: 'Navigation' },
  { id: 76,  name: 'Apple Feature Block',          url: 'https://skiper-ui.com/v1/skiper76',  category: 'UI Elements' },
  { id: 77,  name: 'Apple Carousel',               url: 'https://skiper-ui.com/v1/skiper77',  category: 'Carousels' },
  { id: 78,  name: "Dia Browser's Carousel",       url: 'https://skiper-ui.com/v1/skiper78',  category: 'Carousels' },
  { id: 79,  name: 'Team Showcase Scroll',         url: 'https://skiper-ui.com/v1/skiper79',  category: 'Scroll' },
  { id: 80,  name: 'Projects Showcase',            url: 'https://skiper-ui.com/v1/skiper80',  category: 'Cards' },
  { id: 81,  name: 'AI Input 001',                 url: 'https://skiper-ui.com/v1/skiper81',  category: 'Inputs' },
  { id: 82,  name: 'AI Input 002',                 url: 'https://skiper-ui.com/v1/skiper82',  category: 'Inputs' },
  { id: 83,  name: 'AI Input 003',                 url: 'https://skiper-ui.com/v1/skiper83',  category: 'Inputs' },
  { id: 84,  name: 'AI Input 004',                 url: 'https://skiper-ui.com/v1/skiper84',  category: 'Inputs' },
  { id: 85,  name: 'AI Input 005',                 url: 'https://skiper-ui.com/v1/skiper85',  category: 'Inputs' },
  { id: 86,  name: 'Apple AI Gradient',            url: 'https://skiper-ui.com/v1/skiper86',  category: 'Effects' },
  { id: 87,  name: 'Scroll with Fade Effect',      url: 'https://skiper-ui.com/v1/skiper87',  category: 'Scroll' },
  { id: 88,  name: '3D Rolling Text on Scroll',    url: 'https://skiper-ui.com/v1/skiper88',  category: 'Text' },
  { id: 89,  name: 'Scroll Progress 001',          url: 'https://skiper-ui.com/v1/skiper89',  category: 'Scroll' },
  { id: 90,  name: 'Gradient Hover Cards',         url: 'https://skiper-ui.com/v1/skiper90',  category: 'Cards' },
  { id: 91,  name: 'Video Player 002',             url: 'https://skiper-ui.com/v1/skiper91',  category: 'Media' },
  { id: 92,  name: 'Vercel Command Search',        url: 'https://skiper-ui.com/v1/skiper92',  category: 'UI Elements' },
  { id: 94,  name: 'Scroll Progress 002',          url: 'https://skiper-ui.com/v1/skiper94',  category: 'Scroll' },
  { id: 95,  name: 'Scroll Progress 003',          url: 'https://skiper-ui.com/v1/skiper95',  category: 'Scroll' },
  { id: 96,  name: 'Expandable Tabs Navigation',   url: 'https://skiper-ui.com/v1/skiper96',  category: 'Navigation' },
  { id: 97,  name: 'Video Player 003',             url: 'https://skiper-ui.com/v1/skiper97',  category: 'Media' },
  { id: 98,  name: 'Vertical Tooltip Menu',        url: 'https://skiper-ui.com/v1/skiper98',  category: 'Navigation' },
  { id: 99,  name: 'Animated Icons 002',           url: 'https://skiper-ui.com/v1/skiper99',  category: 'Animations' },
  { id: 100, name: 'Draggable Snap Button',        url: 'https://skiper-ui.com/v1/skiper100', category: 'UI Elements' },
  { id: 101, name: 'Custom Tooltip',               url: 'https://skiper-ui.com/v1/skiper101', category: 'UI Elements' },
  { id: 102, name: 'Debug Panel',                  url: 'https://skiper-ui.com/v1/skiper102', category: 'UI Elements' },
  { id: 103, name: 'Bouncy Accordion',             url: 'https://skiper-ui.com/v1/skiper103', category: 'UI Elements' },
  { id: 104, name: 'Scroll Reveal Grid Cards',     url: 'https://skiper-ui.com/v1/skiper104', category: 'Cards' },
  { id: 105, name: 'Auto Scale Input',             url: 'https://skiper-ui.com/v1/skiper105', category: 'Inputs' },
  { id: 106, name: 'Smooth Caret Input',           url: 'https://skiper-ui.com/v1/skiper106', category: 'Inputs' },
  { id: 107, name: 'Knockout Bracket',             url: 'https://skiper-ui.com/v1/skiper107', category: 'UI Elements' },
];

const CATEGORIES = [
  'All', 'Preloaders', 'Carousels', 'Navigation', 'Scroll',
  'Text', 'Effects', 'Animations', 'Hover', 'Cursor',
  'Parallax', 'Cards', 'Inputs', 'Media', 'UI Elements',
];

const CAT_COLORS = {
  'Preloaders':  '#f97316',
  'Carousels':   '#a855f7',
  'Navigation':  '#38bdf8',
  'Scroll':      '#22d3ee',
  'Text':        '#facc15',
  'Effects':     '#ec4899',
  'Animations':  '#4ade80',
  'Hover':       '#fb923c',
  'Cursor':      '#c084fc',
  'Parallax':    '#34d399',
  'Cards':       '#60a5fa',
  'Inputs':      '#f472b6',
  'Media':       '#94a3b8',
  'UI Elements': '#38bdf8',
};

// ─────────────────────────────────────────────
//  LIGHTBOX
// ─────────────────────────────────────────────
function Lightbox({ component, onClose }) {
  const [loaded, setLoaded] = useState(false);
  const accentColor = CAT_COLORS[component.category] ?? '#38bdf8';

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="sc-lightbox-backdrop" onClick={onClose}>
      <div className="sc-lightbox-panel" onClick={e => e.stopPropagation()}>
        <div className="sc-lightbox-header">
          <div className="sc-lightbox-title">
            <span className="sc-lb-num" style={{ color: accentColor }}>
              {String(component.id).padStart(2, '0')}
            </span>
            <span className="sc-lb-name">{component.name}</span>
            <span className="sc-lb-cat" style={{ background: `${accentColor}22`, color: accentColor, border: `1px solid ${accentColor}44` }}>
              {component.category}
            </span>
          </div>
          <div className="sc-lightbox-actions">
            <a href={component.url} target="_blank" rel="noopener noreferrer" className="sc-lb-open-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Open in new tab
            </a>
            <button className="sc-lb-close-btn" onClick={onClose} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="sc-lightbox-frame-wrap">
          {!loaded && (
            <div className="sc-lb-loading">
              <div className="sc-lb-spinner" style={{ borderTopColor: accentColor }} />
              <span>Loading component…</span>
            </div>
          )}
          <iframe
            src={component.url}
            title={component.name}
            className="sc-lightbox-iframe"
            style={{ opacity: loaded ? 1 : 0 }}
            onLoad={() => setLoaded(true)}
            allow="fullscreen"
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  COMPONENT CARD
// ─────────────────────────────────────────────
function ComponentCard({ component, index, onPreview }) {
  const accentColor = CAT_COLORS[component.category] ?? '#38bdf8';

  return (
    <div
      className="sc-card"
      style={{ animationDelay: `${(index % 20) * 0.035}s` }}
      onClick={() => onPreview(component)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onPreview(component)}
    >
      <div className="sc-card-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}20 0%, transparent 70%)` }} />
      <div className="sc-card-border" style={{ '--accent': accentColor }} />
      <div className="sc-card-inner">
        <div className="sc-card-top">
          <span className="sc-card-num" style={{ color: accentColor }}>
            {String(component.id).padStart(2, '0')}
          </span>
          <span className="sc-card-cat" style={{ background: `${accentColor}18`, color: accentColor, border: `1px solid ${accentColor}33` }}>
            {component.category}
          </span>
        </div>
        <div className="sc-card-name">{component.name}</div>
        <div className="sc-card-footer">
          <span className="sc-card-preview-hint" style={{ '--accent': accentColor }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Preview
          </span>
          <svg className="sc-card-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  MAIN SHOWCASE
// ─────────────────────────────────────────────
export default function ComponentsShowcase() {
  const [search, setSearch]             = useState('');
  const [activeCategory, setActiveCat]  = useState('All');
  const [previewComp, setPreviewComp]   = useState(null);
  const [visible, setVisible]           = useState(false);
  const searchRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL_COMPONENTS.filter(c => {
      const matchSearch = !q || c.name.toLowerCase().includes(q) || String(c.id).includes(q) || c.category.toLowerCase().includes(q);
      const matchCat    = activeCategory === 'All' || c.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  const handlePreview = useCallback((c) => setPreviewComp(c), []);
  const handleClose   = useCallback(() => setPreviewComp(null), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className={`sc-root${visible ? ' sc-root--visible' : ''}`}>
      <div className="sc-bg-grid" aria-hidden="true" />
      <div className="sc-bg-orb sc-bg-orb--1" aria-hidden="true" />
      <div className="sc-bg-orb sc-bg-orb--2" aria-hidden="true" />

      {/* ── HERO ── */}
      <header className="sc-hero">
        <div className="sc-hero-eyebrow">
          <span className="sc-pulse-dot" />
          Skiper UI · Open Source Components
        </div>
        <h1 className="sc-hero-title">
          <span className="sc-hero-grad">107</span> UI Components
        </h1>
        <p className="sc-hero-sub">
          Handcrafted, production-ready components. Click any card to preview live.
        </p>

        <div className="sc-search-wrap">
          <svg className="sc-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={searchRef}
            type="text"
            id="sc-search-input"
            className="sc-search-input"
            placeholder='Search by name, number, or category…'
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoComplete="off"
          />
          {search && (
            <button className="sc-search-clear" onClick={() => setSearch('')} aria-label="Clear">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
          <kbd className="sc-kbd">/</kbd>
        </div>
      </header>

      {/* ── CATEGORY TABS ── */}
      <nav className="sc-tabs-wrap" aria-label="Component categories">
        <div className="sc-tabs">
          {CATEGORIES.map(cat => {
            const accent = cat !== 'All' ? CAT_COLORS[cat] : '#38bdf8';
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                className={`sc-tab${isActive ? ' sc-tab--active' : ''}`}
                style={isActive ? { background: `${accent}18`, color: accent, borderColor: `${accent}44`, boxShadow: `0 0 20px ${accent}18` } : {}}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="sc-tab-count" style={isActive ? { background: `${accent}30`, color: accent } : {}}>
                    {ALL_COMPONENTS.filter(c => c.category === cat).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── RESULTS BAR ── */}
      <div className="sc-results-bar">
        <span className="sc-results-count">
          {filtered.length === ALL_COMPONENTS.length
            ? `Showing all ${ALL_COMPONENTS.length} components`
            : `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`}
        </span>
        {(search || activeCategory !== 'All') && (
          <button className="sc-results-clear" onClick={() => { setSearch(''); setActiveCat('All'); }}>
            ✕ Clear filters
          </button>
        )}
      </div>

      {/* ── GRID ── */}
      <main className="sc-grid-wrap">
        {filtered.length === 0 ? (
          <div className="sc-empty">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <p>No components match <strong>"{search}"</strong></p>
            <button className="sc-results-clear" onClick={() => { setSearch(''); setActiveCat('All'); }}>Clear filters</button>
          </div>
        ) : (
          <div className="sc-grid">
            {filtered.map((comp, i) => (
              <ComponentCard key={comp.id} component={comp} index={i} onPreview={handlePreview} />
            ))}
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="sc-footer">
        <div className="sc-footer-inner">
          <div className="sc-footer-brand">
            <span className="sc-pulse-dot sc-pulse-dot--sm" />
            HARBOUR · Component Lab
          </div>
          <div className="sc-footer-links">
            <a href="https://skiper-ui.com" target="_blank" rel="noopener noreferrer" className="sc-footer-link">
              skiper-ui.com ↗
            </a>
          </div>
          <div className="sc-footer-meta">107 components · MIT Licensed</div>
        </div>
      </footer>

      {previewComp && <Lightbox component={previewComp} onClose={handleClose} />}
    </div>
  );
}
