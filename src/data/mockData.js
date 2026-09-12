// ─────────────────────────────────────────────
// HARBOR CENTRALIZED MOCK DATA & SIMULATED RISK ENGINE
// ─────────────────────────────────────────────

export const DEFAULT_USER = {
  name: 'Harish S',
  username: 'harishgolem',
  email: 'harish.s4268@gmail.com',
  phone: '+44 7911 123456',
  role: 'Lead Security Operator',
  walletAddress: '0x8f2c...419a',
  trustScore: 92,
  accountTier: 'CITADEL_ENTERPRISE',
  twoFactorEnabled: true,
  createdAt: '2025-01-15',
  avatarUrl: null,
};

export const INITIAL_TRUSTED_CONTACTS = [
  {
    id: 'tc-1',
    name: 'Sarah Chen',
    relationship: 'Family Member (Sister)',
    identifier: 'HSBC UK ●●●● 8812',
    trustLevel: 98,
    status: 'VERIFIED',
    verifiedAt: '2025-02-10',
    transferCount: 14,
    totalSent: '£18,500.00',
    notes: 'Primary emergency family beneficiary. Biometric voice confirmed.',
  },
  {
    id: 'tc-2',
    name: 'Vanguard Corporate Treasury',
    relationship: 'Institutional Partner',
    identifier: 'Barclays Tier-1 ●●●● 4490',
    trustLevel: 99,
    status: 'VERIFIED',
    verifiedAt: '2025-01-20',
    transferCount: 32,
    totalSent: '£125,000.00',
    notes: 'Quarterly institutional clearing route with multi-sig approval.',
  },
  {
    id: 'tc-3',
    name: 'Marcus Brody',
    relationship: 'Business Partner (Co-Founder)',
    identifier: 'Monzo Business ●●●● 1234',
    trustLevel: 90,
    status: 'VERIFIED',
    verifiedAt: '2025-02-28',
    transferCount: 8,
    totalSent: '£14,200.00',
    notes: 'Operational expenses and project settlements.',
  },
  {
    id: 'tc-4',
    name: 'Global Cloud Infrastructure Ltd',
    relationship: 'Recurring Vendor',
    identifier: 'NatWest Commercial ●●●● 9091',
    trustLevel: 85,
    status: 'PENDING_BIOMETRICS',
    verifiedAt: '2025-03-01',
    transferCount: 3,
    totalSent: '£4,850.00',
    notes: 'Cloud hosting invoice clearing. Awaiting second authorized signature.',
  },
];

