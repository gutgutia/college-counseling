import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`
        bg-[var(--s3-bg-elevated)] 
        border border-[var(--s3-border)] 
        rounded-2xl p-8
        transition-all duration-300
        ${hover ? "hover:border-[var(--s3-cyan)] hover:-translate-y-1" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div
      className="
        bg-[var(--s3-bg-primary)] 
        border border-[var(--s3-border)] 
        p-10
        transition-all duration-300
        hover:border-[var(--s3-cyan)] hover:-translate-y-1
      "
    >
      <div
        className="
          w-12 h-12 
          bg-[var(--s3-cyan-subtle)] 
          rounded-xl 
          flex items-center justify-center 
          mb-6 
          text-[var(--s3-cyan)]
        "
      >
        {icon}
      </div>
      <h3 className="font-display text-2xl mb-4 tracking-wide">{title}</h3>
      <p className="text-[var(--s3-text-secondary)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
}

export function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <div
      className="
        bg-[var(--s3-bg-elevated)] 
        border border-[var(--s3-border)] 
        rounded-2xl p-6
        backdrop-blur-lg
      "
    >
      <div className="text-[11px] uppercase tracking-widest text-[var(--s3-text-muted)] mb-1">
        {label}
      </div>
      <div className="font-mono text-3xl font-semibold text-[var(--s3-cyan)]">
        {value}
      </div>
      {trend && (
        <div className="text-xs text-[var(--s3-success)] flex items-center gap-1 mt-1">
          {trend}
        </div>
      )}
    </div>
  );
}

