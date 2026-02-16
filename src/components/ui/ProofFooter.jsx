import React from 'react';
import { CheckSquare, Square } from 'lucide-react';

const ProofFooter = () => {
    // Mock checklist state for visual purposes
    const checks = [
        { label: 'UI Built', checked: true },
        { label: 'Logic Working', checked: true },
        { label: 'Tests Passed', checked: false },
        { label: 'Deployed', checked: false },
    ];

    return (
        <div className="h-16 border-t border-[#111111]/10 bg-white flex items-center justify-between px-10 fixed bottom-0 left-0 w-full z-50">
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                System Status
            </div>

            <div className="flex items-center gap-6">
                {checks.map((check, idx) => (
                    <div key={idx} className="flex items-center gap-2 opacity-60">
                        {check.checked
                            ? <CheckSquare size={14} className="text-[#2F5E3D]" />
                            : <Square size={14} />}
                        <span className="text-xs font-medium font-mono">{check.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProofFooter;
