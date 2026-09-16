export type UserRole = 'student' | 'recruiter' | 'academician' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar: string;
  headline: string;
  institution: string;
  department?: string;
  company?: string;
}

export interface SkillItem {
  name: string;
  score: number; // 0 - 100
  category: 'Technical' | 'Core CS' | 'Cloud & DevOps' | 'Soft Skills' | 'Data & AI';
  verified: boolean;
  verifiedBy?: string;
  lastAssessed: string;
}

export interface CareerRoleBenchmark {
  id: string;
  name: string;
  description: string;
  department: string;
  demandGrowth: string; // e.g. "+24% YoY"
  requiredSkills: {
    skillName: string;
    requiredScore: number;
    weight: number; // 1 - 3
  }[];
}

export interface SkillGapAnalysisResult {
  roleId: string;
  roleName: string;
  readinessScore: number; // 0 - 100
  matchedSkills: {
    skillName: string;
    currentScore: number;
    requiredScore: number;
    weight: number;
  }[];
  gaps: {
    skillName: string;
    currentScore: number;
    requiredScore: number;
    gapPercent: number;
    weight: number;
  }[];
  formulaExplanation: {
    totalWeight: number;
    matchedWeightedSum: number;
    formulaString: string;
  };
}

export interface RoadmapItem {
  id: string;
  title: string;
  provider: string;
  type: 'Course' | 'Certification' | 'Hands-on Project' | 'Industry Lab';
  duration: string;
  targetSkill: string;
  skillGain: number; // points added to targetSkill when completed
  completed: boolean;
  rating: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogoBg: string;
  location: string;
  type: 'Internship' | 'Full-Time Job' | 'Live Project';
  stipend: string;
  duration: string;
  requiredSkills: string[];
  eligibility: string;
  postedDate: string;
  applicantCount: number;
  deadline: string;
  description: string;
}

export interface ApplicationRecord {
  id: string;
  opportunityId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentInstitution: string;
  opportunityTitle: string;
  company: string;
  type: 'Internship' | 'Full-Time Job' | 'Live Project';
  appliedDate: string;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Rejected';
  compatibilityScore: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar: string;
  institution: string;
  department: string;
  cgpa: number;
  year: string;
  skills: { [skillName: string]: number };
  verifiedBadge: boolean;
}

export interface AcademicianEngagement {
  id: string;
  title: string;
  category: 'Faculty Development Program' | 'Industrial Training' | 'Consultancy Opportunity' | 'Research Collaboration' | 'Guest Lecture Invite';
  hostOrganization: string;
  duration: string;
  stipendOrGrant: string;
  status: 'Available' | 'Interested' | 'Confirmed' | 'Completed';
  deadline: string;
  description: string;
  eligibility: string;
  location: string;
}

export interface CollaborationInitiative {
  id: string;
  title: string;
  type: 'Hackathon' | 'Live Industry Project' | 'Mentorship Program' | 'Innovation Challenge';
  organizer: string;
  participantsCount: number;
  maxParticipants: number;
  timeline: string;
  prizeOrBenefit: string;
  registered: boolean;
  description: string;
  tags: string[];
  difficulty: string;
}

export interface DigitalPassport {
  studentId: string;
  name: string;
  rollNo: string;
  institution: string;
  department: string;
  cgpa: number;
  verifiedScorePercentile: number;
  passportId: string;
  issueDate: string;
  certifications: {
    id: string;
    title: string;
    issuer: string;
    date: string;
    credentialId: string;
    verified: boolean;
  }[];
  projects: {
    id: string;
    title: string;
    techStack: string[];
    description: string;
    verifiedByFaculty: boolean;
    githubLink?: string;
  }[];
  industryEndorsements: {
    endorser: string;
    company: string;
    skill: string;
    note: string;
  }[];
  badges: {
    name: string;
    category: string;
    icon: string;
    earnedDate: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
  actionType?: 'change_role' | 'view_gap' | 'view_jobs' | 'complete_roadmap';
}
