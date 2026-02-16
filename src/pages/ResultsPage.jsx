import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEntryById, updateEntry, generateRoundMap } from '../services/analysisService';
import {
    CheckCircle2,
    Calendar,
    Target,
    HelpCircle,
    ArrowLeft,
    Download,
    Copy,
    Zap,
    Check,
    Star,
    ChevronRight,
    History,
    AlertCircle,
    Building2,
    Info,
    LayoutList,
    Clock
} from 'lucide-react';

const ResultsPage = () => {
    const { id } = useParams();
    const [entry, setEntry] = React.useState(null);
    const [copyStatus, setCopyStatus] = React.useState('');

    React.useEffect(() => {
        try {
            const data = getEntryById(id);
            if (data) {
                // ENSURE EXTRACTED SKILLS EXISTS
                if (!data.extractedSkills) {
                    data.extractedSkills = { coreCS: [], languages: [], web: [], data: [], cloud: [], testing: [], other: [] };
                }

                // Initialize skillConfidenceMap if it doesn't exist
                if (!data.skillConfidenceMap) {
                    data.skillConfidenceMap = {};
                    const skillsArray = data.extractedSkills ? Object.values(data.extractedSkills).flat() : [];
                    skillsArray.forEach(skill => {
                        if (skill) data.skillConfidenceMap[skill] = 'practice';
                    });
                }

                // If baseScore is missing (old entry), use current readinessScore as base
                if (data.baseScore === undefined) {
                    data.baseScore = data.readinessScore || data.finalScore || 0;
                }

                // BACKFILL INTEL FOR OLD ENTRIES
                if (!data.intel && data.company) {
                    data.intel = {
                        name: data.company, industry: 'Technology Services', size: 'Startup (<200)', sizeKey: 'startup', focus: 'Practical Problem Solving + Stack Depth'
                    };
                }
                if (!data.roundMapping && data.intel) {
                    const rounds = generateRoundMap(data.intel, data.extractedSkills);
                    data.roundMapping = (rounds || []).map(r => ({ roundTitle: r.name, focusAreas: [r.focus], whyItMatters: r.why }));
                }

                setEntry({ ...data }); // Shallow copy to trigger re-render
            }
        } catch (err) {
            console.error("Error loading entry:", err);
        }
    }, [id]);

    if (!entry) {
        return (
            <div className="min-h-screen bg-[#F7F6F3] flex flex-col items-center justify-center p-8 text-[#111111]">
                <div className="w-20 h-20 border-2 border-[#111111] flex items-center justify-center mb-6">
                    <History size={40} />
                </div>
                <h2 className="text-3xl font-serif font-black italic">REPORT NOT FOUND</h2>
                <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-2">The requested ID does not exist in local storage.</p>
                <Link to="/dashboard" className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] px-8 py-3 border border-[#111111] hover:bg-[#111111] hover:text-white transition-all">BACK TO DASHBOARD</Link>
            </div>
        );
    }

    const handleToggleSkill = (skill) => {
        const currentStatus = entry.skillConfidenceMap?.[skill] || 'practice';
        const newStatus = currentStatus === 'know' ? 'practice' : 'know';
        const updatedMap = { ...entry.skillConfidenceMap, [skill]: newStatus };
        const updated = updateEntry(id, { skillConfidenceMap: updatedMap });
        if (updated) setEntry(updated);
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopyStatus(type);
        setTimeout(() => setCopyStatus(''), 2000);
    };

    const downloadTxt = () => {
        const content = `
PLACMENT PREPARATION REPORT - ${entry.company || 'General'}
Role: ${entry.role || 'NA'}
Readiness Score: ${entry.finalScore}/100

SKILLS DETECTED:
${Object.entries(entry.extractedSkills || {}).map(([cat, skills]) => `${cat}: ${(skills || []).join(', ')}`).join('\n')}

7-DAY PLAN:
${(entry.plan7Days || []).map(p => `${p.day}: ${p.focus} - ${p.activities}`).join('\n')}

LIKELY QUESTIONS:
${(entry.questions || []).map((q, i) => `${i + 1}. ${q}`).join('\n')}
        `.trim();

        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `Analysis_${entry.company || 'Ready'}.txt`;
        document.body.appendChild(element);
        element.click();
    };

    const weakSkills = entry.skillConfidenceMap
        ? Object.entries(entry.skillConfidenceMap)
            .filter(([_, status]) => status === 'practice')
            .map(([skill]) => skill)
            .slice(0, 3)
        : [];

    return (
        <div className="space-y-16 animate-fade-in pb-24 text-[#111111] bg-[#F7F6F3] min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b-2 border-[#111111] pb-10">
                <Link to="/history" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">
                    <ArrowLeft size={16} /> BACK TO HISTORY
                </Link>
                <button
                    onClick={() => downloadTxt()}
                    className="px-8 py-3 bg-[#111111] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#A10000] transition-colors flex items-center gap-2"
                >
                    <Download size={16} /> DOWNLOAD REPORT
                </button>
            </div>

            {/* Header Score Card */}
            <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-end justify-between">
                <div className="space-y-4 max-w-2xl">
                    <h1 className="text-7xl font-serif font-black italic tracking-tighter leading-none uppercase">{entry.company || 'Analysis Result'}</h1>
                    <div className="flex items-center gap-4">
                        <p className="text-xl font-serif italic opacity-60">{entry.role || 'Placement Preparation Strategy'}</p>
                        <div className="h-4 w-px bg-[#111111]/20"></div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">{new Date(entry.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="flex items-end gap-10 border-l-4 border-[#A10000] pl-10">
                    <div className="text-left">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2">Readiness</span>
                        <p className="text-[120px] font-serif font-black italic leading-none text-[#111111] tabular-nums tracking-tighter">{entry.finalScore}<span className="text-3xl text-gray-300 ml-2">/100</span></p>
                    </div>
                    <div className={`mb-4 w-20 h-20 flex items-center justify-center ${entry.finalScore > 70 ? 'text-[#A10000]' : 'text-gray-400'}`}>
                        <Zap size={64} fill="currentColor" />
                    </div>
                </div>
            </div>

            {/* Intel & Mapping Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Company Intel */}
                {entry.intel && (
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <Building2 size={24} className="text-[#A10000]" />
                            <h2 className="text-3xl font-serif font-black italic uppercase italic">Company Intel</h2>
                        </div>
                        <div className="bg-white border-2 border-[#111111] p-10 space-y-8 shadow-[12px_12px_0px_0px_#111111]">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Classification</p>
                                    <p className="text-xl font-serif italic">{entry.intel.size}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Sector</p>
                                    <p className="text-xl font-serif italic">{entry.intel.industry}</p>
                                </div>
                            </div>
                            <div className="pt-8 border-t border-[#111111]/10">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-2">Master Strategy</p>
                                <p className="text-lg font-serif">{entry.intel.focus}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Round mapping */}
                {entry.roundMapping && (
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <LayoutList size={24} className="text-[#A10000]" />
                            <h2 className="text-3xl font-serif font-black italic uppercase italic">The Roadmap</h2>
                        </div>
                        <div className="space-y-6">
                            {entry.roundMapping.map((round, idx) => (
                                <div key={idx} className="flex gap-6 group hover:translate-x-2 transition-transform">
                                    <div className="text-[10px] font-black items-center justify-center flex w-10 h-10 border-2 border-[#111111]/20 group-hover:border-[#A10000] group-hover:bg-[#A10000] group-hover:text-white transition-all shrink-0">
                                        0{idx + 1}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-serif font-black italic tracking-tight">{round.roundTitle}</h4>
                                        <p className="text-xs uppercase tracking-widest font-black text-[#A10000] opacity-80">{round.focusAreas[0]}</p>
                                        <p className="text-sm opacity-60 max-w-md mt-2">{round.whyItMatters}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pt-16 border-t-2 border-[#111111]">
                {/* Skills Assessment */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-serif font-black italic uppercase flex items-center gap-3">
                        <Target size={20} className="text-[#A10000]" /> Skills Mastery
                    </h3>
                    <div className="space-y-10">
                        {Object.entries(entry.extractedSkills || {}).map(([key, skills]) => {
                            const categoryLabels = {
                                coreCS: 'Core CS',
                                languages: 'Languages',
                                web: 'Web Development',
                                data: 'Database & Storage',
                                cloud: 'Cloud / DevOps',
                                testing: 'Quality & Testing',
                                other: 'Other Attributes'
                            };
                            const category = categoryLabels[key] || key;
                            return (
                                <div key={key} className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest opacity-30">{category}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(skills || []).map(skill => {
                                            const isKnown = entry.skillConfidenceMap?.[skill] === 'know';
                                            return (
                                                <button
                                                    key={skill}
                                                    onClick={() => handleToggleSkill(skill)}
                                                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border-2 transition-all ${isKnown ? 'bg-[#111111] border-[#111111] text-white' : 'bg-transparent border-[#111111]/10 hover:border-[#111111]'}`}
                                                >
                                                    {skill}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 7-Day Plan */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex justify-between items-end">
                        <h3 className="text-2xl font-serif font-black italic uppercase flex items-center gap-3">
                            <Calendar size={20} className="text-[#A10000]" /> 7-Day Sprint
                        </h3>
                        <button
                            onClick={() => copyToClipboard((entry.plan7Days || []).map(p => `${p.day}: ${p.focus}`).join('\n'), 'plan')}
                            className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:text-[#A10000] hover:opacity-100 transition-all font-mono"
                        >
                            {copyStatus === 'plan' ? '[ COPIED ]' : '[ COPY_PLAN ]'}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {(entry.plan7Days || []).map((item, idx) => (
                            <div key={idx} className="bg-white border border-[#111111]/10 p-8 space-y-4 hover:border-[#111111] transition-all relative overflow-hidden group">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-20 group-hover:opacity-100 group-hover:text-[#A10000] transition-all">{item.day}</span>
                                <h4 className="text-xl font-serif italic font-black">{item.focus}</h4>
                                <p className="text-sm opacity-60 leading-relaxed italic">{item.activities}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Checklist & Questions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-16 border-t-2 border-[#111111]">
                {/* Checklist */}
                <div className="space-y-8">
                    <div className="flex justify-between items-end">
                        <h3 className="text-2xl font-serif font-black italic uppercase flex items-center gap-3">
                            <CheckCircle2 size={20} className="text-[#A10000]" /> Prep Checklist
                        </h3>
                        <button
                            onClick={() => copyToClipboard((entry.checklist || []).map(c => `${c.roundTitle}\n${c.items.join('\n')}`).join('\n\n'), 'cl')}
                            className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:text-[#A10000] hover:opacity-100 transition-all font-mono"
                        >
                            {copyStatus === 'cl' ? '[ COPIED ]' : '[ COPY_CHECKLIST ]'}
                        </button>
                    </div>
                    <div className="space-y-12">
                        {(entry.checklist || []).map((round, idx) => (
                            <div key={idx} className="space-y-4">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em]">{round.roundTitle}</h4>
                                <ul className="space-y-3">
                                    {(round.items || []).map((item, i) => (
                                        <li key={i} className="flex gap-4 items-start text-sm font-serif group">
                                            <div className="w-1.5 h-1.5 mt-2 bg-[#111111] group-hover:bg-[#A10000] rotate-45 shrink-0"></div>
                                            <span className="opacity-70 group-hover:opacity-100 transition-all">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Questions */}
                <div className="space-y-8">
                    <div className="flex justify-between items-end">
                        <h3 className="text-2xl font-serif font-black italic uppercase flex items-center gap-3">
                            <HelpCircle size={20} className="text-[#A10000]" /> Likely Questions
                        </h3>
                        <button
                            onClick={() => copyToClipboard((entry.questions || []).join('\n'), 'qs')}
                            className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:text-[#A10000] hover:opacity-100 transition-all font-mono"
                        >
                            {copyStatus === 'qs' ? '[ COPIED ]' : '[ COPY_QS ]'}
                        </button>
                    </div>
                    <div className="space-y-6">
                        {(entry.questions || []).map((q, idx) => (
                            <div key={idx} className="p-6 border border-[#111111]/10 hover:bg-white hover:border-[#111111] transition-all group">
                                <p className="text-sm font-serif italic text-[#111111]/60 group-hover:text-[#111111] flex gap-4">
                                    <span className="text-[10px] font-black font-sans uppercase tracking-widest opacity-30 group-hover:text-[#A10000]">Q{idx + 1}</span>
                                    {q}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="bg-[#111111] p-16 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#A10000]/20 translate-x-20 -translate-y-20 rotate-45 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="space-y-4 relative z-10">
                    <h2 className="text-5xl font-serif font-black italic uppercase tracking-tighter">Ready to Execute?</h2>
                    <p className="text-lg opacity-40 font-bold uppercase tracking-[0.2em]">Priority Focus: {weakSkills.join(' • ') || 'Mastery Achieved'}</p>
                </div>
                <button
                    onClick={() => copyToClipboard(entry.plan7Days?.[0]?.activities || '', 'next')}
                    className="relative z-10 px-12 py-6 bg-white text-[#111111] font-serif font-black italic text-3xl hover:bg-[#A10000] hover:text-white transition-all shadow-2xl"
                >
                    {copyStatus === 'next' ? 'COPIED!' : 'EXECUTE DAY 1'}
                </button>
            </div>

            <div className="text-center opacity-10 text-[8px] font-black uppercase tracking-[0.8em]">
                KodNest Premium Build System • Integrity Protocol v1.0
            </div>
        </div>
    );
};

export default ResultsPage;
