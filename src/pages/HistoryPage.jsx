import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../services/analysisService';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Clock, ArrowRight, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';

const HistoryPage = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const rawHistory = getHistory();
        // Filter out corrupted entries (missing id or createdAt)
        const validHistory = rawHistory.filter(entry => entry && entry.id && entry.createdAt);
        if (validHistory.length < rawHistory.length) {
            console.warn("Some corrupted history entries were skipped.");
        }
        setHistory(validHistory);
    }, []);

    const clearHistory = () => {
        if (confirm('Are you sure you want to clear all history?')) {
            localStorage.removeItem('prp_history');
            setHistory([]);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in font-sans">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">History</h1>
                    <p className="text-gray-500 mt-2">Previous analysis reports and readiness scores.</p>
                </div>
                {history.length > 0 && (
                    <Button variant="ghost" onClick={clearHistory} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        <Trash2 size={18} className="mr-2" /> Clear History
                    </Button>
                )}
            </div>

            {history.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <Clock size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No Analysis History</h3>
                    <p className="text-gray-500 mb-6">Start a new analysis to see your results here.</p>
                    <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {history.map((entry) => (
                        <Card
                            key={entry.id}
                            className="flex flex-col md:flex-row items-start md:items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                            onClick={() => navigate(`/results/${entry.id}`)}
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
                                        {entry.company || 'Untitled Analysis'}
                                    </h3>
                                    <Badge variant="neutral">{entry.role || 'General Role'}</Badge>
                                </div>
                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                    <Clock size={14} />
                                    {new Date(entry.createdAt).toLocaleDateString()} at {new Date(entry.createdAt).toLocaleTimeString()}
                                </p>
                            </div>

                            <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                                <div className="flex flex-col items-end">
                                    <span className="text-2xl font-bold text-indigo-600">{entry.readinessScore}%</span>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Score</span>
                                </div>
                                <div className="p-2 bg-gray-50 rounded-full text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
