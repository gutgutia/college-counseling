"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Check, 
  Minus, 
  AlertCircle, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  TrendingUp,
  Calendar,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

// ============================================================================
// MOCK DATA
// ============================================================================

type ApplicationStatus = "not_started" | "in_progress" | "submitted" | "accepted" | "rejected" | "waitlisted";
type SchoolTier = "reach" | "target" | "safety";

interface School {
  id: string;
  name: string;
  logo: string;
  color: string;
  textColor?: string;
  location: string;
  deadline: string;
  deadlineType: string;
  chance: number;
  tier: SchoolTier;
  status: ApplicationStatus;
  factors: {
    name: string;
    score: number;
    threshold: number;
    status: "strong" | "ok" | "gap";
  }[];
  recommendation: string;
}

const MOCK_SCHOOLS: School[] = [
  {
    id: "stanford",
    name: "Stanford University",
    logo: "S",
    color: "#8C1515",
    location: "Stanford, CA",
    deadline: "Jan 1",
    deadlineType: "RD",
    chance: 14,
    tier: "reach",
    status: "not_started",
    factors: [
      { name: "Academics", score: 92, threshold: 90, status: "strong" },
      { name: "Testing", score: 88, threshold: 85, status: "strong" },
      { name: "Activities", score: 70, threshold: 95, status: "ok" },
      { name: "Awards", score: 40, threshold: 80, status: "gap" },
    ],
    recommendation: "Your academic profile is strong for Stanford. However, your \"Awards\" pillar is below their typical admit threshold. Focus on securing a national-level award (like AIME or a research publication) to close this gap."
  },
  {
    id: "harvard",
    name: "Harvard University",
    logo: "H",
    color: "#A51C30",
    location: "Cambridge, MA",
    deadline: "Jan 1",
    deadlineType: "RD",
    chance: 10,
    tier: "reach",
    status: "not_started",
    factors: [
      { name: "Academics", score: 92, threshold: 92, status: "strong" },
      { name: "Testing", score: 88, threshold: 90, status: "ok" },
      { name: "Activities", score: 70, threshold: 95, status: "gap" },
      { name: "Awards", score: 40, threshold: 85, status: "gap" },
    ],
    recommendation: "Harvard values exceptional extracurriculars and leadership. Your activities need more depth or national recognition. Consider taking a leadership role in your strongest activity."
  },
  {
    id: "yale",
    name: "Yale University",
    logo: "Y",
    color: "#00356B",
    location: "New Haven, CT",
    deadline: "Jan 2",
    deadlineType: "RD",
    chance: 12,
    tier: "reach",
    status: "in_progress",
    factors: [
      { name: "Academics", score: 92, threshold: 90, status: "strong" },
      { name: "Testing", score: 88, threshold: 88, status: "strong" },
      { name: "Activities", score: 70, threshold: 90, status: "ok" },
      { name: "Awards", score: 40, threshold: 75, status: "gap" },
    ],
    recommendation: "Yale appreciates well-rounded students with intellectual curiosity. Your profile shows promise but needs stronger award recognition. Your community involvement through EduAccess is a great fit for Yale's mission."
  },
  {
    id: "mit",
    name: "MIT",
    logo: "M",
    color: "#A31F34",
    location: "Cambridge, MA",
    deadline: "Jan 1",
    deadlineType: "RD",
    chance: 8,
    tier: "reach",
    status: "not_started",
    factors: [
      { name: "Academics", score: 92, threshold: 95, status: "ok" },
      { name: "Testing", score: 88, threshold: 92, status: "ok" },
      { name: "Activities", score: 70, threshold: 90, status: "gap" },
      { name: "Awards", score: 40, threshold: 90, status: "gap" },
    ],
    recommendation: "MIT heavily weights STEM achievements. Your robotics experience is good, but you'd benefit from a significant research project or competition win (like USACO, Science Olympiad nationals)."
  },
  {
    id: "ucla",
    name: "UCLA",
    logo: "UC",
    color: "#2774AE",
    location: "Los Angeles, CA",
    deadline: "Nov 30",
    deadlineType: "UC",
    chance: 42,
    tier: "target",
    status: "submitted",
    factors: [
      { name: "Academics", score: 92, threshold: 85, status: "strong" },
      { name: "Testing", score: 88, threshold: 80, status: "strong" },
      { name: "Activities", score: 70, threshold: 75, status: "ok" },
      { name: "Awards", score: 40, threshold: 60, status: "gap" },
    ],
    recommendation: "Strong match for UCLA! Your academics exceed their typical admits. The UC system values community service and leadership, which aligns well with your EduAccess work."
  },
  {
    id: "michigan",
    name: "University of Michigan",
    logo: "M",
    color: "#FFCB05",
    textColor: "#00274C",
    location: "Ann Arbor, MI",
    deadline: "Feb 1",
    deadlineType: "RD",
    chance: 55,
    tier: "target",
    status: "in_progress",
    factors: [
      { name: "Academics", score: 92, threshold: 82, status: "strong" },
      { name: "Testing", score: 88, threshold: 78, status: "strong" },
      { name: "Activities", score: 70, threshold: 70, status: "strong" },
      { name: "Awards", score: 40, threshold: 55, status: "gap" },
    ],
    recommendation: "Michigan is a strong match. Your profile exceeds their averages in most areas. Consider applying to their honors program to maximize your experience."
  },
  {
    id: "usc",
    name: "USC",
    logo: "SC",
    color: "#990000",
    location: "Los Angeles, CA",
    deadline: "Jan 15",
    deadlineType: "RD",
    chance: 48,
    tier: "target",
    status: "not_started",
    factors: [
      { name: "Academics", score: 92, threshold: 80, status: "strong" },
      { name: "Testing", score: 88, threshold: 75, status: "strong" },
      { name: "Activities", score: 70, threshold: 72, status: "ok" },
      { name: "Awards", score: 40, threshold: 50, status: "gap" },
    ],
    recommendation: "Good match for USC. They value entrepreneurship and innovation — your nonprofit founding will resonate well. Apply for merit scholarships!"
  },
  {
    id: "ucsd",
    name: "UC San Diego",
    logo: "UC",
    color: "#182B49",
    location: "La Jolla, CA",
    deadline: "Nov 30",
    deadlineType: "UC",
    chance: 72,
    tier: "safety",
    status: "submitted",
    factors: [
      { name: "Academics", score: 92, threshold: 78, status: "strong" },
      { name: "Testing", score: 88, threshold: 72, status: "strong" },
      { name: "Activities", score: 70, threshold: 65, status: "strong" },
      { name: "Awards", score: 40, threshold: 45, status: "ok" },
    ],
    recommendation: "Excellent safety school choice. You exceed their profile in all major areas. Strong STEM programs that align with your interests."
  },
  {
    id: "uiuc",
    name: "UIUC",
    logo: "I",
    color: "#E84A27",
    location: "Urbana-Champaign, IL",
    deadline: "Jan 5",
    deadlineType: "RD",
    chance: 78,
    tier: "safety",
    status: "not_started",
    factors: [
      { name: "Academics", score: 92, threshold: 75, status: "strong" },
      { name: "Testing", score: 88, threshold: 70, status: "strong" },
      { name: "Activities", score: 70, threshold: 60, status: "strong" },
      { name: "Awards", score: 40, threshold: 40, status: "strong" },
    ],
    recommendation: "Strong safety with excellent CS and engineering programs. Your profile is well above their admits. Consider their honors college."
  },
];

