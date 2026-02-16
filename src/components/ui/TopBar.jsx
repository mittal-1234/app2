import React from 'react';

const TopBar = ({ progress = 'Step 1 / 8', status = 'In Progress' }) => {
    return (
        <div className="h-16 border-b border-[#111111]/10 bg-white flex items-center justify-between px-8 sticky top-0 z-50">
            {/* Left: Project Name */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#111111] flex items-center justify-center">
                    <span className="font-serif font-bold text-white italic text-lg">K</span>
                </div>
                <span className="font-serif font-bold text-lg tracking-tight">KodNest Premium</span>
            </div>

            {/* Center: Progress */}
            <div className="text-sm font-medium opacity-60 font-mono tracking-widest uppercase">
                {progress}
            </div>

            {/* Right: Status Badge */}
            <div className={`
                px-3 py-1 text-[10px] font-bold uppercase tracking-widest border
                ${status === 'Shipped'
                    ? 'bg-[#2F5E3D]/10 text-[#2F5E3D] border-[#2F5E3D]/20'
                    : 'bg-[#111111]/5 text-[#111111]/60 border-[#111111]/10'}
            `}>
                {status}
            </div>
        </div>
    );
};

export default TopBar;
