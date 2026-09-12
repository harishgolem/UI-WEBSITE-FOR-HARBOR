import React, { useState, useEffect } from 'react';
import soundEngine from '../audio/SoundEngine.js';
import AuthFlow from './auth/AuthFlow.jsx';
import DashboardShell from './dashboard/DashboardShell.jsx';
import {
  DEFAULT_USER,
  INITIAL_TRANSACTIONS,
  INITIAL_TRUSTED_CONTACTS,
  INITIAL_PAUSED_TRANSACTIONS,
  MOCK_NOTIFICATIONS
} from '../data/mockData.js';

export default function HarbourPortal({ onClose, onJumpToStage }) {
  // Session State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('harbour_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Centralized State
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [trustedContacts, setTrustedContacts] = useState(INITIAL_TRUSTED_CONTACTS);
  const [pausedTransactions, setPausedTransactions] = useState(INITIAL_PAUSED_TRANSACTIONS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  // Accessibility State (persisted in localStorage)
  const [accessibilitySettings, setAccessibilitySettings] = useState(() => {
    try {
      const saved = localStorage.getItem('harbour_accessibility');
      return saved
        ? JSON.parse(saved)
        : {
            fontSize: 'standard',
            highContrast: false,
            reducedMotion: false,
            colorMode: 'standard',
            enhancedFocus: true,
            soundFeedback: true,
            language: 'en-GB',
          };
    } catch {
      return {
        fontSize: 'standard',
        highContrast: false,
        reducedMotion: false,
        colorMode: 'standard',
        enhancedFocus: true,
        soundFeedback: true,
        language: 'en-GB',
      };
    }
  });

  // Save accessibility settings
  const handleUpdateAccessibility = (key, value) => {
    setAccessibilitySettings((prev) => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem('harbour_accessibility', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Authentication Handlers
  const handleAuthenticated = (authenticatedUser) => {
    setUser(authenticatedUser);
  };

  const handleLogout = () => {
    soundEngine.playClick(220, 0.1);
    try {
      localStorage.removeItem('harbour_session');
    } catch {}
    setUser(null);
  };

  // Paused Wires Handlers
  const handleDispatchToPause = ({ recipient, amount, riskScore, reason }) => {
    soundEngine.playLaserSweep(0.12);
    const newPauseItem = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}-PAUSE`,
      recipient,
      amount,
      originalRiskScore: riskScore,
      riskCategory: riskScore >= 80 ? 'CRITICAL' : riskScore >= 50 ? 'ELEVATED' : 'MEDIUM',
      reason,
      totalSeconds: 900, // 15 mins
      remainingSeconds: 900,
      pausedAt: new Date().toLocaleString(),
      suggestedAction: 'Wait for cooldown period to elapse, confirm invoice with recipient, then release.',
    };

    setPausedTransactions((prev) => [newPauseItem, ...prev]);

    // Also record in transactions
    const newTxn = {
      id: newPauseItem.id,
      timestamp: 'Just now',
      recipient,
      sender: `${user?.name || 'Harish'} Vault`,
      amount: parseFloat(amount.replace(/[^0-9.-]+/g, '')) || 0,
      formattedAmount: amount,
      type: 'Quarantined Transfer',
      status: 'PAUSED',
      riskScore,
      riskCategory: newPauseItem.riskCategory,
      recipientTrust: 'UNVERIFIED',
      paymentMethod: 'HARBOR Pause Cooldown',
      flagged: true,
      paused: true,
      route: 'Heuristic Escrow Lock > Cooldown Vault',
      hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
      riskFactors: [reason],
    };
    setTransactions((prev) => [newTxn, ...prev]);
  };

  const handleCancelPausedTxn = (itemId) => {
    setPausedTransactions((prev) => prev.filter((i) => i.id !== itemId));
    setTransactions((prev) =>
      prev.map((t) => (t.id === itemId ? { ...t, status: 'FLAGGED', paused: false } : t))
    );
  };

  const handleResumePausedTxn = (item) => {
    setPausedTransactions((prev) => prev.filter((i) => i.id !== item.id));
    setTransactions((prev) =>
      prev.map((t) => (t.id === item.id ? { ...t, status: 'SETTLED', paused: false, flagged: false } : t))
    );
  };

  const handleAddNewPause = (newItem) => {
    setPausedTransactions((prev) => [newItem, ...prev]);
  };

  // Trusted Contacts Handlers
  const handleAddContact = (newContact) => {
    setTrustedContacts((prev) => [newContact, ...prev]);
  };

  const handleEditContact = (updatedContact) => {
    setTrustedContacts((prev) =>
      prev.map((c) => (c.id === updatedContact.id ? { ...c, ...updatedContact } : c))
    );
  };

  const handleDeleteContact = (contactId) => {
    setTrustedContacts((prev) => prev.filter((c) => c.id !== contactId));
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    try {
      localStorage.setItem('harbour_session', JSON.stringify(updatedUser));
    } catch {}
  };

  // Accessibility CSS classes
  const fontClass =
    accessibilitySettings.fontSize === 'large'
      ? 'scale-font-large'
      : accessibilitySettings.fontSize === 'medium'
      ? 'scale-font-medium'
      : 'scale-font-standard';

  const contrastClass = accessibilitySettings.highContrast ? 'harbour-high-contrast' : '';
  const motionClass = accessibilitySettings.reducedMotion ? 'harbour-reduced-motion' : '';

  return (
    <div
      id="harbour-portal"
      className={`portal-overlay ${fontClass} ${contrastClass} ${motionClass} fade-in`}
    >
      <div className="portal-backdrop" onClick={onClose} />

      <div className="portal-modal-container">
        {!user ? (
          <AuthFlow
            onAuthenticated={handleAuthenticated}
            onCancel={onClose}
          />
        ) : (
          <DashboardShell
            user={user}
            transactions={transactions}
            trustedContacts={trustedContacts}
            pausedTransactions={pausedTransactions}
            notifications={notifications}
            accessibilitySettings={accessibilitySettings}
            onUpdateAccessibility={handleUpdateAccessibility}
            onLogout={handleLogout}
            onCloseDashboard={onClose}
            onJumpToStage={onJumpToStage}
            onDispatchToPause={handleDispatchToPause}
            onCancelPausedTxn={handleCancelPausedTxn}
            onResumePausedTxn={handleResumePausedTxn}
            onAddNewPause={handleAddNewPause}
            onAddContact={handleAddContact}
            onEditContact={handleEditContact}
            onDeleteContact={handleDeleteContact}
            onUpdateUser={handleUpdateUser}
          />
        )}
      </div>
    </div>
  );
}
