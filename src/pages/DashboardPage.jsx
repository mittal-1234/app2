import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';
import {
    BarChart3,
    ArrowRight,
    Calendar,
    Clock,
    ChevronRight,
    Zap,
    Target,
    FileText
} from 'lucide-react';
import {
    extractSkills,
    calculateScore,
    generatePlan,
    generateChecklist,
    generateQuestions,
    saveToHistory
} from '../services/analysisService';

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
        <div className="space-y-16 animate-fade-in pb-24 text-[#111111]">
            <div className="border-b-2 border-[#111111] pb-10">
                <h1 className="text-5xl font-serif font-black italic tracking-tighter uppercase leading-none">DASHBOARD</h1>
                <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-40 mt-2">Personal Placement Readiness Console</p>
            </div>

            {/* Main Form Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
                <div className="lg:col-span-2 space-y-12">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-serif font-black italic uppercase italic flex items-center gap-3">
                            <Target size={24} className="text-[#A10000]" /> NEW ANALYSIS
                        </h2>
                        <div className="bg-white border-2 border-[#111111] p-10 space-y-8 shadow-[12px_12px_0px_0px_#111111]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-30">Company</label>
                                    <input
                                        type="text"
                                        className="w-full bg-transparent border-b-2 border-[#111111]/10 focus:border-[#A10000] py-2 text-xl font-serif italic focus:outline-none transition-colors"
                                        placeholder="e.g. Amazon"
                                        value={formData.company}
                                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-30">Position</label>
                                    <input
                                        type="text"
                                        className="w-full bg-transparent border-b-2 border-[#111111]/10 focus:border-[#A10000] py-2 text-xl font-serif italic focus:outline-none transition-colors"
                                        placeholder="e.g. SDE-1"
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-30">Job Description</label>
                                <textarea
                                    className="w-full bg-[#F7F6F3] border-2 border-[#111111]/5 focus:border-[#A10000] p-6 h-64 text-sm leading-relaxed focus:outline-none transition-all resize-none font-sans"
                                    placeholder="Paste the full job description here..."
                                    value={formData.jdText}
                                    onChange={e => setFormData({ ...formData, jdText: e.target.value })}
                                />
                                {formData.jdText.length > 0 && formData.jdText.length < 200 && (
                                    <div className="flex items-center gap-2 text-[#A10000] text-[10px] font-black uppercase tracking-widest bg-[#A10000]/5 p-2 px-4 italic">
                                        <Zap size={14} /> Analysis requires more data (min. 200 chars recommended).
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={handleAnalyze}
                                disabled={!formData.jdText}
                                className={`w-full py-6 font-serif italic text-3xl font-black transition-all ${!formData.jdText ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-[#111111] text-white hover:bg-[#A10000] shadow-2xl shadow-red-500/10'}`}
                            >
                                START ANALYSIS
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-12">
                    {/* Overall Stats */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-serif font-black italic uppercase flex items-center gap-3">
                            <BarChart3 size={20} className="text-[#A10000]" /> OVERVIEW
                        </h2>
                        <div className="bg-white border-2 border-[#111111] p-8 space-y-6">
                            <div className="flex items-end justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Aggregated Score</p>
                                    <p className="text-6xl font-serif font-black italic leading-none">72%</p>
                                </div>
                                <Zap size={40} className="text-[#A10000]" fill="currentColor" />
                            </div>
                            <div className="h-2 bg-[#F7F6F3] w-full border border-[#111111]/5">
                                <div className="bg-[#A10000] h-full" style={{ width: '72%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Skill Chart */}
                    <div className="bg-white border-2 border-[#111111] p-6 aspect-square">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="#11111110" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#111111', fontSize: 10, fontWeight: 900 }} />
                                <Radar
                                    name="Performance"
                                    dataKey="A"
                                    stroke="#A10000"
                                    fill="#A10000"
                                    fillOpacity={0.4}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Assessment Timeline */}
            <div className="pt-16 border-t-2 border-[#111111] space-y-8">
                <h2 className="text-3xl font-serif font-black italic uppercase flex items-center gap-3">
                    <Calendar size={24} className="text-[#A10000]" /> UPCOMING MILESTONES
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'DSA MOCK EVAL', time: 'TOMORROW 10:00', type: 'TECHNICAL' },
                        { title: 'SYSTEM DESIGN', time: 'WED 14:00', type: 'STRATEGY' },
                        { title: 'CULTURE FIT', time: 'FRI 11:00', type: 'BEHAVIORAL' }
                    ].map((item, i) => (
                        <div key={i} className="group p-8 border border-[#111111]/10 hover:border-[#A10000] hover:bg-white transition-all space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 border-2 border-[#111111]/10 flex items-center justify-center group-hover:border-[#A10000] group-hover:bg-[#A10000] group-hover:text-white transition-all">
                                    <Clock size={20} />
                                </div>
                                <span className="text-[8px] font-black uppercase tracking-widest text-white bg-[#111111] px-2 py-1">{item.type}</span>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-serif font-black italic uppercase tracking-tight">{item.title}</h4>
                                <p className="text-[10px] font-black opacity-30 tracking-[0.2em]">{item.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center opacity-10 text-[8px] font-black uppercase tracking-[0.8em] pt-16">
                KodNest Premium Build System • Protocol Established
            </div>
        </div>
    );
};

export default DashboardPage;
