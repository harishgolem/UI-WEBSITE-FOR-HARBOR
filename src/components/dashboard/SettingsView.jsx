import React, { useState } from 'react';
import {
  Settings,
  User,
  Shield,
  Key,
  Lock,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Save,
  Bell
} from 'lucide-react';
import soundEngine from '../../audio/SoundEngine.js';

export default function SettingsView({ user, onUpdateUser }) {
  const [name, setName] = useState(user?.name || 'Harish S');
  const [email, setEmail] = useState(user?.email || 'harish.s4268@gmail.com');
  const [phone, setPhone] = useState(user?.phone || '+44 7911 123456');
  const [role, setRole] = useState(user?.role || 'Lead Security Operator');
  const [twoFA, setTwoFA] = useState(user?.twoFactorEnabled !== false);
  const [autoPauseLargeWires, setAutoPauseLargeWires] = useState(true);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    soundEngine.playHarmonicResonance([523.25, 659.25], 0.2, 1.5);
    onUpdateUser({
      ...user,
      name,
      email,
      phone,
      role,
      twoFactorEnabled: twoFA,
    });
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2500);
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset all demo data and reload default transactions?')) {
      localStorage.removeItem('harbour_session');
      window.location.reload();
    }
  };

  return (
    <div className="settings-container fade-in">
      {/* Header */}
      <div className="settings-header-card">
        <div className="flex items-center gap-3">
          <div className="settings-icon-box">
            <Settings className="w-6 h-6 text-cyan" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-hero text-xl text-white font-bold">Platform Settings & Security</h2>
              <span className="badge-shield-live">CONFIG OVERLAY</span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">
              Manage your operator profile, multi-factor cryptographic credentials, and autonomous escrow
              policies.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 mt-6">
        {/* Operator Profile Card */}
        <div className="settings-section-card">
          <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
            <User className="w-4 h-4 text-cyan" />
            <h3 className="font-hero text-sm text-white font-bold">Operator Profile</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label" htmlFor="set-name">
                <span>FULL OPERATOR NAME</span>
              </label>
              <input
                id="set-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="set-email">
                <span>REGISTERED EMAIL</span>
              </label>
              <input
                id="set-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="set-phone">
                <span>SECURITY PHONE NUMBER (FOR SMS 2FA)</span>
              </label>
              <input
                id="set-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="set-role">
                <span>OPERATOR ROLE</span>
              </label>
              <input
                id="set-role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Security & Shield Policies */}
        <div className="settings-section-card">
          <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
            <Shield className="w-4 h-4 text-emerald" />
            <h3 className="font-hero text-sm text-white font-bold">Autonomous Shield Policies</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
              <div>
                <span className="font-mono text-xs text-white font-bold block">
                  TWO-FACTOR AUTHENTICATION (2FA)
                </span>
                <span className="text-slate-400 text-[11px]">
                  Require hardware key or biometric passkey for transfers above £10,000
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={twoFA}
                  onChange={(e) => setTwoFA(e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
              <div>
                <span className="font-mono text-xs text-white font-bold block">
                  AUTO-PAUSE HIGH VALUE WIRES
                </span>
                <span className="text-slate-400 text-[11px]">
                  Automatically route transfers over £5,000 to HARBOR Pause (15-min cooldown)
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={autoPauseLargeWires}
                  onChange={(e) => setAutoPauseLargeWires(e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-3">
          <button
            type="button"
            onClick={handleResetDemo}
            className="btn-danger-outline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>

          <div className="flex items-center gap-3">
            {savedFeedback && (
              <span className="text-emerald text-xs font-mono flex items-center gap-1.5 fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Settings Saved Successfully!</span>
              </span>
            )}
            <button
              type="submit"
              className="btn-primary-sm flex items-center gap-2"
              data-hover
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
