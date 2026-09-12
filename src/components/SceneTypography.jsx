import React from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import soundEngine from '../audio/SoundEngine';

export default function SceneTypography({ sceneIndex, onEnterMainApp }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center p-6 overflow-hidden">
      <div className="hero-ui justify-center items-center text-center">

        {/* Scene 0: Singularity & Opening Hero */}
        {sceneIndex === 0 && (
          <div key="scene-0" className="scene-fade-in flex flex-col items-center max-w-4xl px-4">
            <h1
              className="font-hero font-bold tracking-tight text-white glow-title uppercase"
              style={{
                fontSize: 'clamp(56px, 9vw, 140px)',
                lineHeight: 0.95,
                maxWidth: '90vw'
              }}
            >
              HARBOUR
            </h1>
            <p
              className="font-mono text-sky-400 tracking-[0.3em] uppercase mt-6"
              style={{ fontSize: 'clamp(13px, 1.3vw, 18px)' }}
            >
              A SAFE PLACE FOR EVERY PAYMENT.
            </p>
          </div>
        )}

        {/* Scene 1: The Digital Storm */}
        {sceneIndex === 1 && (
          <div key="scene-1" className="scene-fade-in flex flex-col items-center max-w-4xl px-4">
            <h2
              className="font-hero font-bold text-white tracking-tight uppercase"
              style={{
                fontSize: 'clamp(40px, 6.5vw, 92px)',
                lineHeight: 1.05,
                maxWidth: '90vw'
              }}
            >
              DIGITAL PAYMENTS <br />
              <span className="font-light text-sky-400">MOVE FAST.</span>
            </h2>
          </div>
        )}

        {/* Scene 2: The Payment */}
        {sceneIndex === 2 && (
          <div key="scene-2" className="scene-fade-in flex flex-col items-center max-w-3xl px-4">
            <div
              className="font-hero font-bold text-white tracking-tight"
              style={{ fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 1 }}
            >
              ₹5,000
            </div>
            <div
              className="font-mono text-slate-400 tracking-[0.3em] uppercase my-3"
              style={{ fontSize: 'clamp(12px, 1.2vw, 16px)' }}
            >
              TO
            </div>
            <div
              className="font-hero font-semibold text-sky-300 tracking-wider uppercase"
              style={{ fontSize: 'clamp(24px, 3.5vw, 48px)' }}
            >
              ELECTRICITY BOARD
            </div>
          </div>
        )}

        {/* Scene 3: Risk Scanner */}
        {sceneIndex === 3 && (
          <div key="scene-3" className="scene-fade-in flex flex-col items-center max-w-3xl px-4">
            <div
              className="font-mono text-rose-400 tracking-[0.35em] uppercase mb-3 text-xs"
            >
              SIGNAL ANALYSIS
            </div>
            <h2
              className="font-hero font-bold text-white tracking-tight uppercase"
              style={{
                fontSize: 'clamp(38px, 6vw, 84px)',
                lineHeight: 1.1,
                maxWidth: '90vw'
              }}
            >
              RISK DETECTED
            </h2>
          </div>
        )}

        {/* Scene 4: AI Pause Moment */}
        {sceneIndex === 4 && (
          <div key="scene-4" className="scene-fade-in flex flex-col items-center max-w-4xl px-4">
            <h2
              className="font-hero font-black text-white glow-title tracking-tight uppercase"
              style={{
                fontSize: 'clamp(64px, 11vw, 160px)',
                lineHeight: 0.95,
                maxWidth: '90vw'
              }}
            >
              PAUSE
            </h2>
            <p
              className="font-mono text-sky-400 tracking-[0.3em] uppercase mt-6"
              style={{ fontSize: 'clamp(13px, 1.4vw, 20px)' }}
            >
              PROTECT BEFORE THEY PAY.
            </p>
          </div>
        )}

        {/* Scene 5: Harbour Sanctuary */}
        {sceneIndex === 5 && (
          <div key="scene-5" className="scene-fade-in flex flex-col items-center max-w-3xl px-4">
            <h2
              className="font-hero font-bold text-white tracking-tight uppercase"
              style={{
                fontSize: 'clamp(48px, 8vw, 110px)',
                lineHeight: 1.05,
                maxWidth: '90vw'
              }}
            >
              HARBOUR
            </h2>
            <p
              className="font-sans text-slate-300 font-light mt-4 max-w-xl"
              style={{ fontSize: 'clamp(15px, 1.5vw, 22px)' }}
            >
              Outside is chaos. Inside is calm, protected, and secure.
            </p>
          </div>
        )}

        {/* Scene 6: Voice-First */}
        {sceneIndex === 6 && (
          <div key="scene-6" className="scene-fade-in flex flex-col items-center max-w-2xl px-4 pointer-events-auto">
            <div
              className="font-mono text-sky-400 tracking-[0.25em] uppercase mb-2"
              style={{ fontSize: 'clamp(13px, 1.3vw, 18px)' }}
            >
              “SEND ₹5,000 TO RAHUL.”
            </div>
            <div
              className="font-hero font-bold text-white tracking-tight"
              style={{ fontSize: 'clamp(36px, 5.5vw, 76px)', lineHeight: 1.1 }}
            >
              CONFIRM?
            </div>

            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => soundEngine.playGlassTone(523.25, 0.15, 2.0)}
                className="btn-primary flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>CONFIRM</span>
              </button>
              <button
                onClick={() => soundEngine.playInteractionClick()}
                className="btn-secondary flex items-center gap-2 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>CHANGE</span>
              </button>
            </div>
          </div>
        )}

        {/* Scene 7: Protection Barrier */}
        {sceneIndex === 7 && (
          <div key="scene-7" className="scene-fade-in flex flex-col items-center max-w-3xl px-4">
            <div
              className="font-mono text-amber-400 tracking-[0.3em] uppercase mb-3 text-xs"
            >
              PAYMENT PAUSED
            </div>
            <h2
              className="font-hero font-bold text-white tracking-tight"
              style={{
                fontSize: 'clamp(32px, 4.8vw, 72px)',
                lineHeight: 1.15,
                maxWidth: '90vw'
              }}
            >
              LET’S MAKE SURE THIS IS SAFE.
            </h2>
          </div>
        )}

        {/* Scene 8: Final Monument & Major CTA */}
        {sceneIndex === 8 && (
          <div key="scene-8" className="scene-fade-in flex flex-col items-center max-w-4xl px-4 pointer-events-auto">
            <h1
              className="font-hero font-bold text-white glow-title tracking-tight uppercase"
              style={{
                fontSize: 'clamp(64px, 10vw, 160px)',
                lineHeight: 0.95,
                maxWidth: '90vw'
              }}
            >
              HARBOUR
            </h1>
            <p
              className="font-mono text-sky-400 tracking-[0.3em] uppercase mt-5 mb-10"
              style={{ fontSize: 'clamp(14px, 1.5vw, 22px)' }}
            >
              PAUSE. VERIFY. PAY SAFELY.
            </p>

            <button
              onClick={onEnterMainApp}
              className="btn-primary group cursor-pointer"
              style={{ padding: '1rem 2.8rem', fontSize: '0.9rem' }}
            >
              <span>ENTER HARBOUR</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