export const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-9024-ALPHA',
    timestamp: '2026-09-12 14:30',
    recipient: 'HSBC UK Corporate ●●●● 7721',
    sender: 'Harbour Vault #492',
    amount: 12400.0,
    formattedAmount: '£12,400.00',
    type: 'Commercial Wire',
    status: 'SETTLED',
    riskScore: 2,
    riskCategory: 'LOW',
    recipientTrust: 'VERIFIED',
    paymentMethod: 'Harbour FastSettlement',
    flagged: false,
    paused: false,
    route: 'Direct Clearing > Harbour Shield > FastPay',
    hash: '0x8f2c39e1a8b74c2d',
    riskFactors: ['Known institutional counterparty', 'Regular transfer timing', 'Zero velocity spikes'],
  },
  {
    id: 'TXN-8812-BETA',
    timestamp: '2026-09-12 11:15',
    recipient: 'Barclays Tier-1 Clearing',
    sender: 'Harbour Treasury #10',
    amount: 45000.0,
    formattedAmount: '£45,000.00',
    type: 'Escrow Reserve',
    status: 'SETTLED',
    riskScore: 1,
    riskCategory: 'LOW',
    recipientTrust: 'VERIFIED',
    paymentMethod: 'Multi-Sig Quorum',
    flagged: false,
    paused: false,
    route: 'Multi-Sig > 5 Node Quorum > FedWire',
    hash: '0x3a91bc0299f182aa',
    riskFactors: ['5/5 Multi-signature validation', 'Whitelisted corporate address'],
  },
  {
    id: 'TXN-7641-GAMMA',
    timestamp: '2026-09-12 09:40',
    recipient: 'Electricity Board Utility',
    sender: 'Mobile Wallet (Harish S)',
    amount: 5000.0,
    formattedAmount: '£5,000.00',
    type: 'First-time Transfer',
    status: 'PAUSED',
    riskScore: 68,
    riskCategory: 'ELEVATED',
    recipientTrust: 'NEW_UNVERIFIED',
    paymentMethod: 'Instant Open Banking',
    flagged: true,
    paused: true,
    route: 'Acoustic Verification Required > Trusted Sync',
    hash: '0xd71e88f3001a4e5c',
    riskFactors: [
      'Amount is 3.4x higher than 30-day baseline for utilities',
      'First-time recipient account number',
      'Unusual early morning transfer timing',
    ],
  },
  {
    id: 'TXN-6590-DELTA',
    timestamp: '2026-09-11 18:22',
    recipient: 'Sarah Chen',
    sender: 'Harbour Vault #492',
    amount: 1500.0,
    formattedAmount: '£1,500.00',
    type: 'Family Support Wire',
    status: 'SETTLED',
    riskScore: 3,
    riskCategory: 'LOW',
    recipientTrust: 'TRUSTED_CIRCLE',
    paymentMethod: 'Harbour FastSettlement',
    flagged: false,
    paused: false,
    route: 'Harbour Vault Barrier > Automated Clearing',
    hash: '0x5c4299e12bf4aa10',
    riskFactors: ['Recipient in verified Trusted Circle (98% trust score)'],
  },
  {
    id: 'TXN-5401-EPSILON',
    timestamp: '2026-09-11 14:05',
    recipient: 'Offshore Unverified Hash',
    sender: 'External Ingress',
    amount: 18250.0,
    formattedAmount: '£18,250.00',
    type: 'Unrecognized Node Request',
    status: 'FLAGGED',
    riskScore: 94,
    riskCategory: 'CRITICAL',
    recipientTrust: 'SUSPICIOUS',
    paymentMethod: 'External Tunnel',
    flagged: true,
    paused: false,
    route: 'Heuristic Laser Intercept > Threat Vault',
    hash: '0x19bba744de88c119',
    riskFactors: [
      'Recipient flagged on international fraud honeypot list',
      'Sudden high-velocity outgoing transfer attempt',
      'Mismatched IP jurisdiction vs account geolocation',
    ],
  },
  {
    id: 'TXN-4310-ZETA',
    timestamp: '2026-09-10 16:45',
    recipient: 'Marcus Brody',
    sender: 'Harbour Vault #492',
    amount: 3200.0,
    formattedAmount: '£3,200.00',
    type: 'Project Reimbursement',
    status: 'SETTLED',
    riskScore: 4,
    riskCategory: 'LOW',
    recipientTrust: 'TRUSTED_CIRCLE',
    paymentMethod: 'Harbour FastSettlement',
    flagged: false,
    paused: false,
    route: 'Verified Node Path > Automated Clearing',
    hash: '0x992fa1b044d711ec',
    riskFactors: ['Verified business co-founder', 'Expected scheduled reimbursement'],
  },
  {
    id: 'TXN-3299-ETA',
    timestamp: '2026-09-09 20:12',
    recipient: 'QuickInvest Crypto Doubler Bot',
    sender: 'Web Ingress',
    amount: 8500.0,
    formattedAmount: '£8,500.00',
    type: 'High Yield Scheme Intercept',
    status: 'FLAGGED',
    riskScore: 98,
    riskCategory: 'CRITICAL',
    recipientTrust: 'CONFIRMED_SCAM',
    paymentMethod: 'Anonymous Crypto Gateway',
    flagged: true,
    paused: false,
    route: 'Scam Shield Automated Interception',
    hash: '0xfa018274bb90cce2',
    riskFactors: [
      'Identified as known social engineering Ponzi schema',
      'Address active for under 48 hours',
      'Immediate threat mitigation lock triggered',
    ],
  },
  {
    id: 'TXN-2180-THETA',
    timestamp: '2026-09-08 12:00',
    recipient: 'Global Cloud Infrastructure Ltd',
    sender: 'Operating Account',
    amount: 2400.0,
    formattedAmount: '£2,400.00',
    type: 'Server Capacity Invoice',
    status: 'SETTLED',
    riskScore: 12,
    riskCategory: 'LOW',
    recipientTrust: 'TRUSTED_CIRCLE',
    paymentMethod: 'Corporate ACH',
    flagged: false,
    paused: false,
    route: 'Vendor Ledger Validation',
    hash: '0x77c488e100f91a34',
    riskFactors: ['Matches regular monthly invoice pattern within 5% variance'],
  },
];

