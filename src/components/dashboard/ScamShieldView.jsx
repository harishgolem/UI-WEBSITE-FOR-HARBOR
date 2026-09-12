import React, { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Info,
  ExternalLink,
  ChevronRight,
  Zap,
  Lock
} from 'lucide-react';
import soundEngine from '../../audio/SoundEngine.js';
import { MOCK_SCAM_EXAMPLES } from '../../data/mockData.js';

export default function ScamShieldView({ onDispatchToPause }) {
  const [activeIntervention, setActiveIntervention] = useState(null);
  const [interventionState, setInterventionState] = useState('WARNING'); // 'WARNING' | 'PAUSED' | 'CANCELLED' | 'BYPASSED'

  // Simulated active suspicious transaction for demonstration
  const sampleSuspiciousTxn = {
    id: 'TXN-ALERT-3829',
    amount: '£8,500.00',
    recipient: 'QuickInvest Crypto Doubler Bot (0xfa01...cce2)',
    category: 'CRITICAL THREAT (98% Risk)',
    vector: 'High-Yield Guaranteed Scam Blacklist Match',
    reasons: [
      'Recipient wallet address was identified in international honeypot clusters 14 hours ago',
      'Zero historical inbound business activity; immediate outbound drain behavior',
      'Transaction promise keywords ("Guaranteed 300% in 24h") match confirmed social engineering patterns',
    ],
    recommendedActions: [
      'Do not execute wire under any circumstances',
      'Place in HARBOR Pause to discuss with authorized advisor or trusted contact',
      'Report wallet address to national cyber fraud reporting center',
    ],
  };

  const handleOpenIntervention = () => {
    soundEngine.playGlassTone(260, 0.25, 1.8);
    setActiveIntervention(sampleSuspiciousTxn);
    setInterventionState('WARNING');
  };

  const handleCancelTransfer = () => {
    soundEngine.playHarmonicResonance([523.25, 659.25], 0.2, 1.5);
    setInterventionState('CANCELLED');
    setTimeout(() => setActiveIntervention(null), 1600);
  };

  const handlePauseTransfer = () => {
    soundEngine.playLaserSweep(0.12);
    setInterventionState('PAUSED');
    onDispatchToPause({
      recipient: activeIntervention.recipient,
      amount: activeIntervention.amount,
      riskScore: 98,
      reason: 'Scam Shield Intervention: High-Yield Scam Pattern Intercept',
    });
    setTimeout(() => setActiveIntervention(null), 1400);
  };

  const handleBypassProceed = () => {
    soundEngine.playClick(300, 0.1);
    setInterventionState('BYPASSED');
    setTimeout(() => setActiveIntervention(null), 1400);
  };

  return (
    <div className="scam-shield-container fade-in">
      {/* Header Banner */}
      <div className="scam-header-card">
        <div className="flex items-center gap-3">
          <div className="scam-shield-icon-wrap">
            <Shield className="w-6 h-6 text-emerald" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-hero text-xl text-white font-bold">HARBOR Scam Shield</h2>
              <span className="badge-shield-live">RADAR INTERCEPT ACTIVE</span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">
              Active behavioral defense grid intercepting high-velocity social engineering, spoofing, and
              unauthorized malicious transfers before funds leave your control.
            </p>
          </div>
        </div>
      </div>

      {/* Active Threat Simulation Banner */}
      <div className="threat-alert-box mt-5">
        <div className="flex items-start gap-4">
          <AlertOctagon className="w-6 h-6 text-[#ff0055] shrink-0 mt-1 animate-pulse" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#ff0055] font-bold tracking-wider">
                ACTIVE INTERVENTION TRIGGER AVAILABLE
              </span>
              <span className="font-mono text-[10px] text-slate-400">DETECTION: 98% CONFIDENCE</span>
            </div>
            <h3 className="font-hero text-base text-white mt-1">
              Outgoing Wire Attempt to Blacklisted Crypto Scheme Detected
            </h3>
            <p className="text-slate-300 text-xs mt-1 leading-relaxed">
              An outgoing transfer of <strong>£8,500.00</strong> to <em>QuickInvest Crypto Doubler Bot</em> has
              been held by the automated heuristic perimeter. Review safety options below.
            </p>
            <div className="mt-3">
              <button
                onClick={handleOpenIntervention}
                className="btn-trigger-intervention"
                data-hover
              >
                <AlertTriangle className="w-4 h-4 text-amber" />
                <span>LAUNCH RISKY PAYMENT INTERVENTION SCREEN</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies / Mock Scam Library */}
      <div className="mt-6">
        <div className="section-header-row mb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan" />
            <h3 className="font-hero text-base text-white">
              Demonstration Scam Library & Defense Topology
            </h3>
          </div>
          <span className="font-mono text-[10px] text-slate-400">EDUCATIONAL REFERENCE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_SCAM_EXAMPLES.map((scam) => (
            <div key={scam.id} className="scam-case-card">
              <div className="flex items-center justify-between mb-2">
                <span className="scam-severity-tag font-mono">{scam.severity}</span>
                <span className="font-mono text-[10px] text-slate-500">{scam.id.toUpperCase()}</span>
              </div>
              <h4 className="font-hero text-sm text-white">{scam.title}</h4>
              <div className="scam-scenario-box mt-2">
                <span className="font-mono text-[9px] text-slate-400 block mb-1">SCENARIO:</span>
                <p className="text-xs text-slate-300 leading-relaxed">{scam.scenario}</p>
              </div>
              <div className="scam-vector-box mt-2">
                <span className="font-mono text-[9px] text-cyan block mb-1">DETECTION VECTOR:</span>
                <p className="text-[11px] text-slate-400 leading-snug">{scam.detectionVector}</p>
              </div>
              <div className="scam-response-box mt-2">
                <span className="font-mono text-[9px] text-emerald block mb-1">HARBOR RESPONSE:</span>
                <p className="text-[11px] text-emerald-300/90 leading-snug">{scam.harbourResponse}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Warning Intervention Modal */}
      {activeIntervention && (
        <div className="intervention-modal-backdrop fade-in">
          <div className="intervention-modal-card">
            {/* Modal Header */}
            <div className="intervention-modal-header">
              <div className="flex items-center gap-2 text-[#ff0055]">
                <AlertOctagon className="w-5 h-5 animate-pulse" />
                <span className="font-mono text-xs font-bold tracking-widest">
                  SCAM SHIELD: CRITICAL TRANSACTION INTERVENTION
                </span>
              </div>
              <button
                onClick={() => setActiveIntervention(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* State: Warning Screen */}
            {interventionState === 'WARNING' && (
              <div className="space-y-4 pt-2">
                <div className="intervention-highlight-box">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-[10px] text-slate-400">TARGET BENEFICIARY:</span>
                      <div className="font-bold text-white text-sm">{activeIntervention.recipient}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] text-slate-400">AMOUNT:</span>
                      <div className="font-hero text-xl font-bold text-[#ff0055]">
                        {activeIntervention.amount}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reasons for Warning */}
                <div className="intervention-reasons-box">
                  <span className="font-mono text-[10px] text-amber font-bold block mb-2">
                    WHY THIS TRANSACTION WAS BLOCKED:
                  </span>
                  <ul className="space-y-2">
                    {activeIntervention.reasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <XCircle className="w-4 h-4 text-[#ff0055] shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Safety Actions */}
                <div className="intervention-recs-box">
                  <span className="font-mono text-[10px] text-emerald font-bold block mb-2">
                    RECOMMENDED DEFENSE STEPS:
                  </span>
                  <ul className="space-y-1.5">
                    {activeIntervention.recommendedActions.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Three Choices */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <button
                    onClick={handleCancelTransfer}
                    className="btn-intervention-cancel"
                    data-hover
                  >
                    <XCircle className="w-4 h-4 text-[#ff0055]" />
                    <span>CANCEL & REFUND</span>
                  </button>

                  <button
                    onClick={handlePauseTransfer}
                    className="btn-intervention-pause"
                    data-hover
                  >
                    <Clock className="w-4 h-4 text-amber" />
                    <span>PUT IN HARBOR PAUSE</span>
                  </button>

                  <button
                    onClick={handleBypassProceed}
                    className="btn-intervention-bypass"
                    data-hover
                  >
                    <AlertTriangle className="w-4 h-4 text-slate-400" />
                    <span>PROCEED ANYWAY</span>
                  </button>
                </div>
              </div>
            )}

            {/* State: Cancelled */}
            {interventionState === 'CANCELLED' && (
              <div className="py-8 text-center fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald mx-auto mb-2" />
                <h4 className="font-hero text-base text-white">Transfer Successfully Aborted</h4>
                <p className="text-slate-300 text-xs mt-1">
                  Funds of {activeIntervention.amount} have been safely retained in your zero-knowledge
                  vault. Zero loss occurred.
                </p>
              </div>
            )}

            {/* State: Paused */}
            {interventionState === 'PAUSED' && (
              <div className="py-8 text-center fade-in">
                <Clock className="w-12 h-12 text-amber mx-auto mb-2" />
                <h4 className="font-hero text-base text-white">Transfer Quarantined in HARBOR Pause</h4>
                <p className="text-slate-300 text-xs mt-1">
                  15-minute cooldown activated. You can inspect deliberation progress in the Cooldown Vault.
                </p>
              </div>
            )}

            {/* State: Bypassed */}
            {interventionState === 'BYPASSED' && (
              <div className="py-8 text-center fade-in">
                <AlertTriangle className="w-12 h-12 text-[#ff0055] mx-auto mb-2" />
                <h4 className="font-hero text-base text-white">Manual Bypass Acknowledged</h4>
                <p className="text-slate-300 text-xs mt-1">
                  Transfer logged as high-risk exception under operator signature.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
