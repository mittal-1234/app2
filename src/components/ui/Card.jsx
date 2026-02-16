import React from 'react';

const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`bg-white border border-[#111111]/10 p-8 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
