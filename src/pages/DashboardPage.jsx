import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import {
    BarChart3, ArrowRight, Calendar, Clock, ChevronRight, Zap, Target, FileText, CheckCircle
} from 'lucide-react';
import {
    extractSkills, calculateScore, generatePlan, generateChecklist, generateQuestions, saveToHistory
} from '../services/analysisService';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const radarData = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'System Design', A: 60, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
    { subject: 'Resume', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];

const DashboardPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({ company: '', role: '', jdText: '' });

    const handleAnalyze = () => {
        if (!formData.jdText) return;

        const skills = extractSkills(formData.jdText);
        const score = calculateScore(formData);
        const plan = generatePlan(skills);
        const checklist = generateChecklist(skills);
        const questions = generateQuestions(skills);

        const entry = saveToHistory({
            ...formData,
            extractedSkills: skills,
            readinessScore: score,
            plan,
            checklist,
            questions
        });

        navigate(`/results/${entry.id}`);
    };

    return (
        <div className="space-y-8 animate-fade-in text-gray-900 font-sans">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-2">Track your placement readiness and prepare for upcoming interviews.</p>
            </div>

            {/* Main Form Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="space-y-6 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                <Target size={20} />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">New Analysis</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Target Company"
                                placeholder="e.g. Amazon"
                                value={formData.company}
                                onChange={e => setFormData({ ...formData, company: e.target.value })}
                            />
                            <Input
                                label="Target Position"
                                placeholder="e.g. SDE-1"
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Job Description</label>
                            <textarea
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 h-48 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none"
                                placeholder="Paste the full job description here to analyze your compatibility..."
                                value={formData.jdText}
                                onChange={e => setFormData({ ...formData, jdText: e.target.value })}
                            />
                            {formData.jdText.length > 0 && formData.jdText.length < 200 && (
                                <div className="flex items-center gap-2 text-amber-600 text-xs font-medium bg-amber-50 p-2 rounded-md">
                                    <Zap size={14} /> Analysis requires more data (min. 200 chars recommended).
                                </div>
                            )}
                        </div>
                        <Button
                            onClick={handleAnalyze}
                            disabled={!formData.jdText}
                            className="w-full"
                        >
                            Start Analysis
                        </Button>
                    </Card>
                </div>

                <div className="space-y-6">
                    {/* Overall Stats */}
                    <Card className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                <BarChart3 size={20} />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Readiness Score</h2>
                        </div>

                        <div className="flex items-end justify-between">
                            <div className="space-y-1">
                                <p className="text-4xl font-bold text-indigo-600">72%</p>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Aggregate Performance</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <Zap size={20} fill="currentColor" />
                            </div>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000" style={{ width: '72%' }}></div>
                        </div>
                    </Card>

                    {/* Skill Chart */}
                    <Card className="flex flex-col items-center justify-center min-h-[300px]">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4 w-full text-left">Skill Matrix</h3>
                        <div className="w-full h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                    <PolarGrid stroke="#e5e7eb" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 500 }} />
                                    <Radar
                                        name="Performance"
                                        dataKey="A"
                                        stroke="#4f46e5"
                                        fill="#4f46e5"
                                        fillOpacity={0.3}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Assessment Timeline */}
            <div className="pt-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Calendar size={20} className="text-indigo-600" />
                        Upcoming Milestones
                    </h2>
                    <Button variant="ghost" className="text-sm">View Calendar</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: 'DSA Mock Evaluation', time: 'Tomorrow, 10:00 AM', type: 'Technical' },
                        { title: 'System Design Round', time: 'Wed, 2:00 PM', type: 'Strategy' },
                        { title: 'Culture Fit Assessment', time: 'Fri, 11:00 AM', type: 'Behavioral' }
                    ].map((item, i) => (
                        <Card key={i} className="hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                    <Clock size={20} />
                                </div>
                                <Badge variant="neutral" className="bg-gray-100 text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-700">{item.type}</Badge>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{item.title}</h4>
                                <p className="text-sm text-gray-500 mt-1">{item.time}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
