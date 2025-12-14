"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header
      className="
        sticky top-0 z-50
        bg-[rgba(10,10,10,0.9)] backdrop-blur-xl
        border-b border-[var(--s3-border)]
        py-4
      "
    >
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-[0.85]">
            <span className="font-display text-[28px] tracking-wide text-[var(--s3-text-primary)]">
              SESAME
            </span>
            <span className="font-display text-[28px] tracking-wide text-[var(--s3-cyan)]">
              3
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              href="#features"
              className="text-sm font-medium text-[var(--s3-text-secondary)] uppercase tracking-wide hover:text-[var(--s3-text-primary)] transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-[var(--s3-text-secondary)] uppercase tracking-wide hover:text-[var(--s3-text-primary)] transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/app/login"
              className="text-sm font-medium text-[var(--s3-text-secondary)] uppercase tracking-wide hover:text-[var(--s3-text-primary)] transition-colors"
            >
              Login
            </Link>
            <Button size="sm">Get Started</Button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-[var(--s3-text-primary)]">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

