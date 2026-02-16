import React from 'react';

const Card = ({ children, className = '', ...props }) => {
    // If className contains a background color, don't apply the default bg-white
    const hasBg = className.includes('bg-');
    const baseClasses = `rounded-xl shadow-sm border border-gray-100 p-8 ${hasBg ? '' : 'bg-white'}`;

    return (
        <div
            className={`${baseClasses} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
