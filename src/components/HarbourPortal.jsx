import React, { useState, useMemo } from 'react';
import {
  Shield,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  Mic,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Zap,
  RefreshCw,
  Search,
  LogOut,
  UserCheck,
  Radio,
  Layers,
  Compass,
  FileText,
  Sliders
} from 'lucide-react';
import soundEngine from '../audio/SoundEngine.js';

// ─────────────────────────────────────────────
// 10 CINEMATIC STAGES FROM HARBOUR ARCHITECTURE
// ─────────────────────────────────────────────
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

// Initial mock ledger
const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-9024-ALPHA',
    timestamp: 'Just now',
    sender: 'Current Account (Vault #492)',
    recipient: 'HSBC UK Corporate ●●●● 7721',
    amount: '£12,400.00',
    type: 'Commercial Wire',
    riskScore: 0.02,
    riskLevel: 'LOW',
    stage: 'Final Convergence',
    status: 'SETTLED',
    route: 'Direct Clearing > Harbour Shield > FastPay',
    hash: '0x8f2c...419a',
  },
  {
    id: 'TXN-8812-BETA',
    timestamp: '3 mins ago',
    sender: 'Treasury Reserve #10',
    recipient: 'Barclays Tier-1 Clearing',
    amount: '£45,000.00',
    type: 'Escrow Reserve',
    riskScore: 0.01,
    riskLevel: 'LOW',
    stage: 'Trusted Nodes',
    status: 'SETTLED',
    route: 'Multi-Sig > 5 Node Quorum > FedWire',
    hash: '0x3a91...bc02',
  },
  {
    id: 'TXN-7641-GAMMA',
    timestamp: '12 mins ago',
    sender: 'Mobile Wallet (Harish S)',
    recipient: 'Electricity Board Utility',
    amount: '£5,000.00',
    type: 'First-time Transfer',
    riskScore: 0.68,
    riskLevel: 'ELEVATED',
    stage: 'Zero-G Pause',
    status: 'PAUSED / REVIEW',
    route: 'Acoustic Verification Required > Trusted Sync',
    hash: '0xd71e...88f3',
  },
  {
    id: 'TXN-6590-DELTA',
    timestamp: '28 mins ago',
    sender: 'Merchant Gateway',
    recipient: 'Lloyds Private Banking',
    amount: '£890.50',
    type: 'Supplier Settlement',
    riskScore: 0.04,
    riskLevel: 'LOW',
    stage: 'Protection Barrier',
    status: 'SETTLED',
    route: 'Harbour Vault Barrier > Automated Clearing',
    hash: '0x5c42...99e1',
  },
  {
    id: 'TXN-5401-EPSILON',
    timestamp: '1 hour ago',
    sender: 'External API Ingress',
    recipient: 'Offshore Unverified Hash',
    amount: '£18,250.00',
    type: 'Unrecognized Node Request',
    riskScore: 0.94,
    riskLevel: 'CRITICAL',
    stage: 'Risk Scanner',
    status: 'INTERCEPTED & BLOCKED',
    route: 'Heuristic Laser Intercept > Threat Vault',
    hash: '0x19bb...a744',
  },
];

