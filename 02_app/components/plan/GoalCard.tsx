"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown, Check, Clock, Edit3, FlaskConical, Microscope } from "lucide-react";
import { cn } from "@/lib/utils";

interface GoalCardProps {
  title: string;
  pillar: string;
  impact?: "High" | "Medium" | "Low";
  progress: number;
  defaultExpanded?: boolean;
  children?: React.ReactNode;
}

export function GoalCard({ title, pillar, impact, progress, defaultExpanded = false, children }: GoalCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className={cn(
      "bg-white border border-border-subtle rounded-[20px] p-6 shadow-card transition-all duration-300",
      expanded && "border-accent-border shadow-float"
    )}>
      <div 
        className="flex justify-between items-start cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1">
          <div className="flex gap-3 mb-2">
            <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-1 rounded-md bg-bg-sidebar text-text-muted">
              {pillar}
            </span>
            {impact && (
              <span className={cn(
                "text-[11px] font-semibold px-2 py-1 rounded-md flex items-center gap-1",
                impact === "High" ? "bg-success-bg text-success-text" : "bg-bg-sidebar text-text-muted"
              )}>
                {impact} Impact
              </span>
            )}
          </div>
          <h3 className="font-display font-bold text-xl text-text-main">{title}</h3>
        </div>

        <div className="flex items-center gap-4 min-w-[140px] md:min-w-[240px]">
          <div className="flex-1 h-1.5 bg-bg-sidebar rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent-primary rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <span className="font-mono text-[13px] font-semibold text-text-muted w-9 text-right">
            {progress}%
          </span>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-text-muted" />
          ) : (
            <ChevronDown className="w-5 h-5 text-text-muted" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="pt-6 border-t border-border-subtle mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
}

export function Opportunity({ icon: Icon, title, status, children }: any) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-accent-surface text-accent-primary rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        <div className="font-semibold text-base">{title}</div>
        <span className="text-xs text-text-muted bg-bg-sidebar px-2 py-0.5 rounded ml-auto md:ml-0">
          {status}
        </span>
      </div>
      <div className="pl-11 flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
}

export function TaskRow({ text, done, due, urgent }: any) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-bg-sidebar last:border-0 group">
      <div className={cn(
        "w-5 h-5 border-2 rounded-md flex items-center justify-center cursor-pointer transition-colors shrink-0",
        done ? "bg-accent-primary border-accent-primary text-white" : "border-border-medium hover:border-accent-primary"
      )}>
        {done && <Check className="w-3.5 h-3.5" />}
      </div>
      
      <div className="flex-1">
        <div className={cn("text-[14px] font-medium", done ? "text-text-muted line-through" : "text-text-main")}>
          {text}
        </div>
        {due && (
          <div className={cn("text-xs mt-0.5 flex items-center gap-1", urgent ? "text-warning-text font-medium" : "text-text-light")}>
            {urgent && <Clock className="w-3 h-3" />}
            {due}
          </div>
        )}
      </div>

      <button className="opacity-0 group-hover:opacity-100 p-1 text-text-muted hover:text-text-main transition-opacity">
        <Edit3 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
