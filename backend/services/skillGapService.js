import { normalizeSkillName } from './skillExtractorService.js';

// Benchmark skill requirements per target career role
export const ROLE_REQUIREMENTS = {
  'Full Stack Developer': [
    { name: 'react', minProficiency: 'Intermediate', weight: 15, priority: 'High-Priority', category: 'Technical' },
    { name: 'typescript', minProficiency: 'Intermediate', weight: 12, priority: 'High-Priority', category: 'Technical' },
    { name: 'node.js', minProficiency: 'Intermediate', weight: 14, priority: 'High-Priority', category: 'Technical' },
    { name: 'restful apis', minProficiency: 'Intermediate', weight: 10, priority: 'High-Priority', category: 'Technical' },
    { name: 'mongodb', minProficiency: 'Intermediate', weight: 10, priority: 'High-Priority', category: 'Technical' },
    { name: 'docker', minProficiency: 'Beginner', weight: 8, priority: 'High-Priority', category: 'Cloud & DevOps' },
    { name: 'tailwind css', minProficiency: 'Intermediate', weight: 7, priority: 'Standard', category: 'Technical' },
    { name: 'postgresql', minProficiency: 'Beginner', weight: 8, priority: 'Standard', category: 'Technical' },
    { name: 'ci/cd pipelines', minProficiency: 'Beginner', weight: 6, priority: 'Standard', category: 'Cloud & DevOps' },
    { name: 'unit & integration testing', minProficiency: 'Beginner', weight: 6, priority: 'Standard', category: 'Technical' },
    { name: 'agile / scrum', minProficiency: 'Beginner', weight: 4, priority: 'Standard', category: 'Soft skills' },
  ],
  'AI Engineer': [
    { name: 'python', minProficiency: 'Advanced', weight: 18, priority: 'High-Priority', category: 'Technical' },
    { name: 'machine learning', minProficiency: 'Advanced', weight: 16, priority: 'High-Priority', category: 'AI & Machine Learning' },
    { name: 'llm integration', minProficiency: 'Intermediate', weight: 14, priority: 'High-Priority', category: 'AI & Machine Learning' },
    { name: 'deep learning', minProficiency: 'Intermediate', weight: 12, priority: 'High-Priority', category: 'AI & Machine Learning' },
    { name: 'vector databases', minProficiency: 'Intermediate', weight: 10, priority: 'High-Priority', category: 'AI & Machine Learning' },
    { name: 'prompt engineering', minProficiency: 'Intermediate', weight: 8, priority: 'Standard', category: 'AI & Machine Learning' },
    { name: 'docker', minProficiency: 'Beginner', weight: 8, priority: 'Standard', category: 'Cloud & DevOps' },
    { name: 'fastapi', minProficiency: 'Intermediate', weight: 8, priority: 'Standard', category: 'Technical' },
    { name: 'git / github', minProficiency: 'Intermediate', weight: 6, priority: 'Standard', category: 'Technical' },
  ],
  'Cloud DevOps Engineer': [
    { name: 'docker', minProficiency: 'Advanced', weight: 16, priority: 'High-Priority', category: 'Cloud & DevOps' },
    { name: 'kubernetes', minProficiency: 'Intermediate', weight: 16, priority: 'High-Priority', category: 'Cloud & DevOps' },
    { name: 'aws', minProficiency: 'Advanced', weight: 16, priority: 'High-Priority', category: 'Cloud & DevOps' },
    { name: 'ci/cd pipelines', minProficiency: 'Advanced', weight: 14, priority: 'High-Priority', category: 'Cloud & DevOps' },
    { name: 'terraform', minProficiency: 'Intermediate', weight: 12, priority: 'High-Priority', category: 'Cloud & DevOps' },
    { name: 'python', minProficiency: 'Intermediate', weight: 10, priority: 'Standard', category: 'Technical' },
    { name: 'system design', minProficiency: 'Intermediate', weight: 10, priority: 'Standard', category: 'Technical' },
    { name: 'unit & integration testing', minProficiency: 'Beginner', weight: 6, priority: 'Standard', category: 'Technical' },
  ],
  'Data Analyst': [
    { name: 'python', minProficiency: 'Intermediate', weight: 20, priority: 'High-Priority', category: 'Technical' },
    { name: 'sql', minProficiency: 'Advanced', weight: 20, priority: 'High-Priority', category: 'Technical' },
    { name: 'postgresql', minProficiency: 'Intermediate', weight: 15, priority: 'High-Priority', category: 'Technical' },
    { name: 'problem solving', minProficiency: 'Advanced', weight: 15, priority: 'High-Priority', category: 'Soft skills' },
    { name: 'technical communication', minProficiency: 'Intermediate', weight: 15, priority: 'Standard', category: 'Soft skills' },
    { name: 'machine learning', minProficiency: 'Beginner', weight: 15, priority: 'Standard', category: 'AI & Machine Learning' },
  ],
  'Backend Systems Architect': [
    { name: 'node.js', minProficiency: 'Advanced', weight: 16, priority: 'High-Priority', category: 'Technical' },
    { name: 'system design', minProficiency: 'Advanced', weight: 18, priority: 'High-Priority', category: 'Technical' },
    { name: 'microservices', minProficiency: 'Advanced', weight: 16, priority: 'High-Priority', category: 'Technical' },
    { name: 'postgresql', minProficiency: 'Advanced', weight: 14, priority: 'High-Priority', category: 'Technical' },
    { name: 'redis', minProficiency: 'Intermediate', weight: 12, priority: 'High-Priority', category: 'Technical' },
    { name: 'docker', minProficiency: 'Intermediate', weight: 12, priority: 'Standard', category: 'Cloud & DevOps' },
    { name: 'kubernetes', minProficiency: 'Intermediate', weight: 12, priority: 'Standard', category: 'Cloud & DevOps' },
  ]
};

