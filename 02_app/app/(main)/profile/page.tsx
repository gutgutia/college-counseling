"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  PenTool, 
  Users, 
  Trophy, 
  FlaskConical,
  Download, 
  MessageCircle,
  Plus,
  Check,
  X,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_ACADEMICS = {
  gpaUnweighted: "3.92",
  gpaWeighted: "4.25",
  courseRigor: "8 AP / 4 Honors",
  courses: [
    { name: "AP Calculus BC", grade: "A", type: "AP" },
    { name: "AP Physics C", grade: "A", type: "AP" },
    { name: "AP Computer Science A", grade: "A", type: "AP" },
  ]
};

const MOCK_TESTING = {
  sat: { total: "1540", math: "780", verbal: "760" },
  act: null,
  apScores: [
    { subject: "Calculus BC", score: "5" },
    { subject: "Physics C: Mechanics", score: "5" },
    { subject: "Computer Science A", score: "5" },
  ],
  subjectTests: [
    { subject: "Math Level 2", score: "800" },
  ]
};

const MOCK_ACTIVITIES = [
  {
    id: "1",
    title: "Founder & President",
    organization: "EduAccess Nonprofit",
    years: "10th-11th",
    hoursPerWeek: 15,
    description: "Founded peer tutoring org growing to 50+ tutors. Partnered with 3 local districts. Raised $2k in grants.",
    isSpike: true
  },
  {
    id: "2", 
    title: "Varsity Captain",
    organization: "Tennis Team",
    years: "9th-11th",
    hoursPerWeek: 12,
    description: "Led team to regional finals. Organized summer training camps."
  },
  {
    id: "3",
    title: "Lead Programmer",
    organization: "Robotics Club",
    years: "10th-11th",
    hoursPerWeek: 10,
    description: "Developed autonomous navigation system. Team qualified for state competition."
  }
];

const MOCK_AWARDS = [
  { id: "1", title: "AIME Qualifier", level: "National", year: "2024" },
  { id: "2", title: "AP Scholar with Distinction", level: "National", year: "2024" },
  { id: "3", title: "Regional Science Fair - 1st Place", level: "Regional", year: "2023" },
];

const MOCK_PROGRAMS = [
  { id: "1", name: "COSMOS (Math Cluster)", status: "Completed", year: "2024" },
  { id: "2", name: "Stanford SIMR", status: "Applying", year: "2025" },
];

const MOCK_ABOUT_ME = {
  story: "I've always been fascinated by how things work. When I was 10, I took apart my family's broken microwave just to see the components inside. That curiosity led me to robotics, where I discovered I love the intersection of engineering and teaching others. Running EduAccess has shown me that making knowledge accessible can change lives. I want to build technology that empowers people who've been overlooked.",
  values: ["Curiosity", "Equity", "Persistence"],
  interests: ["Robotics", "Math", "Teaching", "Space Exploration"],
  personality: "Curious introvert who comes alive when explaining complex ideas",
};

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function ProfilePage() {
  const [academics, setAcademics] = useState(MOCK_ACADEMICS);
  const [testing, setTesting] = useState(MOCK_TESTING);
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);
  const [awards, setAwards] = useState(MOCK_AWARDS);
  const [programs, setPrograms] = useState(MOCK_PROGRAMS);
  const [aboutMe, setAboutMe] = useState(MOCK_ABOUT_ME);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-text-main mb-2">Your Profile</h1>
          <p className="text-text-muted">Your academic and extracurricular snapshot.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Subtle Chat Prompt */}
      <Link 
        href="/advisor?mode=profile" 
        className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-primary transition-colors mb-6 group"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Need help building your profile? <span className="text-accent-primary group-hover:underline">Chat with your advisor →</span></span>
      </Link>

      {/* About Me Section */}
      <AboutMeCard aboutMe={aboutMe} onUpdate={setAboutMe} />

      {/* Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Academics */}
        <AcademicsCard academics={academics} onUpdate={setAcademics} />
        
        {/* Testing */}
        <TestingCard testing={testing} onUpdate={setTesting} />
        
        {/* Activities */}
        <ActivitiesCard activities={activities} onUpdate={setActivities} />
        
        {/* Awards */}
        <AwardsCard awards={awards} onUpdate={setAwards} />
        
        {/* Programs */}
        <ProgramsCard programs={programs} onUpdate={setPrograms} />
        
      </div>
    </>
  );
}

// ============================================================================
// ABOUT ME CARD
// ============================================================================

