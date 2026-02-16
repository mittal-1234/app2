import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Video, BarChart3 } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: 'Practice Problems',
            description: 'Master data structures and algorithms with curated problems.',
            icon: <Code className="w-8 h-8 text-indigo-600" />,
        },
        {
            title: 'Mock Interviews',
            description: 'Experience real-world interviews with industry professionals.',
            icon: <Video className="w-8 h-8 text-indigo-600" />,
        },
        {
            title: 'Track Progress',
            description: 'Visualize your growth with detailed performance analytics.',
            icon: <BarChart3 className="w-8 h-8 text-indigo-600" />,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2 font-bold text-xl text-indigo-700">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">P</div>
                    <span>Placement Prep</span>
                </div>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                >
                    Sign In
                </button>
            </nav>

            {/* Hero Section */}
            <section className="py-24 px-4 text-center bg-white">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight">
                        Ace Your <span className="text-indigo-600">Placement</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/30 transform hover:-translate-y-1"
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-4 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all bg-white text-center group">
                            <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 border-t border-gray-200 text-center bg-white mt-auto">
                <p className="text-gray-500 font-medium">
                    © {new Date().getFullYear()} Placement Prep. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
