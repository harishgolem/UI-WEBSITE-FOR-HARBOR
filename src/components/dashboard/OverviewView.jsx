import React from 'react';
import {
  Shield,
  Zap,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  TrendingUp,
  Activity,
  Users,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import soundEngine from '../../audio/SoundEngine.js';

export default function OverviewView({
  user,
  transactions,
  pausedCount,
  flaggedCount,
  onNavigateTab,
  onSelectTxn,
}) {
  const totalAmount = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const completedCount = transactions.filter((t) => t.status === 'SETTLED').length;
  const avgRisk = (
    transactions.reduce((sum, t) => sum + (t.riskScore || 0), 0) / (transactions.length || 1)
  ).toFixed(1);

  return (
    <div className="overview-view-container fade-in">
      {/* Top Welcome & Trust Score Hero Banner */}
      <div className="welcome-hero-card">
        <div className="welcome-left">
          <div className="badge-citadel-status">
            <span className="live-pulse-dot" />
            <span>FINANCIAL SAFETY STATUS: SECURED & ARMED</span>
          </div>

          <h1 className="font-hero text-2xl md:text-3xl text-white mt-2 font-extrabold">
            Welcome back, Operator {user?.name || 'Harish'}
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xl font-light">
            Autonomous escrow shielding active. Your funds, outbound wires, and counterparty routes are
            continuously monitored by the HARBOR real-time heuristic radar.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button
              onClick={() => {
                soundEngine.playClick(500, 0.05);
                onNavigateTab('scanner');
              }}
              className="btn-hero-action primary"
              data-hover
            >
              <Search className="w-3.5 h-3.5 text-cyan" />
              <span>SCAN OUTGOING TRANSFER</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playClick(550, 0.05);
                onNavigateTab('pause');
              }}
              className="btn-hero-action secondary"
              data-hover
            >
              <Clock className="w-3.5 h-3.5 text-amber" />
              <span>COOLDOWN VAULT ({pausedCount})</span>
            </button>
          </div>
        </div>

        {/* Right Side: Trust Score Gauge */}
        <div className="trust-score-hero-box">
          <div className="trust-gauge-circle">
            <svg viewBox="0 0 120 120" className="trust-gauge-svg">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="url(#cyanEmeraldGrad)"
                strokeWidth="10"
                fill="none"
                strokeDasharray="314"
                strokeDashoffset={314 - (314 * (user?.trustScore || 92)) / 100}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
              <defs>
                <linearGradient id="cyanEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#00ff9d" />
                </linearGradient>
              </defs>
            </svg>
            <div className="trust-score-inner">
              <span className="trust-num font-hero">{user?.trustScore || 92}</span>
              <span className="trust-denom">/100</span>
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="font-mono text-[10px] text-emerald tracking-wider font-semibold">
              EXEMPLARY SAFETY
            </span>
            <div className="text-slate-400 text-[10px] mt-0.5">Top 3% Platform Tier</div>
          </div>
        </div>
      </div>

      {/* Security Alerts Bar if any flagged */}
      {flaggedCount > 0 && (
        <div className="security-alert-bar">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-amber shrink-0 animate-pulse" />
            <span className="text-xs text-slate-200">
              <strong>ATTENTION:</strong> {flaggedCount} transaction(s) flagged for elevated risk or held in
              HARBOR Pause deliberation.
            </span>
          </div>
          <button
            onClick={() => onNavigateTab('scamshield')}
            className="text-amber hover:text-white font-mono text-xs flex items-center gap-1"
          >
            <span>REVIEW IN SCAM SHIELD</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 4 Core Financial Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        <div className="stat-card box-cyan">
          <div className="stat-header">
            <span className="stat-label">TOTAL FUNDS TRANSFERRED</span>
            <Shield className="w-4 h-4 text-cyan" />
          </div>
          <div className="stat-value font-hero text-cyan">
            £{totalAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="stat-footer">
            <span className="text-emerald text-[11px] font-mono font-medium">£0.00 Fraud Losses</span>
            <span className="text-slate-500 text-[10px]">· 100% Retained</span>
          </div>
        </div>

        <div className="stat-card box-emerald">
          <div className="stat-header">
            <span className="stat-label">SAFE SETTLEMENTS</span>
            <CheckCircle2 className="w-4 h-4 text-emerald" />
          </div>
          <div className="stat-value font-hero text-emerald">
            {completedCount} / {transactions.length}
          </div>
          <div className="stat-footer">
            <span className="text-slate-400 text-[11px]">
              {((completedCount / (transactions.length || 1)) * 100).toFixed(0)}% Successful Clearing
            </span>
          </div>
        </div>

        <div className="stat-card box-amber">
          <div className="stat-header">
            <span className="stat-label">FLAGGED / PAUSED</span>
            <AlertTriangle className="w-4 h-4 text-amber" />
          </div>
          <div className="stat-value font-hero text-amber">{flaggedCount + pausedCount}</div>
          <div className="stat-footer">
            <span className="text-amber text-[11px] font-mono">
              {pausedCount} In Cooldown · {flaggedCount} Blocked
            </span>
          </div>
        </div>

        <div className="stat-card box-purple">
          <div className="stat-header">
            <span className="stat-label">AVG TRANSACTION RISK</span>
            <Activity className="w-4 h-4 text-purple" />
          </div>
          <div className="stat-value font-hero text-purple">{avgRisk}%</div>
          <div className="stat-footer">
            <span className="text-slate-400 text-[11px]">Low Risk Profile Baseline</span>
          </div>
        </div>
      </div>

      {/* Transaction Risk Overview Section */}
      <div className="risk-overview-section mt-6">
        <div className="section-header-row">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan" />
            <h3 className="font-hero text-base text-white">Transaction Risk Overview</h3>
          </div>
          <span className="font-mono text-[10px] text-slate-400">
            UPDATED: JUST NOW · 30-DAY WINDOW
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-3">
          {/* Risk Distribution Card */}
          <div className="risk-dist-card">
            <span className="font-mono text-[11px] text-slate-400 block mb-2">
              RISK DISTRIBUTION CLASSIFICATION
            </span>
            <div className="risk-bars-stack">
              <div className="risk-bar-segment seg-low" style={{ width: '75%' }} title="Low: 75%" />
              <div
                className="risk-bar-segment seg-med"
                style={{ width: '12%' }}
                title="Medium: 12%"
              />
              <div
                className="risk-bar-segment seg-elevated"
                style={{ width: '8%' }}
                title="Elevated: 8%"
              />
              <div
                className="risk-bar-segment seg-crit"
                style={{ width: '5%' }}
                title="Critical: 5%"
              />
            </div>
            <div className="risk-legend-grid mt-3">
              <div className="legend-item">
                <span className="legend-dot bg-[#00ff9d]" />
                <span className="legend-name">Safe / Low (0-24%)</span>
                <span className="legend-val font-mono">75%</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot bg-[#38bdf8]" />
                <span className="legend-name">Medium (25-49%)</span>
                <span className="legend-val font-mono">12%</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot bg-[#ffb700]" />
                <span className="legend-name">Elevated (50-79%)</span>
                <span className="legend-val font-mono">8%</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot bg-[#ff0055]" />
                <span className="legend-name">Critical (80-100%)</span>
                <span className="legend-val font-mono">5%</span>
              </div>
            </div>
          </div>

          {/* Risk Level & Trend Explanation */}
          <div className="risk-explanation-card">
            <span className="font-mono text-[11px] text-slate-400 block mb-1">
              CURRENT AGGREGATE RISK LEVEL
            </span>
            <div className="flex items-center gap-3 mt-2">
              <div className="risk-status-badge font-hero text-emerald bg-emerald-950/30 border border-emerald-500/30">
                LOW RISK
              </div>
              <div className="flex items-center gap-1 font-mono text-xs text-emerald-400">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+0.8% Trust Stability</span>
              </div>
            </div>
            <p className="text-slate-300 text-xs mt-3 leading-relaxed">
              <strong>Why your score changed:</strong> 94% of your recent transactions were routed
              through verified <em>Trusted Circle</em> contacts. One elevated risk transfer (£5,000 to
              Electricity Board) was safely intercepted and quarantined in <em>HARBOR Pause</em>.
            </p>
          </div>

          {/* Quick Actions Card */}
          <div className="quick-actions-card">
            <span className="font-mono text-[11px] text-slate-400 block mb-2">QUICK PLATFORM ACTIONS</span>
            <div className="quick-action-list">
              <button
                onClick={() => onNavigateTab('scanner')}
                className="quick-act-btn"
                data-hover
              >
                <Search className="w-4 h-4 text-cyan" />
                <span>Run Mock AI Risk Scan</span>
                <ChevronRight className="w-3.5 h-3.5 ml-auto text-slate-500" />
              </button>
              <button
                onClick={() => onNavigateTab('circle')}
                className="quick-act-btn"
                data-hover
              >
                <Users className="w-4 h-4 text-emerald" />
                <span>Manage Trusted Circle</span>
                <ChevronRight className="w-3.5 h-3.5 ml-auto text-slate-500" />
              </button>
              <button
                onClick={() => onNavigateTab('talk')}
                className="quick-act-btn"
                data-hover
              >
                <Zap className="w-4 h-4 text-purple" />
                <span>Ask "Talk to HARBOR" Assistant</span>
                <ChevronRight className="w-3.5 h-3.5 ml-auto text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transaction Activity Table */}
      <div className="recent-activity-section mt-6">
        <div className="section-header-row">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan" />
            <h3 className="font-hero text-base text-white">Recent Activity & Risk Audits</h3>
          </div>
          <button
            onClick={() => onNavigateTab('history')}
            className="text-cyan hover:text-white font-mono text-xs flex items-center gap-1"
          >
            <span>VIEW ALL TRANSACTIONS</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="table-responsive-box mt-3">
          <table className="overview-mini-table">
            <thead>
              <tr>
                <th>TRANSACTION</th>
                <th>COUNTERPARTY</th>
                <th>AMOUNT</th>
                <th>SIMULATED RISK</th>
                <th>ESCROW STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map((txn) => (
                <tr key={txn.id}>
                  <td>
                    <div className="font-mono text-xs text-cyan font-semibold">{txn.id}</div>
                    <div className="text-slate-500 text-[10px]">{txn.timestamp}</div>
                  </td>
                  <td>
                    <div className="text-white text-xs font-medium">{txn.recipient}</div>
                    <div className="text-slate-400 text-[10px]">{txn.type}</div>
                  </td>
                  <td className="font-mono text-xs font-bold text-white">
                    {txn.formattedAmount}
                  </td>
                  <td>
                    <span
                      className={`risk-badge-sm ${
                        txn.riskScore >= 80
                          ? 'risk-crit'
                          : txn.riskScore >= 50
                          ? 'risk-warn'
                          : 'risk-safe'
                      }`}
                    >
                      {txn.riskCategory} ({txn.riskScore}%)
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-pill ${
                        txn.status === 'SETTLED'
                          ? 'status-settled'
                          : txn.status === 'PAUSED'
                          ? 'status-review'
                          : 'status-blocked'
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => onSelectTxn(txn)}
                      className="btn-inspect-sm"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