export const INITIAL_PAUSED_TRANSACTIONS = [
  {
    id: 'TXN-7641-GAMMA',
    recipient: 'Electricity Board Utility',
    amount: '£5,000.00',
    originalRiskScore: 68,
    riskCategory: 'ELEVATED',
    reason: 'Context Deliberation: Transfer amount is 3.4x higher than 30-day baseline for utilities to an unfamiliar account.',
    totalSeconds: 900, // 15 mins
    remainingSeconds: 642,
    pausedAt: '2026-09-12 09:40',
    suggestedAction: 'Wait for phone verification with service provider or cancel to refund wallet.',
  },
  {
    id: 'TXN-9104-PAUSE-DEMO',
    recipient: 'Express Overseas Realty Agent',
    amount: '£22,000.00',
    originalRiskScore: 82,
    riskCategory: 'HIGH',
    reason: 'High-Value Escrow Hold: Beneficiary created 4 days ago with sudden urgency request.',
    totalSeconds: 3600, // 1 hour
    remainingSeconds: 2180,
    pausedAt: '2026-09-12 13:10',
    suggestedAction: 'Require secondary Trusted Circle signer endorsement before release.',
  },
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'High-Risk Transfer Intercepted',
    message: 'Scam Shield blocked an outgoing transfer of £8,500 to a confirmed malicious address.',
    timestamp: '15 mins ago',
    type: 'SECURITY_ALERT',
    unread: true,
  },
  {
    id: 'notif-2',
    title: 'Harbor Pause Cooldown Active',
    message: 'Transfer TXN-7641-GAMMA is paused. 10m 42s remaining on deliberation window.',
    timestamp: '1 hour ago',
    type: 'PAUSE_STATUS',
    unread: true,
  },
  {
    id: 'notif-3',
    title: 'Trusted Circle Node Sync',
    message: 'Sarah Chen biometric voiceprint re-verified with 99.4% harmonic fidelity.',
    timestamp: '3 hours ago',
    type: 'TRUST_SYNC',
    unread: false,
  },
  {
    id: 'notif-4',
    title: 'Weekly Trust Score Report',
    message: 'Your HARBOR Trust Score increased by +3 points to 92/100.',
    timestamp: 'Yesterday',
    type: 'REPORT',
    unread: false,
  },
];

export const MOCK_SCAM_EXAMPLES = [
  {
    id: 'scam-1',
    title: 'Urgent Utility Impersonation Wire',
    severity: 'HIGH RISK',
    scenario: 'Scammer calls claiming electricity will be disconnected in 30 minutes unless immediate wire of £5,000 is made to a "temporary holding account".',
    detectionVector: 'Sudden high amount, urgency pressure keyword flags, unverified bank account differing from official utility billing.',
    harbourResponse: 'HARBOR Pause immediately freezes transfer for 15-minute deliberation; alerts user with official utility fraud helpline.',
  },
  {
    id: 'scam-2',
    title: 'High-Yield Guaranteed Crypto Doubler',
    severity: 'CRITICAL THREAT',
    scenario: 'Website or Telegram group promises 300% return in 24 hours if £8,500 is sent to a smart contract deposit address.',
    detectionVector: 'Destination address linked to honeypot clustering, rapid withdrawal draining patterns, zero verified business entity.',
    harbourResponse: 'Scam Shield blocks execution instantly; displays comprehensive anomaly report and prevents irreversible loss.',
  },
  {
    id: 'scam-3',
    title: 'CEO / Business Partner Fraud',
    severity: 'ELEVATED RISK',
    scenario: 'Spoofed email requesting emergency supplier payment of £15,000 to an updated account number without phone confirmation.',
    detectionVector: 'Account number mismatch with historical supplier record, timing outside business hours.',
    harbourResponse: 'Flags transfer as elevated risk; prompts user to request audio/video verification from verified Trusted Circle contacts.',
  },
];

