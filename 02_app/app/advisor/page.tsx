"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Send, GraduationCap, ArrowLeft, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PortfolioWidget } from "@/components/chat/PortfolioWidget";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  widget?: {
    type: "confirm_portfolio" | "confirm_school";
    data: any;
    status: "draft" | "saved";
  };
  action?: { // Keeping this for side-panel updates only
    type: "update_portfolio" | "add_school";
    data: any;
    label: string;
  };
};

export default function AdvisorPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");
  
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeContext, setActiveContext] = useState<any>(null); // For the side panel
  
  const hasInitialized = useRef(false);

  // Handle Initial Query from Dashboard
  useEffect(() => {
    if (initialQuery && !hasInitialized.current) {
      hasInitialized.current = true;
      addMessage("user", initialQuery);
      processAIResponse(initialQuery);
    } else if (!initialQuery && !hasInitialized.current) {
        hasInitialized.current = true;
        setMessages([{
            id: "welcome",
            role: "assistant",
            text: "Hi Rohan. I'm ready to help. We can update your profile, research schools, or plan your week. What's on your mind?"
        }]);
    }
  }, [initialQuery]);

  const addMessage = (role: "user" | "assistant", text: string, action?: any, widget?: any) => {
    const msg: Message = { id: Date.now().toString(), role, text, action, widget };
    setMessages((prev) => [...prev, msg]);
    if (action) setActiveContext(action); 
  };

  const processAIResponse = (userText: string) => {
    setIsTyping(true);
    setTimeout(() => {
      let responseText = "I'm listening. Tell me more.";
      let action = undefined;
      let widget = undefined;

      const lower = userText.toLowerCase();
      if (lower.includes("sat") || lower.includes("score")) {
        responseText = "That's a huge milestone! A 1520 puts you in a very strong position. I've drafted an update for your Testing pillar. Could you confirm the date?";
        
        // Inline Widget (Draft Mode)
        widget = {
          type: "confirm_portfolio",
          status: "draft",
          data: { 
            category: "Testing",
            label: "SAT Super Score", 
            value: "1520", 
            date: "" // Missing field
          }
        };
      } else if (lower.includes("stanford")) {
        responseText = "Stanford is ambitious, but with your profile, it's a valid Reach. I've added it to your list so we can track requirements.";
        action = {
          type: "add_school",
          label: "Added to List",
          data: { name: "Stanford", status: "Reach", deadline: "Jan 1" }
        };
      }

      addMessage("assistant", responseText, undefined, widget);
      setIsTyping(false);
    }, 1500);
  };

  // Function to handle widget confirmation
  const handleConfirmWidget = (msgId: string, updatedData: any) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === msgId && msg.widget) {
        return {
          ...msg,
          widget: { ...msg.widget, status: "saved", data: updatedData }
        };
      }
      return msg;
    }));

    // Also update the side panel context
    setActiveContext({
      type: "update_portfolio",
      data: { label: updatedData.label, value: updatedData.value }
    });
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    addMessage("user", input);
    processAIResponse(input);
    setInput("");
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-theme(spacing.16))] md:h-screen bg-bg-app">
      
      {/* Left: Chat Interface */}
      <div className="flex-1 flex flex-col h-full border-r border-border-subtle relative">
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-border-subtle bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <Link href="/" className="mr-4 p-2 hover:bg-bg-sidebar rounded-full transition-colors text-text-muted">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-text-main">Advisor</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[80%] rounded-2xl px-5 py-4 text-[15px] leading-relaxed shadow-sm",
                msg.role === "user" 
                  ? "bg-text-main text-white rounded-br-sm" 
                  : "bg-white border border-border-subtle text-text-main rounded-bl-sm"
              )}>
                {msg.text}

                {/* Inline Interactive Widget */}
                {msg.widget && (
                  <div className="mt-4">
                    <PortfolioWidget 
                      data={msg.widget.data} 
                      status={msg.widget.status}
                      onConfirm={(data) => handleConfirmWidget(msg.id, data)}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-border-subtle rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-text-muted/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-text-muted/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-text-muted/40 rounded-full animate-bounce" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-border-subtle">
          <div className="relative max-w-3xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Ask anything..."
              className="w-full bg-bg-sidebar border border-border-medium rounded-xl pl-5 pr-14 py-4 text-[15px] focus:outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-surface transition-all shadow-inner"
              autoFocus
            />
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 bg-text-main text-white rounded-lg hover:bg-black/80 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right: Live Context Panel (Hidden on mobile initially, visible on desktop) */}
      <div className="hidden md:flex w-[380px] bg-[#FAFAF9] flex-col border-l border-border-subtle p-6">
        <h3 className="font-display font-bold text-sm uppercase tracking-wider text-text-muted mb-6">Live Updates</h3>
        
        {activeContext ? (
          <div className="animate-in slide-in-from-right-4 fade-in duration-500">
            {activeContext.type === "update_portfolio" && (
              <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent-surface text-accent-primary rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted uppercase font-bold">Testing</div>
                    <div className="font-semibold text-text-main">Score Updated</div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border-subtle">
                  <span className="text-sm text-text-muted">{activeContext.data.label}</span>
                  <span className="font-mono font-bold text-lg text-accent-primary">{activeContext.data.value}</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-success-text bg-success-bg px-2 py-1 rounded-md w-fit">
                  <CheckCircle className="w-3 h-3" />
                  Saved to Portfolio
                </div>
              </div>
            )}

            {activeContext.type === "add_school" && (
              <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-card">
                <div className="w-12 h-12 bg-[#8C1515] text-white rounded-lg flex items-center justify-center font-bold text-xl mb-4">S</div>
                <h3 className="font-display font-bold text-lg">{activeContext.data.name}</h3>
                <div className="text-sm text-text-muted mb-4">Added to your list</div>
                <div className="flex gap-2">
                    <span className="px-2 py-1 bg-reach-bg text-reach-text text-xs font-bold uppercase rounded-md">{activeContext.data.status}</span>
                    <span className="px-2 py-1 bg-bg-sidebar text-text-muted text-xs font-medium rounded-md">Due {activeContext.data.deadline}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-text-muted opacity-50">
            <Sparkles className="w-8 h-8 mb-3" />
            <p className="text-sm text-center">Context and updates will<br/>appear here as we chat.</p>
          </div>
        )}
      </div>

    </div>
  );
}
