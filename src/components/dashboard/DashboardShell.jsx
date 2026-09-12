import React, { useState } from 'react';
import {
  Shield,
  Activity,
  Search,
  AlertTriangle,
  MessageSquare,
  Clock,
  Users,
  FileText,
  TrendingUp,
  Compass,
  Eye,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ArrowLeft,
  ChevronRight,
  User,
  Sparkles
} from 'lucide-react';
import soundEngine from '../../audio/SoundEngine.js';

import OverviewView from './OverviewView.jsx';
import RiskScannerView from './RiskScannerView.jsx';
import ScamShieldView from './ScamShieldView.jsx';
import TalkToHarborView from './TalkToHarborView.jsx';
import HarborPauseView from './HarborPauseView.jsx';
import TrustedCircleView from './TrustedCircleView.jsx';
import TransactionHistoryView from './TransactionHistoryView.jsx';
import TrustAnalyticsView from './TrustAnalyticsView.jsx';
import AccessibilityView from './AccessibilityView.jsx';
import StagesView from './StagesView.jsx';
import SettingsView from './SettingsView.jsx';

export default function DashboardShell({
  user,
  transactions,
  trustedContacts,
  pausedTransactions,
  notifications,
  accessibilitySettings,
  onUpdateAccessibility,
  onLogout,
  onCloseDashboard,
  onJumpToStage,
  onDispatchToPause,
  onCancelPausedTxn,
  onResumePausedTxn,
  onAddNewPause,
  onAddContact,
  onEditContact,
  onDeleteContact,
  onUpdateUser,
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);

  const unreadNotifsCount = notifications.filter((n) => n.unread).length;
  const pausedCount = pausedTransactions.length;
  const flaggedCount = transactions.filter((t) => t.flagged).length;

  const NAV_ITEMS = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'scanner', label: 'Risk Scanner', icon: Search, badge: 'AI MOCK' },
    { id: 'scamshield', label: 'Scam Shield', icon: Shield, badge: flaggedCount > 0 ? `${flaggedCount} ALERTS` : null, badgeColor: '#ff0055' },
    { id: 'talk', label: 'Talk to HARBOR', icon: MessageSquare, badge: 'AI ASSIST' },
    { id: 'pause', label: 'HARBOR Pause', icon: Clock, badge: pausedCount > 0 ? `${pausedCount} HELD` : null, badgeColor: '#ffb700' },
    { id: 'circle', label: 'Trusted Circle', icon: Users, badge: `${trustedContacts.length}` },
    { id: 'history', label: 'Transaction History', icon: FileText },
    { id: 'analytics', label: 'Trust Analytics', icon: TrendingUp },
    { id: 'stages', label: '10-Stage 3D Telemetry', icon: Compass, badge: '10 SCENES' },
    { id: 'accessibility', label: 'Accessibility Center', icon: Eye },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleTabClick = (tabId) => {
    try {
      soundEngine.playClick(500, 0.04);
    } catch (e) {}
    setActiveTab(tabId);
    if (typeof window !== 'undefined' && window.innerWidth <= 868) {
      setMobileSidebarOpen(false);
    }
  };

  const getBreadcrumbTitle = () => {
    const item = NAV_ITEMS.find((n) => n.id === activeTab);
    return item ? item.label : 'Overview';
  };

  return (
    <div className="dashboard-shell-root fade-in">
      {/* Mobile Backdrop Overlay */}
      <div
        className={`mobile-sidebar-backdrop ${mobileSidebarOpen ? 'active' : ''}`}
        onClick={() => setMobileSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar (Desktop & Drawer for Mobile) */}
      <aside className={`dashboard-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand-box">
          <div className="sidebar-shield-icon">
            <Shield className="w-5 h-5 text-cyan" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-hero font-extrabold text-base tracking-wider text-white">
                HARBOR
              </span>
              <span className="font-mono text-[9px] text-cyan px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/30">
                CITADEL
              </span>
            </div>
            <div className="font-mono text-[10px] text-slate-400">Autonomous Escrow Grid</div>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="sidebar-mobile-close-btn"
            title="Close navigation"
            aria-label="Close navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Profile Mini Bar in Sidebar */}
        <div className="sidebar-user-card">
          <div className="sidebar-avatar font-hero">
            {user?.name ? user.name.charAt(0) : 'H'}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name || 'Harish S'}</div>
            <div className="sidebar-user-handle">@{user?.username || 'harishgolem'}</div>
          </div>
          <div className="trust-pill font-mono" title="Current HARBOR Trust Score">
            {user?.trustScore || 92}
          </div>
        </div>

        {/* Navigation List */}
        <nav className="sidebar-nav-menu">
          {NAV_ITEMS.map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                data-hover
              >
                <IconComp className="w-4 h-4 shrink-0" />
                <span className="sidebar-nav-label">{item.label}</span>
                {item.badge && (
                  <span
                    className="sidebar-item-badge ml-auto font-mono"
                    style={{
                      borderColor: item.badgeColor ? `${item.badgeColor}40` : undefined,
                      color: item.badgeColor || '#38bdf8',
                      backgroundColor: item.badgeColor ? `${item.badgeColor}15` : undefined,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer with Logout & 3D Return */}
        <div className="sidebar-footer">
          <button
            onClick={onLogout}
            className="sidebar-action-btn logout-btn"
            data-hover
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Lock & Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="dashboard-main-area">
        {/* Top Navbar */}
        <header className="dashboard-topbar">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="mobile-menu-toggle-btn"
              title="Open navigation menu"
              aria-label="Open navigation menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Breadcrumb */}
            <div className="breadcrumb-box">
              <span className="text-slate-500 text-xs font-mono">HARBOR</span>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-white text-xs font-bold font-hero">{getBreadcrumbTitle()}</span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Return to 3D Experience Button */}
            <button
              onClick={onCloseDashboard}
              className="btn-return-3d"
              title="Return to the 3D Cinematic Scroll Experience"
              data-hover
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan" />
              <span className="hidden sm:inline">RETURN TO 3D EXPERIENCE</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setShowNotificationsDrawer(!showNotificationsDrawer)}
              className="notif-bell-btn relative"
              title="Security Alerts & Updates"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              {unreadNotifsCount > 0 && (
                <span className="notif-pulse-dot" />
              )}
            </button>
          </div>
        </header>

        {/* Dynamic View Panel Router */}
        <main className="dashboard-content-scroll">
          {activeTab === 'overview' && (
            <OverviewView
              user={user}
              transactions={transactions}
              pausedCount={pausedCount}
              flaggedCount={flaggedCount}
              onNavigateTab={setActiveTab}
              onSelectTxn={setSelectedTxn}
            />
          )}

          {activeTab === 'scanner' && (
            <RiskScannerView
              trustedContacts={trustedContacts}
              onDispatchToPause={onDispatchToPause}
              onOpenScamShield={() => setActiveTab('scamshield')}
            />
          )}

          {activeTab === 'scamshield' && (
            <ScamShieldView onDispatchToPause={onDispatchToPause} />
          )}

          {activeTab === 'talk' && (
            <TalkToHarborView onNavigateTab={setActiveTab} />
          )}

          {activeTab === 'pause' && (
            <HarborPauseView
              pausedTransactions={pausedTransactions}
              onCancelPausedTxn={onCancelPausedTxn}
              onResumePausedTxn={onResumePausedTxn}
              onAddNewPause={onAddNewPause}
            />
          )}

          {activeTab === 'circle' && (
            <TrustedCircleView
              trustedContacts={trustedContacts}
              onAddContact={onAddContact}
              onEditContact={onEditContact}
              onDeleteContact={onDeleteContact}
            />
          )}

          {activeTab === 'history' && (
            <TransactionHistoryView
              transactions={transactions}
              selectedTxn={selectedTxn}
              onSelectTxn={setSelectedTxn}
            />
          )}

          {activeTab === 'analytics' && (
            <TrustAnalyticsView
              user={user}
              transactions={transactions}
              trustedContacts={trustedContacts}
            />
          )}

          {activeTab === 'stages' && (
            <StagesView onJumpToStage={onJumpToStage} />
          )}

          {activeTab === 'accessibility' && (
            <AccessibilityView
              accessibilitySettings={accessibilitySettings}
              onUpdateSetting={onUpdateAccessibility}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView user={user} onUpdateUser={onUpdateUser} />
          )}
        </main>
      </div>

      {/* Notifications Drawer */}
      {showNotificationsDrawer && (
        <div className="notif-drawer-backdrop fade-in" onClick={() => setShowNotificationsDrawer(false)}>
          <div className="notif-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-cyan" />
                <h4 className="font-hero text-sm text-white font-bold">Security Alerts & Updates</h4>
              </div>
              <button
                onClick={() => setShowNotificationsDrawer(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 overflow-y-auto max-h-[75vh]">
              {notifications.map((n) => (
                <div key={n.id} className={`notif-item-box ${n.unread ? 'unread' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-cyan font-semibold">{n.type}</span>
                    <span className="font-mono text-[9px] text-slate-500">{n.timestamp}</span>
                  </div>
                  <h5 className="font-hero text-xs text-white mt-1 font-bold">{n.title}</h5>
                  <p className="text-slate-400 text-[11px] mt-1 leading-snug">{n.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