const SUGGESTED_SCHOOLS = [
  { name: "Carnegie Mellon", reason: "Strong CS program matches your robotics interest", chance: 22, tier: "reach" as SchoolTier },
  { name: "Georgia Tech", reason: "Top engineering with good admit rate for your profile", chance: 45, tier: "target" as SchoolTier },
  { name: "UC Berkeley", reason: "Already in CA, excellent STEM research opportunities", chance: 28, tier: "reach" as SchoolTier },
];

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function SchoolsPage() {
  const [schools, setSchools] = useState(MOCK_SCHOOLS);
  const [expandedId, setExpandedId] = useState<string | null>("stanford");

  const reachSchools = schools.filter(s => s.tier === "reach");
  const targetSchools = schools.filter(s => s.tier === "target");
  const safetySchools = schools.filter(s => s.tier === "safety");

  const avgChance = Math.round(schools.reduce((sum, s) => sum + s.chance, 0) / schools.length);
  
  // Find next deadline
  const upcomingSchools = [...schools]
    .filter(s => s.status !== "submitted" && s.status !== "accepted" && s.status !== "rejected")
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  const nextDeadline = upcomingSchools[0];

  const handleStatusChange = (schoolId: string, newStatus: ApplicationStatus) => {
    setSchools(schools.map(s => 
      s.id === schoolId ? { ...s, status: newStatus } : s
    ));
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-6 gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-text-main mb-2">My Schools</h1>
          <p className="text-text-muted">Your decision funnel and application tracker.</p>
        </div>
        <Link href="/advisor?mode=schools">
          <Button>
            <Plus className="w-4 h-4" />
            Add School
          </Button>
        </Link>
      </div>

      {/* Subtle Chat Prompt */}
      <Link 
        href="/advisor?mode=schools" 
        className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-primary transition-colors mb-8 group"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Need help building your list? <span className="text-accent-primary group-hover:underline">Chat with your advisor →</span></span>
      </Link>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <StatCard label="List Balance">
          <div className="text-lg font-medium text-text-muted">
            <span className="text-reach-text font-bold">{reachSchools.length}</span> Reach · 
            <span className="text-target-text font-bold ml-2">{targetSchools.length}</span> Target · 
            <span className="text-safety-text font-bold ml-2">{safetySchools.length}</span> Safety
          </div>
        </StatCard>
        <StatCard 
          label="Next Deadline" 
          value={nextDeadline ? nextDeadline.deadline : "—"} 
          sub={nextDeadline ? `${nextDeadline.name} (${nextDeadline.deadlineType})` : "All submitted!"} 
        />
        <StatCard label="Avg Admission Chance" value={`${avgChance}%`} />
      </div>

      {/* Reach Schools */}
      {reachSchools.length > 0 && (
        <SchoolSection 
          title="Reach Schools" 
          tier="reach"
          schools={reachSchools}
          expandedId={expandedId}
          onToggle={toggleExpand}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Target Schools */}
      {targetSchools.length > 0 && (
        <SchoolSection 
          title="Target Schools" 
          tier="target"
          schools={targetSchools}
          expandedId={expandedId}
          onToggle={toggleExpand}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Safety Schools */}
      {safetySchools.length > 0 && (
        <SchoolSection 
          title="Safety Schools" 
          tier="safety"
          schools={safetySchools}
          expandedId={expandedId}
          onToggle={toggleExpand}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Suggested Schools */}
      <SuggestedSchools suggestions={SUGGESTED_SCHOOLS} />
    </>
  );
}

// ============================================================================
// SCHOOL SECTION
// ============================================================================

function SchoolSection({ 
  title, 
  tier, 
  schools, 
  expandedId, 
  onToggle,
  onStatusChange
}: { 
  title: string; 
  tier: SchoolTier;
  schools: School[];
  expandedId: string | null;
  onToggle: (id: string) => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}) {
  const badgeLabel = tier === "reach" ? "Hard" : tier === "target" ? "Match" : "Likely";
  
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="font-display font-bold text-lg">{title}</h3>
        <StatusBadge status={tier}>{badgeLabel}</StatusBadge>
      </div>

      <div className="space-y-3">
        {schools.map(school => (
          <SchoolCard 
            key={school.id}
            school={school}
            isExpanded={expandedId === school.id}
            onToggle={() => onToggle(school.id)}
            onStatusChange={(status) => onStatusChange(school.id, status)}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// SCHOOL CARD
// ============================================================================

function SchoolCard({ 
  school, 
  isExpanded, 
  onToggle,
  onStatusChange
}: { 
  school: School;
  isExpanded: boolean;
  onToggle: () => void;
  onStatusChange: (status: ApplicationStatus) => void;
}) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const statusLabels: Record<ApplicationStatus, string> = {
    not_started: "Not Started",
    in_progress: "In Progress",
    submitted: "Submitted",
    accepted: "Accepted",
    rejected: "Rejected",
    waitlisted: "Waitlisted"
  };

  const statusColors: Record<ApplicationStatus, string> = {
    not_started: "bg-bg-sidebar text-text-muted",
    in_progress: "bg-amber-50 text-amber-700",
    submitted: "bg-blue-50 text-blue-700",
    accepted: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-600",
    waitlisted: "bg-purple-50 text-purple-700"
  };

  if (!isExpanded) {
    // Collapsed row
    return (
      <div 
        onClick={onToggle}
        className="bg-white border border-border-subtle rounded-xl p-4 flex items-center gap-4 hover:border-accent-primary hover:shadow-sm transition-all cursor-pointer"
      >
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0" 
          style={{ backgroundColor: school.color, color: school.textColor || "white" }}
        >
          {school.logo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-text-main">{school.name}</div>
          <div className="text-xs text-text-muted">{school.location}</div>
        </div>
        <div className="hidden md:block">
          <span className={cn("text-xs font-medium px-2 py-1 rounded-full", statusColors[school.status])}>
            {statusLabels[school.status]}
          </span>
        </div>
        <div className="text-sm text-text-muted hidden md:flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {school.deadline}
        </div>
        <div className={cn(
          "font-mono font-bold text-sm",
          school.tier === "safety" ? "text-safety-text" : 
          school.tier === "target" ? "text-target-text" : "text-text-main"
        )}>
          {school.chance}%
        </div>
        <ChevronDown className="w-4 h-4 text-text-muted" />
      </div>
    );
  }

  // Expanded card
  return (
    <div className="bg-white border border-accent-primary rounded-[20px] shadow-card overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <div className="bg-[#FAFAF9] border-b lg:border-b-0 lg:border-r border-border-subtle p-6">
          <div className="flex items-start justify-between mb-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl" 
              style={{ backgroundColor: school.color, color: school.textColor || "white" }}
            >
              {school.logo}
            </div>
            <button 
              onClick={onToggle}
              className="p-1.5 text-text-muted hover:text-text-main hover:bg-white rounded-lg transition-colors"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>
          
          <h2 className="font-display font-bold text-xl mb-1">{school.name}</h2>
          <p className="text-sm text-text-muted mb-6">{school.location}</p>

          <div className="bg-white border border-border-medium rounded-xl p-4 text-center mb-6">
            <div className="font-display font-bold text-2xl text-text-main">{school.chance}%</div>
            <div className="text-xs text-text-muted mt-1">Your Estimated Chance</div>
          </div>

          <div className="text-sm text-text-muted space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span><strong>Deadline:</strong> {school.deadline} ({school.deadlineType})</span>
            </div>
            
            {/* Status Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setShowStatusMenu(!showStatusMenu); }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  statusColors[school.status]
                )}
              >
                <span>{statusLabels[school.status]}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showStatusMenu && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-border-subtle rounded-lg shadow-lg py-1 z-20">
                  {(Object.keys(statusLabels) as ApplicationStatus[]).map(status => (
                    <button
                      key={status}
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        onStatusChange(status); 
                        setShowStatusMenu(false); 
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm hover:bg-bg-sidebar transition-colors",
                        school.status === status && "font-semibold bg-bg-sidebar"
                      )}
                    >
                      {statusLabels[status]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Match Analysis */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-6">Profile Match Report</h4>
              
              <div className="space-y-4">
                {school.factors.map(factor => (
                  <FactorRow 
                    key={factor.name}
                    name={factor.name} 
                    score={factor.score} 
                    threshold={factor.threshold} 
                    status={factor.status} 
                  />
                ))}
              </div>
            </div>

            <div className="lg:w-[280px] bg-accent-surface rounded-xl p-5 text-[13px] text-accent-primary leading-relaxed h-fit">
              <strong className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Advisor Insight
              </strong>
              <p className="mt-3">{school.recommendation}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-border-subtle flex flex-wrap gap-3">
            <Link 
              href={`/advisor?school=${school.id}`}
              className="flex items-center gap-1.5 text-sm text-accent-primary hover:underline"
            >
              <MessageCircle className="w-4 h-4" />
              Discuss this school
            </Link>
            <a 
              href={`https://www.google.com/search?q=${encodeURIComponent(school.name + " admissions")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-main"
            >
              <ExternalLink className="w-4 h-4" />
              Visit website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SUGGESTED SCHOOLS
// ============================================================================

function SuggestedSchools({ suggestions }: { suggestions: typeof SUGGESTED_SCHOOLS }) {
  return (
    <div className="mt-12 pt-8 border-t border-border-subtle">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-accent-primary" />
        <h3 className="font-display font-bold text-lg">Suggested Schools</h3>
      </div>
      <p className="text-sm text-text-muted mb-6">Based on your profile, these schools might be a good fit.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestions.map((school, i) => (
          <div 
            key={i}
            className="bg-white border border-border-subtle rounded-xl p-5 hover:border-accent-primary hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-text-main">{school.name}</h4>
              <StatusBadge status={school.tier}>
                {school.tier === "reach" ? "Reach" : school.tier === "target" ? "Target" : "Safety"}
              </StatusBadge>
            </div>
            <p className="text-sm text-text-muted mb-4">{school.reason}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sm">
                <TrendingUp className="w-4 h-4 text-accent-primary" />
                <span className="font-mono font-semibold">{school.chance}%</span>
                <span className="text-text-muted">chance</span>
              </div>
              <Link 
                href={`/advisor?mode=schools&suggest=${encodeURIComponent(school.name)}`}
                className="text-sm text-accent-primary hover:underline"
              >
                Add to list
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// SHARED COMPONENTS
// ============================================================================

function StatCard({ label, value, sub, children }: { 
  label: string; 
  value?: string; 
  sub?: string; 
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-border-subtle p-5 rounded-xl">
      <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">{label}</div>
      {value && <div className="font-display font-bold text-3xl text-text-main">{value}</div>}
      {sub && <div className="text-xs text-text-muted mt-1">{sub}</div>}
      {children}
    </div>
  );
}

function FactorRow({ name, score, threshold, status }: { 
  name: string; 
  score: number; 
  threshold: number; 
  status: "strong" | "ok" | "gap";
}) {
  let colorClass = "";
  let Icon = Check;
  let iconColor = "";

  if (status === 'strong') { 
    colorClass = "bg-accent-primary"; 
    iconColor = "text-accent-primary"; 
  } else if (status === 'ok') { 
    colorClass = "bg-[#F59E0B]"; 
    Icon = Minus; 
    iconColor = "text-[#F59E0B]"; 
  } else if (status === 'gap') { 
    colorClass = "bg-[#EF4444]"; 
    Icon = AlertCircle; 
    iconColor = "text-[#EF4444]"; 
  }

  return (
    <div className="flex items-center text-sm">
      <div className="w-24 font-medium">{name}</div>
      <div className="flex-1 h-2 bg-bg-sidebar rounded-full relative mx-3">
        {/* Threshold marker */}
        <div 
          className="absolute -top-0.5 bottom-[-2px] w-0.5 bg-black/40 z-10" 
          style={{ left: `${threshold}%` }} 
          title={`School threshold: ${threshold}%`}
        />
        {/* Score bar */}
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${score}%` }} />
      </div>
      <Icon className={`w-4 h-4 ${iconColor}`} />
    </div>
  );
}
