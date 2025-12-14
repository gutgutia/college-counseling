"use client";

import { Sparkles, MessageCircle, PlayCircle } from "lucide-react";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <header className="pt-40 pb-24 text-center">
      <div className="container">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent-surface)] border border-[var(--accent-border)] rounded-full text-sm font-semibold text-[var(--accent-primary)] mb-7">
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered College Counseling
        </div>

        {/* Title */}
        <h1 className="font-['Satoshi'] text-5xl md:text-6xl font-black mb-6 max-w-3xl mx-auto">
          Your personal advisor for the{" "}
          <span className="text-[var(--accent-primary)]">college journey</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-[var(--text-muted)] max-w-xl mx-auto mb-10 leading-relaxed">
          Get expert guidance, honest chance assessments, and a clear roadmap — all through a conversation with an AI that knows you.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Button variant="primary" href="#">
            <MessageCircle className="w-4 h-4" />
            Start Chatting Free
          </Button>
          <Button variant="secondary" href="#how">
            <PlayCircle className="w-4 h-4" />
            See How It Works
          </Button>
        </div>

        {/* Screenshot - Responsive container */}
        <div className="hero-screenshot-wrapper max-w-[1000px] mx-auto">
          <div 
            className="hero-screenshot-container rounded-2xl overflow-hidden bg-white"
            style={{
              boxShadow: "0 40px 100px -30px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.04)"
            }}
          >
            <div className="hero-screenshot-inner w-[1000px] h-[620px] origin-top-left">
              <iframe 
                src="/screenshots/hero-screenshot.html" 
                className="w-[1000px] h-[620px] border-none pointer-events-none"
                loading="lazy"
                scrolling="no"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Responsive scaling */}
      <style jsx>{`
        .hero-screenshot-wrapper {
          position: relative;
        }
        .hero-screenshot-container {
          position: relative;
        }
        .hero-screenshot-inner {
          transform: scale(1);
        }
        @media (max-width: 1048px) {
          .hero-screenshot-wrapper {
            height: calc(620px * 0.85);
          }
          .hero-screenshot-inner {
            transform: scale(0.85);
          }
        }
        @media (max-width: 850px) {
          .hero-screenshot-wrapper {
            height: calc(620px * 0.72);
          }
          .hero-screenshot-inner {
            transform: scale(0.72);
          }
        }
        @media (max-width: 650px) {
          .hero-screenshot-wrapper {
            height: calc(620px * 0.55);
          }
          .hero-screenshot-inner {
            transform: scale(0.55);
          }
        }
        @media (max-width: 520px) {
          .hero-screenshot-wrapper {
            height: calc(620px * 0.42);
          }
          .hero-screenshot-inner {
            transform: scale(0.42);
          }
        }
      `}</style>
    </header>
  );
}
