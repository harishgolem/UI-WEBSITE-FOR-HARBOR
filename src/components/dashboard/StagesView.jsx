import React from 'react';
import {
  Compass,
  Zap,
  Layers,
  Search,
  AlertTriangle,
  Shield,
  Mic,
  Lock,
  UserCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import soundEngine from '../../audio/SoundEngine.js';

const CINEMATIC_STAGES = [
  {
    id: 0,
    chapter: 'Void / Singularity Origin',
    tagline: 'Genesis of a Secure Financial Transfer',
    visual: 'Microscopic glowing nucleus suspended in total darkness with sub-atomic energy filaments.',
    telemetry: 'INITIATION SEED // ZERO ENTROPY',
    metric: '0.000 ms Latency',
    status: 'ORIGIN POINT',
    color: '#00f0ff',
    icon: Compass,
  },
  {
    id: 1,
    chapter: 'Digital Storm',
    tagline: 'Hyper-Velocity Data Tunnel Routing',
    visual: 'High-speed dive into the particle tunnel with chromatic acceleration trails.',
    telemetry: 'BURST VELOCITY: 631.5 GBP/S // 34 NETWORK HOPS',
    metric: '631.5 GBP/s',
    status: 'TRANSIT HIGHWAY',
    color: '#38bdf8',
    icon: Zap,
  },
  {
    id: 2,
    chapter: 'Transaction Core',
    tagline: 'Cryptographic Ledger Crystal Verification',
    visual: 'Offset orbit around an authenticating crystal cryptographic ledger with floating block headers.',
    telemetry: 'LEDGER RECORD: £12,400.00 AUTHENTICATED PAYMENT',
    metric: '£12,400.00',
    status: 'AUTHENTICATING',
    color: '#818cf8',
    icon: Layers,
  },
  {
    id: 3,
    chapter: 'Risk Scanner',
    tagline: 'Deep Packet Anomaly & Heuristic Inspection',
    visual: 'Dramatic low-angle sweep with emerald scanning laser planes slicing through transaction data.',
    telemetry: 'HEURISTIC SCANNER // 0 ANOMALIES DETECTED',
    metric: '99.98% Clean',
    status: 'ACTIVE SCAN',
    color: '#00ff9d',
    icon: Search,
  },
  {
    id: 4,
    chapter: 'Zero-G Pause',
    tagline: 'Real-Time Threat Intervention & Deliberation',
    visual: 'Dead-center macro freeze of financial momentum, holding funds in quantum suspension.',
    telemetry: 'MOMENTUM BRAKE // ESCROW QUANTUM LOCK',
    metric: '19.0s Window',
    status: 'PAUSED / VERIFY',
    color: '#ffb700',
    icon: AlertTriangle,
  },
  {
    id: 5,
    chapter: 'Harbour Architecture',
    tagline: 'Autonomous Protective Fortress Grid',
    visual: 'Grand pull-back reveal of the multi-tiered geometric citadel of distributed consensus.',
    telemetry: 'TOPOLOGY: DISTRIBUTED CITADEL ESCROW GRID',
    metric: '256 Nodes Sync',
    status: 'FORTIFIED',
    color: '#38bdf8',
    icon: Shield,
  },
  {
    id: 6,
    chapter: 'Voice Waveform',
    tagline: 'Biometric Identity & Intent Confirmation',
    visual: 'Elevated perspective of biometric acoustic frequencies and harmonic voice verification vectors.',
    telemetry: 'ACOUSTIC MATCH: 99.4% BIOMETRIC HARMONIC MATCH',
    metric: '99.4% Voice Match',
    status: 'BIOMETRIC PASS',
    color: '#c084fc',
    icon: Mic,
  },
  {
    id: 7,
    chapter: 'Protection Barrier',
    tagline: '100% Encrypted Vault Containment Wall',
    visual: 'Symmetrical hexagonal energy barrier neutralizing incoming attack vectors.',
    telemetry: 'ENERGY BARRIER // ZERO ATTACK PENETRATION',
    metric: '100% Encrypted',
    status: 'DEFENSE ACTIVE',
    color: '#00f0ff',
    icon: Lock,
  },
  {
    id: 8,
    chapter: 'Trusted Nodes',
    tagline: 'Multi-Signature Consensus & Clearing Anchors',
    visual: 'Wide stereoscopic observation of verified banking network anchors glowing in peer-to-peer sync.',
    telemetry: 'CONSENSUS: 5/5 MULTI-SIG VALIDATOR ENDORSEMENT',
    metric: '5/5 Signatures',
    status: 'NODE CONSENSUS',
    color: '#a3e635',
    icon: UserCheck,
  },
  {
    id: 9,
    chapter: 'Final Convergence',
    tagline: 'Monumental Settlement & Zero Fraud Guarantee',
    visual: 'Monumental wide shot of total harmonic convergence and instant secure fund delivery.',
    telemetry: 'SETTLEMENT COMPLETE // £0.00 FRAUD LOSSES',
    metric: '£0.00 Losses',
    status: 'SETTLED SECURE',
    color: '#00ff9d',
    icon: CheckCircle2,
  },
];

export default function StagesView({ onJumpToStage }) {
  const handleJump = (stageId) => {
    soundEngine.playWarp(0.25);
    onJumpToStage(stageId);
  };

  return (
    <div className="stages-view-container fade-in">
      {/* Header */}
      <div className="stages-header-card">
        <div className="flex items-center gap-3">
          <div className="stages-icon-box">
            <Compass className="w-6 h-6 text-cyan" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-hero text-xl text-white font-bold">10-Stage 3D Telemetry Inspector</h2>
              <span className="badge-shield-live">SPATIAL TIMELINE</span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">
              Explore the architectural narrative stages from the HARBOR documentation. Click{' '}
              <strong>"FLY TO 3D SCENE"</strong> on any stage to exit the dashboard and smoothly animate the
              3D camera directly into that scene.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {CINEMATIC_STAGES.map((stg) => {
          const IconComp = stg.icon;
          return (
            <div key={stg.id} className="stage-card">
              <div className="stage-card-top">
                <div className="stage-index-badge">
                  <span className="stage-num font-mono">STAGE {stg.id}</span>
                </div>
                <span
                  className="stage-status-tag"
                  style={{ borderColor: `${stg.color}40`, color: stg.color }}
                >
                  {stg.status}
                </span>
              </div>

              <div className="stage-title-group">
                <div
                  className="stage-icon-wrap"
                  style={{ backgroundColor: `${stg.color}15`, color: stg.color }}
                >
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="stage-name font-hero">{stg.chapter}</h4>
                  <p className="stage-tagline">{stg.tagline}</p>
                </div>
              </div>

              <div className="stage-visual-desc">
                <span className="desc-label">VISUAL EXPERIENCE:</span>
                <p className="desc-text">{stg.visual}</p>
              </div>

              <div className="stage-telemetry-box">
                <span className="desc-label">KEY TELEMETRY:</span>
                <div className="telemetry-text font-mono">{stg.telemetry}</div>
                <div className="stage-metric-pill" style={{ color: stg.color }}>
                  {stg.metric}
                </div>
              </div>

              <button
                onClick={() => handleJump(stg.id)}
                className="btn-jump-scene"
                data-hover
              >
                <Compass className="w-4 h-4" />
                <span>FLY TO 3D SCENE {stg.id}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
