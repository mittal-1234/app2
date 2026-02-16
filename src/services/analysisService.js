const ENTERPRISE_COMPANIES = [
    'amazon', 'google', 'microsoft', 'meta', 'apple', 'tcs', 'infosys', 'wipro', 'hcl', 'accenture', 'capgemini', 'ibm', 'oracle', 'cisco'
];

export const getCompanyIntel = (name = '') => {
    const lowerName = name.toLowerCase().trim();
    if (!lowerName) return null;

    const isEnterprise = ENTERPRISE_COMPANIES.some(c => lowerName.includes(c));
    const intel = {
        name: name,
        industry: 'Technology Services', // Heuristic guess
        size: isEnterprise ? 'Enterprise (2000+)' : 'Startup (<200)',
        sizeKey: isEnterprise ? 'enterprise' : 'startup',
        focus: isEnterprise
            ? 'Structured DSA + Core CS Fundamentals + Aptitude'
            : 'Practical Problem Solving + Stack Depth + System Discussion'
    };

    return intel;
};

export const generateRoundMap = (intel, skills) => {
    if (!intel) return [];

    const hasDSA = skills['Core CS']?.includes('DSA');
    const hasWeb = skills['Web']?.length > 0;

    if (intel.sizeKey === 'enterprise') {
        const rounds = [
            {
                name: 'Round 1: Online Assessment',
                focus: 'DSA + Aptitude',
                why: 'Filters candidates on basic problem-solving and logic speeds.'
            },
            {
                name: 'Round 2: Technical Interview I',
                focus: 'DSA + Core CS (OS/DBMS)',
                why: 'Deep dive into computer science fundamentals and algorithmic thinking.'
            },
            {
                name: 'Round 3: Technical Interview II',
                focus: 'Projects + High-Level Design',
                why: 'Evaluates your ability to build and explain complex systems.'
            },
            {
                name: 'Round 4: HR / Culture Fit',
                focus: 'Behavioral + STAR Method',
                why: 'Ensures alignment with company values and long-term retention.'
            }
        ];
        return rounds;
    } else {
        const rounds = [
            {
                name: 'Round 1: Practical Coding / Assignment',
                focus: hasWeb ? 'Feature Implementation' : 'Logic Building',
                why: 'Verifies real-world coding ability over theoretical knowledge.'
            },
            {
                name: 'Round 2: Technical Discussion',
                focus: 'System Architecture + Tech Stack',
                why: 'Assesses depth in the specific stack required for the role.'
            },
            {
                name: 'Round 3: Founder / Culture Fit',
                focus: 'Vision Alignment + Ownership',
                why: 'Crucial for small teams where culture and speed are everything.'
            }
        ];
        return rounds;
    }
};

const SKILL_CATEGORIES = {
    'Core CS': ['DSA', 'OOP', 'DBMS', 'OS', 'Networks'],
    'Languages': ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go'],
    'Web': ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL'],
    'Data': ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
    'Cloud/DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
    'Testing': ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest']
};

