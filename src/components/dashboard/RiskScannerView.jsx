import React, { useState } from 'react';
import {
  Search,
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sliders,
  RefreshCw,
  Info,
  ArrowRight,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import soundEngine from '../../audio/SoundEngine.js';
import { calculateMockRisk } from '../../data/mockData.js';

export default function RiskScannerView({
  trustedContacts,
  onDispatchToPause,
  onOpenScamShield,
}) {
  const [amount, setAmount] = useState('7500');
  const [recipient, setRecipient] = useState('');
  const [selectedContactId, setSelectedContactId] = useState('');
  const [isNewRecipient, setIsNewRecipient] = useState(true);
  const [recipientTrust, setRecipientTrust] = useState('NEW_UNVERIFIED');
  const [transferFrequency, setTransferFrequency] = useState('NORMAL');
  const [unusualTiming, setUnusualTiming] = useState(false);
  const [recentCount, setRecentCount] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // When a trusted contact is picked from the dropdown
  const handleSelectTrusted = (contactId) => {
    setSelectedContactId(contactId);
    if (!contactId) {
      setIsNewRecipient(true);
      setRecipientTrust('NEW_UNVERIFIED');
      return;
    }
    const contact = trustedContacts.find((c) => c.id === contactId);
    if (contact) {
      setRecipient(contact.name);
      setIsNewRecipient(false);
      setRecipientTrust('TRUSTED_CIRCLE');
    }
  };

  const handleRunAnalysis = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    soundEngine.playLaserSweep(0.12);

    const contact = trustedContacts.find((c) => c.id === selectedContactId);
    const inTrusted = !!contact || recipientTrust === 'TRUSTED_CIRCLE';
    const trustedLvl = contact ? contact.trustLevel : inTrusted ? 90 : 0;

    setTimeout(() => {
      const result = calculateMockRisk({
        amount: parseFloat(amount) || 0,
        recipient: recipient || 'Unknown Recipient',
        recipientTrust,
        isNewRecipient,
        transferFrequency,
        unusualTiming,
        recentCount: parseInt(recentCount, 10) || 1,
        inTrustedCircle: inTrusted,
        trustedLevel: trustedLvl,
      });

      setAnalysisResult(result);
      setIsAnalyzing(false);

      if (result.riskCategory === 'CRITICAL') {
        soundEngine.playGlassTone(280, 0.25, 1.6);
      } else if (result.riskCategory === 'ELEVATED') {
        soundEngine.playGlassTone(390, 0.18, 1.4);
      } else {
        soundEngine.playHarmonicResonance([440, 554.37, 659.25], 0.25, 2.0);
      }
    }, 850);
  };

  return (
    <div className="risk-scanner-container fade-in">
      {/* Header with Mandatory Demo Disclaimer */}
      <div className="scanner-header-card">
        <div className="flex items-center gap-3">
          <div className="scanner-icon-box">
            <Search className="w-6 h-6 text-cyan" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-hero text-xl text-white font-bold">MOCK AI Risk Engine & Scanner</h2>
              <span className="demo-tag">SIMULATED DEMO</span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">
              Simulate real-time heuristic inspection across transfer volume, counterparty history, velocity
              spikes, and trusted circle integration.
            </p>
          </div>
        </div>

        {/* Mandatory Explicit Disclaimer */}
        <div className="mandatory-disclaimer-box mt-3">
          <Info className="w-4 h-4 text-amber shrink-0" />
          <span className="text-[11px] text-amber-200 font-mono">
            <strong>DISCLAIMER:</strong> Demo risk analysis. This simulated engine does not provide real
            financial, fraud, or investment advice. It is a frontend demonstration tool.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left Column: Form Inputs (7 Cols) */}
        <div className="lg:col-span-7 scanner-inputs-card">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
            <Sliders className="w-4 h-4 text-cyan" />
            <h3 className="font-hero text-sm text-white">Transfer Parameters to Evaluate</h3>
          </div>

          <form onSubmit={handleRunAnalysis} className="space-y-4">
            {/* Amount */}
            <div className="form-group">
              <label className="form-label" htmlFor="eval-amount">
                <span>TRANSFER AMOUNT (GBP)</span>
              </label>
              <div className="input-icon-box">
                <span className="font-hero font-bold text-cyan ml-3">£</span>
                <input
                  id="eval-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 5000"
                  className="form-input font-mono"
                  required
                />
              </div>
            </div>

            {/* Quick Pick from Trusted Circle */}
            <div className="form-group">
              <label className="form-label" htmlFor="eval-trusted-pick">
                <span>SELECT FROM TRUSTED CIRCLE (OPTIONAL)</span>
              </label>
              <select
                id="eval-trusted-pick"
                value={selectedContactId}
                onChange={(e) => handleSelectTrusted(e.target.value)}
                className="form-select"
              >
                <option value="">-- Choose verified contact or enter custom below --</option>
                {trustedContacts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.relationship}) — {c.trustLevel}% Trust
                  </option>
                ))}
              </select>
            </div>

            {/* Recipient Input */}
            <div className="form-group">
              <label className="form-label" htmlFor="eval-rec">
                <span>BENEFICIARY / COUNTERPARTY IDENTIFIER</span>
              </label>
              <input
                id="eval-rec"
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Electricity Board or Overseas Crypto Agent"
                className="form-input"
                required
              />
            </div>

            {/* Recipient Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-group">
                <label className="form-label" htmlFor="eval-status">
                  <span>RECIPIENT TRUST PROFILE</span>
                </label>
                <select
                  id="eval-status"
                  value={recipientTrust}
                  onChange={(e) => {
                    setRecipientTrust(e.target.value);
                    if (e.target.value === 'TRUSTED_CIRCLE') setIsNewRecipient(false);
                  }}
                  className="form-select"
                >
                  <option value="TRUSTED_CIRCLE">Trusted Circle Contact (Verified)</option>
                  <option value="NEW_UNVERIFIED">New / First-Time Recipient</option>
                  <option value="SUSPICIOUS">Suspicious Velocity Pattern</option>
                  <option value="CONFIRMED_SCAM">Blacklist Match / Confirmed Scam</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="eval-freq">
                  <span>TRANSFER VELOCITY</span>
                </label>
                <select
                  id="eval-freq"
                  value={transferFrequency}
                  onChange={(e) => setTransferFrequency(e.target.value)}
                  className="form-select"
                >
                  <option value="NORMAL">Standard Frequency (1-2/month)</option>
                  <option value="HIGH">Elevated Burst (3-5 transfers in 24h)</option>
                  <option value="EXTREME">High Velocity (Over 5 transfers in 2 hours)</option>
                </select>
              </div>
            </div>

            {/* Checkbox Toggles */}
            <div className="space-y-2 pt-1">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={unusualTiming}
                  onChange={(e) => setUnusualTiming(e.target.checked)}
                  className="custom-checkbox"
                />
                <span className="checkbox-text">
                  Dormant Hours Transfer (Initiated between 02:00–05:00 UTC)
                </span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isNewRecipient}
                  onChange={(e) => setIsNewRecipient(e.target.checked)}
                  className="custom-checkbox"
                />
                <span className="checkbox-text">
                  First-Time Recipient Account (No prior transaction history)
                </span>
              </label>
            </div>

            {/* Run Analysis Submit */}
            <button
              type="submit"
              disabled={isAnalyzing}
              className="btn-run-scan w-full"
              data-hover
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>SIMULATING HEURISTIC SCANNER & RADAR POLICIES...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>RUN MOCK AI RISK ANALYSIS</span>
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Simulated Analysis Results (5 Cols) */}
        <div className="lg:col-span-5 scanner-results-card">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <h3 className="font-hero text-sm text-white">Simulated Risk Analysis Result</h3>
            <span className="font-mono text-[10px] text-cyan">HEURISTIC ENGINE</span>
          </div>

          {analysisResult ? (
            <div className="space-y-4 fade-in">
              {/* Score Meter & Badge */}
              <div
                className="result-score-banner"
                style={{
                  borderColor: `${analysisResult.badgeColor}40`,
                  background: `${analysisResult.badgeColor}10`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 block">SIMULATED RISK SCORE</span>
                    <div className="font-hero text-3xl font-extrabold" style={{ color: analysisResult.badgeColor }}>
                      {analysisResult.riskScore}
                      <span className="text-sm font-normal text-slate-400">/100</span>
                    </div>
                  </div>
                  <div
                    className="risk-category-pill"
                    style={{
                      borderColor: analysisResult.badgeColor,
                      color: analysisResult.badgeColor,
                    }}
                  >
                    {analysisResult.riskCategory} RISK
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-black/40 mt-3 overflow-hidden">
                  <div
                    className="h-full transition-all duration-700"
                    style={{
                      width: `${analysisResult.riskScore}%`,
                      backgroundColor: analysisResult.badgeColor,
                    }}
                  />
                </div>
              </div>

              {/* Itemized Contributing Factors */}
              <div>
                <span className="font-mono text-[11px] text-slate-400 block mb-2">
                  IDENTIFIED HEURISTIC RISK FACTORS:
                </span>
                <ul className="space-y-2">
                  {analysisResult.factors.map((factor, idx) => (
                    <li key={idx} className="factor-list-item">
                      <AlertCircle className="w-3.5 h-3.5 text-cyan shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 leading-snug">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggested Action & Action Buttons */}
              <div className="suggested-action-box">
                <span className="font-mono text-[10px] text-emerald block mb-1">
                  RECOMMENDED SAFETY ACTION:
                </span>
                <p className="text-xs text-white leading-relaxed">{analysisResult.suggestedAction}</p>

                <div className="flex flex-col gap-2 mt-4">
                  {analysisResult.riskScore >= 50 && (
                    <button
                      onClick={() =>
                        onDispatchToPause({
                          recipient: recipient || 'Beneficiary',
                          amount: `£${parseFloat(amount || 0).toLocaleString()}`,
                          riskScore: analysisResult.riskScore,
                          reason: analysisResult.factors[0] || 'Elevated risk detected by Mock AI Scanner',
                        })
                      }
                      className="btn-action-pause"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Put in HARBOR Pause (Cooldown Vault)</span>
                    </button>
                  )}

                  {analysisResult.riskScore >= 70 && (
                    <button
                      onClick={onOpenScamShield}
                      className="btn-action-shield"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Review in Scam Shield</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-results-box text-center py-12">
              <Search className="w-12 h-12 text-slate-600 mx-auto mb-3 animate-pulse" />
              <h4 className="font-hero text-sm text-slate-300">Awaiting Simulation Parameters</h4>
              <p className="text-slate-500 text-xs mt-1 max-w-xs mx-auto">
                Configure the transfer amount and recipient attributes on the left and click "Run Mock
                AI Risk Analysis".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
