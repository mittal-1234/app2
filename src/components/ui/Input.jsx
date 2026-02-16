import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-xs font-bold uppercase tracking-widest opacity-60">
                    {label}
                </label>
            )}
            <input
                className={`
                    w-full px-4 py-3 bg-white border outline-none transition-colors
                    ${error
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-[#111111]/10 focus:border-[#8B0000]'}
                    ${className}
                `}
                {...props}
            />
            {error && (
                <p className="text-xs text-red-500 mt-1">{error}</p>
            )}
        </div>
    );
};

export default Input;
