"use client";

import React from "react";
import { Plus, Check, Minus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

export default function SchoolsPage() {
  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-text-main mb-2">My Schools</h1>
          <p className="text-text-muted">Your decision funnel and application tracker.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Add School
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard label="List Balance">
          <div className="text-lg font-medium text-text-muted">
            <span className="text-reach-text font-bold">4</span> Reach · 
            <span className="text-target-text font-bold ml-2">2</span> Target · 
            <span className="text-safety-text font-bold ml-2">1</span> Safety
          </div>
        </StatCard>
        <StatCard label="Next Deadline" value="Jan 01" sub="Stanford (RD)" />
        <StatCard label="Avg Admission Chance" value="18%" />
      </div>

      {/* Reach Schools */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-display font-bold text-lg">Reach Schools</h3>
          <StatusBadge status="reach">Hard</StatusBadge>
        </div>

        {/* Expanded School Card */}
        <div className="bg-white border border-border-subtle rounded-[20px] shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-[280px_1fr] mb-5">
          {/* Sidebar */}
          <div className="bg-[#FAFAF9] border-b lg:border-b-0 lg:border-r border-border-subtle p-6">
            <div className="w-12 h-12 bg-[#8C1515] text-white rounded-lg flex items-center justify-center font-bold text-xl mb-4">S</div>
            <h2 className="font-display font-bold text-xl mb-1">Stanford</h2>
            <p className="text-sm text-text-muted mb-6">Stanford, CA</p>

            <div className="bg-white border border-border-medium rounded-xl p-4 text-center mb-6">
              <div className="font-display font-bold text-2xl text-text-main">12-15%</div>
              <div className="text-xs text-text-muted mt-1">Your Estimated Chance</div>
            </div>

            <div className="text-sm text-text-muted space-y-2">
              <div><strong>Deadline:</strong> Jan 1 (RD)</div>
              <div><strong>Status:</strong> Not Started</div>
            </div>
          </div>

          {/* Match Analysis */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-6">Profile Match Report</h4>
                
                <div className="space-y-4">
                  <FactorRow name="Academics" score={92} threshold={90} status="strong" />
                  <FactorRow name="Testing" score={88} threshold={85} status="strong" />
                  <FactorRow name="Activities" score={70} threshold={95} status="ok" />
                  <FactorRow name="Awards" score={40} threshold={80} status="gap" />
                </div>
              </div>

              <div className="lg:w-[280px] bg-accent-surface rounded-xl p-5 text-[13px] text-accent-primary leading-relaxed h-fit">
                <strong>Why this result?</strong><br/><br/>
                Your academic profile is perfect for Stanford. However, your "Awards" pillar is below their typical admit threshold. <br/><br/>
                <strong>Recommendation:</strong> Focus your Plan on securing a national-level award (like AIME or a research publication) to close this gap.
              </div>
            </div>
          </div>
        </div>

        {/* Collapsed Rows */}
        <SchoolRow logo="H" color="#A51C30" name="Harvard University" deadline="Jan 1 (RD)" chance="10%" />
        <SchoolRow logo="Y" color="#00356B" name="Yale University" deadline="Jan 2 (RD)" chance="14%" />
      </div>

      {/* Target Schools */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-display font-bold text-lg">Target Schools</h3>
          <StatusBadge status="target">Match</StatusBadge>
        </div>
        <SchoolRow logo="UC" color="#002855" name="UCLA" deadline="Nov 30 (UC)" chance="42%" highlight />
        <SchoolRow logo="M" color="#FFCB05" textColor="black" name="University of Michigan" deadline="Feb 1 (RD)" chance="55%" highlight />
      </div>
    </>
  );
}

function StatCard({ label, value, sub, children }: any) {
  return (
    <div className="bg-white border border-border-subtle p-5 rounded-xl">
      <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">{label}</div>
      {value && <div className="font-display font-bold text-3xl text-text-main">{value}</div>}
      {sub && <div className="text-xs text-text-muted mt-1">{sub}</div>}
      {children}
    </div>
  );
}

function FactorRow({ name, score, threshold, status }: any) {
  let colorClass = "";
  let Icon = Check;
  let iconColor = "";

  if (status === 'strong') { colorClass = "bg-accent-primary"; iconColor = "text-accent-primary"; }
  else if (status === 'ok') { colorClass = "bg-[#F59E0B]"; Icon = Minus; iconColor = "text-[#F59E0B]"; }
  else if (status === 'gap') { colorClass = "bg-[#EF4444]"; Icon = AlertCircle; iconColor = "text-[#EF4444]"; }

  return (
    <div className="flex items-center text-sm">
      <div className="w-24 font-medium">{name}</div>
      <div className="flex-1 h-2 bg-bg-sidebar rounded-full relative mx-3">
        <div className="absolute -top-0.5 bottom-[-2px] w-0.5 bg-black z-10" style={{ left: `${threshold}%` }} />
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${score}%` }} />
      </div>
      <Icon className={`w-4 h-4 ${iconColor}`} />
    </div>
  );
}

function SchoolRow({ logo, color, textColor = "white", name, deadline, chance, highlight }: any) {
  return (
    <div className="bg-white border border-border-subtle rounded-xl p-4 flex items-center gap-4 mb-3 hover:border-accent-primary hover:translate-x-1 transition-all cursor-pointer">
      <div className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-xs" style={{ backgroundColor: color, color: textColor }}>
        {logo}
      </div>
      <div className="flex-1 font-semibold text-text-main">{name}</div>
      <div className="text-sm text-text-muted hidden md:block">{deadline}</div>
      <div className={cn("font-mono font-semibold text-sm", highlight && "text-accent-primary")}>{chance}</div>
    </div>
  );
}
