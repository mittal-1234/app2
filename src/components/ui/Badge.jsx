import React from 'react';

const Badge = ({ children, variant = 'neutral', className = '' }) => {
    const variants = {
        neutral: "bg-[#111111]/5 text-[#111111]/60",
        success: "bg-[#2F5E3D]/10 text-[#2F5E3D]",
        warning: "bg-[#9A6B15]/10 text-[#9A6B15]",
        danger: "bg-[#8B0000]/10 text-[#8B0000]"
    };

    return (
        <span className={`
            inline-flex items-center px-2 py-1 
            text-[10px] font-bold uppercase tracking-widest 
            ${variants[variant]} ${className}
        `}>
            {children}
        </span>
    );
};

export default Badge;
