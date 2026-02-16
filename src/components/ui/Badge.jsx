import React from 'react';

const Badge = ({ children, variant = 'neutral', className = '' }) => {
    const variants = {
        neutral: "bg-gray-100 text-gray-600",
        success: "bg-green-100 text-green-700",
        warning: "bg-amber-100 text-amber-700",
        danger: "bg-red-100 text-red-700",
        primary: "bg-indigo-100 text-indigo-700",
    };

    return (
        <span className={`
            inline-flex items-center px-2.5 py-0.5 rounded-full
            text-xs font-bold uppercase tracking-wide
            ${variants[variant]} ${className}
        `}>
            {children}
        </span>
    );
};

export default Badge;