// ─────────────────────────────────────────────
// MOCK AI RISK ENGINE (FRONTEND SIMULATION ONLY)
// ─────────────────────────────────────────────
export function calculateMockRisk({
  amount = 1000,
  recipient = '',
  recipientTrust = 'NEW_UNVERIFIED',
  isNewRecipient = true,
  transferFrequency = 'NORMAL', // 'NORMAL' | 'HIGH' | 'EXTREME'
  unusualTiming = false,
  recentCount = 1,
  inTrustedCircle = false,
  trustedLevel = 0,
}) {
  let score = 5; // Baseline healthy score
  const factors = [];

  // 1. Amount Factor
  const numAmount = parseFloat(amount) || 0;
  if (numAmount > 50000) {
    score += 45;
    factors.push('Substantial institutional wire amount (>£50,000) increases volatility exposure (+45%)');
  } else if (numAmount > 15000) {
    score += 30;
    factors.push('High-value transfer (>£15,000) exceeds standard retail threshold (+30%)');
  } else if (numAmount > 5000) {
    score += 15;
    factors.push('Elevated transfer amount (>£5,000) triggers heuristic scrutiny (+15%)');
  } else if (numAmount < 100) {
    score -= 2;
    factors.push('Low monetary value (<£100) has minimal loss impact (-2%)');
  }

  // 2. Trusted Circle & Recipient Status
  if (inTrustedCircle) {
    const discount = Math.min(50, Math.floor(trustedLevel * 0.5));
    score -= discount;
    factors.push(`Recipient is verified in Trusted Circle (${trustedLevel}% trust index) (-${discount}%)`);
  } else if (isNewRecipient || recipientTrust === 'NEW_UNVERIFIED') {
    score += 35;
    factors.push('First-time recipient with zero established settlement history (+35%)');
  } else if (recipientTrust === 'SUSPICIOUS') {
    score += 55;
    factors.push('Recipient flagged by behavioral anomaly heuristics (+55%)');
  } else if (recipientTrust === 'CONFIRMED_SCAM') {
    score += 90;
    factors.push('CRITICAL: Recipient matched known fraud blacklist repository (+90%)');
  }

  // 3. Transfer Velocity & Frequency
  if (transferFrequency === 'EXTREME' || recentCount > 5) {
    score += 30;
    factors.push('High velocity burst: >5 transfers executed within the last 2 hours (+30%)');
  } else if (transferFrequency === 'HIGH' || recentCount > 2) {
    score += 15;
    factors.push('Elevated transfer frequency compared to 30-day baseline (+15%)');
  }

  // 4. Unusual Timing
  if (unusualTiming) {
    score += 12;
    factors.push('Transfer initiated during historical dormant hours (02:00–05:00 UTC) (+12%)');
  }

  // 5. Keyword analysis on recipient
  const lowerRec = recipient.toLowerCase();
  if (lowerRec.includes('crypto') || lowerRec.includes('doubler') || lowerRec.includes('gift') || lowerRec.includes('urgent')) {
    score += 25;
    factors.push('Recipient identifier contains high-risk keywords associated with social engineering (+25%)');
  }

  // Clamp score between 1 and 99
  const clampedScore = Math.max(1, Math.min(99, Math.round(score)));

  // Category determination
  let category = 'LOW';
  let suggestedAction = 'Instant Settlement Allowed. Protected by continuous Harbour escrow.';
  let badgeColor = '#00ff9d';

  if (clampedScore >= 80) {
    category = 'CRITICAL';
    suggestedAction = 'Immediate Transfer Block Recommended. High likelihood of fraudulent deception.';
    badgeColor = '#ff0055';
  } else if (clampedScore >= 50) {
    category = 'ELEVATED';
    suggestedAction = 'Recommend 15-Minute HARBOR Pause to verify recipient identity via phone or trusted channel.';
    badgeColor = '#ffb700';
  } else if (clampedScore >= 25) {
    category = 'MEDIUM';
    suggestedAction = 'Proceed with Secondary Deliberation Prompt. Review beneficiary account number carefully.';
    badgeColor = '#38bdf8';
  }

  return {
    riskScore: clampedScore,
    riskCategory: category,
    badgeColor,
    factors,
    suggestedAction,
    timestamp: new Date().toISOString(),
    isSimulated: true,
    disclaimer: 'Demo risk analysis. This simulated engine does not provide real financial, fraud, or investment advice.',
  };
}
