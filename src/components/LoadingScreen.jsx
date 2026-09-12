import React, { useState, useEffect } from 'react';
import soundEngine from '../audio/SoundEngine';

export default function LoadingScreen({ onLoaded }) {
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SAFETY MATRIX...');

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoaded();
          }, 400);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 12) + 6;
        if (next > 30 && next < 60) {
          setStatusText('CALIBRATING NEURAL SCAN RINGS...');
        } else if (next >= 60 && next < 85) {
          setStatusText('SYNCHRONIZING PROCEDURAL SHADERS...');
        } else if (next >= 85) {
          setStatusText('HARBOUR PROTOCOL READY.');
        }
        return Math.min(100, next);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#02040a] text-white px-6">
      {/* Central Glowing Harbour Sigil */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full border border-sky-400/40 flex items-center justify-center relative shadow-[0_0_50px_rgba(56,189,248,0.3)]">
          <div className="w-12 h-12 rounded-full border border-dashed border-sky-400/80 animate-spin"></div>
          <div className="w-3 h-3 rounded-full bg-sky-400 animate-ping absolute"></div>
        </div>
      </div>

      {/* Brand Title */}
      <h2 className="text-3xl md:text-4xl font-black font-syne tracking-widest text-white uppercase mb-2 glow-text-cyan">
        HARBOUR
      </h2>
      <p className="text-xs font-mono text-sky-300 tracking-[0.3em] uppercase mb-8">
        PAUSE. VERIFY. PAY SAFELY.
      </p>

      {/* Minimal Tech Progress Bar */}
      <div className="w-64 md:w-80 flex flex-col gap-2">
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
          <span>{statusText}</span>
          <span className="text-sky-400 font-bold">{percent}%</span>
        </div>
        <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 transition-all duration-150 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Enter Prompt when ready */}
      <button
        onClick={() => {
          soundEngine.init();
          soundEngine.setMute(false);
          onLoaded();
        }}
        className="mt-8 text-xs font-mono text-slate-400 hover:text-sky-300 transition-colors cursor-pointer tracking-widest uppercase border-b border-transparent hover:border-sky-400 pb-0.5"
      >
        [ ENTER EXPERIENCE ]
      </button>
    </div>
  );
}
