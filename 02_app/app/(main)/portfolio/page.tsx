"use client";

import React from "react";
import { GraduationCap, PenTool, Users, Zap, FlaskConical, Trophy, Download, Edit3, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

export default function PortfolioPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-text-main mb-2">My Portfolio</h1>
          <p className="text-text-muted">Your living resume and strengths profile.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
          <Button>
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Academics */}
        <PillarCard 
          icon={GraduationCap} 
          title="Academics" 
          status="strong" 
          label="Strong"
        >
          <DataRow label="GPA (Unweighted)" value="3.92" />
          <DataRow label="GPA (Weighted)" value="4.25" />
          <DataRow label="Course Rigor" value="8 AP / 4 Honors" />
          
          <div className="mt-4 p-3 bg-bg-sidebar rounded-lg text-xs text-text-muted flex gap-2">
            <Info className="w-4 h-4 shrink-0" />
            Top 5% of class based on current trajectory.
          </div>
        </PillarCard>

        {/* Testing */}
        <PillarCard 
          icon={PenTool} 
          title="Testing" 
          status="strong" 
          label="Strong"
        >
          <DataRow label="SAT Super Score" value="1540" />
          <DataRow label="Math Level 2" value="800" />
          <DataRow label="AP Calculus BC" value="5" />
          <DataRow label="AP Physics C" value="5" />
        </PillarCard>

        {/* Activities (The Spike) */}
        <PillarCard 
          icon={Users} 
          title="Activities" 
          status="strong" 
          label="Exceptional"
          className="md:row-span-2 relative overflow-hidden"
        >
          <div className="absolute top-6 right-6 flex flex-col items-center gap-1">
            <Zap className="w-5 h-5 text-accent-primary fill-accent-primary" />
            <span className="text-[10px] uppercase font-bold text-accent-primary tracking-wider">Spike</span>
          </div>

          <div className="space-y-6">
            <ActivityItem 
              title="Founder & President, EduAccess Nonprofit"
              meta="10th-11th • 15 hr/wk"
              desc="Founded peer tutoring org growing to 50+ tutors. Partnered with 3 local districts. Raised $2k in grants."
            />
            <ActivityItem 
              title="Varsity Tennis Captain"
              meta="9th-11th • 12 hr/wk"
            />
            <ActivityItem 
              title="Robotics Lead Programmer"
              meta="10th-11th • 10 hr/wk"
            />
          </div>
        </PillarCard>

        {/* Programs */}
        <PillarCard 
          icon={FlaskConical} 
          title="Programs" 
          status="building" 
          label="Building"
        >
          <div className="space-y-4">
            <ActivityItem 
              title="COSMOS (Math Cluster)"
              meta="Summer 2024 • Completed"
            />
            <ActivityItem 
              title="Stanford SIMR"
              meta="Summer 2025 • Applying"
              highlight
            />
          </div>
        </PillarCard>

        {/* Awards */}
        <PillarCard 
          icon={Trophy} 
          title="Awards" 
          status="gap" 
          label="Gap"
        >
          <div className="space-y-4">
            <ActivityItem 
              title="AIME Qualifier"
              meta="National • 2024"
            />
            <ActivityItem 
              title="AP Scholar with Distinction"
              meta="National • 2024"
            />
          </div>
        </PillarCard>

      </div>
    </>
  );
}

function PillarCard({ icon: Icon, title, status, label, children, className }: any) {
  return (
    <div className={cn("bg-white border border-border-subtle rounded-[20px] p-6 shadow-card hover:border-accent-border transition-all", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-bg-sidebar rounded-lg flex items-center justify-center text-text-muted">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 font-display font-bold text-lg text-text-main">{title}</div>
        {/* We use the label prop to render the badge, assuming status maps to color styles */}
        {label && <StatusBadge status={status}>{label}</StatusBadge>}
      </div>
      {children}
    </div>
  );
}

function DataRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-bg-sidebar last:border-0 text-[15px]">
      <span className="text-text-muted">{label}</span>
      <span className="font-mono font-semibold text-text-main">{value}</span>
    </div>
  );
}

function ActivityItem({ title, meta, desc, highlight }: any) {
  return (
    <div className={cn("pb-4 border-b border-bg-sidebar last:border-0 last:pb-0", highlight && "opacity-100", !highlight && desc === undefined && "opacity-90")}>
      <div className="font-semibold text-[15px] mb-1">{title}</div>
      <div className={cn("text-xs text-text-muted", highlight && "text-accent-primary font-medium")}>{meta}</div>
      {desc && <div className="mt-2 text-xs text-text-main leading-relaxed">{desc}</div>}
    </div>
  );
}
