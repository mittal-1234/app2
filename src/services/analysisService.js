import { v4 as uuidv4 } from 'uuid';

// --- Configuration ---

const CATEGORIES = {
    'Core CS': ['dsa', 'data structures', 'algorithms', 'oop', 'dbms', 'operating systems', 'os', 'networking', 'computer networks', 'system design', 'distributed systems'],
    'Languages': ['java', 'python', 'javascript', 'js', 'typescript', 'ts', 'c++', 'cpp', 'c#', 'csharp', 'golang', 'go', 'ruby', 'php', 'swift', 'kotlin', 'rust'],
    'Web': ['react', 'react.js', 'reactjs', 'next.js', 'nextjs', 'node', 'node.js', 'nodejs', 'express', 'express.js', 'angular', 'vue', 'html', 'css', 'tailwind', 'rest api', 'graphql', 'redux'],
    'Data': ['sql', 'mysql', 'postgresql', 'postgres', 'mongodb', 'mongo', 'redis', 'cassandra', 'elasticsearch', 'kafka', 'spark', 'hadoop'],
    'Cloud/DevOps': ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'k8s', 'jenkins', 'ci/cd', 'github actions', 'linux', 'bash', 'shell', 'terraform'],
    'Testing': ['selenium', 'cypress', 'playwright', 'jest', 'mocha', 'junit', 'pytest']
};

const PLAN_TEMPLATE = {
    1: { title: "Day 1-2: Foundations & Core CS", focus: "Refresh fundamental concepts and language basics." },
    2: { title: "Day 3-4: DSA & Problem Solving", focus: "Practice intense coding problems on LeetCode/GFG." },
    3: { title: "Day 5: Project & Frameworks", focus: "Deep dive into your tech stack and project portfolio." },
    4: { title: "Day 6: Mock Interviews", focus: "Simulate interview environment and behavioral prep." },
    5: { title: "Day 7: Final Revision", focus: "Review weak areas and cheat sheets." }
};

// --- Logic ---

export const extractSkills = (text) => {
    if (!text) return {};
    const lowerText = text.toLowerCase();
    const extracted = {};

    Object.entries(CATEGORIES).forEach(([category, keywords]) => {
        const found = keywords.filter(kw => {
            // Simple word boundary check or inclusion
            const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            return regex.test(lowerText) || lowerText.includes(kw); // Fallback for things like C++
        });
        if (found.length > 0) {
            extracted[category] = found;
        }
    });

    return extracted;
};

export const calculateScore = (formData) => {
    let score = 35; // Base score
    const skills = extractSkills(formData.jdText);

    // +5 per category
    const categoriesCount = Object.keys(skills).length;
    score += Math.min(categoriesCount * 5, 30);

    // Metadata
    if (formData.company && formData.company.length > 2) score += 10;
    if (formData.role && formData.role.length > 2) score += 10;
    if (formData.jdText && formData.jdText.length > 800) score += 10;

    return Math.min(score, 100);
};

export const generatePlan = (skills) => {
    const plan = JSON.parse(JSON.stringify(PLAN_TEMPLATE)); // Clone
    const skillList = Object.values(skills).flat();

    // Adapt plan based on skills
    if (skills['Web']?.length > 0) {
        plan[3].focus += ` Specific focus on ${skills['Web'].slice(0, 3).join(', ')}.`;
    }
    if (skills['Data']?.length > 0) {
        plan[1].focus += ` Review database normalization and SQL queries.`;
    }

    return Object.values(plan);
};

export const generateChecklist = (skills) => {
    const flatSkills = Object.values(skills).flat();
    const hasWeb = skills['Web']?.length > 0;
    const hasData = skills['Data']?.length > 0;

    return [
        {
            round: "Round 1: Aptitude & Basics",
            items: [
                "Quantitative Aptitude (Time & Work, Probability)",
                "Logical Reasoning (Puzzles, Data Interpretation)",
                "Verbal Ability (Reading Comprehension)",
                "Basic Language Syntax & IO"
            ]
        },
        {
            round: "Round 2: DSA & Core CS",
            items: [
                "Arrays, Strings, and Linked Lists",
                "Trees, Graphs, and DP Basics",
                "OOP Principles (Polymorphism, Inheritance)",
                "DBMS (ACID Properties, Normalization)",
                "OS Concepts (Process, Thread, Deadlock)"
            ]
        },
        {
            round: "Round 3: Tech Interview & Projects",
            items: [
                `Project Architecture Deep Dive`,
                hasWeb ? "Frontend Optimization Techniques" : "Code Quality & Clean Code",
                hasWeb ? "API Design & Integration" : "System Design Basics",
                hasData ? "Database Indexing & Query Tuning" : "Error Handling & Debugging",
                `Explain your role in ${flatSkills[0] || 'recent projects'}`
            ]
        },
        {
            round: "Round 4: Managerial & HR",
            items: [
                "Why this company?",
                "Strengths and Weaknesses",
                "Conflict Resolution Examples",
                "Future Goals & Career Path"
            ]
        }
    ];
};

export const generateQuestions = (skills) => {
    const questions = [];
    const flatSkills = Object.keys(skills).flatMap(k => skills[k]);

    if (flatSkills.includes('react')) questions.push("Explain the Virtual DOM and Reconciliation algorithm.");
    if (flatSkills.includes('node')) questions.push("How does Node.js handle concurrency (Event Loop)?");
    if (flatSkills.includes('sql')) questions.push("Explain the difference between clustered and non-clustered indexes.");
    if (flatSkills.includes('java')) questions.push("Explain the internal working of HashMap in Java.");
    if (flatSkills.includes('python')) questions.push("What are decorators and generators in Python?");
    if (flatSkills.includes('javascript')) questions.push("Explain Closures and Hoisting with examples.");
    if (flatSkills.includes('docker')) questions.push("Difference between an Image and a Container?");

    // Fillers if finding specific questions is hard
    const generics = [
        "Tell me about a challenging bug you fixed.",
        "How do you prioritize features vs tech debt?",
        "Explain SOLID principles.",
        "Design a URL shortening service (System Design)."
    ];

    return [...questions, ...generics].slice(0, 10);
};

export const saveToHistory = ({ company, role, jdText, extractedSkills, readinessScore, plan, checklist, questions }) => {
    const history = JSON.parse(localStorage.getItem('prp_history') || '[]');
    const newEntry = {
        id: Date.now().toString(), // Using timestamp as ID for simplicity
        createdAt: new Date().toISOString(),
        company,
        role,
        jdText, // storing full text might be heavy, but requested "persist history"
        extractedSkills,
        readinessScore,
        plan,
        checklist,
        questions
    };

    history.unshift(newEntry);
    localStorage.setItem('prp_history', JSON.stringify(history));
    return newEntry;
};

export const getHistory = () => {
    return JSON.parse(localStorage.getItem('prp_history') || '[]');
};

export const getAnalysis = (id) => {
    const history = getHistory();
    return history.find(entry => entry.id === id);
};
