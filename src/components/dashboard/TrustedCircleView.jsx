import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Edit2,
  Search,
  Radio,
  ExternalLink,
  Info,
  RefreshCw,
  X
} from 'lucide-react';
import soundEngine from '../../audio/SoundEngine.js';

export default function TrustedCircleView({
  trustedContacts,
  onAddContact,
  onEditContact,
  onDeleteContact,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formRelation, setFormRelation] = useState('Business Partner');
  const [formIdentifier, setFormIdentifier] = useState('');
  const [formTrustLevel, setFormTrustLevel] = useState(90);
  const [formNotes, setFormNotes] = useState('');
  const [editingId, setEditingId] = useState(null);

  const filteredContacts = trustedContacts.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.relationship.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.identifier.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormName('');
    setFormRelation('Business Partner');
    setFormIdentifier('');
    setFormTrustLevel(90);
    setFormNotes('');
    setShowAddModal(true);
  };

  const handleOpenEdit = (contact) => {
    setEditingId(contact.id);
    setFormName(contact.name);
    setFormRelation(contact.relationship);
    setFormIdentifier(contact.identifier);
    setFormTrustLevel(contact.trustLevel);
    setFormNotes(contact.notes || '');
    setShowAddModal(true);
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    if (!formName.trim()) return;

    soundEngine.playHarmonicResonance([440, 554.37], 0.2, 1.5);

    if (editingId) {
      onEditContact({
        id: editingId,
        name: formName,
        relationship: formRelation,
        identifier: formIdentifier || 'Account Verified',
        trustLevel: parseInt(formTrustLevel, 10),
        notes: formNotes,
      });
    } else {
      const newContact = {
        id: `tc-${Date.now()}`,
        name: formName,
        relationship: formRelation,
        identifier: formIdentifier || 'Account Verified',
        trustLevel: parseInt(formTrustLevel, 10),
        status: 'VERIFIED',
        verifiedAt: new Date().toISOString().split('T')[0],
        transferCount: 0,
        totalSent: '£0.00',
        notes: formNotes || 'Added to Trusted Circle.',
      };
      onAddContact(newContact);
    }

    setShowAddModal(false);
  };

  const handleRunMockVerification = (contactId) => {
    setIsVerifying(true);
    soundEngine.playRadarPing(600, 0.08);

    setTimeout(() => {
      soundEngine.playHarmonicResonance([523.25, 659.25, 783.99], 0.25, 2.0);
      setIsVerifying(false);
      onEditContact({
        id: contactId,
        status: 'VERIFIED',
        trustLevel: 98,
        verifiedAt: new Date().toISOString().split('T')[0],
      });
      if (selectedContact && selectedContact.id === contactId) {
        setSelectedContact((prev) => ({ ...prev, status: 'VERIFIED', trustLevel: 98 }));
      }
    }, 1200);
  };

  return (
    <div className="trusted-circle-container fade-in">
      {/* Header */}
      <div className="circle-header-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="circle-icon-box">
              <Users className="w-6 h-6 text-emerald" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hero text-xl text-white font-bold">Trusted Circle Management</h2>
                <span className="badge-shield-live">CONSENSUS VERIFIED</span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">
                Verified beneficiaries and family anchors. Transfers to contacts in this circle
                significantly reduce simulated risk scores in the Mock AI Risk Engine.
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenAdd}
            className="btn-add-contact"
            data-hover
          >
            <UserPlus className="w-4 h-4" />
            <span>ADD TRUSTED CONTACT</span>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mandatory-disclaimer-box mt-3">
          <Info className="w-4 h-4 text-amber shrink-0" />
          <span className="text-[11px] text-amber-200 font-mono">
            <strong>ADVISORY:</strong> Marking a contact as "trusted" reduces simulated friction in the demo engine.
            Always confirm destination bank account details independently before sending large wires.
          </span>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6">
        <div className="search-box-circle">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, relationship, bank identifier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input-circle"
          />
        </div>

        <div className="font-mono text-xs text-slate-400">
          SHOWING <strong>{filteredContacts.length}</strong> OF{' '}
          <strong>{trustedContacts.length}</strong> VERIFIED CONTACTS
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
        {filteredContacts.map((contact) => {
          const isVerified = contact.status === 'VERIFIED';
          return (
            <div key={contact.id} className="contact-item-card">
              <div className="flex items-start justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="contact-avatar-circle font-hero">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-hero text-base text-white font-bold">{contact.name}</h4>
                    <span className="text-xs text-slate-400">{contact.relationship}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`status-pill ${isVerified ? 'status-settled' : 'status-review'}`}
                  >
                    {isVerified ? 'VERIFIED' : 'PENDING 2FA'}
                  </span>
                  <div className="font-mono text-[10px] text-cyan mt-1">
                    TRUST: {contact.trustLevel}%
                  </div>
                </div>
              </div>

              {/* Account Identifier & Stats */}
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div>
                  <span className="font-mono text-[10px] text-slate-500 block">ACCOUNT ROUTE:</span>
                  <span className="font-mono text-slate-300 text-xs">{contact.identifier}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-500 block">SETTLED TRANSFERS:</span>
                  <span className="text-slate-300 text-xs">
                    {contact.transferCount || 0} ({contact.totalSent || '£0.00'})
                  </span>
                </div>
              </div>

              {contact.notes && (
                <p className="text-[11px] text-slate-400 mt-2 bg-black/30 p-2 rounded-lg leading-relaxed">
                  "{contact.notes}"
                </p>
              )}

              {/* Card Actions */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                <button
                  onClick={() => setSelectedContact(contact)}
                  className="text-xs text-cyan hover:underline font-mono"
                >
                  Inspect Audit Trail
                </button>

                <div className="flex items-center gap-2">
                  {!isVerified && (
                    <button
                      onClick={() => handleRunMockVerification(contact.id)}
                      disabled={isVerifying}
                      className="btn-verify-now"
                    >
                      <Radio className="w-3 h-3 text-emerald" />
                      <span>Verify</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleOpenEdit(contact)}
                    className="icon-btn"
                    title="Edit Contact"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                  </button>
                  <button
                    onClick={() => {
                      soundEngine.playClick(200, 0.08);
                      onDeleteContact(contact.id);
                    }}
                    className="icon-btn"
                    title="Remove Contact"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-[#ff0055]" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="circle-modal-backdrop fade-in">
          <div className="circle-modal-card">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald" />
                <h4 className="font-hero text-sm text-white font-bold">
                  TRUST PROFILE: {selectedContact.name}
                </h4>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-mono text-[10px] text-slate-500">RELATIONSHIP:</span>
                  <div className="text-white font-medium">{selectedContact.relationship}</div>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-500">TRUST SCORE:</span>
                  <div className="font-hero text-emerald text-base font-bold">
                    {selectedContact.trustLevel}/100
                  </div>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] text-slate-500">VERIFIED IDENTIFIER:</span>
                <div className="font-mono text-cyan">{selectedContact.identifier}</div>
              </div>

              <div>
                <span className="font-mono text-[10px] text-slate-500">VERIFICATION TIMESTAMP:</span>
                <div className="text-slate-300">
                  {selectedContact.verifiedAt || 'Pending Biometric Quorum'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-cyan-200">
                <strong>Heuristic Impact:</strong> Sending funds to {selectedContact.name} applies an automatic{' '}
                <strong>-{Math.min(50, Math.floor(selectedContact.trustLevel * 0.5))}%</strong> discount
                to simulated risk calculations in HARBOR.
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-white/10">
              <button
                onClick={() => setSelectedContact(null)}
                className="btn-secondary-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Contact Modal */}
      {showAddModal && (
        <div className="circle-modal-backdrop fade-in">
          <div className="circle-modal-card">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2 font-hero text-sm text-white font-bold">
                <Users className="w-4 h-4 text-cyan" />
                <span>{editingId ? 'EDIT TRUSTED CONTACT' : 'ADD NEW TRUSTED CONTACT'}</span>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveContact} className="space-y-3">
              <div className="form-group">
                <label className="form-label" htmlFor="ct-name">
                  <span>CONTACT FULL NAME</span>
                </label>
                <input
                  id="ct-name"
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Sarah Chen"
                  className="form-input"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="ct-rel">
                    <span>RELATIONSHIP</span>
                  </label>
                  <select
                    id="ct-rel"
                    value={formRelation}
                    onChange={(e) => setFormRelation(e.target.value)}
                    className="form-select"
                  >
                    <option value="Family Member">Family Member</option>
                    <option value="Business Partner">Business Partner</option>
                    <option value="Recurring Vendor">Recurring Vendor</option>
                    <option value="Institutional Partner">Institutional Partner</option>
                    <option value="Personal Friend">Personal Friend</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="ct-trust">
                    <span>TRUST INDEX (0-100)</span>
                  </label>
                  <input
                    id="ct-trust"
                    type="number"
                    min="1"
                    max="100"
                    value={formTrustLevel}
                    onChange={(e) => setFormTrustLevel(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="ct-ident">
                  <span>BANK / WALLET IDENTIFIER</span>
                </label>
                <input
                  id="ct-ident"
                  type="text"
                  value={formIdentifier}
                  onChange={(e) => setFormIdentifier(e.target.value)}
                  placeholder="e.g. HSBC UK ●●●● 8812"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="ct-notes">
                  <span>NOTES / VERIFICATION CONTEXT</span>
                </label>
                <input
                  id="ct-notes"
                  type="text"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g. Biometric audio confirmed on Jan 15..."
                  className="form-input"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary-sm">
                  {editingId ? 'Update Contact' : 'Save to Trusted Circle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
