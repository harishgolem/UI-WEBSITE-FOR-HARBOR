import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowRight, Menu, X } from 'lucide-react';
import soundEngine from '../audio/SoundEngine';

export default function NavigationOverlay({
  sceneIndex,
  onJumpToScene,
  soundMuted,
  onToggleSound,
  onEnterMainApp
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sceneList = [
    { num: '01', title: 'Singularity' },
    { num: '02', title: 'Digital Storm' },
    { num: '03', title: 'The Payment' },
    { num: '04', title: 'Risk Detection' },
    { num: '05', title: 'The AI Pause' },
    { num: '06', title: 'Harbour Forms' },
    { num: '07', title: 'Voice-First' },
    { num: '08', title: 'Protection' },
  ];

  return (
    <>
      {/* Floating Top Navigation Bar */}
      <header className="fixed top-6 left-0 right-0 z-40 px-6 md:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Brand Monogram */}
          <div className="flex items-center gap-3 glass-pill px-4 py-2 rounded-full cursor-pointer">
            <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]"></div>
            <span className="font-hero font-bold tracking-widest text-white text-sm">
              HARBOUR
            </span>
          </div>

          {/* Desktop Navigation Links & CTA */}
          <nav className="hidden md:flex items-center gap-2 glass-nav px-5 py-2 rounded-full">
            <button
              onClick={() => onJumpToScene(0)}
              className="text-xs font-mono tracking-widest text-slate-300 hover:text-white px-3 py-1 transition-colors cursor-pointer"
            >
              EXPERIENCE
            </button>
            <button
              onClick={() => onJumpToScene(5)}
              className="text-xs font-mono tracking-widest text-slate-400 hover:text-white px-3 py-1 transition-colors cursor-pointer"
            >
              ABOUT
            </button>
            <button
              onClick={() => onJumpToScene(7)}
              className="text-xs font-mono tracking-widest text-slate-400 hover:text-white px-3 py-1 transition-colors cursor-pointer"
            >
              SAFETY
            </button>
            <div className="w-px h-4 bg-white/10 mx-1"></div>
            <button
              onClick={onEnterMainApp}
              className="btn-primary text-xs cursor-pointer"
              style={{ padding: '0.45rem 1.25rem' }}
            >
              <span>ENTER HARBOUR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="glass-pill p-2 rounded-full text-slate-300 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 max-w-sm mx-auto glass-nav p-4 rounded-2xl flex flex-col gap-3 pointer-events-auto animate-reveal">
            <button
              onClick={() => { onJumpToScene(0); setMobileMenuOpen(false); }}
              className="text-left text-xs font-mono tracking-widest text-white py-1"
            >
              EXPERIENCE
            </button>
            <button
              onClick={() => { onJumpToScene(5); setMobileMenuOpen(false); }}
              className="text-left text-xs font-mono tracking-widest text-slate-300 py-1"
            >
              ABOUT HARBOUR
            </button>
            <button
              onClick={() => { onJumpToScene(7); setMobileMenuOpen(false); }}
              className="text-left text-xs font-mono tracking-widest text-slate-300 py-1"
            >
              SAFETY PROTOCOL
            </button>
            <button
              onClick={() => { onEnterMainApp(); setMobileMenuOpen(false); }}
              className="btn-primary w-full text-center text-xs mt-2"
            >
              ENTER HARBOUR →
            </button>
          </div>
        )}
      </header>

      {/* Floating Audio Toggle Pill (Bottom Left) */}
      <div className="fixed bottom-8 left-6 md:left-12 z-40 pointer-events-auto">
        <button
          onClick={() => {
            soundEngine.playInteractionClick();
            onToggleSound();
          }}
          className="glass-pill flex items-center gap-2.5 px-4 py-2 rounded-full cursor-pointer transition-all"
        >
          {soundMuted ? (
            <>
              <span className="w-2 h-2 rounded-full bg-slate-500"></span>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px] font-mono tracking-wider text-slate-400">SOUND OFF</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]"></span>
              <Volume2 className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[11px] font-mono tracking-wider text-sky-300">SOUND ON</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Minimal Scene Progress Rail (Right Side) */}
      <div className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-end gap-3 pointer-events-auto">
        {sceneList.map((item, idx) => {
          const isActive = sceneIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                soundEngine.playInteractionClick();
                onJumpToScene(idx);
              }}
              className="group flex items-center gap-3 cursor-pointer py-0.5"
            >
              <span
                className={`text-[10px] font-mono tracking-widest transition-all duration-300 ${
                  isActive ? 'text-sky-400 font-bold opacity-100' : 'text-slate-600 opacity-60 group-hover:opacity-100'
                }`}
              >
                {item.num}
              </span>
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-sky-400 shadow-[0_0_12px_#38bdf8] scale-125'
                    : 'w-1.5 h-1.5 bg-slate-700 group-hover:bg-slate-400'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Opening Scene Bottom HUD Prompt (01 — INTRO) */}
      {sceneIndex === 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-12 z-30 pointer-events-none text-center md:text-right scene-fade-in">
          <div className="text-[11px] font-mono text-sky-400 tracking-[0.25em] uppercase mb-1">
            01 — INTRO
          </div>
          <div className="text-xs font-mono text-slate-400 tracking-wider flex items-center justify-center md:justify-end gap-1.5">
            <span>SCROLL TO EXPLORE</span>
            <span className="inline-block animate-bounce">↓</span>
          </div>
        </div>
      )}
    </>
  );
}
