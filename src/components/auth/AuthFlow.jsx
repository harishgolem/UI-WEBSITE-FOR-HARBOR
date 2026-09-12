import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Key,
  Fingerprint,
  Radio,
  ArrowRight,
  RefreshCw,
  Zap,
  HelpCircle,
  X
} from 'lucide-react';
import soundEngine from '../../audio/SoundEngine.js';
import { DEFAULT_USER } from '../../data/mockData.js';

export default function AuthFlow({ onAuthenticated, onCancel }) {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup' | 'biometric'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Sign In Form State
  const [signInIdentifier, setSignInIdentifier] = useState('harishgolem');
  const [signInPassword, setSignInPassword] = useState('citadel-pass-2026');

  // Sign Up Form State
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpRole, setSignUpRole] = useState('Security Operator');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Biometric radar progress
  const [bioProgress, setBioProgress] = useState(0);
  const [isBioScanning, setIsBioScanning] = useState(false);

  // ─────────────────────────────────────────────
  // SIGN IN SUBMISSION
  // ─────────────────────────────────────────────
  const handleSignIn = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!signInIdentifier.trim()) {
      newErrors.identifier = 'Please enter your username or email address';
    }
    if (!signInPassword) {
      newErrors.password = 'Please enter your security password';
    } else if (signInPassword.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      soundEngine.playClick(220, 0.1);
      return;
    }

    setErrors({});
    setIsLoading(true);
    soundEngine.playRadarPing(600, 0.08);

    setTimeout(() => {
      setIsLoading(false);
      const user = {
        ...DEFAULT_USER,
        username: signInIdentifier.includes('@') ? signInIdentifier.split('@')[0] : signInIdentifier,
        email: signInIdentifier.includes('@') ? signInIdentifier : DEFAULT_USER.email,
      };

      if (rememberMe) {
        localStorage.setItem('harbour_session', JSON.stringify(user));
      }

      soundEngine.playHarmonicResonance([392, 523.25, 659.25, 783.99], 0.25, 2.2);
      onAuthenticated(user);
    }, 900);
  };

  // ─────────────────────────────────────────────
  // SIGN UP SUBMISSION
  // ─────────────────────────────────────────────
  const handleSignUp = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!signUpName.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!signUpEmail.trim() || !signUpEmail.includes('@')) {
      newErrors.email = 'Valid email address is required';
    }
    if (!signUpPassword || signUpPassword.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (signUpPassword !== signUpConfirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!agreeTerms) {
      newErrors.terms = 'You must accept the terms of service';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      soundEngine.playClick(220, 0.1);
      return;
    }

    setErrors({});
    setIsLoading(true);
    soundEngine.playRadarPing(700, 0.1);

    setTimeout(() => {
      setIsLoading(false);
      const newUser = {
        ...DEFAULT_USER,
        name: signUpName,
        email: signUpEmail,
        username: signUpEmail.split('@')[0],
        phone: signUpPhone || '+44 7911 000000',
        role: signUpRole || 'Security Operator',
      };

      localStorage.setItem('harbour_session', JSON.stringify(newUser));
      soundEngine.playHarmonicResonance([440, 554.37, 659.25, 880], 0.3, 2.5);
      onAuthenticated(newUser);
    }, 1100);
  };

  // ─────────────────────────────────────────────
  // BIOMETRIC SCAN
  // ─────────────────────────────────────────────
  const handleBiometricScan = () => {
    setIsBioScanning(true);
    setBioProgress(0);
    soundEngine.playRadarPing(600, 0.08);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setBioProgress(progress);
      soundEngine.playLaserSweep(0.06);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsBioScanning(false);
          const user = { ...DEFAULT_USER };
          localStorage.setItem('harbour_session', JSON.stringify(user));
          soundEngine.playHarmonicResonance([392, 523.25, 659.25, 783.99], 0.25, 2.2);
          onAuthenticated(user);
        }, 300);
      }
    }, 150);
  };

  // ─────────────────────────────────────────────
  // INSTANT DEMO LOGIN
  // ─────────────────────────────────────────────
  const handleQuickDemoLogin = () => {
    soundEngine.playWarp(0.2);
    const user = { ...DEFAULT_USER };
    localStorage.setItem('harbour_session', JSON.stringify(user));
    onAuthenticated(user);
  };

  // ─────────────────────────────────────────────
  // FORGOT PASSWORD
  // ─────────────────────────────────────────────
  const handleSendResetLink = (e) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) return;
    setForgotSent(true);
    soundEngine.playGlassTone(523.25, 0.2, 1.5);
    setTimeout(() => {
      setShowForgotPasswordModal(false);
      setForgotSent(false);
      setForgotEmail('');
    }, 2000);
  };

  return (
    <div className="auth-flow-wrapper fade-in">
      <div className="auth-flow-card">
        {/* Brand Header */}
        <div className="auth-flow-header">
          <div className="auth-logo-badge">
            <Shield className="w-6 h-6 text-cyan" />
          </div>
          <div className="auth-badge-kicker">SECURE ENCLAVE // ESCROW ACCESS</div>
          <h2 className="auth-brand-title font-hero">
            {authMode === 'signin' && 'Sign In to HARBOR'}
            {authMode === 'signup' && 'Create HARBOR Account'}
            {authMode === 'biometric' && 'Biometric Deliberation'}
          </h2>
          <p className="auth-brand-sub">
            {authMode === 'signin' && 'Enter your cryptographic credentials to access your financial security dashboard.'}
            {authMode === 'signup' && 'Deploy autonomous transaction protection and trusted contact escrow for your funds.'}
            {authMode === 'biometric' && 'Voice harmonic & hardware passkey identity verification.'}
          </p>
        </div>

        {/* Auth Mode Switch Tabs */}
        <div className="auth-tabs-row">
          <button
            type="button"
            className={`auth-tab-btn ${authMode === 'signin' ? 'active' : ''}`}
            onClick={() => {
              soundEngine.playClick(500, 0.04);
              setAuthMode('signin');
              setErrors({});
            }}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${authMode === 'signup' ? 'active' : ''}`}
            onClick={() => {
              soundEngine.playClick(550, 0.04);
              setAuthMode('signup');
              setErrors({});
            }}
          >
            <User className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${authMode === 'biometric' ? 'active' : ''}`}
            onClick={() => {
              soundEngine.playClick(600, 0.04);
              setAuthMode('biometric');
              setErrors({});
            }}
          >
            <Fingerprint className="w-3.5 h-3.5" />
            <span>Passkey / Bio</span>
          </button>
        </div>

        {/* ───────────────────────────────────────── */}
        {/* TAB 1: SIGN IN VIEW                       */}
        {/* ───────────────────────────────────────── */}
        {authMode === 'signin' && (
          <form onSubmit={handleSignIn} className="auth-form fade-in">
            {/* Email or Username */}
            <div className="form-group">
              <label className="form-label" htmlFor="signin-id">
                <span>USERNAME OR EMAIL</span>
              </label>
              <div className={`input-icon-box ${errors.identifier ? 'has-error' : ''}`}>
                <User className="w-4 h-4 input-icon text-slate-400" />
                <input
                  id="signin-id"
                  type="text"
                  value={signInIdentifier}
                  onChange={(e) => setSignInIdentifier(e.target.value)}
                  placeholder="e.g. harishgolem or name@domain.com"
                  className="form-input"
                  autoComplete="username"
                />
              </div>
              {errors.identifier && <span className="form-error-msg">{errors.identifier}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <div className="flex items-center justify-between">
                <label className="form-label" htmlFor="signin-pass">
                  <span>SECURITY PASSWORD</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="form-link-sm"
                >
                  Forgot password?
                </button>
              </div>
              <div className={`input-icon-box ${errors.password ? 'has-error' : ''}`}>
                <Key className="w-4 h-4 input-icon text-slate-400" />
                <input
                  id="signin-pass"
                  type={showPassword ? 'text' : 'password'}
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="Enter vault password"
                  className="form-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn-toggle-eye"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <span className="form-error-msg">{errors.password}</span>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between mt-1">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="custom-checkbox"
                />
                <span className="checkbox-text">Remember this terminal</span>
              </label>

              <span className="font-mono text-[10px] text-cyan">256-BIT TLS VAULT</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-auth-submit"
              data-hover
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AUTHENTICATING OPERATOR...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>SIGN IN TO HARBOR</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              )}
            </button>

            {/* Quick Demo Login Option */}
            <div className="quick-access-divider">
              <span className="divider-text">DEMO ACCESS</span>
            </div>

            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="btn-quick-demo"
              data-hover
            >
              <Zap className="w-3.5 h-3.5 text-amber" />
              <span>Instant Demo Access as @harishgolem</span>
            </button>
          </form>
        )}

        {/* ───────────────────────────────────────── */}
        {/* TAB 2: SIGN UP VIEW                       */}
        {/* ───────────────────────────────────────── */}
        {authMode === 'signup' && (
          <form onSubmit={handleSignUp} className="auth-form fade-in">
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="signup-name">
                <span>FULL NAME</span>
              </label>
              <div className={`input-icon-box ${errors.name ? 'has-error' : ''}`}>
                <User className="w-4 h-4 input-icon text-slate-400" />
                <input
                  id="signup-name"
                  type="text"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  placeholder="e.g. Harish S"
                  className="form-input"
                />
              </div>
              {errors.name && <span className="form-error-msg">{errors.name}</span>}
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label className="form-label" htmlFor="signup-email">
                <span>EMAIL ADDRESS</span>
              </label>
              <div className={`input-icon-box ${errors.email ? 'has-error' : ''}`}>
                <Mail className="w-4 h-4 input-icon text-slate-400" />
                <input
                  id="signup-email"
                  type="email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="form-input"
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="form-error-msg">{errors.email}</span>}
            </div>

            {/* Passwords (2 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="form-group">
                <label className="form-label" htmlFor="signup-pass">
                  <span>CREATE PASSWORD</span>
                </label>
                <div className={`input-icon-box ${errors.password ? 'has-error' : ''}`}>
                  <Key className="w-4 h-4 input-icon text-slate-400" />
                  <input
                    id="signup-pass"
                    type={showPassword ? 'text' : 'password'}
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="form-input"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn-toggle-eye"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {errors.password && <span className="form-error-msg">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="signup-confirm">
                  <span>CONFIRM PASSWORD</span>
                </label>
                <div className={`input-icon-box ${errors.confirmPassword ? 'has-error' : ''}`}>
                  <Key className="w-4 h-4 input-icon text-slate-400" />
                  <input
                    id="signup-confirm"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="form-input"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="btn-toggle-eye"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="form-error-msg">{errors.confirmPassword}</span>
                )}
              </div>
            </div>

            {/* Phone & Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="form-group">
                <label className="form-label" htmlFor="signup-phone">
                  <span>PHONE NUMBER (FOR 2FA)</span>
                </label>
                <div className="input-icon-box">
                  <Phone className="w-4 h-4 input-icon text-slate-400" />
                  <input
                    id="signup-phone"
                    type="tel"
                    value={signUpPhone}
                    onChange={(e) => setSignUpPhone(e.target.value)}
                    placeholder="+44 7911 123456"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="signup-role">
                  <span>SECURITY ROLE (OPTIONAL)</span>
                </label>
                <select
                  id="signup-role"
                  value={signUpRole}
                  onChange={(e) => setSignUpRole(e.target.value)}
                  className="form-select"
                >
                  <option value="Security Operator">Security Operator</option>
                  <option value="Treasury Custodian">Treasury Custodian</option>
                  <option value="Institutional Validator">Institutional Validator</option>
                  <option value="Individual Wallet Holder">Individual Wallet Holder</option>
                </select>
              </div>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="form-group mt-1">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="custom-checkbox"
                />
                <span className="checkbox-text">
                  I accept HARBOR Security Protocols, Escrow Terms & Autonomous Deliberation Policies
                </span>
              </label>
              {errors.terms && <span className="form-error-msg">{errors.terms}</span>}
            </div>

            {/* Create Account Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-auth-submit"
              data-hover
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>INITIALIZING CITADEL ENCLAVE...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>CREATE HARBOR ACCOUNT</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              )}
            </button>
          </form>
        )}

        {/* ───────────────────────────────────────── */}
        {/* TAB 3: BIOMETRIC / PASSKEY VIEW           */}
        {/* ───────────────────────────────────────── */}
        {authMode === 'biometric' && (
          <div className="auth-bio-section fade-in">
            <div className="auth-radar-halo">
              <div className="radar-circle ring-1" />
              <div className="radar-circle ring-2" />
              <div className="radar-circle ring-3" />
              <div className="auth-icon-wrap">
                <Fingerprint className="w-12 h-12 text-cyan animate-pulse" />
              </div>
            </div>

            <div className="text-center mb-6">
              <h3 className="font-hero text-lg text-white">Cryptographic Passkey Scan</h3>
              <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
                Scan your WebAuthn security hardware key or authenticate your biometric voiceprint.
              </p>
            </div>

            <button
              type="button"
              onClick={handleBiometricScan}
              disabled={isBioScanning}
              className="btn-auth-submit"
              data-hover
            >
              {isBioScanning ? (
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>VERIFYING PASSKEY RESONANCE ({bioProgress}%)...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Radio className="w-4 h-4" />
                  <span>SCAN BIOMETRIC & ENTER DASHBOARD</span>
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="btn-quick-demo mt-3"
              data-hover
            >
              <Zap className="w-3.5 h-3.5 text-amber" />
              <span>Instant Demo Bypass</span>
            </button>
          </div>
        )}

        {/* Security Trust Badges Footer */}
        <div className="auth-card-footer">
          <div className="footer-shield-badge">
            <CheckCircle2 className="w-3 h-3 text-cyan" />
            <span>256-BIT ZERO-KNOWLEDGE PROTOCOL</span>
          </div>
          <div className="footer-shield-badge">
            <CheckCircle2 className="w-3 h-3 text-emerald" />
            <span>£0.00 FRAUD LOSS GUARANTEE</span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="forgot-modal-backdrop fade-in">
          <div className="forgot-modal-card">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 font-hero text-sm text-white">
                <Key className="w-4 h-4 text-cyan" />
                <span>RESET CITADEL SECURITY CREDENTIALS</span>
              </div>
              <button
                onClick={() => setShowForgotPasswordModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {forgotSent ? (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <h4 className="font-hero text-sm text-white">Recovery Token Dispatched</h4>
                <p className="text-slate-300 text-xs mt-1">
                  A cryptographic reset token has been dispatched to <strong>{forgotEmail}</strong>. Check your inbox to proceed.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendResetLink}>
                <p className="text-slate-400 text-xs mb-4">
                  Enter the email address registered with your HARBOR account. We will send a secure one-time cryptographic recovery passkey.
                </p>
                <div className="input-icon-box mb-4">
                  <Mail className="w-4 h-4 input-icon text-slate-400" />
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="registered.email@domain.com"
                    className="form-input"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(false)}
                    className="btn-secondary-sm"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary-sm">
                    Send Reset Token
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
