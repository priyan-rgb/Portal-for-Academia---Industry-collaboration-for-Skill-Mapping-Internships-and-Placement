import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  UserRole,
  UserProfile,
  SkillItem,
  CareerRoleBenchmark,
  SkillGapAnalysisResult,
  RoadmapItem,
  Opportunity,
  ApplicationRecord,
  Candidate,
  AcademicianEngagement,
  CollaborationInitiative,
  DigitalPassport,
  ChatMessage,
} from '../types';
import {
  mockUserProfiles,
  initialStudentSkills,
  careerRoleBenchmarks,
  initialRoadmapItems,
  initialOpportunities,
  initialApplications,
  mockCandidatesPool,
  initialAcademicianEngagements,
  initialCollaborationHub,
  initialAdminAnalytics,
  sampleDigitalPassport,
} from '../data/mockData';

interface AppContextType {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile;
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  
  // Student State
  studentSkills: SkillItem[];
  targetRoleId: string;
  setTargetRoleId: (id: string) => void;
  targetRole: CareerRoleBenchmark;
  skillGapResult: SkillGapAnalysisResult;
  roadmap: RoadmapItem[];
  markRoadmapCompleted: (roadmapId: string) => void;
  digitalPassport: DigitalPassport;
  
  // Opportunities & Applications
  opportunities: Opportunity[];
  addOpportunity: (opportunity: Omit<Opportunity, 'id' | 'applicantCount' | 'postedDate'>) => void;
  applications: ApplicationRecord[];
  applyToOpportunity: (opportunityId: string) => void;
  updateApplicationStatus: (appId: string, status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Rejected') => void;
  
  // Recruiter Candidates
  candidates: Candidate[];
  selectedOpportunityIdForRanking: string;
  setSelectedOpportunityIdForRanking: (id: string) => void;
  
  // Academician State
  academicEngagements: AcademicianEngagement[];
  toggleEngagementInterest: (engagementId: string) => void;
  
  // Collaboration Hub
  collaborationInitiatives: CollaborationInitiative[];
  toggleRegisterInitiative: (initiativeId: string) => void;
  
  // Institution Admin State
  adminAnalytics: typeof initialAdminAnalytics;
  triggerCurriculumAction: (insightId: string) => void;
  adminActionFeedback: string | null;
  clearAdminActionFeedback: () => void;
  
  // AI Career Assistant
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;

  // Utility calculation helpers
  calculateCompatibility: (opp: Opportunity) => {
    score: number;
    matchedSkills: string[];
    missingSkills: string[];
    explanation: string;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [activeNavTab, setActiveNavTab] = useState<string>('dashboard');
  
  // Student state
  const [studentSkills, setStudentSkills] = useState<SkillItem[]>(initialStudentSkills);
  const [targetRoleId, setTargetRoleId] = useState<string>('backend-dev');
  const [completedRoadmapIds, setCompletedRoadmapIds] = useState<Set<string>>(new Set());
  
  // Opportunities and applications state
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [applications, setApplications] = useState<ApplicationRecord[]>(initialApplications);
  const [selectedOpportunityIdForRanking, setSelectedOpportunityIdForRanking] = useState<string>('opp-1');
  
  // Academician state
  const [academicEngagements, setAcademicEngagements] = useState<AcademicianEngagement[]>(initialAcademicianEngagements);
  
  // Collaboration hub state
  const [collaborationInitiatives, setCollaborationInitiatives] = useState<CollaborationInitiative[]>(initialCollaborationHub);
  
  // Admin state
  const [adminAnalytics, setAdminAnalytics] = useState(initialAdminAnalytics);
  const [adminActionFeedback, setAdminActionFeedback] = useState<string | null>(null);

  // Chat assistant state
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: "Hello Alex! I am your SkillBridge AI Career Advisor. I analyze your assessment scores and career benchmarks in real-time. How can I help boost your employability today?",
      timestamp: 'Just now',
      suggestedPrompts: [
        "What should I learn next to improve my readiness?",
        "Why is my CloudScale Tech compatibility 76%?",
        "How can I tailor my resume for Backend Developer?",
        "Explain the formula behind my readiness score",
      ],
    },
  ]);

  const currentUser = useMemo(() => {
    return mockUserProfiles[currentRole];
  }, [currentRole]);

  // Current Target Role Benchmark
  const targetRole = useMemo(() => {
    return careerRoleBenchmarks.find((r) => r.id === targetRoleId) || careerRoleBenchmarks[0];
  }, [targetRoleId]);

  // Skill Gap Analysis Engine (Transparent, Explainable Math)
  const skillGapResult = useMemo<SkillGapAnalysisResult>(() => {
    const studentSkillMap = new Map<string, number>();
    studentSkills.forEach((s) => studentSkillMap.set(s.name, s.score));

    let totalWeight = 0;
    let matchedWeightedSum = 0;
    const matchedSkills: SkillGapAnalysisResult['matchedSkills'] = [];
    const gaps: SkillGapAnalysisResult['gaps'] = [];

    targetRole.requiredSkills.forEach((req) => {
      const currentScore = studentSkillMap.get(req.skillName) || 0;
      totalWeight += req.weight;

      // Contribution to readiness (capped at requiredScore for proportional mastery)
      const ratio = Math.min(currentScore, req.requiredScore) / req.requiredScore;
      matchedWeightedSum += ratio * req.weight;

      if (currentScore >= req.requiredScore) {
        matchedSkills.push({
          skillName: req.skillName,
          currentScore,
          requiredScore: req.requiredScore,
          weight: req.weight,
        });
      } else {
        const gapVal = req.requiredScore - currentScore;
        const gapPercent = Math.round((gapVal / req.requiredScore) * 100);
        gaps.push({
          skillName: req.skillName,
          currentScore,
          requiredScore: req.requiredScore,
          gapPercent,
          weight: req.weight,
        });
      }
    });

    const readinessScore = totalWeight > 0 ? Math.round((matchedWeightedSum / totalWeight) * 100) : 0;

    return {
      roleId: targetRole.id,
      roleName: targetRole.name,
      readinessScore,
      matchedSkills,
      gaps: gaps.sort((a, b) => b.gapPercent - a.gapPercent),
      formulaExplanation: {
        totalWeight,
        matchedWeightedSum: Number(matchedWeightedSum.toFixed(2)),
        formulaString: 'Readiness = [ ∑ ( min(StudentScore_i, Target_i) / Target_i × Weight_i ) / ∑ Weight_i ] × 100',
      },
    };
  }, [studentSkills, targetRole]);

  // Roadmap for the selected target role
  const roadmap = useMemo<RoadmapItem[]>(() => {
    const items = initialRoadmapItems[targetRoleId] || initialRoadmapItems['backend-dev'];
    return items.map((item) => ({
      ...item,
      completed: completedRoadmapIds.has(item.id),
    }));
  }, [targetRoleId, completedRoadmapIds]);

  // Mark Roadmap Completed -> updates skill score and recomputes readiness & compatibility live!
  const markRoadmapCompleted = (roadmapId: string) => {
    const item = roadmap.find((r) => r.id === roadmapId);
    if (!item || completedRoadmapIds.has(roadmapId)) return;

    setCompletedRoadmapIds((prev) => new Set([...prev, roadmapId]));

    // Increment corresponding student skill
    setStudentSkills((prevSkills) =>
      prevSkills.map((s) => {
        if (s.name === item.targetSkill) {
          const newScore = Math.min(100, s.score + item.skillGain);
          return {
            ...s,
            score: newScore,
            verified: true,
            verifiedBy: `${item.provider} (Verified Milestone)`,
            lastAssessed: 'Just now (Updated)',
          };
        }
        return s;
      })
    );
  };

  // Opportunity Compatibility Calculator
  const calculateCompatibility = (opp: Opportunity) => {
    const studentSkillMap = new Map<string, number>();
    studentSkills.forEach((s) => studentSkillMap.set(s.name, s.score));

    const matched: string[] = [];
    const missing: string[] = [];
    let scoreSum = 0;

    opp.requiredSkills.forEach((skillName) => {
      const score = studentSkillMap.get(skillName) || 45; // baseline assumption if unassessed
      if (score >= 70) {
        matched.push(`${skillName} (${score}/100)`);
        scoreSum += score;
      } else {
        missing.push(`${skillName} (${score}/100)`);
        scoreSum += score * 0.7; // discounted for gap
      }
    });

    const average = opp.requiredSkills.length > 0 ? Math.round(scoreSum / opp.requiredSkills.length) : 75;
    const finalScore = Math.max(45, Math.min(98, average));

    const explanation =
      matched.length === opp.requiredSkills.length
        ? `Strong candidate profile! You meet or exceed all ${opp.requiredSkills.length} core technical requirements.`
        : matched.length > 0
        ? `Matches ${matched.length} of ${opp.requiredSkills.length} required competencies. Close the ${missing.map(m => m.split(' ')[0]).join(', ')} gap to reach 90%+.`
        : `Developing match. Focus on foundational benchmarks in ${opp.requiredSkills.join(', ')}.`;

    return {
      score: finalScore,
      matchedSkills: matched,
      missingSkills: missing,
      explanation,
    };
  };

  // Apply to Opportunity
  const applyToOpportunity = (opportunityId: string) => {
    const opp = opportunities.find((o) => o.id === opportunityId);
    if (!opp) return;

    // Check if already applied
    const existing = applications.find((a) => a.opportunityId === opportunityId && a.studentId === currentUser.id);
    if (existing) return;

    const compat = calculateCompatibility(opp);

    const newApplication: ApplicationRecord = {
      id: `app-${Date.now()}`,
      opportunityId: opp.id,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      studentInstitution: currentUser.institution,
      opportunityTitle: opp.title,
      company: opp.company,
      type: opp.type,
      appliedDate: 'Just now',
      status: 'Applied',
      compatibilityScore: compat.score,
      matchedSkills: compat.matchedSkills,
      missingSkills: compat.missingSkills,
    };

    setApplications((prev) => [newApplication, ...prev]);

    // Update applicant count in opportunity
    setOpportunities((prev) =>
      prev.map((o) => (o.id === opportunityId ? { ...o, applicantCount: o.applicantCount + 1 } : o))
    );
  };

  // Update Application Status (Recruiter shortlists/rejects candidate)
  const updateApplicationStatus = (
    appId: string,
    status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Rejected'
  ) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status } : app))
    );
  };

  // Add Opportunity (Recruiter)
  const addOpportunity = (newOppData: Omit<Opportunity, 'id' | 'applicantCount' | 'postedDate'>) => {
    const newOpp: Opportunity = {
      ...newOppData,
      id: `opp-${Date.now()}`,
      applicantCount: 0,
      postedDate: 'Just now',
    };
    setOpportunities((prev) => [newOpp, ...prev]);
  };

  // Candidates Pool dynamically synced with Alex's updated skills
  const candidates = useMemo<Candidate[]>(() => {
    const alexSkillsRecord: { [k: string]: number } = {};
    studentSkills.forEach((s) => {
      alexSkillsRecord[s.name] = s.score;
    });

    return mockCandidatesPool.map((cand) => {
      if (cand.id === 'student-alex') {
        return {
          ...cand,
          skills: alexSkillsRecord,
        };
      }
      return cand;
    });
  }, [studentSkills]);

  // Digital Passport live data
  const digitalPassport = useMemo<DigitalPassport>(() => {
    return {
      ...sampleDigitalPassport,
      verifiedScorePercentile: Math.min(99, Math.round(70 + (skillGapResult.readinessScore / 100) * 28)),
    };
  }, [skillGapResult.readinessScore]);

  // Academician interest toggle
  const toggleEngagementInterest = (id: string) => {
    setAcademicEngagements((prev) =>
      prev.map((eng) => {
        if (eng.id === id) {
          const nextStatus =
            eng.status === 'Available' ? 'Interested' : eng.status === 'Interested' ? 'Confirmed' : 'Available';
          return { ...eng, status: nextStatus };
        }
        return eng;
      })
    );
  };

  // Collaboration initiative register toggle
  const toggleRegisterInitiative = (id: string) => {
    setCollaborationInitiatives((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newReg = !item.registered;
          return {
            ...item,
            registered: newReg,
            participantsCount: newReg ? item.participantsCount + 1 : item.participantsCount - 1,
          };
        }
        return item;
      })
    );
  };

  // Admin trigger intervention
  const triggerCurriculumAction = (insightId: string) => {
    const insight = adminAnalytics.recentInsights.find((i) => i.id === insightId);
    if (!insight) return;

    setAdminAnalytics((prev) => ({
      ...prev,
      recentInsights: prev.recentInsights.map((i) =>
        i.id === insightId ? { ...i, status: 'Bootcamp Initiated (In Progress)' } : i
      ),
    }));

    setAdminActionFeedback(
      `Directive issued: "${insight.recommendation}". 4 Department Heads notified and AWS Cloud training scheduled.`
    );
  };

  const clearAdminActionFeedback = () => setAdminActionFeedback(null);

  // AI Career Assistant rule-based logic referencing actual profile
  const sendChatMessage = (userPrompt: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userPrompt,
      timestamp: 'Just now',
    };

    setChatMessages((prev) => [...prev, userMsg]);

    const lower = userPrompt.toLowerCase();
    let assistantReply = '';
    let suggestedPrompts: string[] = [];

    if (lower.includes('next') || lower.includes('learn') || lower.includes('recommend') || lower.includes('improve')) {
      const topGap = skillGapResult.gaps[0];
      const nextRoadmapItem = roadmap.find((r) => !r.completed);
      if (topGap && nextRoadmapItem) {
        assistantReply = `Based on your target role as **${targetRole.name}**, your highest skill gap is **${topGap.skillName}** (Current: ${topGap.currentScore}, Target: ${topGap.requiredScore}, Gap: ${topGap.gapPercent}%).\n\nI recommend completing: **"${nextRoadmapItem.title}"** by ${nextRoadmapItem.provider}. Finishing this module will boost your score by +${nextRoadmapItem.skillGain} points and directly elevate your role readiness from ${skillGapResult.readinessScore}% to ~${Math.min(100, skillGapResult.readinessScore + 10)}%!`;
      } else {
        assistantReply = `Excellent work! You have closed all major skill gaps for **${targetRole.name}** with a readiness score of ${skillGapResult.readinessScore}%. Consider targeting senior microservice projects or applying to top tier job openings like CloudScale Technologies!`;
      }
      suggestedPrompts = [
        "Why is my CloudScale Tech compatibility 76%?",
        "How do I improve my resume for Backend Developer?",
        "Show my Digital Skill Passport",
      ];
    } else if (lower.includes('cloudscale') || lower.includes('compatibility') || lower.includes('score') || lower.includes('why')) {
      const opp = opportunities.find((o) => o.id === 'opp-1') || opportunities[0];
      const compat = calculateCompatibility(opp);
      assistantReply = `For **${opp.company} - ${opp.title}**, your compatibility is **${compat.score}%**.\n\n• **Matched Competencies:** ${compat.matchedSkills.join(', ') || 'None yet'}\n• **Areas for Growth:** ${compat.missingSkills.join(', ') || 'All matched!'}\n\n${compat.explanation}\nRecruiters at CloudScale prioritize candidates with verified Cloud & System Design labs.`;
      suggestedPrompts = [
        "What course helps with Cloud Computing?",
        "How can I tailor my resume for Backend Developer?",
        "Explain the formula behind my readiness score",
      ];
    } else if (lower.includes('resume') || lower.includes('cv') || lower.includes('portfolio')) {
      assistantReply = `To optimize your resume for **${targetRole.name}**:\n\n1. **Highlight Verified Badges**: Feature your **${studentSkills.filter((s) => s.verified).map((s) => s.name).slice(0, 3).join(', ')}** credentials verified by NIT ProctorEval.\n2. **Quantify Projects**: Mention metrics like "handled 5,000 events/sec with sliding-window Redis cache" in your Distributed Log Pipeline project.\n3. **Address Gaps**: Show coursework in progress for ${skillGapResult.gaps.map((g) => g.skillName).slice(0, 2).join(' & ')} to demonstrate growth agility.`;
      suggestedPrompts = [
        "What should I learn next to improve my readiness?",
        "Show my Digital Skill Passport",
        "View open backend internships",
      ];
    } else if (lower.includes('formula') || lower.includes('calculation') || lower.includes('black box')) {
      assistantReply = `SkillBridge AI uses open, explainable weighted scoring:\n\n$$\\text{Readiness} = \\frac{\\sum \\min(\\text{Score}_i, \\text{Target}_i) \\times \\text{Weight}_i}{\\sum \\text{Target}_i \\times \\text{Weight}_i} \\times 100$$\n\nFor **${targetRole.name}**, total benchmark weight is **${skillGapResult.formulaExplanation.totalWeight}**. Your current matched weighted sum is **${skillGapResult.formulaExplanation.matchedWeightedSum}**, yielding exactly **${skillGapResult.readinessScore}%** readiness. Every course completed directly increases this number!`;
      suggestedPrompts = [
        "What should I learn next?",
        "Why is my CloudScale Tech compatibility 76%?",
      ];
    } else {
      assistantReply = `I analyzed your profile for **${targetRole.name}**! Your overall readiness is **${skillGapResult.readinessScore}%** across ${targetRole.requiredSkills.length} key benchmarks. You have matched ${skillGapResult.matchedSkills.length} skills and have ${skillGapResult.gaps.length} remaining gaps. What specific topic would you like guidance on?`;
      suggestedPrompts = [
        "What should I learn next?",
        "Why is my CloudScale Tech compatibility 76%?",
        "How do I improve my resume for Backend Developer?",
      ];
    }

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: assistantReply,
          timestamp: 'Just now',
          suggestedPrompts,
        },
      ]);
    }, 450);
  };

  const handleSetRole = (role: UserRole) => {
    setCurrentRole(role);
    setActiveNavTab('dashboard');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setRole: handleSetRole,
        currentUser,
        activeNavTab,
        setActiveNavTab,
        studentSkills,
        targetRoleId,
        setTargetRoleId,
        targetRole,
        skillGapResult,
        roadmap,
        markRoadmapCompleted,
        digitalPassport,
        opportunities,
        addOpportunity,
        applications,
        applyToOpportunity,
        updateApplicationStatus,
        candidates,
        selectedOpportunityIdForRanking,
        setSelectedOpportunityIdForRanking,
        academicEngagements,
        toggleEngagementInterest,
        collaborationInitiatives,
        toggleRegisterInitiative,
        adminAnalytics,
        triggerCurriculumAction,
        adminActionFeedback,
        clearAdminActionFeedback,
        chatMessages,
        sendChatMessage,
        isChatOpen,
        setIsChatOpen,
        calculateCompatibility,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
