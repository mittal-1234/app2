import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Video, BarChart3 } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: 'Practice Problems',
            description: 'Master data structures and algorithms with curated problems.',
            icon: <Code className="w-8 h-8 text-primary" />,
        },
        {
            title: 'Mock Interviews',
            description: 'Experience real-world interviews with industry professionals.',
            icon: <Video className="w-8 h-8 text-primary" />,
        },
        {
            title: 'Track Progress',
            description: 'Visualize your growth with detailed performance analytics.',
            icon: <BarChart3 className="w-8 h-8 text-primary" />,
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-20 px-4 text-center bg-gray-50">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                    Ace Your <span className="text-primary text-opacity-100">Placement</span>
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform.
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg"
                >
                    Get Started
                </button>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 max-w-6xl mx-auto">
                <div className="grid md:grid-template-columns grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white text-center">
                            <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 border-t border-gray-100 text-center">
                <p className="text-gray-500">
                    © {new Date().getFullYear()} Placement Prep. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