const PROFICIENCY_VALUES = {
  'None': 0,
  'Beginner': 1,
  'Intermediate': 2,
  'Advanced': 3,
  'Expert': 4,
};

/**
 * Computes transparent skill gap analysis
 */
export const analyzeSkillGap = (targetRole, learnerSkills = []) => {
  const roleReqs = ROLE_REQUIREMENTS[targetRole] || ROLE_REQUIREMENTS['Full Stack Developer'];
  
  // Normalize learner skills map
  const learnerSkillsMap = new Map();
  learnerSkills.forEach(s => {
    const norm = normalizeSkillName(s.name);
    learnerSkillsMap.set(norm.toLowerCase(), {
      rawName: s.name,
      normalizedName: norm,
      proficiency: s.proficiency || 'Beginner',
      levelValue: PROFICIENCY_VALUES[s.proficiency || 'Beginner'] || 1,
    });
  });

  const strongSkills = [];
  const skillsToImprove = [];
  const missingSkills = [];
  const highPriorityGaps = [];

  let earnedScore = 0;
  let totalPossibleScore = 0;

  roleReqs.forEach(req => {
    totalPossibleScore += req.weight;
    const reqMinVal = PROFICIENCY_VALUES[req.minProficiency] || 2;
    const normReqName = req.name.toLowerCase();
    const learnerSkill = learnerSkillsMap.get(normReqName);

    if (!learnerSkill) {
      // Completely Missing
      const item = {
        name: req.name,
        category: req.category,
        requiredProficiency: req.minProficiency,
        currentProficiency: 'None',
        weight: req.weight,
        priority: req.priority,
        reason: `Required by ${targetRole} market demand; not present in learner profile.`,
      };
      missingSkills.push(item);
      if (req.priority === 'High-Priority') {
        highPriorityGaps.push(item);
      }
    } else {
      // Learner possesses skill - compare levels
      if (learnerSkill.levelValue >= reqMinVal) {
        // Strong Skill
        earnedScore += req.weight;
        strongSkills.push({
          name: req.name,
          category: req.category,
          requiredProficiency: req.minProficiency,
          currentProficiency: learnerSkill.proficiency,
          weight: req.weight,
          priority: req.priority,
          status: 'Exceeds or Meets Standard',
        });
      } else {
        // Skill to Improve
        // Award partial credit proportional to current proficiency
        const ratio = learnerSkill.levelValue / reqMinVal;
        earnedScore += req.weight * ratio;

        const item = {
          name: req.name,
          category: req.category,
          requiredProficiency: req.minProficiency,
          currentProficiency: learnerSkill.proficiency,
          gapMagnitude: reqMinVal - learnerSkill.levelValue,
          weight: req.weight,
          priority: req.priority,
          reason: `Current level (${learnerSkill.proficiency}) is below market standard (${req.minProficiency}).`,
        };
        skillsToImprove.push(item);
        if (req.priority === 'High-Priority') {
          highPriorityGaps.push(item);
        }
      }
    }
  });

  // Calculate percentage
  const matchPercentage = totalPossibleScore > 0
    ? Math.round((earnedScore / totalPossibleScore) * 100)
    : 0;

  return {
    targetRole,
    matchPercentage,
    scoreFormula: {
      earnedScore: Math.round(earnedScore * 10) / 10,
      totalPossibleScore,
      calculation: `(Earned Weighted Proficiency [${Math.round(earnedScore * 10) / 10}] / Total Role Weight [${totalPossibleScore}]) * 100`,
      explanation: "Score is computed by benchmarking learner's demonstrated proficiency against real-world role requirements weighted by employer demand priority.",
    },
    strongSkills,
    skillsToImprove,
    missingSkills,
    highPriorityGaps,
    recommendations: {
      primaryFocus: highPriorityGaps.length > 0 ? highPriorityGaps[0].name : (missingSkills[0]?.name || 'Advanced Project Work'),
      recommendedBadge: matchPercentage < 40 ? 'Associate' : matchPercentage < 75 ? 'Specialist' : 'Professional',
      actionPlan: `Focus on mastering ${highPriorityGaps.map(g => g.name).slice(0, 3).join(', ') || 'specialized topics'} to close your critical career gap.`
    }
  };
};
