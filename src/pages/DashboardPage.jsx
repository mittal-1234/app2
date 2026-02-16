import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import {
    BarChart3, ArrowRight, Calendar, Clock, ChevronRight, Zap, Target, FileText
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
        <div className="space-y-16 animate-fade-in text-[#111111]">
            <div className="border-b border-[#111111]/10 pb-8">
                <h1 className="text-5xl font-serif font-bold italic tracking-tight uppercase leading-none mb-2">DASHBOARD</h1>
                <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-40">Personal Placement Readiness Console</p>
            </div>

            {/* Main Form Section */}
            <div className="grid grid-cols-1 gap-16 items-start">
                <div className="space-y-8">
                    <h2 className="text-2xl font-serif font-bold italic uppercase flex items-center gap-3">
                        <Target size={24} className="text-[#8B0000]" /> NEW ANALYSIS
                    </h2>
                    <Card className="space-y-8 shadow-[12px_12px_0px_0px_#111111]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Input
                                label="Company"
                                placeholder="e.g. Amazon"
                                value={formData.company}
                                onChange={e => setFormData({ ...formData, company: e.target.value })}
                            />
                            <Input
                                label="Position"
                                placeholder="e.g. SDE-1"
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest opacity-60">Job Description</label>
                            <textarea
                                className="w-full bg-[#F7F6F3] border border-[#111111]/10 focus:border-[#8B0000] p-6 h-64 text-sm leading-relaxed focus:outline-none transition-all resize-none font-sans"
                                placeholder="Paste the full job description here..."
                                value={formData.jdText}
                                onChange={e => setFormData({ ...formData, jdText: e.target.value })}
                            />
                            {formData.jdText.length > 0 && formData.jdText.length < 200 && (
                                <div className="flex items-center gap-2 text-[#8B0000] text-[10px] font-bold uppercase tracking-widest bg-[#8B0000]/5 p-2 px-4">
                                    <Zap size={14} /> Analysis requires more data (min. 200 chars recommended).
                                </div>
                            )}
                        </div>
                        <Button
                            onClick={handleAnalyze}
                            disabled={!formData.jdText}
                            className={`w-full text-lg ${!formData.jdText ? '' : 'shadow-lg shadow-red-900/10'}`}
                        >
                            START ANALYSIS
                        </Button>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Overall Stats */}
                    <div className="space-y-8">
                        <h2 className="text-xl font-serif font-bold italic uppercase flex items-center gap-3">
                            <BarChart3 size={20} className="text-[#8B0000]" /> OVERVIEW
                        </h2>
                        <Card className="space-y-6">
                            <div className="flex items-end justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Aggregated Score</p>
                                    <p className="text-6xl font-serif font-bold italic leading-none">72%</p>
                                </div>
                                <Zap size={40} className="text-[#8B0000]" fill="currentColor" />
                            </div>
                            <div className="h-2 bg-[#F7F6F3] w-full border border-[#111111]/5">
                                <div className="bg-[#8B0000] h-full" style={{ width: '72%' }}></div>
                            </div>
                        </Card>
                    </div>

                    {/* Skill Chart */}
                    <div className="space-y-8">
                        <h2 className="text-xl font-serif font-bold italic uppercase flex items-center gap-3">
                            <Radar size={20} className="text-[#8B0000]" /> SKILL MATRIX
                        </h2>
                        <Card className="p-0 aspect-square flex items-center justify-center">
                            <div className="w-full h-full p-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                        <PolarGrid stroke="#11111110" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#111111', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)' }} />
                                        <Radar
                                            name="Performance"
                                            dataKey="A"
                                            stroke="#8B0000"
                                            fill="#8B0000"
                                            fillOpacity={0.4}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Assessment Timeline */}
            <div className="pt-16 border-t border-[#111111]/10 space-y-8">
                <h2 className="text-2xl font-serif font-bold italic uppercase flex items-center gap-3">
                    <Calendar size={24} className="text-[#8B0000]" /> UPCOMING MILESTONES
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'DSA MOCK EVAL', time: 'TOMORROW 10:00', type: 'TECHNICAL' },
                        { title: 'SYSTEM DESIGN', time: 'WED 14:00', type: 'STRATEGY' },
                        { title: 'CULTURE FIT', time: 'FRI 11:00', type: 'BEHAVIORAL' }
                    ].map((item, i) => (
                        <div key={i} className="group p-8 border border-[#111111]/10 hover:border-[#8B0000] hover:bg-white transition-all duration-300 space-y-4 cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 border border-[#111111]/10 flex items-center justify-center group-hover:border-[#8B0000] group-hover:bg-[#8B0000] group-hover:text-white transition-all">
                                    <Clock size={20} />
                                </div>
                                <Badge variant="neutral" className="group-hover:bg-[#111111] group-hover:text-white transition-colors">{item.type}</Badge>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-lg font-serif font-bold italic uppercase tracking-tight">{item.title}</h4>
                                <p className="text-[10px] font-bold opacity-40 tracking-[0.2em]">{item.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center opacity-10 text-[8px] font-bold uppercase tracking-[0.8em] pt-16 pb-8">
                KodNest Premium Build System • Protocol Established
            </div>
        </div>
    );
};

export default DashboardPage;
