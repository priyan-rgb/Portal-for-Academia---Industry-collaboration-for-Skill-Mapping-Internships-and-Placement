import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  X,
  Send,
  Sparkles,
  User,
  Compass,
  Zap,
  ArrowRight,
  HelpCircle,
  Minimize2,
} from 'lucide-react';

export const AICareerAssistant: React.FC = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    chatMessages,
    sendChatMessage,
    skillGapResult,
    targetRole,
    studentSkills,
  } = useApp();

  const [inputPrompt, setInputPrompt] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isChatOpen]);

  if (!isChatOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;
    sendChatMessage(inputPrompt.trim());
    setInputPrompt('');
  };

  const handlePromptClick = (prompt: string) => {
    sendChatMessage(prompt);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 md:w-[440px] bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-slideLeft">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-teal-900 to-slate-900 text-white flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white">SkillBridge Career AI</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-teal-200/80">
              Profile-Grounded Guidance • {targetRole.name}
            </p>
          </div>
        </div>

        <button
          id="btn-close-ai-assistant"
          onClick={() => setIsChatOpen(false)}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Context Ribbon */}
      <div className="px-4 py-2 bg-teal-50 border-b border-teal-100 flex items-center justify-between text-xs text-teal-900">
        <span className="flex items-center gap-1 font-medium">
          <Compass className="w-3.5 h-3.5 text-teal-600" />
          <span>Readiness: <strong className="font-mono">{skillGapResult.readinessScore}%</strong></span>
        </span>
        <span className="text-[11px] text-teal-700">
          {skillGapResult.gaps.length} gaps to close
        </span>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {chatMessages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
            >
              {isAssistant && (
                <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2.5 ${
                  isAssistant
                    ? 'bg-white border border-slate-200 text-slate-800 shadow-2xs'
                    : 'bg-teal-600 text-white font-medium rounded-tr-xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Suggested prompt chips attached to assistant reply */}
                {isAssistant && msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Suggested Inquiries
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {msg.suggestedPrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePromptClick(prompt)}
                          className="text-left text-[11px] font-medium text-teal-700 hover:text-teal-900 bg-teal-50/70 hover:bg-teal-100/70 px-2.5 py-1.5 rounded-lg border border-teal-200/60 transition-all flex items-center justify-between group"
                        >
                          <span>{prompt}</span>
                          <ArrowRight className="w-3 h-3 text-teal-500 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={`text-[9px] font-mono text-right ${
                    isAssistant ? 'text-slate-400' : 'text-teal-100'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {!isAssistant && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            id="input-career-chat"
            type="text"
            placeholder="Ask about your gaps, readiness, or target role..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim()}
            className="p-2 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white transition-all shadow-2xs shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="text-[10px] text-slate-400 text-center mt-2 font-mono">
          SkillBridge Rule Engine • Grounded on Alex Chen's Profile
        </div>
      </div>
    </div>
  );
};
