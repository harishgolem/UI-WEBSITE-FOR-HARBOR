import React from 'react';
import {
  TrendingUp,
  Shield,
  Activity,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Sparkles,
  BarChart2
} from 'lucide-react';

export default function TrustAnalyticsView({ user, transactions, trustedContacts }) {
  const totalAmount = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const avgAmount = (totalAmount / (transactions.length || 1)).toFixed(2);
  const trustedCount = transactions.filter((t) => t.recipientTrust === 'TRUSTED_CIRCLE').length;
  const newCount = transactions.filter((t) => t.recipientTrust === 'NEW_UNVERIFIED').length;
  const flaggedCount = transactions.filter((t) => t.flagged).length;
  const pausedCount = transactions.filter((t) => t.paused).length;
  const successRate = (
    (transactions.filter((t) => t.status === 'SETTLED').length / (transactions.length || 1)) *
    100
  ).toFixed(0);

  return (
    <div className="trust-analytics-container fade-in">
      {/* Header with Mandatory Disclaimer */}
      <div className="analytics-header-card">
        <div className="flex items-center gap-3">
          <div className="analytics-icon-box">
            <TrendingUp className="w-6 h-6 text-emerald" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-hero text-xl text-white font-bold">My Trust Profile & Behavioral Analytics</h2>
              <span className="demo-tag">SIMULATED ANALYTICS</span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">
              Simulated behavioral safety metrics assessing transfer frequency, counterparty verification, and
              escrow discipline.
            </p>
          </div>
        </div>

        {/* Mandatory Explicit Character / Creditworthiness Disclaimer */}
        <div className="mandatory-disclaimer-box mt-3">
          <Info className="w-4 h-4 text-amber shrink-0" />
          <span className="text-[11px] text-amber-200 font-mono">
            <strong>IMPORTANT NOTICE:</strong> This is a DEMO trust analytics system. It does not determine
            real-world character, moral integrity, or creditworthiness. The score strictly represents
            simulated safety discipline within HARBOR.
          </span>
        </div>
      </div>

      {/* Main Score & Radar Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-6">
        {/* Left Trust Score Gauge (5 Cols) */}
        <div className="lg:col-span-5 trust-profile-card flex flex-col items-center text-center p-6">
          <span className="font-mono text-xs text-cyan font-bold tracking-widest block mb-4">
            HARBOR TRUST INDEX
          </span>

          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="68"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="68"
                stroke="url(#trustGradLarge)"
                strokeWidth="12"
                fill="none"
                strokeDasharray="427"
                strokeDashoffset={427 - (427 * (user?.trustScore || 92)) / 100}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="trustGradLarge" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#00ff9d" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-hero text-4xl font-extrabold text-white">
                {user?.trustScore || 92}
              </span>
              <span className="font-mono text-xs text-slate-400">OUT OF 100</span>
            </div>
          </div>

          <div className="mt-3">
            <span className="badge-citadel-status">TIER 1 CITADEL SAFEGUARD</span>
            <p className="text-slate-400 text-xs mt-2 max-w-xs">
              Your simulated profile demonstrates steady transfer frequency and proactive quarantine of
              unfamiliar accounts.
            </p>
          </div>
        </div>

        {/* Right Behavioral Insight Highlights (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="behavioral-insight-card">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-cyan" />
              <h4 className="font-hero text-sm text-white">Recent Behavioral Pattern Analysis</h4>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              "Your simulated risk profile improved by <strong>+4 points</strong> over the past 30 days because{' '}
              <strong>75%</strong> of total transfer volume was routed through verified <em>Trusted Circle</em> contacts.
              Additionally, an elevated risk anomaly was deliberately quarantined in <em>HARBOR Pause</em>."
            </p>
          </div>

          {/* 4 Analytics Pillars */}
          <div className="grid grid-cols-2 gap-3">
            <div className="analytics-mini-box">
              <span className="font-mono text-[10px] text-slate-400 block">AVG TRANSFER AMOUNT</span>
              <div className="font-hero text-lg font-bold text-white mt-1">
                £{parseFloat(avgAmount).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </div>
              <span className="text-slate-500 text-[10px]">Within normal personal baseline</span>
            </div>

            <div className="analytics-mini-box">
              <span className="font-mono text-[10px] text-slate-400 block">TRUSTED CIRCLE UTILIZATION</span>
              <div className="font-hero text-lg font-bold text-emerald mt-1">
                {trustedCount} of {transactions.length} Transfers
              </div>
              <span className="text-emerald-400 text-[10px]">High safety consistency</span>
            </div>

            <div className="analytics-mini-box">
              <span className="font-mono text-[10px] text-slate-400 block">SETTLEMENT SUCCESS RATE</span>
              <div className="font-hero text-lg font-bold text-cyan mt-1">{successRate}%</div>
              <span className="text-slate-500 text-[10px]">Zero irreversible fraud losses</span>
            </div>

            <div className="analytics-mini-box">
              <span className="font-mono text-[10px] text-slate-400 block">PROACTIVE PAUSE RATE</span>
              <div className="font-hero text-lg font-bold text-amber mt-1">
                {pausedCount + flaggedCount} Quarantined
              </div>
              <span className="text-slate-500 text-[10px]">Heuristic deliberations logged</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cadence Statistics: Daily, Weekly, Monthly */}
      <div className="cadence-section mt-6">
        <div className="section-header-row mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan" />
            <h3 className="font-hero text-base text-white">Transfer Frequency & Temporal Cadence</h3>
          </div>
          <span className="font-mono text-[10px] text-slate-400">HISTORICAL CADENCE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="cadence-card">
            <span className="font-mono text-xs text-slate-400">DAILY ACTIVITY</span>
            <div className="font-hero text-xl font-bold text-white mt-1">0.4 transfers / day</div>
            <p className="text-slate-400 text-xs mt-1">
              Low steady cadence. Zero unexpected velocity spikes detected in last 24h.
            </p>
          </div>

          <div className="cadence-card">
            <span className="font-mono text-xs text-slate-400">WEEKLY AGGREGATE</span>
            <div className="font-hero text-xl font-bold text-cyan mt-1">£18,900.00 / week</div>
            <p className="text-slate-400 text-xs mt-1">
              Aligned with scheduled supplier invoices and verified family support wires.
            </p>
          </div>

          <div className="cadence-card">
            <span className="font-mono text-xs text-slate-400">MONTHLY VOLUME</span>
            <div className="font-hero text-xl font-bold text-emerald mt-1">
              £{totalAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 })} / month
            </div>
            <p className="text-slate-400 text-xs mt-1">
              100% covered under continuous autonomous escrow protection.
            </p>
          </div>
        </div>
      </div>

      {/* Financial Safety Recommendations */}
      <div className="safety-recommendations-card mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-cyan" />
          <h4 className="font-hero text-sm text-white font-bold">
            Simulated Financial Safety Recommendations
          </h4>
        </div>
        <div className="space-y-2 text-xs">
          <div className="rec-item">
            <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
            <span className="text-slate-300">
              <strong>Add Recurring Utilities to Trusted Circle:</strong> Adding the Electricity Board account
              to your verified circle after verification will eliminate future pause friction.
            </span>
          </div>
          <div className="rec-item">
            <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
            <span className="text-slate-300">
              <strong>Enforce 24-Hour Cooldown on Institutional Wires:</strong> For transfers above £20,000,
              enable dual-signer multi-signature quorum for maximum containment.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
