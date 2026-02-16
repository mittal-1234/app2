import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-3 font-medium transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-[#8B0000] text-white hover:bg-[#660000] active:scale-95",
        secondary: "border border-[#111111] text-[#111111] hover:bg-[#111111]/5 active:scale-95",
        ghost: "text-[#111111] hover:bg-[#111111]/5 opacity-60 hover:opacity-100"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
