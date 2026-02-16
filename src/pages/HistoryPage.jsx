import React from 'react';
import { Link } from 'react-router-dom';
import { getHistory } from '../services/analysisService';
import { History, Calendar, Clock, Briefcase, ArrowRight, ChevronRight, Zap } from 'lucide-react';

const HistoryPage = () => {
    const [history, setHistory] = React.useState([]);

    React.useEffect(() => {
        setHistory(getHistory());
    }, []);

    return (
        <div className="space-y-16 animate-fade-in pb-24 text-[#111111]">
            <div className="border-b-2 border-[#111111] pb-10">
                <h1 className="text-5xl font-serif font-black italic tracking-tighter uppercase leading-none">HISTORY</h1>
                <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-40 mt-2">Archives of past placement readiness analyses</p>
            </div>

            {history.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {history.map((entry) => (
                        <Link key={entry.id} to={`/results/${entry.id}`} className="group block">
                            <div className="bg-white border-2 border-[#111111] p-10 space-y-8 shadow-[12px_12px_0px_0px_#111111] group-hover:shadow-[16px_16px_0px_0px_#A10000] transition-all relative overflow-hidden">
                                <div className="flex justify-between items-start relative z-10">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-[#A10000] rotate-45"></div>
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{new Date(entry.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <h2 className="text-4xl font-serif font-black italic tracking-tighter leading-none uppercase group-hover:text-[#A10000] transition-colors">{entry.company || 'Analysis Result'}</h2>
                                        <p className="text-lg font-serif italic opacity-60">{entry.role || 'Placement Preparation Strategy'}</p>
                                    </div>
                                    <div className="text-right border-l-2 border-[#111111]/5 pl-8 shrink-0">
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-20 block mb-1">Score</span>
                                        <p className="text-5xl font-serif font-black italic leading-none">{entry.finalScore || entry.readinessScore || 0}<span className="text-xs opacity-20 ml-1">/100</span></p>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-[#111111]/5 flex justify-between items-center relative z-10">
                                    <div className="flex gap-4">
                                        {entry.extractedSkills && Object.values(entry.extractedSkills).flat().slice(0, 3).map((skill, idx) => (
                                            <span key={idx} className="text-[8px] font-black uppercase tracking-widest bg-[#F7F6F3] px-3 py-1.5 border border-[#111111]/5">{skill}</span>
                                        ))}
                                    </div>
                                    <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform duration-300 group-hover:text-[#A10000]" />
                                </div>
                                <Zap size={80} className="absolute -bottom-8 -right-8 text-[#111111]/5 group-hover:text-[#A10000]/5 transition-colors -rotate-12" fill="currentColor" />
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="bg-white border-2 border-[#111111] p-24 text-center space-y-8 shadow-[12px_12px_0px_0px_#111111]">
                    <div className="w-24 h-24 border-2 border-[#111111]/10 flex items-center justify-center mx-auto opacity-20">
                        <History size={48} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-serif font-black italic uppercase">NO ARCHIVES FOUND</h2>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-40">Your analysis history will appear here once protocol is initiated.</p>
                    </div>
                    <Link
                        to="/dashboard"
                        className="inline-block px-12 py-5 bg-[#111111] text-white font-serif font-black italic text-2xl hover:bg-[#A10000] transition-all shadow-xl"
                    >
                        INITIATE ANALYSIS
                    </Link>
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
