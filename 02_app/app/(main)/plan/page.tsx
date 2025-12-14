"use client";

import React from "react";
import { Plus, Calendar, FlaskConical, Microscope, Archive } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GoalCard, Opportunity, TaskRow } from "@/components/plan/GoalCard";

export default function PlanPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-text-main mb-2">My Plan</h1>
          <p className="text-text-muted">Your outcome-driven roadmap.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Calendar className="w-4 h-4" />
            Calendar View
          </Button>
          <Button>
            <Plus className="w-4 h-4" />
            New Goal
          </Button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {['All Goals', 'Programs', 'Academics', 'Testing', 'Essays'].map((filter, i) => (
          <button 
            key={filter}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium border transition-colors whitespace-nowrap",
              i === 0 
                ? "bg-text-main text-white border-text-main" 
                : "bg-transparent text-text-muted border-border-subtle hover:text-text-main"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Goal 1 */}
        <GoalCard 
          title="Secure Summer Research Position" 
          pillar="Programs" 
          impact="High" 
          progress={40}
          defaultExpanded={true}
        >
          <Opportunity icon={FlaskConical} title="Stanford SIMR" status="Applying">
            <TaskRow text="Research program requirements" done />
            <TaskRow text="Draft Essay 1: 'Why Science?'" due="Due Tomorrow" urgent />
            <TaskRow text="Request transcript from counselor" due="Jan 12" />
          </Opportunity>
          
          <Opportunity icon={Microscope} title="UCSB Research Mentorship" status="Not Started">
            <TaskRow text="Check eligibility dates" />
          </Opportunity>
        </GoalCard>

        {/* Goal 2 */}
        <GoalCard 
          title="Qualify for AIME (Math Competition)" 
          pillar="Testing" 
          impact="Medium" 
          progress={25}
        >
           <Opportunity icon={FlaskConical} title="AMC 10 Exam" status="Preparing">
             <TaskRow text="Take Practice Exam 1" />
           </Opportunity>
        </GoalCard>

        {/* Goal 3 */}
        <GoalCard 
          title="Grow EduAccess Nonprofit" 
          pillar="Activities" 
          impact="High" 
          progress={65}
        />

      </div>

      {/* Parking Lot */}
      <div className="mt-16 pt-10 border-t border-dashed border-border-medium">
        <div className="flex items-center gap-3 mb-6 text-text-muted">
          <Archive className="w-5 h-5" />
          <span className="font-semibold">The Parking Lot — Ideas for later</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#F9F8F6] border border-border-subtle rounded-xl p-4 text-sm text-text-muted hover:bg-white hover:shadow-sm transition-all cursor-pointer">
            <div className="font-semibold mb-1 text-text-main">Start a podcast?</div>
            Interview local STEM professors. Maybe for 11th grade summer.
          </div>
          <div className="bg-[#F9F8F6] border border-border-subtle rounded-xl p-4 text-sm text-text-muted hover:bg-white hover:shadow-sm transition-all cursor-pointer">
            <div className="font-semibold mb-1 text-text-main">Apply to LaunchX</div>
            Entrepreneurship program. Need to check if I have time.
          </div>
          <div className="border border-dashed border-border-medium rounded-xl p-4 flex items-center justify-center gap-2 text-sm text-text-muted hover:border-accent-primary hover:text-accent-primary cursor-pointer transition-colors">
            <Plus className="w-4 h-4" />
            Add Idea
          </div>
        </div>
      </div>
    </>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
