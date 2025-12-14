// AI Tool Definitions
// Tools that the AI can call to interact with the user's profile

import { z } from "zod";
import { tool } from "ai";

// =============================================================================
// PROFILE DATA TOOLS
// =============================================================================

export const profileTools = {
  // Save GPA
  saveGpa: tool({
    description: "Save or update the student's GPA. Call this when the student mentions their GPA.",
    inputSchema: z.object({
      gpaUnweighted: z.number().min(0).max(4.0).optional().describe("Unweighted GPA on 4.0 scale"),
      gpaWeighted: z.number().min(0).max(5.0).optional().describe("Weighted GPA (can be above 4.0)"),
      gpaScale: z.number().optional().describe("The scale used (usually 4.0 or 5.0)"),
    }),
  }),
  
  // Save test scores
  saveTestScores: tool({
    description: "Save or update standardized test scores. Call this when the student mentions SAT, ACT, or PSAT scores.",
    inputSchema: z.object({
      satTotal: z.number().min(400).max(1600).optional().describe("Total SAT score"),
      satMath: z.number().min(200).max(800).optional().describe("SAT Math section score"),
      satReading: z.number().min(200).max(800).optional().describe("SAT Reading/Writing section score"),
      actComposite: z.number().min(1).max(36).optional().describe("ACT composite score"),
      actEnglish: z.number().min(1).max(36).optional().describe("ACT English score"),
      actMath: z.number().min(1).max(36).optional().describe("ACT Math score"),
      actReading: z.number().min(1).max(36).optional().describe("ACT Reading score"),
      actScience: z.number().min(1).max(36).optional().describe("ACT Science score"),
      psatTotal: z.number().min(320).max(1520).optional().describe("PSAT/NMSQT total score"),
    }),
  }),
  
  // Add activity
  addActivity: tool({
    description: "Add an extracurricular activity. Call this when the student mentions a club, sport, job, volunteer work, or other activity.",
    inputSchema: z.object({
      title: z.string().describe("Role or position (e.g., 'President', 'Member', 'Volunteer')"),
      organization: z.string().describe("Name of the club, team, or organization"),
      category: z.enum(["club", "sport", "arts", "volunteer", "work", "family", "other"]).optional(),
      isLeadership: z.boolean().optional().describe("Whether this is a leadership position"),
      description: z.string().optional().describe("Brief description of responsibilities and impact"),
      hoursPerWeek: z.number().optional().describe("Average hours per week"),
      yearsActive: z.string().optional().describe("Years involved, e.g., '9th-11th' or '2021-2023'"),
    }),
  }),
  
  // Add award
  addAward: tool({
    description: "Add an honor or award. Call this when the student mentions competitions, recognition, or achievements.",
    inputSchema: z.object({
      title: z.string().describe("Name of the award (e.g., 'AIME Qualifier', 'National Merit Semifinalist')"),
      level: z.enum(["school", "regional", "state", "national", "international"]).describe("Recognition level"),
      organization: z.string().optional().describe("Awarding organization"),
      year: z.number().optional().describe("Year received"),
      description: z.string().optional().describe("Brief description of the achievement"),
    }),
  }),
  
  // Add course
  addCourse: tool({
    description: "Add a course to the student's academic record. Courses can be completed, in-progress, or planned.",
    inputSchema: z.object({
      name: z.string().describe("Course name (e.g., 'AP Calculus BC')"),
      status: z.enum(["completed", "in_progress", "planned"]).describe("Whether the course is done, current, or future"),
      level: z.enum(["regular", "honors", "ap", "ib", "college", "other"]).optional(),
      subject: z.enum(["math", "science", "english", "history", "language", "arts", "other"]).optional(),
      grade: z.string().optional().describe("Letter grade if completed (A, A-, B+, etc.)"),
      gradeLevel: z.string().optional().describe("What grade they took/will take it (9th, 10th, 11th, 12th)"),
      academicYear: z.string().optional().describe("Academic year (e.g., '2023-2024')"),
      planningNotes: z.string().optional().describe("For planned courses, why they want to take it"),
    }),
  }),
  
  // Add program
  addProgram: tool({
    description: "Add a summer program, research opportunity, or internship.",
    inputSchema: z.object({
      name: z.string().describe("Program name (e.g., 'Stanford SIMR', 'RSI')"),
      organization: z.string().optional().describe("Host institution"),
      type: z.enum(["summer", "research", "internship", "online", "competition_prep", "other"]),
      status: z.enum(["interested", "applying", "applied", "accepted", "rejected", "waitlisted", "attending", "completed"]),
      year: z.number().optional().describe("Year of the program"),
      description: z.string().optional(),
    }),
  }),
  
  // Save basic profile info
  saveProfileInfo: tool({
    description: "Save basic profile information like name, grade, or high school.",
    inputSchema: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      preferredName: z.string().optional().describe("What they prefer to be called"),
      grade: z.enum(["9th", "10th", "11th", "12th", "gap_year"]).optional(),
      graduationYear: z.number().optional(),
      highSchoolName: z.string().optional(),
      highSchoolCity: z.string().optional(),
      highSchoolState: z.string().optional(),
    }),
  }),
};

// =============================================================================
// PLANNING TOOLS
// =============================================================================

export const planningTools = {
  // Add a goal
  addGoal: tool({
    description: "Create a new goal for the student to work towards.",
    inputSchema: z.object({
      title: z.string().describe("Goal title"),
      category: z.enum(["research", "competition", "leadership", "project", "academic", "application", "other"]),
      description: z.string().optional(),
      targetDate: z.string().optional().describe("Target completion date (ISO format)"),
      priority: z.enum(["high", "medium", "low"]).optional(),
      impactDescription: z.string().optional().describe("How this helps their college application"),
    }),
  }),
  
  // Add a school to their list
  addSchoolToList: tool({
    description: "Add a college to the student's school list.",
    inputSchema: z.object({
      schoolName: z.string().describe("Full name of the college/university"),
      tier: z.enum(["dream", "reach", "target", "safety"]).describe("How realistic is admission"),
      interestLevel: z.enum(["high", "medium", "low", "uncertain"]).optional(),
      applicationType: z.enum(["ed", "ed2", "ea", "rea", "rd"]).optional(),
      whyInterested: z.string().optional().describe("Why they're interested in this school"),
    }),
  }),
};

// =============================================================================
// SEARCH TOOLS (for web search, school lookup, etc.)
// =============================================================================

export const searchTools = {
  // Web search for current information
  webSearch: tool({
    description: "Search the web for current information about colleges, deadlines, programs, or other topics. Use this when you need up-to-date information.",
    inputSchema: z.object({
      query: z.string().describe("The search query"),
      type: z.enum(["general", "college_info", "deadline", "program", "news"]).optional(),
    }),
  }),
  
  // Look up school information
  lookupSchool: tool({
    description: "Look up detailed information about a specific college or university.",
    inputSchema: z.object({
      schoolName: z.string().describe("Name of the school to look up"),
      infoNeeded: z.array(z.enum([
        "acceptance_rate",
        "sat_range",
        "act_range",
        "deadlines",
        "requirements",
        "cost",
        "financial_aid",
        "programs",
        "campus_life",
      ])).optional(),
    }),
  }),
};

// =============================================================================
// ALL TOOLS COMBINED
// =============================================================================

export const allTools = {
  ...profileTools,
  ...planningTools,
  ...searchTools,
};

// Type for tool results
export type ToolName = keyof typeof allTools;
