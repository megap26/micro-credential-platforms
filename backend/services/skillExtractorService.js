// Skill Extraction and Normalization Engine
// Integrates standard taxonomy dictionaries (ESCO & O*NET aligned)

export const SKILL_SYNONYMS = {
  // Frontend
  'react': ['reactjs', 'react.js', 'react native', 'react 18'],
  'typescript': ['ts', 'typescript', 'type-script'],
  'javascript': ['js', 'es6', 'vanilla javascript', 'ecmascript'],
  'next.js': ['nextjs', 'next.js', 'next 14', 'next 13'],
  'vue.js': ['vue', 'vuejs', 'vue 3'],
  'angular': ['angular 2+', 'angularjs', 'angular framework'],
  'html5 & css3': ['html', 'css', 'html5', 'css3', 'modern css'],
  'tailwind css': ['tailwind', 'tailwindcss'],
  'redux / state management': ['redux', 'zustand', 'recoil', 'redux toolkit'],
  
  // Backend & APIs
  'node.js': ['nodejs', 'node', 'node.js runtime'],
  'express.js': ['express', 'expressjs'],
  'python': ['python 3', 'pythonic', 'py'],
  'fastapi': ['fast api', 'fastapi framework'],
  'django': ['django rest framework', 'drf'],
  'graphql': ['graphql apis', 'apollo graphql'],
  'restful apis': ['rest apis', 'restful web services', 'rest architecture'],
  'go / golang': ['golang', 'go language'],
  'java / spring boot': ['spring boot', 'java 17', 'spring framework'],

  // Database & Cache
  'mongodb': ['mongo', 'mongodb atlas', 'mongoose'],
  'postgresql': ['postgres', 'postgresql', 'psql'],
  'redis': ['redis cache', 'in-memory redis'],
  'sql': ['relational databases', 'mysql', 'sqlite'],

  // Cloud & DevOps
  'docker': ['containerization', 'docker compose', 'dockerfiles'],
  'kubernetes': ['k8s', 'kubernetes orchestration', 'helm'],
  'aws': ['amazon web services', 'aws lambda', 'ec2', 's3', 'ecs'],
  'ci/cd pipelines': ['github actions', 'gitlab ci', 'jenkins', 'ci/cd'],
  'terraform': ['iac', 'infrastructure as code', 'terraform cloud'],

  // AI & Machine Learning
  'machine learning': ['ml', 'statistical modeling', 'scikit-learn'],
  'deep learning': ['pytorch', 'tensorflow', 'neural networks'],
  'llm integration': ['large language models', 'openai api', 'langchain', 'llamaindex', 'rag'],
  'prompt engineering': ['prompt design', 'context window optimization'],
  'vector databases': ['chromadb', 'pinecone', 'milvus', 'qdrant'],

  // Architecture & Engineering Practices
  'microservices': ['microservices architecture', 'service-oriented architecture'],
  'system design': ['distributed systems', 'scalability', 'high-availability'],
  'unit & integration testing': ['jest', 'vitest', 'cypress', 'playwright', 'tdd'],
  'git / github': ['git version control', 'github workflows', 'git rebase'],

  // Soft Skills
  'agile / scrum': ['scrum', 'agile methodology', 'kanban', 'sprint planning'],
  'technical communication': ['cross-functional collaboration', 'stakeholder presentations'],
  'problem solving': ['root cause analysis', 'analytical thinking'],
  'code review & mentoring': ['peer code review', 'mentorship']
};

