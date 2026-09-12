import React, { useState, useEffect } from 'react';
import {
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Plus,
  Info,
  Sliders,
  ArrowRight
} from 'lucide-react';
import soundEngine from '../../audio/SoundEngine.js';
import { INITIAL_PAUSED_TRANSACTIONS } from '../../data/mockData.js';

export default function HarborPauseView({
  pausedTransactions = INITIAL_PAUSED_TRANSACTIONS,
  onCancelPausedTxn,
  onResumePausedTxn,
  onAddNewPause,
}) {
  const [items, setItems] = useState(pausedTransactions);
  const [showNewPauseModal, setShowNewPauseModal] = useState(false);
  const [confirmResumeItem, setConfirmResumeItem] = useState(null);

  // New pause form
  const [newRecipient, setNewRecipient] = useState('');
  const [newAmount, setNewAmount] = useState('4500');
  const [newDuration, setNewDuration] = useState(900); // default 15 mins (in seconds)
  const [newReason, setNewReason] = useState('Unverified recipient account number verification hold');

  // Sync with prop when passed
  useEffect(() => {
    setItems(pausedTransactions);
  }, [pausedTransactions]);

  // Real-time ticking countdown timer (every second)
  useEffect(() => {
    const timer = setInterval(() => {
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.remainingSeconds > 0) {
            return { ...item, remainingSeconds: item.remainingSeconds - 1 };
          }
          return item;
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds) => {
    if (totalSeconds <= 0) return '00:00:00 (Ready to Resume)';
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const pad = (n) => String(n).padStart(2, '0');
    if (hrs > 0) {
      return `${pad(hrs)}h ${pad(mins)}m ${pad(secs)}s`;
    }
    return `${pad(mins)}m ${pad(secs)}s`;
  };

  const handleCreatePause = (e) => {
    e.preventDefault();
    if (!newRecipient.trim() || !newAmount) return;

    soundEngine.playLaserSweep(0.1);
    const newItem = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}-PAUSE`,
      recipient: newRecipient,
      amount: `£${parseFloat(newAmount).toLocaleString('en-GB', { minimumFractionDigits: 2 })}`,
      originalRiskScore: 65,
      riskCategory: 'ELEVATED',
      reason: newReason,
      totalSeconds: parseInt(newDuration, 10),
      remainingSeconds: parseInt(newDuration, 10),
      pausedAt: new Date().toLocaleString(),
      suggestedAction: 'Wait for cooldown period to elapse, confirm invoice with recipient, then release.',
    };

    setItems((prev) => [newItem, ...prev]);
    if (onAddNewPause) onAddNewPause(newItem);

    setShowNewPauseModal(false);
    setNewRecipient('');
    setNewAmount('');
  };

  const handleConfirmResume = () => {
    if (!confirmResumeItem) return;
    soundEngine.playHarmonicResonance([440, 554.37, 659.25], 0.25, 2.0);
    setItems((prev) => prev.filter((i) => i.id !== confirmResumeItem.id));
    if (onResumePausedTxn) onResumePausedTxn(confirmResumeItem);
    setConfirmResumeItem(null);
  };

  const handleCancel = (itemId) => {
    soundEngine.playClick(240, 0.1);
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    if (onCancelPausedTxn) onCancelPausedTxn(itemId);
  };

  return (
    <div className="harbor-pause-container fade-in">
      {/* Header */}
      <div className="pause-header-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="pause-icon-box">
              <Clock className="w-6 h-6 text-amber" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hero text-xl text-white font-bold">HARBOR Pause — Cooldown Vault</h2>
                <span className="badge-cooldown-live">QUANTUM TIME-LOCK ACTIVE</span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">
                Voluntary and heuristic cool-down quarantine preventing high-pressure impulsive wires. Funds
                remain fully reserved and protected in your custody.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowNewPauseModal(true)}
            className="btn-new-pause"
            data-hover
          >
            <Plus className="w-4 h-4" />
            <span>PAUSE A NEW TRANSACTION</span>
          </button>
        </div>
      </div>

      {/* Paused Items List */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-slate-400 font-semibold">
            CURRENTLY QUARANTINED TRANSACTIONS ({items.length})
          </span>
          <span className="font-mono text-[10px] text-cyan">LIVE SECONDS COUNTDOWN</span>
        </div>

        {items.length === 0 ? (
          <div className="empty-cooldown-card text-center py-12">
            <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="font-hero text-sm text-slate-300">Cooldown Vault is Empty</h4>
            <p className="text-slate-500 text-xs mt-1">
              No transactions are currently held in cooldown. You can voluntarily place any upcoming wire
              in pause for safety.
            </p>
          </div>
        ) : (
          items.map((item) => {
            const isReady = item.remainingSeconds <= 0;
            const progressPercent = Math.max(
              0,
              Math.min(100, ((item.totalSeconds - item.remainingSeconds) / item.totalSeconds) * 100)
            );

            return (
              <div key={item.id} className="paused-item-card">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="pause-timer-glyph">
                      <Clock
                        className={`w-5 h-5 ${isReady ? 'text-emerald' : 'text-amber animate-spin'}`}
                        style={{ animationDuration: '6s' }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan">{item.id}</span>
                        <span className="text-xs text-slate-400">· Paused at {item.pausedAt}</span>
                      </div>
                      <h4 className="font-hero text-base text-white mt-0.5">{item.recipient}</h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-hero text-xl font-bold text-white">{item.amount}</div>
                      <span className="font-mono text-[10px] text-amber">
                        ORIGINAL RISK: {item.originalRiskScore}%
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCancel(item.id)}
                        className="btn-pause-cancel"
                        title="Cancel transfer and return funds immediately"
                      >
                        <XCircle className="w-3.5 h-3.5 text-[#ff0055]" />
                        <span>CANCEL</span>
                      </button>

                      <button
                        onClick={() => setConfirmResumeItem(item)}
                        className={`btn-pause-resume ${isReady ? 'ready' : ''}`}
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>RESUME</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Countdown Timer Bar */}
                <div className="mt-3">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-mono text-[11px] text-slate-400">REMAINING COOLDOWN TIME:</span>
                    <span
                      className={`font-mono text-xs font-bold ${
                        isReady ? 'text-emerald' : 'text-amber'
                      }`}
                    >
                      {formatTimer(item.remainingSeconds)}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        isReady ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Reason & Advisory */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/5 text-xs">
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 block">REASON FOR PAUSE:</span>
                    <p className="text-slate-300 text-xs mt-0.5">{item.reason}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-emerald block">SUGGESTED ACTION:</span>
                    <p className="text-emerald-300/90 text-xs mt-0.5">{item.suggestedAction}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Confirmation Modal Before Resuming */}
      {confirmResumeItem && (
        <div className="pause-modal-backdrop fade-in">
          <div className="pause-modal-card">
            <div className="flex items-center gap-2 text-amber mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h4 className="font-hero text-sm text-white font-bold">
                Confirm Transaction Resumption
              </h4>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              You are about to release <strong>{confirmResumeItem.amount}</strong> to{' '}
              <strong>{confirmResumeItem.recipient}</strong>.
            </p>
            <div className="my-3 p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200">
              <strong>Deliberation Checklist:</strong> Have you verbally confirmed the bank details with the
              recipient? If any doubt remains, cancel the transaction instead.
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setConfirmResumeItem(null)}
                className="btn-secondary-sm"
              >
                Keep in Cooldown
              </button>
              <button
                onClick={handleConfirmResume}
                className="btn-primary-sm"
              >
                Confirm & Dispatch Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Pause Modal */}
      {showNewPauseModal && (
        <div className="pause-modal-backdrop fade-in">
          <div className="pause-modal-card">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2 font-hero text-sm text-white font-bold">
                <Clock className="w-4 h-4 text-amber" />
                <span>PLACE NEW TRANSACTION IN HARBOR PAUSE</span>
              </div>
              <button
                onClick={() => setShowNewPauseModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePause} className="space-y-3">
              <div className="form-group">
                <label className="form-label" htmlFor="new-p-rec">
                  <span>BENEFICIARY</span>
                </label>
                <input
                  id="new-p-rec"
                  type="text"
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  placeholder="e.g. Overseas Vendor or Supplier"
                  className="form-input"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="new-p-amt">
                    <span>AMOUNT (GBP)</span>
                  </label>
                  <input
                    id="new-p-amt"
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="4500"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="new-p-dur">
                    <span>COOLDOWN DURATION</span>
                  </label>
                  <select
                    id="new-p-dur"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="form-select"
                  >
                    <option value="300">5 Minutes (Quick verification)</option>
                    <option value="900">15 Minutes (Recommended)</option>
                    <option value="3600">1 Hour (High-value review)</option>
                    <option value="86400">24 Hours (Full day hold)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="new-p-reason">
                  <span>REASON FOR COOLDOWN</span>
                </label>
                <input
                  id="new-p-reason"
                  type="text"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  placeholder="e.g. Waiting for phone confirmation..."
                  className="form-input"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewPauseModal(false)}
                  className="btn-secondary-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary-sm">
                  Activate Time-Lock Cooldown
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
