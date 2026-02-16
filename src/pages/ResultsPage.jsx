import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnalysis } from '../services/analysisService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { CheckCircle2, ArrowLeft, Calendar, FileText, Code, Users, Zap } from 'lucide-react';

const ResultsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [analysis, setAnalysis] = useState(null);

    useEffect(() => {
        const data = getAnalysis(id);
        if (data) {
            setAnalysis(data);
        } else {
            navigate('/dashboard');
        }
    }, [id, navigate]);

    if (!analysis) return null;

    const { company, role, extractedSkills, readinessScore, plan, checklist, questions } = analysis;

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in font-sans pb-20">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" onClick={() => navigate('/dashboard')} className="px-2">
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
                    <p className="text-gray-500">{company} • {role}</p>
                </div>
                <div className="ml-auto flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg">
                    <span className="text-sm font-bold text-indigo-900">SCORE</span>
                    <span className="text-2xl font-bold text-indigo-600">{readinessScore}/100</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Skills & Plan */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Skills Detected */}
                    <Card className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Code className="text-indigo-600" size={24} />
                            <h2 className="text-xl font-bold text-gray-900">Detected Skills</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(extractedSkills).map(([category, skills]) => (
                                skills.length > 0 && (
                                    <div key={category} className="space-y-2 w-full mb-2">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{category}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map(skill => (
                                                <Badge key={skill} variant="primary" className="bg-indigo-100 text-indigo-700 capitalize">
                                                    {skill}
                                                </Badge>
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

                    {/* 7-Day Plan */}
                    <Card className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="text-indigo-600" size={24} />
                            <h2 className="text-xl font-bold text-gray-900">7-Day Preparation Plan</h2>
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
                        <div className="flex items-center gap-2">
                            <Users className="text-indigo-600" size={24} />
                            <h2 className="text-xl font-bold text-gray-900">Likely Interview Questions</h2>
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
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="text-indigo-400" size={24} />
                            <h2 className="text-xl font-bold">Preparation Checklist</h2>
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
