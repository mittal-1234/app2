import React from 'react';

export const Dashboard = () => (
    <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
        <p className="text-gray-600">Your placement journey at a glance.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-white rounded-xl border border-gray-100 shadow-sm animate-pulse" />
            ))}
        </div>
    </div>
);

export const Practice = () => (
    <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Practice</h1>
        <p className="text-gray-600">Sharpen your coding skills with daily problems.</p>
    </div>
);

export const Assessments = () => (
    <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Assessments</h1>
        <p className="text-gray-600">Mock interviews and level-up tests.</p>
    </div>
);

export const Resources = () => (
    <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Resources</h1>
        <p className="text-gray-600">Learning paths and company-specific materials.</p>
    </div>
);

export const Profile = () => (
    <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile</h1>
        <p className="text-gray-600">Manage your personal information and resume.</p>
    </div>
);
