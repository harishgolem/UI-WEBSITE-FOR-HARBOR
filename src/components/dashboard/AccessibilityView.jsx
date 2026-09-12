import React from 'react';
import {
  Eye,
  Type,
  Sun,
  ZapOff,
  Keyboard,
  Globe,
  CheckCircle2,
  Sliders,
  Volume2
} from 'lucide-react';
import soundEngine from '../../audio/SoundEngine.js';

export default function AccessibilityView({
  accessibilitySettings,
  onUpdateSetting,
}) {
  const {
    fontSize = 'standard', // 'standard' | 'medium' | 'large'
    highContrast = false,
    reducedMotion = false,
    colorMode = 'standard', // 'standard' | 'deuteranopia' | 'protanopia'
    enhancedFocus = true,
    soundFeedback = true,
    language = 'en-GB',
  } = accessibilitySettings;

  const handleToggle = (key, value) => {
    soundEngine.playClick(550, 0.05);
    onUpdateSetting(key, value);
  };

  return (
    <div className="accessibility-container fade-in">
      {/* Header */}
      <div className="access-header-card">
        <div className="flex items-center gap-3">
          <div className="access-icon-box">
            <Eye className="w-6 h-6 text-cyan" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-hero text-xl text-white font-bold">Accessibility Center</h2>
              <span className="badge-shield-live">LIVE WCAG 2.1 COMPLIANCE</span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">
              Customize contrast, typography scale, motion dynamics, and keyboard shortcuts. Settings persist
              automatically in your browser session.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Control Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {/* Panel 1: Typography & Text Sizing */}
        <div className="access-card">
          <div className="flex items-center gap-2 mb-3">
            <Type className="w-4 h-4 text-cyan" />
            <h3 className="font-hero text-sm text-white font-bold">Typography & Text Scale</h3>
          </div>
          <p className="text-slate-400 text-xs mb-3">
            Adjust the interface font scaling for improved legibility across all dashboard views.
          </p>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'standard', label: 'Standard (100%)' },
              { id: 'medium', label: 'Medium (115%)' },
              { id: 'large', label: 'Large (130%)' },
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => handleToggle('fontSize', size.id)}
                className={`access-btn ${fontSize === size.id ? 'active' : ''}`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Panel 2: High Contrast & Visual Themes */}
        <div className="access-card">
          <div className="flex items-center gap-2 mb-3">
            <Sun className="w-4 h-4 text-amber" />
            <h3 className="font-hero text-sm text-white font-bold">Contrast & Border Dynamics</h3>
          </div>
          <p className="text-slate-400 text-xs mb-3">
            Deepen background contrast and amplify border luminescence for high-glare environments.
          </p>

          <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
            <div>
              <span className="font-mono text-xs text-white font-bold block">HIGH CONTRAST MODE</span>
              <span className="text-slate-400 text-[11px]">Enhanced dark navy & vivid neon borders</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => handleToggle('highContrast', e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>

        {/* Panel 3: Reduced Motion */}
        <div className="access-card">
          <div className="flex items-center gap-2 mb-3">
            <ZapOff className="w-4 h-4 text-emerald" />
            <h3 className="font-hero text-sm text-white font-bold">Motion & Animation Dynamics</h3>
          </div>
          <p className="text-slate-400 text-xs mb-3">
            Minimize continuous rotations, radar pulse ripples, and smooth camera shifts.
          </p>

          <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
            <div>
              <span className="font-mono text-xs text-white font-bold block">REDUCE MOTION</span>
              <span className="text-slate-400 text-[11px]">Disable particle spin & ambient oscillations</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={(e) => handleToggle('reducedMotion', e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>

        {/* Panel 4: Color Blindness Accessibility Filter */}
        <div className="access-card">
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-4 h-4 text-purple" />
            <h3 className="font-hero text-sm text-white font-bold">Color Accessibility Mode</h3>
          </div>
          <p className="text-slate-400 text-xs mb-3">
            Optimize status indicators and risk badges for red-green and blue-yellow color vision.
          </p>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'standard', label: 'Standard' },
              { id: 'deuteranopia', label: 'Deuteranopia' },
              { id: 'protanopia', label: 'Protanopia' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleToggle('colorMode', mode.id)}
                className={`access-btn ${colorMode === mode.id ? 'active' : ''}`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Panel 5: Keyboard Navigation Guide */}
        <div className="access-card md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Keyboard className="w-4 h-4 text-cyan" />
            <h3 className="font-hero text-sm text-white font-bold">Keyboard Navigation Shortcuts</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-black/30 border border-white/5">
              <kbd className="kbd-tag">Tab</kbd> / <kbd className="kbd-tag">Shift + Tab</kbd>
              <span className="text-slate-300 block mt-1.5">Navigate interactive focus rings</span>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-white/5">
              <kbd className="kbd-tag">Enter</kbd> / <kbd className="kbd-tag">Space</kbd>
              <span className="text-slate-300 block mt-1.5">Activate buttons, tabs, & modals</span>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-white/5">
              <kbd className="kbd-tag">Esc</kbd>
              <span className="text-slate-300 block mt-1.5">Close modals & inspection drawers</span>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-white/5">
              <kbd className="kbd-tag">Alt + 1..9</kbd>
              <span className="text-slate-300 block mt-1.5">Quick jump to specific 3D scenes</span>
            </div>
          </div>
        </div>

        {/* Panel 6: Language Preference Placeholder */}
        <div className="access-card md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-cyan" />
            <h3 className="font-hero text-sm text-white font-bold">Language & Locale Preference</h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {[
              { id: 'en-GB', label: 'English (United Kingdom)' },
              { id: 'en-US', label: 'English (United States)' },
              { id: 'es-ES', label: 'Español (Castellano)' },
              { id: 'de-DE', label: 'Deutsch' },
              { id: 'ja-JP', label: '日本語 (Japanese)' },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => handleToggle('language', lang.id)}
                className={`access-btn ${language === lang.id ? 'active' : ''}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