export const extractSkills = (jdText) => {
    const detected = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: []
    };
    const lowerJD = jdText.toLowerCase();

    const categoryMap = {
        'Core CS': 'coreCS',
        'Languages': 'languages',
        'Web': 'web',
        'Data': 'data',
        'Cloud/DevOps': 'cloud',
        'Testing': 'testing'
    };

    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
        const matched = skills.filter(skill => {
            const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escaped}\\b`, 'i');
            return regex.test(lowerJD);
        });

        if (matched.length > 0) {
            detected[categoryMap[category]] = matched;
        }
    });

    // Default behavior if no skills detected
    const totalDetected = Object.values(detected).flat().length;
    if (totalDetected === 0) {
        detected.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
    }

    return detected;
};

export const calculateScore = (data) => {
    let score = 35;
    const categories = extractSkills(data.jdText);
    const categoryCount = Object.values(categories).filter(c => c.length > 0).length;

    score += Math.min(categoryCount * 5, 30);
    if (data.company && data.company.trim()) score += 10;
    if (data.role && data.role.trim()) score += 10;
    if (data.jdText.length > 800) score += 10;

    return Math.min(score, 100);
};

export const generatePlan = (skills) => {
    const hasFrontend = skills.web?.some(s => ['React', 'Next.js'].includes(s));
    const hasBackend = skills.web?.some(s => ['Node.js', 'Express'].includes(s)) || skills.data?.length > 0;

    const basePlan = [
        { day: 'Day 1–2', focus: 'Basics + Core CS', activities: 'Revise OOPs, DBMS, and OS concepts. Brush up on core language fundamentals.' },
        { day: 'Day 3–4', focus: 'DSA + Coding', activities: `Focus on ${skills.coreCS?.includes('DSA') ? 'advanced' : ''} DSA patterns. Practice 5-10 LeetCode medium problems.` },
        { day: 'Day 5', focus: 'Project & Stack', activities: `Deep dive into ${hasFrontend ? 'Frontend' : ''} ${hasBackend ? 'and Backend' : ''} requirements. Align your projects with JD.` },
        { day: 'Day 6', focus: 'Mock Interviews', activities: 'Practice behavior questions and conduct a peer mock interview.' },
        { day: 'Day 7', focus: 'Revision', activities: 'Quick revision of weak areas and final resume check.' }
    ];

    return basePlan;
};

export const generateChecklist = (skills) => {
    const allDetected = Object.values(skills).flat();
    return [
        {
            roundTitle: 'Round 1: Aptitude / Basics',
            items: [
                'Quantitative & Logical Reasoning practice',
                'Verbal ability brush-up',
                'Basic programming syntax revision'
            ]
        },
        {
            roundTitle: 'Round 2: DSA + Core CS',
            items: [
                ...allDetected.slice(0, 3).map(s => `Master ${s} fundamentals`),
                'Complexity analysis of common patterns'
            ]
        },
        {
            roundTitle: 'Round 3: Tech Interview',
            items: [
                'In-depth walk-through of primary project',
                'Explain architectural decisions in past work'
            ]
        }
    ];
};

export const generateQuestions = (skills) => {
    const questions = [];
    const allDetected = Object.values(skills).flat().map(s => s.toLowerCase());

    if (allDetected.includes('sql') || allDetected.includes('dbms'))
        questions.push("Explain indexing and when it helps or hurts performance.");
    if (allDetected.includes('react'))
        questions.push("Compare different state management options in React.");
    if (allDetected.includes('dsa'))
        questions.push("Describe a scenario where you would choose a Hash Map over a Balanced BST.");

    while (questions.length < 10) {
        questions.push("Discuss a challenging project and how you overcame a major technical block.");
        questions.push("How do you keep your skills updated with the latest industry trends?");
        if (questions.length >= 10) break;
    }

    return questions.slice(0, 10);
};

export const saveToHistory = (entry) => {
    const history = getHistory();
    const intel = getCompanyIntel(entry.company);
    const rounds = generateRoundMap(intel, entry.extractedSkills);

    // Strict Schema Enforcement
    const newEntry = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: entry.company || "",
        role: entry.role || "",
        jdText: entry.jdText,
        extractedSkills: entry.extractedSkills,
        roundMapping: rounds.map(r => ({ roundTitle: r.name, focusAreas: [r.focus], whyItMatters: r.why })),
        checklist: entry.checklist,
        plan7Days: entry.plan,
        questions: entry.questions,
        baseScore: entry.readinessScore,
        skillConfidenceMap: entry.skillConfidenceMap || {},
        finalScore: entry.readinessScore
    };

    localStorage.setItem('analysis_history', JSON.stringify([newEntry, ...history]));
    return newEntry;
};

export const updateEntry = (id, updates) => {
    const history = getHistory();
    const entryIndex = history.findIndex(e => e.id.toString() === id.toString());
    if (entryIndex === -1) return null;

    const updatedEntry = {
        ...history[entryIndex],
        ...updates,
        updatedAt: new Date().toISOString()
    };

    // Recalculate Final Score if map updated
    if (updates.skillConfidenceMap) {
        const allSkills = Object.values(updatedEntry.extractedSkills || {}).flat();
        let scoreAdjustment = 0;
        allSkills.forEach(s => {
            if (updates.skillConfidenceMap[s] === 'know') scoreAdjustment += 2;
            else if (updates.skillConfidenceMap[s] === 'practice') scoreAdjustment -= 2;
        });
        updatedEntry.finalScore = Math.max(0, Math.min(100, (updatedEntry.baseScore || 0) + scoreAdjustment));
    }

    history[entryIndex] = updatedEntry;
    localStorage.setItem('analysis_history', JSON.stringify(history));
    return updatedEntry;
};

export const getHistory = () => {
    try {
        const data = localStorage.getItem('analysis_history');
        const parsed = data ? JSON.parse(data) : [];
        // Filter out corrupted entries
        return parsed.filter(e => e && e.id && e.jdText);
    } catch (e) {
        console.error("Failed to parse history", e);
        return [];
    }
};

export const getEntryById = (id) => getHistory().find(e => e.id.toString() === id.toString());
