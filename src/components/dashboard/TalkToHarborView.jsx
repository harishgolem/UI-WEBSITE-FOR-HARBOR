import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Zap,
  Shield,
  HelpCircle,
  Bot,
  User,
  Info,
  RefreshCw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import soundEngine from '../../audio/SoundEngine.js';

const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: 'Greetings, Operator. I am the HARBOR Autonomous Defense Assistant. How can I assist with your transaction safety, Trust Score analysis, or escrow deliberation today?',
    timestamp: 'Just now',
  },
];

const SUGGESTED_PROMPTS = [
  'Why is my transaction risky?',
  'How is my Trust Score calculated?',
  'Should I trust this recipient?',
  'Show me my recent risky transactions.',
  'How can I stay safe from scams?',
];

export default function TalkToHarborView({ onNavigateTab }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateMockResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('why is my transaction risky') || q.includes('risky')) {
      return `Transaction risk in HARBOR is determined by multiple heuristic vectors:
1. **Transfer Velocity**: Sudden bursts of transfers in a short window increase entropy.
2. **Counterparty Status**: First-time or unverified accounts lack consensus endorsement.
3. **Value Anomalies**: Any transfer exceeding 3x your 30-day baseline triggers automated deliberation.
4. **Dormant Timing**: Outbound transfers executed during unusual hours undergo heightened scrutiny.

You can simulate these attributes at any time in the **Mock AI Risk Scanner**.`;
    }

    if (q.includes('trust score') || q.includes('calculated')) {
      return `Your **HARBOR Trust Score (currently 92/100)** measures your simulated transaction safety discipline within HARBOR:
• **+35 pts**: High ratio of transfers directed to verified **Trusted Circle** contacts.
• **+25 pts**: Regular transaction cadence with zero unverified velocity bursts.
• **+20 pts**: Active utilization of **HARBOR Pause** cooldown on unfamiliar payments.
• **+12 pts**: Multi-factor authentication and hardware passkey enabled.

*Note: This is a demo metric representing simulated safety habits, not personal character or creditworthiness.*`;
    }

    if (q.includes('should i trust this recipient') || q.includes('trust this')) {
      return `Before authorizing any payment to an unfamiliar beneficiary, verify these 3 checkpoints:
1. **Out-of-Band Confirmation**: Call the recipient using a phone number you previously know — never trust contact details provided in an urgent email or SMS.
2. **First-Time Hold**: Put the initial transfer in **HARBOR Pause** for a 15-minute cooldown to verify account details.
3. **Add to Trusted Circle**: Once successfully verified and settled, add them to your Trusted Circle for lower future heuristic friction.`;
    }

    if (q.includes('recent risky') || q.includes('flagged')) {
      return `In your recent ledger activity:
• **TXN-7641-GAMMA (£5,000.00)** was flagged with an **Elevated Risk (68%)** due to an unprecedented amount to an unfamiliar utility account. It is currently held in **HARBOR Pause**.
• **TXN-3299-ETA (£8,500.00)** was intercepted and blocked by **Scam Shield** as a confirmed malicious address.

You can inspect full ledger hashes and paths in the **Transaction History** tab.`;
    }

    if (q.includes('safe from scams') || q.includes('scams')) {
      return `Here are the top defensive practices enforced by HARBOR:
• **Beware of Urgency**: Scammers always pressure you to act within minutes. HARBOR Pause neutralizes this by enforcing a cooling-off period.
• **Verify Account Updates**: Never send funds to "new bank details" provided over WhatsApp or email without verbal confirmation.
• **Check Honeypots**: Review our educational cases in the **Scam Shield** tab to see real-world defense scenarios.`;
    }

    return `I received your inquiry regarding "${query}". HARBOR's autonomous shielding is continuously active. You can run customized risk simulations in the **Risk Scanner**, view cooldown holds in **HARBOR Pause**, or review verified contacts in **Trusted Circle**. Let me know if you need specific guidance!`;
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    soundEngine.playClick(400, 0.05);

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      soundEngine.playGlassTone(523.25, 0.15, 1.2);
      const botReply = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: generateMockResponse(text),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="talk-harbor-container fade-in">
      {/* Header with Demo Disclaimer */}
      <div className="talk-header-card">
        <div className="flex items-center gap-3">
          <div className="assistant-avatar-box">
            <Bot className="w-6 h-6 text-cyan animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-hero text-xl text-white font-bold">Talk to HARBOR Assistant</h2>
              <span className="demo-tag">SIMULATED AI DEMO</span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">
              Conversational intelligence for transaction risk guidance, scam awareness, and Trust Score
              insights.
            </p>
          </div>
        </div>

        <div className="mandatory-disclaimer-box mt-3">
          <Info className="w-4 h-4 text-amber shrink-0" />
          <span className="text-[11px] text-amber-200 font-mono">
            <strong>DEMO ASSISTANT:</strong> This simulated assistant does not provide verified financial or
            legal advice. Generated responses are for demonstration and educational purposes.
          </span>
        </div>
      </div>

      {/* Main Chat Box Container */}
      <div className="chat-box-container mt-5">
        {/* Messages Scroll Area */}
        <div className="chat-messages-area">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
            >
              <div className={`chat-avatar ${msg.sender === 'user' ? 'user-av' : 'bot-av'}`}>
                {msg.sender === 'user' ? (
                  <User className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Shield className="w-3.5 h-3.5 text-cyan" />
                )}
              </div>
              <div className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                <div className="bubble-text whitespace-pre-line text-xs md:text-sm leading-relaxed">
                  {msg.text}
                </div>
                <span className="bubble-timestamp font-mono">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble-row bot-row">
              <div className="chat-avatar bot-av">
                <Shield className="w-3.5 h-3.5 text-cyan" />
              </div>
              <div className="chat-bubble bot-bubble typing-bubble">
                <div className="flex items-center gap-1.5 py-1">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Question Chips */}
        <div className="suggested-chips-bar">
          <span className="font-mono text-[10px] text-slate-400 shrink-0">SUGGESTED:</span>
          <div className="chips-scroll-wrap">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="chip-btn"
                data-hover
              >
                <Sparkles className="w-3 h-3 text-cyan" />
                <span>{prompt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="chat-input-bar"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about transaction risk, Trust Score, or scam prevention..."
            className="chat-input-field"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="btn-send-chat"
            data-hover
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
