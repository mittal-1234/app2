import React from 'react';
import { ShieldCheck, AlertTriangle, RefreshCcw, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TEST_ITEMS = [
    { id: 't1', label: 'JD required validation works', hint: 'Blocked "Analyze" with empty JD.' },
    { id: 't2', label: 'Short JD warning shows for <200 chars', hint: 'Noticeable alert for small inputs.' },
    { id: 't3', label: 'Skills extraction groups correctly', hint: 'Categorization accuracy (Java -> Languages).' },
    { id: 't4', label: 'Round mapping changes based on company', hint: 'Amazon vs Startup dynamic flow.' },
    { id: 't5', label: 'Score calculation is deterministic', hint: 'Same JD yields exact same result.' },
    { id: 't6', label: 'Skill toggles update score live', hint: 'Score reacts to confidence toggles.' },
    { id: 't7', label: 'Changes persist after refresh', hint: 'State saved in localStorage.' },
    { id: 't8', label: 'History saves and loads correctly', hint: 'Entry visible in history list.' },
    { id: 't9', label: 'Export buttons copy correct content', hint: 'Plan/Checklist copy to clipboard.' },
    { id: 't10', label: 'No console errors on core pages', hint: 'Zero errors in F12 console.' },
];

const TestChecklistPage = () => {
    const [checked, setChecked] = React.useState(() => {
        try {
            const saved = localStorage.getItem('prp_test_state');
            return saved ? JSON.parse(saved) : {};
        } catch (e) { return {}; }
    });

    // Immediate save to localStorage on toggle for reliability
    const handleToggle = (id) => {
        const newState = { ...checked, [id]: !checked[id] };
        setChecked(newState);
        localStorage.setItem('prp_test_state', JSON.stringify(newState));
        window.dispatchEvent(new CustomEvent('prp_state_update'));
    };

    const resetChecklist = () => {
        if (window.confirm('Reset checklist?')) {
            setChecked({});
            localStorage.setItem('prp_test_state', JSON.stringify({}));
            window.dispatchEvent(new CustomEvent('prp_state_update'));
        }
    };

    const passedCount = Object.values(checked).filter(Boolean).length;
    const isReadyToShip = passedCount === 10;

    return (
        <div className="min-h-screen bg-[#F7F6F3] text-[#111111] font-sans p-8 md:p-16 pb-40">
            <div className="max-w-4xl mx-auto space-y-16">
                {/* Header */}
                <div className="border-b-2 border-[#111111] pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-serif font-black italic tracking-tighter uppercase leading-none">VERIFICATION</h1>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-40">Tests Passed: {passedCount} / 10</p>
                    </div>
                    <button
                        onClick={resetChecklist}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-[#A10000] px-4 py-2 border border-[#111111]/10 rounded-full transition-colors"
                    >
                        <RefreshCcw size={14} /> RESET
                    </button>
                </div>

                {!isReadyToShip && (
                    <div className="bg-[#A10000] text-white p-6 flex items-center gap-6">
                        <AlertTriangle size={32} />
                        <div>
                            <p className="font-serif italic text-xl">LOCKED</p>
                            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Fix issues before shipping.</p>
                        </div>
                    </div>
                )}

                {/* Checklist */}
                <div className="grid grid-cols-1 gap-6">
                    {TEST_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleToggle(item.id)}
                            className="flex items-center justify-between p-6 border-b border-[#111111]/10 group cursor-pointer hover:bg-white transition-colors"
                        >
                            <div className="space-y-1">
                                <h3 className={`text-xl font-serif italic ${checked[item.id] ? 'line-through opacity-30 shadow-none' : ''}`}>{item.label}</h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">{item.hint}</p>
                            </div>
                            <div className={`w-10 h-10 border-2 flex items-center justify-center transition-all ${checked[item.id] ? 'bg-[#A10000] border-[#A10000] text-white shadow-lg shadow-red-500/20' : 'border-[#111111]/20 group-hover:border-[#111111]'}`}>
                                {checked[item.id] && <ShieldCheck size={24} />}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Final Action */}
                <div className="pt-8 flex flex-col items-center gap-6">
                    <Link
                        to={isReadyToShip ? "/prp/08-ship" : "#"}
                        className={`inline-flex items-center gap-4 px-16 py-6 text-2xl font-serif font-black italic tracking-tight transition-all ${isReadyToShip ? 'bg-[#111111] text-white hover:bg-[#A10000] shadow-2xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'}`}
                    >
                        {isReadyToShip ? "PROCEED TO SHIP" : "SYSTEM LOCKED"} <ChevronRight size={32} />
                    </Link>
                    <p className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-20">KodNest Premium Build System</p>
                </div>
            </div>
        </div>
    );
};

export default TestChecklistPage;
