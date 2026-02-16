import React from 'react';
import { Rocket, ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const ShipPage = () => {
    const checkIsReady = React.useCallback(() => {
        try {
            const testSaved = localStorage.getItem('prp_test_state');
            const testsCount = testSaved ? Object.values(JSON.parse(testSaved)).filter(Boolean).length : 0;

            const proofSaved = localStorage.getItem('prp_final_submission');
            const proof = proofSaved ? JSON.parse(proofSaved) : { lovable: '', github: '', deployed: '' };
            const validateUrl = (url) => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(url);
            const linksValid = validateUrl(proof.lovable) && validateUrl(proof.github) && validateUrl(proof.deployed);

            return testsCount === 10 && linksValid;
        } catch (e) { return false; }
    }, []);

    const isReady = checkIsReady();

    if (!isReady) {
        return <Navigate to="/prp/07-test" replace />;
    }

    return (
        <div className="min-h-screen bg-[#F7F6F3] text-[#111111] font-sans flex items-center justify-center p-8">
            <div className="max-w-3xl w-full text-center space-y-16">
                <div className="space-y-8">
                    <div className="w-32 h-32 bg-[#A10000] text-white mx-auto flex items-center justify-center rounded-none rotate-3 hover:rotate-0 transition-transform shadow-2xl">
                        <Rocket size={64} />
                    </div>
                    <h1 className="text-7xl font-serif font-black italic tracking-tighter leading-none">SHIPPED.</h1>
                    <p className="text-lg font-bold uppercase tracking-[0.3em] opacity-40 italic">KodNest Premium Build System v1.0.0</p>
                </div>

                <div className="border-2 border-[#111111] p-10 md:p-16 space-y-10 bg-white">
                    <div className="space-y-6">
                        <div className="flex items-center justify-center gap-2 text-[#A10000]">
                            <ShieldCheck size={20} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Verified Performance</span>
                        </div>
                        <div className="space-y-6 max-w-lg mx-auto">
                            <p className="text-2xl font-serif italic text-[#111111]/80 leading-snug">
                                "You built a real product. Not a tutorial. Not a clone. A structured tool that solves a real problem."
                            </p>
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#A10000]">
                                This is your proof of work.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="bg-[#111111] text-white py-6 font-serif italic text-2xl hover:bg-[#A10000] transition-colors flex items-center justify-center gap-3">
                            VIEW LIVE <ExternalLink size={24} />
                        </button>
                        <Link to="/dashboard" className="border-2 border-[#111111] text-[#111111] py-6 font-serif italic text-2xl hover:bg-[#111111] hover:text-white transition-colors flex items-center justify-center gap-3">
                            <ArrowLeft size={24} /> RETURN
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center gap-8 opacity-20 text-[8px] font-black uppercase tracking-[0.5em]">
                    <span>Secure</span>
                    <span>•</span>
                    <span>Stable</span>
                    <span>•</span>
                    <span>Deployed</span>
                </div>
            </div>
        </div>
    );
};

export default ShipPage;
