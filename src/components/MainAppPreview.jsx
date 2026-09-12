import React, { useState } from 'react';
import { Shield, ArrowRight, Mic, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import soundEngine from '../audio/SoundEngine';

export default function MainAppPreview({ onReturnToIntro }) {
  const [voiceQuery, setVoiceQuery] = useState('Send ₹5,000 to Electricity Board');
  const [isProcessing, setIsProcessing] = useState(false);
  const [safetyStatus, setSafetyStatus] = useState('PAUSED_VERIFY');

  const handleSimulatePayment = () => {
    soundEngine.playRadarPing(880, 0.08);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSafetyStatus('PAUSED_VERIFY');
      soundEngine.playGlassTone(440, 0.12, 1.8);
    }, 600);
  };

  const handleConfirmSafe = () => {
    soundEngine.playHarmonicResonance([261.63, 329.63, 392.00, 523.25], 0.2, 2.5);
    setSafetyStatus('CONFIRMED');
  };

  return (
    <div className="min-h-screen bg-[#020408] text-white flex flex-col selection:bg-sky-500/30 selection:text-sky-200">
      {/* Sleek Top Navbar */}
      <nav className="border-b border-white/5 bg-[#020408]/80 backdrop-blur-xl sticky top-0 z-40 px-6 md:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-400"></div>
          <span className="font-hero font-bold text-lg tracking-widest text-white">
            HARBOUR
          </span>
        </div>

        <button
          onClick={onReturnToIntro}
          className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-400 hover:text-sky-300 transition-colors uppercase cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>REPLAY INTRO</span>
        </button>
      </nav>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-6 md:p-12 flex flex-col justify-center gap-10">
        
        {/* Header Statement */}
        <div className="flex flex-col gap-3">
          <div className="font-mono text-xs text-sky-400 tracking-[0.3em] uppercase">
            SAFETY ENVIRONMENT // ACTIVE
          </div>
          <h1
            className="font-hero font-bold text-white tracking-tight"
            style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', lineHeight: 1.1 }}
          >
            A Safe Place to Pause.
          </h1>
          <p className="font-body text-slate-400 font-light max-w-xl text-sm md:text-base">
            Harbour protects every transfer by verifying recipient context, voice intent authenticity, and trusted contact synchronization.
          </p>
        </div>

        {/* Voice Pay Interactive Demonstration */}
        <div className="p-8 rounded-3xl bg-slate-950/60 border border-white/5 backdrop-blur-xl flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-sky-400 tracking-wider">
              <Mic className="w-3.5 h-3.5" />
              VOICE INTENT INTERFACE
            </div>
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest">
              SYSTEM READY
            </span>
          </div>

          <div className="flex items-center gap-3 bg-black/50 p-3.5 rounded-2xl border border-white/10 focus-within:border-sky-400/50 transition-all">
            <Mic className="w-4 h-4 text-sky-400 shrink-0 ml-2" />
            <input
              type="text"
              value={voiceQuery}
              onChange={(e) => setVoiceQuery(e.target.value)}
              className="bg-transparent text-white font-mono text-xs md:text-sm outline-none w-full placeholder-slate-600"
              placeholder="Speak or enter payment intent..."
            />
            <button
              onClick={handleSimulatePayment}
              disabled={isProcessing}
              className="btn-pill-minimal cursor-pointer shrink-0 text-[11px]"
            >
              {isProcessing ? 'SCANNING...' : 'TRIGGER CHECK'}
            </button>
          </div>

          {/* Intervention State */}
          {safetyStatus === 'PAUSED_VERIFY' && (
            <div className="p-6 rounded-2xl bg-amber-950/10 border border-amber-500/20 flex flex-col gap-4">
              <div className="flex items-center gap-2 font-mono text-xs text-amber-400 tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>PAYMENT PAUSED — CONTEXT DELIBERATION</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-y border-white/5">
                <div>
                  <div className="font-hero font-bold text-2xl text-white">₹5,000.00</div>
                  <div className="font-mono text-xs text-slate-400 mt-0.5">
                    Target: Electricity Board (First-time account)
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleConfirmSafe}
                    className="btn-harbour cursor-pointer text-xs"
                    style={{ padding: '0.6rem 1.5rem' }}
                  >
                    CONFIRM & PAY
                  </button>
                  <button
                    onClick={() => setSafetyStatus('SAFE')}
                    className="btn-pill-minimal cursor-pointer text-xs"
                  >
                    CANCEL
                  </button>
                </div>
              </div>

              <div className="font-mono text-[11px] text-slate-400">
                • 3.4x higher than 30-day baseline &nbsp;|&nbsp; • Trusted contact notified in background
              </div>
            </div>
          )}

          {safetyStatus === 'CONFIRMED' && (
            <div className="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <div className="font-mono text-xs text-emerald-300">
                  Transaction verified and completed safely.
                </div>
              </div>
              <button
                onClick={() => setSafetyStatus('SAFE')}
                className="font-mono text-xs text-sky-400 hover:underline cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