export const TAXONOMY_MAP = {
  'react': { category: 'Technical', taxonomyCode: 'ESCO-2512.1.4', demandLevel: 'High' },
  'typescript': { category: 'Technical', taxonomyCode: 'ESCO-2512.2.1', demandLevel: 'High' },
  'node.js': { category: 'Technical', taxonomyCode: 'ESCO-2512.3.2', demandLevel: 'High' },
  'python': { category: 'Technical', taxonomyCode: 'O*NET-15-1251.00', demandLevel: 'High' },
  'docker': { category: 'Cloud & DevOps', taxonomyCode: 'ESCO-2519.2.1', demandLevel: 'High' },
  'kubernetes': { category: 'Cloud & DevOps', taxonomyCode: 'ESCO-2519.2.3', demandLevel: 'High' },
  'aws': { category: 'Cloud & DevOps', taxonomyCode: 'O*NET-15-1244.00', demandLevel: 'High' },
  'postgresql': { category: 'Technical', taxonomyCode: 'ESCO-2521.1.2', demandLevel: 'High' },
  'mongodb': { category: 'Technical', taxonomyCode: 'ESCO-2521.1.5', demandLevel: 'High' },
  'llm integration': { category: 'AI & Machine Learning', taxonomyCode: 'O*NET-15-1221.00', demandLevel: 'Emerging' },
  'vector databases': { category: 'AI & Machine Learning', taxonomyCode: 'O*NET-15-1221.01', demandLevel: 'Emerging' },
  'machine learning': { category: 'AI & Machine Learning', taxonomyCode: 'ESCO-2519.4.1', demandLevel: 'High' },
  'restful apis': { category: 'Technical', taxonomyCode: 'ESCO-2512.4.1', demandLevel: 'High' },
  'system design': { category: 'Technical', taxonomyCode: 'ESCO-2511.1.0', demandLevel: 'High' },
  'agile / scrum': { category: 'Soft skills', taxonomyCode: 'ESCO-2421.2.2', demandLevel: 'Moderate' },
  'problem solving': { category: 'Soft skills', taxonomyCode: 'ESCO-0001.1.1', demandLevel: 'High' },
  'technical communication': { category: 'Soft skills', taxonomyCode: 'ESCO-0002.3.1', demandLevel: 'High' },
};

/**
 * Normalizes any skill string using synonym dictionary.
 */
export const normalizeSkillName = (rawSkill) => {
  if (!rawSkill) return '';
  const clean = rawSkill.trim().toLowerCase();

  for (const [canonical, aliases] of Object.entries(SKILL_SYNONYMS)) {
    if (canonical.toLowerCase() === clean) return canonical;
    if (aliases.some(alias => alias.toLowerCase() === clean)) {
      return canonical;
    }
  }

  // Capitalize nicely if not found
  return rawSkill.trim().replace(/\b\w/g, l => l.toUpperCase());
};

/**
 * Analyzes raw job description text and extracts categorized skills,
 * requirements, and experience levels.
 */
export const extractSkillsFromText = (text) => {
  if (!text || typeof text !== 'string') {
    return {
      technicalSkills: [],
      cloudSkills: [],
      aiSkills: [],
      softSkills: [],
      allExtractedSkills: [],
      qualifications: [],
      experienceRequirement: 'Not explicitly specified',
    };
  }

  const lower = text.toLowerCase();
  const extractedMap = new Map();

  // 1. Scan for known skills and synonyms
  for (const [canonical, aliases] of Object.entries(SKILL_SYNONYMS)) {
    const allTerms = [canonical, ...aliases];
    for (const term of allTerms) {
      // Word boundary regex
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');
      if (regex.test(lower)) {
        const taxonomy = TAXONOMY_MAP[canonical] || {
          category: 'Technical',
          taxonomyCode: 'O*NET-15-1250.00',
          demandLevel: 'High'
        };
        
        extractedMap.set(canonical, {
          name: canonical,
          category: taxonomy.category,
          taxonomyCode: taxonomy.taxonomyCode,
          demandLevel: taxonomy.demandLevel,
          frequency: (lower.match(new RegExp(escaped, 'gi')) || []).length,
          importance: lower.includes(`must have ${term}`) || lower.includes(`required:`) ? 'Required' : 'Required',
        });
        break;
      }
    }
  }

  // 2. Extract experience mentions (e.g., "3+ years", "5 years of experience")
  const expMatch = text.match(/(\d+[\+]?\s*(?:to\s*\d+\s*)?years?(?:\s*of)?\s*(?:experience|relevant experience))/i);
  const experienceRequirement = expMatch ? expMatch[0] : '2+ years of software engineering experience';

  // 3. Extract qualifications (e.g., Bachelor's, Master's, Degree)
  const qualifications = [];
  if (/bachelor|bs in|b\.tech|b\.e/i.test(text)) qualifications.push("Bachelor's Degree in Computer Science or equivalent");
  if (/master|ms in|m\.tech/i.test(text)) qualifications.push("Master's Degree in related discipline");
  if (/aws certified|gcp certified/i.test(text)) qualifications.push("Cloud Professional Certification");

  const allSkills = Array.from(extractedMap.values());

  return {
    technicalSkills: allSkills.filter(s => s.category === 'Technical'),
    cloudSkills: allSkills.filter(s => s.category === 'Cloud & DevOps'),
    aiSkills: allSkills.filter(s => s.category === 'AI & Machine Learning'),
    softSkills: allSkills.filter(s => s.category === 'Soft skills'),
    allExtractedSkills: allSkills,
    qualifications: qualifications.length > 0 ? qualifications : ["Bachelor's Degree in Computer Science, STEM or equivalent practical experience"],
    experienceRequirement,
  };
};
