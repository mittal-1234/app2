import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnalysis, updateHistoryEntry } from '../services/analysisService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { CheckCircle2, ArrowLeft, Calendar, FileText, Code, Users, Download, Copy, RefreshCw, Trophy, AlertCircle, ArrowRight } from 'lucide-react';

const ResultsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [analysis, setAnalysis] = useState(null);
    const [skillConfidence, setSkillConfidence] = useState({});
    const [currentScore, setCurrentScore] = useState(0);

    useEffect(() => {
        const data = getAnalysis(id);
        if (data) {
            setAnalysis(data);
            // Initialize confidence map if exists, else default to 'practice'
            const initialConfidence = data.skillConfidence || {};
            const allSkills = Object.values(data.extractedSkills).flat();

            allSkills.forEach(skill => {
                if (!initialConfidence[skill]) {
                    initialConfidence[skill] = 'practice';
                }
            });

            setSkillConfidence(initialConfidence);
            setCurrentScore(data.readinessScore);
        } else {
            navigate('/dashboard');
        }
    }, [id, navigate]);

    const handleSkillToggle = (skill) => {
        const newStatus = skillConfidence[skill] === 'know' ? 'practice' : 'know';
        const newConfidence = { ...skillConfidence, [skill]: newStatus };
        setSkillConfidence(newConfidence);

        // Calculate Score Change
        // Base score is stored in analysis.readinessScore (we assume this was the initial computed score)
        // However, to be consistent, let's just do a delta calculation relative to previous state
        // If changing practice -> know: +2
        // If changing know -> practice: -2

        // Better approach: Recalculate based on total 'know' count relative to base
        // But we want to persist the *current* score.
        // Let's simplified update: +/- 2

        let newScore = currentScore + (newStatus === 'know' ? 2 : -2);
        newScore = Math.max(0, Math.min(100, newScore)); // Review bounds
        setCurrentScore(newScore);

        // Persist
        updateHistoryEntry(id, {
            skillConfidence: newConfidence,
            readinessScore: newScore
        });
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        alert(`${label} copied to clipboard!`);
    };

    const downloadReport = () => {
        if (!analysis) return;

        const content = `PLATFORM READINESS REPORT
Generated on: ${new Date().toLocaleDateString()}
Target: ${analysis.role} at ${analysis.company}
Readiness Score: ${currentScore}/100

--- DETECTED SKILLS ---
${Object.entries(analysis.extractedSkills).map(([cat, skills]) =>
            `${cat}: ${skills.map(s => `${s} (${skillConfidence[s]})`).join(', ')}`
        ).join('\n')}

--- PREPARATION PLAN ---
${analysis.plan.map(d => `${d.title}\n${d.focus}`).join('\n\n')}

--- CHECKLIST ---
${analysis.checklist.map(r => `${r.round}\n${r.items.map(i => `- ${i}`).join('\n')}`).join('\n\n')}

--- INTERVIEW QUESTIONS ---
${analysis.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Analysis_${analysis.company}_${analysis.role}.txt`;
        a.click();
    };

    if (!analysis) return null;

    const { company, role, extractedSkills, encodedId, plan, checklist, questions } = analysis; // encodedId unused but safe
    const weakSkills = Object.keys(skillConfidence).filter(s => skillConfidence[s] === 'practice');

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in font-sans pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => navigate('/dashboard')} className="px-2">
                        <ArrowLeft size={20} />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
                        <p className="text-gray-500">{company} • {role}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={downloadReport} title="Download Report">
                            <Download size={18} />
                        </Button>
                    </div>
                    <div className="flex items-center gap-3 bg-indigo-50 px-5 py-3 rounded-xl border border-indigo-100 shadow-sm">
                        <div className="text-right">
                            <span className="block text-xs font-bold text-indigo-400 tracking-wider">LIVE SCORE</span>
                            <span className="block text-3xl font-bold text-indigo-600 leading-none">{currentScore}</span>
                        </div>
                        <div className="h-10 w-10 relative">
                            <svg className="transform -rotate-90 w-full h-full">
                                <circle cx="20" cy="20" r="16" stroke="#e0e7ff" strokeWidth="4" fill="none" />
                                <circle cx="20" cy="20" r="16" stroke="#4f46e5" strokeWidth="4" fill="none"
                                    strokeDasharray={100}
                                    strokeDashoffset={100 - currentScore}
                                    className="transition-all duration-500 ease-out"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Skills & Plan */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Skills Detected */}
                    <Card className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Code className="text-indigo-600" size={24} />
                                <h2 className="text-xl font-bold text-gray-900">Skill Self-Assessment</h2>
                            </div>
                            <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded">Click to toggle status</span>
                        </div>

                        <div className="space-y-6">
                            {Object.entries(extractedSkills).map(([category, skills]) => (
                                skills.length > 0 && (
                                    <div key={category} className="space-y-3">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{category}</p>
                                        <div className="flex flex-wrap gap-3">
                                            {skills.map(skill => (
                                                <button
                                                    key={skill}
                                                    onClick={() => handleSkillToggle(skill)}
                                                    className={`
                                                        px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 border
                                                        ${skillConfidence[skill] === 'know'
                                                            ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
                                                            : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'}
                                                    `}
                                                >
                                                    {skillConfidence[skill] === 'know' ? <CheckCircle2 size={14} /> : <RefreshCw size={14} />}
                                                    <span className="capitalize">{skill}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                            {Object.keys(extractedSkills).length === 0 && (
                                <p className="text-gray-500 italic">No specific technical skills detected. Plan will focus on general placement prep.</p>
                            )}
                        </div>
                    </Card>

                    {/* Action Next */}
                    {weakSkills.length > 0 && (
                        <div className="bg-indigo-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-indigo-300 mb-1">
                                        <AlertCircle size={18} />
                                        <span className="text-xs font-bold uppercase tracking-widest">Recommended Focus</span>
                                    </div>
                                    <h3 className="text-xl font-bold">Start Day 1 Plan Now</h3>
                                    <p className="text-indigo-200 text-sm max-w-md">
                                        You marked <b>{weakSkills.slice(0, 3).join(', ')}</b> as needing practice.
                                        Dive into the fundamentals today.
                                    </p>
                                </div>
                                <Button className="bg-white text-indigo-900 hover:bg-indigo-50 border-none shrink-0">
                                    Start Session <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* 7-Day Plan */}
                    <Card className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="text-indigo-600" size={24} />
                                <h2 className="text-xl font-bold text-gray-900">7-Day Preparation Plan</h2>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(plan.map(d => `${d.title}\n${d.focus}`).join('\n\n'), "Plan")}>
                                <Copy size={16} />
                            </Button>
                        </div>
                        <div className="relative border-l-2 border-indigo-100 ml-3 space-y-8 py-2">
                            {plan.map((day, index) => (
                                <div key={index} className="relative pl-8">
                                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm"></div>
                                    <h3 className="font-bold text-indigo-900 text-lg">{day.title}</h3>
                                    <p className="text-gray-600 mt-1">{day.focus}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Interview Questions */}
                    <Card className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Users className="text-indigo-600" size={24} />
                                <h2 className="text-xl font-bold text-gray-900">Likely Interview Questions</h2>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(questions.map((q, i) => `${i + 1}. ${q}`).join('\n'), "Questions")}>
                                <Copy size={16} />
                            </Button>
                        </div>
                        <ul className="space-y-3">
                            {questions.map((q, i) => (
                                <li key={i} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
                                    <span className="font-bold text-indigo-600">{i + 1}.</span>
                                    <span className="text-gray-800 font-medium">{q}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                {/* Right Column: Checklist */}
                <div className="space-y-8">
                    <Card className="bg-gray-900 text-white space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <FileText className="text-indigo-400" size={24} />
                                <h2 className="text-xl font-bold">Preparation Checklist</h2>
                            </div>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={() => copyToClipboard(checklist.map(r => `${r.round}\n${r.items.map(i => `- ${i}`).join('\n')}`).join('\n\n'), "Checklist")}>
                                <Copy size={16} />
                            </Button>
                        </div>
                        <div className="space-y-6">
                            {checklist.map((round, i) => (
                                <div key={i} className="space-y-3">
                                    <h3 className="font-bold text-indigo-300 uppercase text-xs tracking-widest border-b border-gray-700 pb-1">{round.round}</h3>
                                    <ul className="space-y-2">
                                        {round.items.map((item, j) => (
                                            <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                                                <CheckCircle2 size={16} className="mt-0.5 text-gray-500 shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;