export default function HarbourPortal({ onClose, onJumpToStage }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('biometric'); // 'biometric' | 'passkey'
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authProgress, setAuthProgress] = useState(0);
  const [operatorName, setOperatorName] = useState('harishgolem');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'ledger' | 'stages' | 'scanner'

  // Transactions State
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Interactive Payment Simulator State
  const [simAmount, setSimAmount] = useState('7500');
  const [simRecipient, setSimRecipient] = useState('Revolut International ●●●● 3891');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState(null);

  // ─────────────────────────────────────────────
  // AUTHENTICATION HANDLERS
  // ─────────────────────────────────────────────
  const handleBiometricScan = () => {
    setIsAuthenticating(true);
    setAuthProgress(0);
    soundEngine.playRadarPing(600, 0.08);

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setAuthProgress(current);
      soundEngine.playLaserSweep(0.05);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsAuthenticating(false);
          setIsAuthenticated(true);
          soundEngine.playHarmonicResonance([392, 523.25, 659.25, 783.99], 0.25, 2.2);
        }, 300);
      }
    }, 120);
  };

  const handleInstantDemoLogin = () => {
    soundEngine.playWarp(0.2);
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    soundEngine.playClick(220, 0.1);
    setIsAuthenticated(false);
    setSelectedTxn(null);
  };

  // ─────────────────────────────────────────────
  // SIMULATOR HANDLERS
  // ─────────────────────────────────────────────
  const handleTriggerSimPayment = (e) => {
    e.preventDefault();
    if (!simAmount) return;
    setIsSimulating(true);
    setSimResult(null);
    soundEngine.playLaserSweep(0.15);

    setTimeout(() => {
      const numAmount = parseFloat(simAmount) || 1000;
      const isRisky = numAmount > 10000 || simRecipient.toLowerCase().includes('unknown');
      const riskScore = isRisky ? 0.74 : 0.03;

      const newTxn = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}-SIM`,
        timestamp: 'Just now',
        sender: `${operatorName} Vault`,
        recipient: simRecipient,
        amount: `£${numAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`,
        type: isRisky ? 'High-Risk Escrow Hold' : 'Standard Protected Wire',
        riskScore,
        riskLevel: isRisky ? 'ELEVATED' : 'LOW',
        stage: isRisky ? 'Zero-G Pause' : 'Final Convergence',
        status: isRisky ? 'PAUSED / REVIEW' : 'SETTLED',
        route: isRisky ? 'Acoustic Intent Deliberation Required' : 'Instant Harbour Encrypted Transit',
        hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
      };

      setTransactions((prev) => [newTxn, ...prev]);
      setIsSimulating(false);
      setSimResult(newTxn);

      if (isRisky) {
        soundEngine.playGlassTone(320, 0.2, 1.5);
      } else {
        soundEngine.playHarmonicResonance([440, 554.37, 659.25], 0.2, 1.8);
      }
    }, 900);
  };

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchesSearch =
        txn.id.toLowerCase().includes(filterQuery.toLowerCase()) ||
        txn.recipient.toLowerCase().includes(filterQuery.toLowerCase()) ||
        txn.sender.toLowerCase().includes(filterQuery.toLowerCase());
      const matchesStatus = filterStatus === 'ALL' || txn.status.includes(filterStatus);
      return matchesSearch && matchesStatus;
    });
  }, [transactions, filterQuery, filterStatus]);

  // Stage Jump Handler
  const handleJumpToScene = (stageId) => {
    soundEngine.playWarp(0.25);
    onJumpToStage(stageId);
  };

  return (
    <div id="harbour-portal" className="portal-overlay fade-in">
      <div className="portal-backdrop" onClick={onClose} />

      <div className="portal-modal-container">
        {/* Top Portal Header */}
        <header className="portal-header">
          <div className="portal-brand">
            <div className="portal-shield-badge">
              <Shield className="w-5 h-5 text-cyan" />
            </div>
            <div>
              <div className="portal-title-row">
                <span className="portal-title font-hero">HARBOUR</span>
                <span className="portal-ver-pill">v2.4 SECURE CITADEL</span>
              </div>
              <p className="portal-sub">Autonomous Real-Time Escrow & Heuristic Shielding Grid</p>
            </div>
          </div>

          <div className="portal-header-actions">
            {isAuthenticated && (
              <div className="operator-chip">
                <div className="operator-dot" />
                <span className="operator-label">OPERATOR:</span>
                <span className="operator-name">@{operatorName}</span>
                <button
                  onClick={handleSignOut}
                  className="portal-signout-btn"
                  title="Lock Session / Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={() => {
                soundEngine.playClick(400, 0.08);
                onClose();
              }}
              className="portal-close-btn"
              data-hover
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO 3D EXPERIENCE</span>
            </button>
          </div>
        </header>

        {/* ───────────────────────────────────────────── */}
        {/* VIEW A: BIOMETRIC / CIPHER SIGN-IN VIEW       */}
        {/* ───────────────────────────────────────────── */}
        {!isAuthenticated ? (
          <div className="portal-auth-view fade-in">
            <div className="auth-card">
              <div className="auth-radar-halo">
                <div className="radar-circle ring-1" />
                <div className="radar-circle ring-2" />
                <div className="radar-circle ring-3" />
                <div className="auth-icon-wrap">
                  {authMode === 'biometric' ? (
                    <Fingerprint className="w-12 h-12 text-cyan animate-pulse" />
                  ) : (
                    <Key className="w-12 h-12 text-emerald animate-pulse" />
                  )}
                </div>
              </div>

              <div className="auth-text-block">
                <span className="auth-kicker font-mono text-cyan">SECURE ENCLAVE ENTRANCE</span>
                <h2 className="auth-heading font-hero">Identity Deliberation</h2>
                <p className="auth-sub">
                  Cryptographic authorization required to access Harbour ledger records, threat
                  scanner metrics, and architectural telemetry.
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="auth-mode-switch">
                <button
                  className={`auth-mode-btn ${authMode === 'biometric' ? 'active' : ''}`}
                  onClick={() => {
                    soundEngine.playClick(500, 0.05);
                    setAuthMode('biometric');
                  }}
                >
                  <Fingerprint className="w-4 h-4" />
                  <span>Biometric Passkey</span>
                </button>
                <button
                  className={`auth-mode-btn ${authMode === 'passkey' ? 'active' : ''}`}
                  onClick={() => {
                    soundEngine.playClick(600, 0.05);
                    setAuthMode('passkey');
                  }}
                >
                  <Key className="w-4 h-4" />
                  <span>Ledger Hardware Token</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="auth-actions-group">
                <button
                  onClick={handleBiometricScan}
                  disabled={isAuthenticating}
                  className="auth-primary-btn"
                  data-hover
                >
                  {isAuthenticating ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>AUTHENTICATING VOICE & WAVEFORM ({authProgress}%)...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4" />
                      <span>VERIFY IDENTITY & ENTER</span>
                    </div>
                  )}
                </button>

                <button
                  onClick={handleInstantDemoLogin}
                  className="auth-secondary-btn"
                  data-hover
                >
                  <Zap className="w-3.5 h-3.5 text-amber" />
                  <span>QUICK ACCESS (DEMO OPERATOR)</span>
                </button>
              </div>

              {/* Security badges footer */}
              <div className="auth-footer-badges">
                <div className="badge-item">
                  <Lock className="w-3 h-3 text-cyan" />
                  <span>256-BIT QUANTUM VAULT</span>
                </div>
                <div className="badge-item">
                  <Activity className="w-3 h-3 text-emerald" />
                  <span>ACOUSTIC SHIELD ACTIVE</span>
                </div>
                <div className="badge-item">
                  <CheckCircle2 className="w-3 h-3 text-cyan" />
                  <span>£0.00 HISTORIC FRAUD</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ───────────────────────────────────────────── */
          /* VIEW B: HARBOUR COMMAND CENTER DASHBOARD      */
          /* ───────────────────────────────────────────── */
          <div className="portal-dashboard-view fade-in">
            {/* Nav Tabs */}
            <div className="dashboard-nav-tabs">
              <button
                className={`dash-tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => {
                  soundEngine.playClick(450, 0.05);
                  setActiveTab('overview');
                }}
              >
                <Activity className="w-4 h-4" />
                <span>COMMAND OVERVIEW</span>
              </button>
              <button
                className={`dash-tab ${activeTab === 'ledger' ? 'active' : ''}`}
                onClick={() => {
                  soundEngine.playClick(500, 0.05);
                  setActiveTab('ledger');
                }}
              >
                <FileText className="w-4 h-4" />
                <span>TRANSACTION LEDGER & RISK MATRIX</span>
                <span className="tab-pill">{transactions.length}</span>
              </button>
              <button
                className={`dash-tab ${activeTab === 'stages' ? 'active' : ''}`}
                onClick={() => {
                  soundEngine.playClick(550, 0.05);
                  setActiveTab('stages');
                }}
              >
                <Compass className="w-4 h-4" />
                <span>10-STAGE TELEMETRY INSPECTOR</span>
                <span className="tab-pill">10 SCENES</span>
              </button>
            </div>

            {/* TAB CONTENT 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="tab-panel overview-panel fade-in">
                {/* 4 Big Metrics Cards */}
                <div className="stats-metric-grid">
                  <div className="metric-box box-cyan">
                    <div className="metric-icon-row">
                      <Shield className="w-5 h-5 text-cyan" />
                      <span className="metric-tag">TOTAL FRAUD LOSSES</span>
                    </div>
                    <div className="metric-large-num text-cyan">£0.00</div>
                    <div className="metric-sub">100% Guaranteed Escrow Containment</div>
                  </div>

                  <div className="metric-box box-amber">
                    <div className="metric-icon-row">
                      <Zap className="w-5 h-5 text-amber" />
                      <span className="metric-tag">BURST VELOCITY</span>
                    </div>
                    <div className="metric-large-num text-amber">631.5 GBP/S</div>
                    <div className="metric-sub">Peak Throughput across 34 Nodes</div>
                  </div>

                  <div className="metric-box box-emerald">
                    <div className="metric-icon-row">
                      <CheckCircle2 className="w-5 h-5 text-emerald" />
                      <span className="metric-tag">ACOUSTIC SHIELD</span>
                    </div>
                    <div className="metric-large-num text-emerald">24/7 ACTIVE</div>
                    <div className="metric-sub">Continuous Real-Time Harmonic Polling</div>
                  </div>

                  <div className="metric-box box-purple">
                    <div className="metric-icon-row">
                      <Lock className="w-5 h-5 text-purple" />
                      <span className="metric-tag">ENCRYPTED VAULT</span>
                    </div>
                    <div className="metric-large-num text-purple">100% SECURE</div>
                    <div className="metric-sub">Zero Attack Penetration Detected</div>
                  </div>
                </div>

                {/* Split Row: Interactive Payment Simulator & Active Threat Monitor */}
                <div className="overview-split-row">
                  {/* Real-time Payment Simulator */}
                  <div className="dashboard-card sim-card">
                    <div className="card-header-row">
                      <div className="card-title-group">
                        <Sliders className="w-4 h-4 text-cyan" />
                        <h3 className="card-title">Initiate Protected Transfer & Risk Scan</h3>
                      </div>
                      <span className="badge-live-dot">LIVE SIMULATOR</span>
                    </div>
                    <p className="card-desc">
                      Dispatch an escrow wire to experience Harbour’s instant heuristic inspection
                      and deliberate Zero-G pause safety hold.
                    </p>

                    <form onSubmit={handleTriggerSimPayment} className="sim-form">
                      <div className="input-field-wrap">
                        <label className="input-label">TRANSFER AMOUNT (GBP)</label>
                        <div className="input-prefix-box">
                          <span className="input-prefix">£</span>
                          <input
                            type="number"
                            value={simAmount}
                            onChange={(e) => setSimAmount(e.target.value)}
                            placeholder="Enter amount..."
                            className="text-input"
                            required
                          />
                        </div>
                      </div>

                      <div className="input-field-wrap">
                        <label className="input-label">BENEFICIARY / COUNTERPARTY</label>
                        <input
                          type="text"
                          value={simRecipient}
                          onChange={(e) => setSimRecipient(e.target.value)}
                          placeholder="Beneficiary name or IBAN hash..."
                          className="text-input"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSimulating}
                        className="btn-trigger-scan"
                        data-hover
                      >
                        {isSimulating ? (
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>LASER SCANNING ANOMALIES & AUDITING...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Zap className="w-4 h-4" />
                            <span>DISPATCH TRANSFER THROUGH HARBOUR</span>
                          </div>
                        )}
                      </button>
                    </form>

                    {simResult && (
                      <div
                        className={`sim-result-box ${
                          simResult.riskLevel === 'ELEVATED' ? 'result-warning' : 'result-success'
                        } fade-in`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-mono text-xs">
                            {simResult.riskLevel === 'ELEVATED' ? (
                              <AlertTriangle className="w-4 h-4 text-amber" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4 text-emerald" />
                            )}
                            <span className="font-bold">{simResult.id}</span>
                            <span>· {simResult.type}</span>
                          </div>
                          <span className="risk-pill-sm">
                            RISK SCORE: {simResult.riskScore.toFixed(2)}
                          </span>
                        </div>
                        <div className="sim-result-route font-mono text-xs mt-1">
                          ROUTE: {simResult.route}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Active Protection Fortress Status */}
                  <div className="dashboard-card status-card">
                    <div className="card-header-row">
                      <div className="card-title-group">
                        <Shield className="w-4 h-4 text-emerald" />
                        <h3 className="card-title">Harbour Citadel Topology</h3>
                      </div>
                      <span className="badge-status-active">HEALTH OPTIMAL</span>
                    </div>

                    <div className="topology-visual-box">
                      <div className="radar-grid-bg" />
                      <div className="core-node">
                        <Shield className="w-8 h-8 text-cyan animate-pulse" />
                        <span className="node-text">ZERO-G VAULT</span>
                      </div>
                      <div className="orbit-node node-1">
                        <span className="orbit-dot" />
                        <span>BANK CONSENSUS</span>
                      </div>
                      <div className="orbit-node node-2">
                        <span className="orbit-dot" />
                        <span>ACOUSTIC POLICIES</span>
                      </div>
                      <div className="orbit-node node-3">
                        <span className="orbit-dot" />
                        <span>HEURISTIC LASERS</span>
                      </div>
                    </div>

                    <div className="topology-stats-list">
                      <div className="topo-item">
                        <span className="topo-key">Active Escrow Contracts:</span>
                        <span className="topo-val font-mono text-cyan">4 Active</span>
                      </div>
                      <div className="topo-item">
                        <span className="topo-key">Acoustic Shield Status:</span>
                        <span className="topo-val font-mono text-emerald">Harmonic Locked</span>
                      </div>
                      <div className="topo-item">
                        <span className="topo-key">Consensus Quorum:</span>
                        <span className="topo-val font-mono text-white">5/5 Nodes Validated</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: TRANSACTION LEDGER & RISK MATRIX */}
            {activeTab === 'ledger' && (
              <div className="tab-panel ledger-panel fade-in">
                {/* Search & Filter Toolbar */}
                <div className="ledger-toolbar">
                  <div className="search-box">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by ID, beneficiary, account..."
                      value={filterQuery}
                      onChange={(e) => setFilterQuery(e.target.value)}
                      className="search-input"
                    />
                  </div>

                  <div className="status-filter-pills">
                    {['ALL', 'SETTLED', 'REVIEW', 'BLOCKED'].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          soundEngine.playClick(600, 0.04);
                          setFilterStatus(status);
                        }}
                        className={`filter-pill ${filterStatus === status ? 'active' : ''}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transactions Table / List */}
                <div className="ledger-table-wrap">
                  <table className="ledger-table">
                    <thead>
                      <tr>
                        <th>TXN ID</th>
                        <th>BENEFICIARY & SENDER</th>
                        <th>AMOUNT</th>
                        <th>RISK FACTOR</th>
                        <th>SCENIC STAGE</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((txn) => (
                        <tr
                          key={txn.id}
                          className={selectedTxn?.id === txn.id ? 'row-selected' : ''}
                        >
                          <td className="font-mono text-xs text-cyan font-semibold">{txn.id}</td>
                          <td>
                            <div className="text-white font-medium text-xs">{txn.recipient}</div>
                            <div className="text-slate-400 text-[11px]">{txn.sender}</div>
                          </td>
                          <td className="font-mono text-xs font-bold text-white">{txn.amount}</td>
                          <td>
                            <div className="flex items-center gap-2">
                              <span
                                className={`risk-tag text-[10px] font-mono font-bold ${
                                  txn.riskLevel === 'CRITICAL'
                                    ? 'risk-crit'
                                    : txn.riskLevel === 'ELEVATED'
                                    ? 'risk-warn'
                                    : 'risk-safe'
                                }`}
                              >
                                {txn.riskLevel} ({(txn.riskScore * 100).toFixed(0)}%)
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="stage-pill font-mono text-[11px]">{txn.stage}</span>
                          </td>
                          <td>
                            <span
                              className={`status-pill ${
                                txn.status.includes('SETTLED')
                                  ? 'status-settled'
                                  : txn.status.includes('REVIEW')
                                  ? 'status-review'
                                  : 'status-blocked'
                              }`}
                            >
                              {txn.status}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                soundEngine.playClick(700, 0.06);
                                setSelectedTxn(txn);
                              }}
                              className="btn-inspect-txn"
                            >
                              INSPECT
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Selected Transaction Deep Inspection Modal/Drawer */}
                {selectedTxn && (
                  <div className="txn-inspection-card fade-in">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-cyan" />
                        <h4 className="font-hero text-sm text-white">
                          HEURISTIC VECTOR AUDIT: {selectedTxn.id}
                        </h4>
                      </div>
                      <button
                        onClick={() => setSelectedTxn(null)}
                        className="text-xs text-slate-400 hover:text-white font-mono"
                      >
                        CLOSE [ESC]
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div className="audit-detail">
                        <span className="audit-label">LEDGER HASH:</span>
                        <span className="audit-val font-mono text-cyan">{selectedTxn.hash}</span>
                      </div>
                      <div className="audit-detail">
                        <span className="audit-label">ESCROW ROUTING PATH:</span>
                        <span className="audit-val text-white">{selectedTxn.route}</span>
                      </div>
                      <div className="audit-detail">
                        <span className="audit-label">SAFETY DECISION:</span>
                        <span className="audit-val font-bold text-emerald">
                          {selectedTxn.status}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 3: 10-STAGE TELEMETRY INSPECTOR */}
            {activeTab === 'stages' && (
              <div className="tab-panel stages-panel fade-in">
                <div className="stages-intro-bar">
                  <div>
                    <h3 className="font-hero text-base text-white">
                      10-Stage Autonomous Protection Arc
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">
                      The exact architectural stages detailed in Harbour documentation. Click{' '}
                      <strong>"FLY TO 3D SCENE"</strong> to close the portal and teleport the camera
                      directly to that scene in the background experience.
                    </p>
                  </div>
                </div>

                <div className="stages-cards-grid">
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
                          onClick={() => handleJumpToScene(stg.id)}
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}