function AboutMeCard({ aboutMe, onUpdate }: { aboutMe: typeof MOCK_ABOUT_ME | null; onUpdate: (a: typeof MOCK_ABOUT_ME) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempStory, setTempStory] = useState(aboutMe?.story || "");

  const handleSave = () => {
    onUpdate({ ...aboutMe, story: tempStory } as typeof MOCK_ABOUT_ME);
    setIsEditing(false);
  };

  // If no story yet, show prompt
  if (!aboutMe?.story) {
    return (
      <div className="bg-bg-sidebar border border-border-subtle rounded-[20px] p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-text-muted border border-border-subtle">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-lg text-text-main mb-1">Tell us about yourself</h3>
            <p className="text-sm text-text-muted">Beyond grades and scores — who are you?</p>
          </div>
          <Link href="/advisor?mode=story">
            <Button size="sm">
              <MessageCircle className="w-4 h-4" />
              Share My Story
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border-subtle rounded-[20px] p-6 shadow-card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg text-text-main">About Me</h3>
        <button 
          onClick={() => { setIsEditing(!isEditing); setTempStory(aboutMe.story || ""); }}
          className="p-1.5 text-text-muted hover:text-accent-primary hover:bg-accent-surface rounded-lg transition-colors"
        >
          <Pencil className="w-4 h-4" />
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={tempStory}
            onChange={(e) => setTempStory(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-border-subtle rounded-xl focus:outline-none focus:border-accent-primary resize-none"
            rows={4}
            placeholder="Tell us about yourself..."
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-accent-primary rounded-lg hover:bg-accent-primary/90 transition-colors"
            >
              <Check className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 text-sm font-medium text-text-muted hover:text-text-main transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm text-text-main leading-relaxed mb-4">{aboutMe.story}</p>
          
          {/* Values & Interests Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {aboutMe.values?.map((value, i) => (
              <span key={i} className="px-3 py-1 bg-accent-surface text-accent-primary text-xs font-medium rounded-full">
                {value}
              </span>
            ))}
            {aboutMe.interests?.map((interest, i) => (
              <span key={i} className="px-3 py-1 bg-bg-sidebar text-text-muted text-xs font-medium rounded-full">
                {interest}
              </span>
            ))}
          </div>

          {aboutMe.personality && (
            <div className="text-xs text-text-muted italic">
              "{aboutMe.personality}"
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ============================================================================
// ACADEMICS CARD
// ============================================================================

function AcademicsCard({ academics, onUpdate }: { academics: typeof MOCK_ACADEMICS; onUpdate: (a: typeof MOCK_ACADEMICS) => void }) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");

  const startEdit = (field: string, value: string) => {
    setEditingField(field);
    setTempValue(value);
  };

  const saveEdit = (field: string) => {
    onUpdate({ ...academics, [field]: tempValue });
    setEditingField(null);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue("");
  };

  return (
    <ProfileCard icon={GraduationCap} title="Academics">
      <EditableRow 
        label="GPA (Unweighted)" 
        value={academics.gpaUnweighted}
        isEditing={editingField === "gpaUnweighted"}
        tempValue={tempValue}
        onStartEdit={() => startEdit("gpaUnweighted", academics.gpaUnweighted)}
        onTempChange={setTempValue}
        onSave={() => saveEdit("gpaUnweighted")}
        onCancel={cancelEdit}
      />
      <EditableRow 
        label="GPA (Weighted)" 
        value={academics.gpaWeighted}
        isEditing={editingField === "gpaWeighted"}
        tempValue={tempValue}
        onStartEdit={() => startEdit("gpaWeighted", academics.gpaWeighted)}
        onTempChange={setTempValue}
        onSave={() => saveEdit("gpaWeighted")}
        onCancel={cancelEdit}
      />
      <EditableRow 
        label="Course Rigor" 
        value={academics.courseRigor}
        isEditing={editingField === "courseRigor"}
        tempValue={tempValue}
        onStartEdit={() => startEdit("courseRigor", academics.courseRigor)}
        onTempChange={setTempValue}
        onSave={() => saveEdit("courseRigor")}
        onCancel={cancelEdit}
      />

      {/* Courses List */}
      <div className="mt-4 pt-4 border-t border-border-subtle">
        <div className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">Courses</div>
        <div className="space-y-2">
          {academics.courses.map((course, i) => (
            <div key={i} className="flex items-center justify-between text-sm py-1.5">
              <span className="text-text-main">{course.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 bg-accent-surface text-accent-primary rounded">{course.type}</span>
                <span className="font-mono font-semibold text-text-main">{course.grade}</span>
              </div>
            </div>
          ))}
        </div>
        <AddButton label="Add course" onClick={() => {}} />
      </div>
    </ProfileCard>
  );
}

// ============================================================================
// TESTING CARD
// ============================================================================

function TestingCard({ testing, onUpdate }: { testing: typeof MOCK_TESTING; onUpdate: (t: typeof MOCK_TESTING) => void }) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");

  const startEdit = (field: string, value: string) => {
    setEditingField(field);
    setTempValue(value);
  };

  const saveEdit = () => {
    if (editingField === "satTotal" && testing.sat) {
      onUpdate({ ...testing, sat: { ...testing.sat, total: tempValue } });
    }
    setEditingField(null);
  };

  const cancelEdit = () => {
    setEditingField(null);
  };

  return (
    <ProfileCard icon={PenTool} title="Testing">
      {/* SAT */}
      {testing.sat ? (
        <EditableRow 
          label="SAT (Superscore)" 
          value={testing.sat.total}
          subValue={`M: ${testing.sat.math} | V: ${testing.sat.verbal}`}
          isEditing={editingField === "satTotal"}
          tempValue={tempValue}
          onStartEdit={() => startEdit("satTotal", testing.sat!.total)}
          onTempChange={setTempValue}
          onSave={saveEdit}
          onCancel={cancelEdit}
        />
      ) : (
        <AddButton label="Add SAT score" onClick={() => {}} />
      )}

      {/* ACT */}
      {testing.act ? (
        <EditableRow label="ACT" value={testing.act} />
      ) : (
        <div className="py-3 border-b border-border-subtle">
          <AddButton label="Add ACT score" onClick={() => {}} />
        </div>
      )}

      {/* Subject Tests */}
      <div className="mt-4 pt-4 border-t border-border-subtle">
        <div className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">Subject Tests</div>
        <div className="space-y-2">
          {testing.subjectTests.map((test, i) => (
            <div key={i} className="flex items-center justify-between text-sm py-1.5">
              <span className="text-text-main">{test.subject}</span>
              <span className="font-mono font-semibold text-text-main">{test.score}</span>
            </div>
          ))}
        </div>
        <AddButton label="Add subject test" onClick={() => {}} />
      </div>

      {/* AP Scores */}
      <div className="mt-4 pt-4 border-t border-border-subtle">
        <div className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">AP Exam Scores</div>
        <div className="space-y-2">
          {testing.apScores.map((ap, i) => (
            <div key={i} className="flex items-center justify-between text-sm py-1.5">
              <span className="text-text-main">{ap.subject}</span>
              <span className="font-mono font-semibold text-accent-primary">{ap.score}</span>
            </div>
          ))}
        </div>
        <AddButton label="Add AP score" onClick={() => {}} />
      </div>
    </ProfileCard>
  );
}

// ============================================================================
// ACTIVITIES CARD
// ============================================================================

function ActivitiesCard({ activities, onUpdate }: { activities: typeof MOCK_ACTIVITIES; onUpdate: (a: typeof MOCK_ACTIVITIES) => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({ title: "", organization: "", years: "", hoursPerWeek: "", description: "" });

  const handleDelete = (id: string) => {
    onUpdate(activities.filter(a => a.id !== id));
  };

  const handleAdd = () => {
    if (newActivity.title && newActivity.organization) {
      onUpdate([
        ...activities,
        {
          id: Date.now().toString(),
          title: newActivity.title,
          organization: newActivity.organization,
          years: newActivity.years,
          hoursPerWeek: parseInt(newActivity.hoursPerWeek) || 0,
          description: newActivity.description
        }
      ]);
      setNewActivity({ title: "", organization: "", years: "", hoursPerWeek: "", description: "" });
      setShowAddForm(false);
    }
  };

  return (
    <ProfileCard icon={Users} title="Activities" className="lg:row-span-2">
      <div className="space-y-3">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className={cn(
              "border border-border-subtle rounded-xl p-4 transition-all",
              activity.isSpike && "border-accent-primary/30 bg-accent-surface/20"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-text-main">{activity.title}</span>
                  {activity.isSpike && (
                    <span className="text-[10px] font-bold uppercase text-accent-primary bg-accent-surface px-1.5 py-0.5 rounded">Spike</span>
                  )}
                </div>
                <div className="text-sm text-text-muted">{activity.organization}</div>
                <div className="text-xs text-text-light mt-1">{activity.years} • {activity.hoursPerWeek} hr/wk</div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setExpandedId(expandedId === activity.id ? null : activity.id)}
                  className="p-1.5 text-text-muted hover:text-text-main hover:bg-bg-sidebar rounded-lg transition-colors"
                >
                  {expandedId === activity.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => handleDelete(activity.id)}
                  className="p-1.5 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {expandedId === activity.id && activity.description && (
              <div className="mt-3 pt-3 border-t border-border-subtle text-sm text-text-main">
                {activity.description}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Form */}
      {showAddForm ? (
        <div className="mt-4 p-4 border border-border-subtle rounded-xl bg-bg-sidebar/50">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Role/Title"
                value={newActivity.title}
                onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                className="px-3 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:border-accent-primary"
              />
              <input
                type="text"
                placeholder="Organization"
                value={newActivity.organization}
                onChange={(e) => setNewActivity({ ...newActivity, organization: e.target.value })}
                className="px-3 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:border-accent-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Years (e.g., 9th-11th)"
                value={newActivity.years}
                onChange={(e) => setNewActivity({ ...newActivity, years: e.target.value })}
                className="px-3 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:border-accent-primary"
              />
              <input
                type="text"
                placeholder="Hours/week"
                value={newActivity.hoursPerWeek}
                onChange={(e) => setNewActivity({ ...newActivity, hoursPerWeek: e.target.value })}
                className="px-3 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:border-accent-primary"
              />
            </div>
            <textarea
              placeholder="Description (optional)"
              value={newActivity.description}
              onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:border-accent-primary resize-none"
              rows={2}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-accent-primary rounded-lg hover:bg-accent-primary/90 transition-colors"
              >
                <Check className="w-4 h-4" />
                Add Activity
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-sm font-medium text-text-muted hover:text-text-main transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <AddButton label="Add activity" onClick={() => setShowAddForm(true)} />
      )}
    </ProfileCard>
  );
}

// ============================================================================
// AWARDS CARD
// ============================================================================

function AwardsCard({ awards, onUpdate }: { awards: typeof MOCK_AWARDS; onUpdate: (a: typeof MOCK_AWARDS) => void }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAward, setNewAward] = useState({ title: "", level: "", year: "" });

  const handleDelete = (id: string) => {
    onUpdate(awards.filter(a => a.id !== id));
  };

  const handleAdd = () => {
    if (newAward.title) {
      onUpdate([
        ...awards,
        {
          id: Date.now().toString(),
          title: newAward.title,
          level: newAward.level || "Other",
          year: newAward.year || new Date().getFullYear().toString()
        }
      ]);
      setNewAward({ title: "", level: "", year: "" });
      setShowAddForm(false);
    }
  };

  return (
    <ProfileCard icon={Trophy} title="Awards">
      <div className="space-y-3">
        {awards.map((award) => (
          <div 
            key={award.id} 
            className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0 group"
          >
            <div>
              <div className="font-medium text-text-main">{award.title}</div>
              <div className="text-xs text-text-muted">{award.level} • {award.year}</div>
            </div>
            <button 
              onClick={() => handleDelete(award.id)}
              className="p-1.5 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Form */}
      {showAddForm ? (
        <div className="mt-4 p-4 border border-border-subtle rounded-xl bg-bg-sidebar/50">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Award name"
              value={newAward.title}
              onChange={(e) => setNewAward({ ...newAward, title: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:border-accent-primary"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={newAward.level}
                onChange={(e) => setNewAward({ ...newAward, level: e.target.value })}
                className="px-3 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:border-accent-primary bg-white"
              >
                <option value="">Level</option>
                <option value="School">School</option>
                <option value="Regional">Regional</option>
                <option value="State">State</option>
                <option value="National">National</option>
                <option value="International">International</option>
              </select>
              <input
                type="text"
                placeholder="Year"
                value={newAward.year}
                onChange={(e) => setNewAward({ ...newAward, year: e.target.value })}
                className="px-3 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:border-accent-primary"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-accent-primary rounded-lg hover:bg-accent-primary/90 transition-colors"
              >
                <Check className="w-4 h-4" />
                Add Award
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-sm font-medium text-text-muted hover:text-text-main transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <AddButton label="Add award" onClick={() => setShowAddForm(true)} />
      )}
    </ProfileCard>
  );
}

// ============================================================================
// PROGRAMS CARD
// ============================================================================

function ProgramsCard({ programs, onUpdate }: { programs: typeof MOCK_PROGRAMS; onUpdate: (p: typeof MOCK_PROGRAMS) => void }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProgram, setNewProgram] = useState({ name: "", status: "Applying", year: "" });

  const handleDelete = (id: string) => {
    onUpdate(programs.filter(p => p.id !== id));
  };

  const handleAdd = () => {
    if (newProgram.name) {
      onUpdate([
        ...programs,
        {
          id: Date.now().toString(),
          name: newProgram.name,
          status: newProgram.status,
          year: newProgram.year || new Date().getFullYear().toString()
        }
      ]);
      setNewProgram({ name: "", status: "Applying", year: "" });
      setShowAddForm(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 text-green-700";
      case "Applying":
        return "bg-accent-surface text-accent-primary";
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-50 text-red-600";
      default:
        return "bg-bg-sidebar text-text-muted";
    }
  };

  return (
    <ProfileCard icon={FlaskConical} title="Programs">
      <div className="space-y-3">
        {programs.map((program) => (
          <div 
            key={program.id} 
            className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0 group"
          >
            <div>
              <div className="font-medium text-text-main">{program.name}</div>
              <div className="text-xs text-text-muted">{program.year}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded", getStatusStyle(program.status))}>
                {program.status}
              </span>
              <button 
                onClick={() => handleDelete(program.id)}
                className="p-1.5 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Form */}
      {showAddForm ? (
        <div className="mt-4 p-4 border border-border-subtle rounded-xl bg-bg-sidebar/50">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Program name"
              value={newProgram.name}
              onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:border-accent-primary"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={newProgram.status}
                onChange={(e) => setNewProgram({ ...newProgram, status: e.target.value })}
                className="px-3 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:border-accent-primary bg-white"
              >
                <option value="Interested">Interested</option>
                <option value="Applying">Applying</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                type="text"
                placeholder="Year"
                value={newProgram.year}
                onChange={(e) => setNewProgram({ ...newProgram, year: e.target.value })}
                className="px-3 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:border-accent-primary"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-accent-primary rounded-lg hover:bg-accent-primary/90 transition-colors"
              >
                <Check className="w-4 h-4" />
                Add Program
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-sm font-medium text-text-muted hover:text-text-main transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <AddButton label="Add program" onClick={() => setShowAddForm(true)} />
      )}
    </ProfileCard>
  );
}

// ============================================================================
// SHARED COMPONENTS
// ============================================================================

function ProfileCard({ icon: Icon, title, children, className }: { 
  icon: React.ElementType; 
  title: string; 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      "bg-white border border-border-subtle rounded-[20px] p-6 shadow-card hover:border-accent-border transition-all",
      className
    )}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-bg-sidebar rounded-lg flex items-center justify-center text-text-muted">
          <Icon className="w-5 h-5" />
        </div>
        <div className="font-display font-bold text-lg text-text-main">{title}</div>
      </div>
      {children}
    </div>
  );
}

function EditableRow({ 
  label, 
  value, 
  subValue,
  isEditing = false,
  tempValue = "",
  onStartEdit,
  onTempChange,
  onSave,
  onCancel
}: { 
  label: string; 
  value: string;
  subValue?: string;
  isEditing?: boolean;
  tempValue?: string;
  onStartEdit?: () => void;
  onTempChange?: (v: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
}) {
  if (isEditing) {
    return (
      <div className="flex justify-between items-center py-3 border-b border-border-subtle">
        <span className="text-text-muted text-[15px]">{label}</span>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={tempValue}
            onChange={(e) => onTempChange?.(e.target.value)}
            className="w-24 px-2 py-1 text-right font-mono font-semibold text-text-main border border-accent-primary rounded focus:outline-none"
            autoFocus
          />
          <button onClick={onSave} className="p-1 text-green-600 hover:bg-green-50 rounded">
            <Check className="w-4 h-4" />
          </button>
          <button onClick={onCancel} className="p-1 text-text-muted hover:bg-bg-sidebar rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center py-3 border-b border-border-subtle last:border-0 group">
      <span className="text-text-muted text-[15px]">{label}</span>
      <div className="flex items-center gap-2">
        <div className="text-right">
          <span className="font-mono font-semibold text-text-main">{value}</span>
          {subValue && <div className="text-xs text-text-muted">{subValue}</div>}
        </div>
        {onStartEdit && (
          <button 
            onClick={onStartEdit}
            className="p-1.5 text-text-muted hover:text-accent-primary hover:bg-accent-surface rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-1.5 mt-4 text-sm text-accent-primary hover:text-accent-primary/80 font-medium transition-colors"
    >
      <Plus className="w-4 h-4" />
      {label}
    </button>
  );
}
