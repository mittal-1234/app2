import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './ui/TopBar';
import ProofFooter from './ui/ProofFooter';

const KodNestLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#F7F6F3]">
            <TopBar />

            <main className="flex-1 flex flex-col relative pb-20"> {/* pb-20 for footer */}
                <div className="flex-1 max-w-[1400px] w-full mx-auto p-8 grid grid-cols-1 lg:grid-cols-[70%_30%] gap-12">

                    {/* Primary Workspace (70%) */}
                    <div className="space-y-8">
                        <Outlet />
                    </div>

                    {/* Secondary Panel (Mock content for now) */}
                    <aside className="hidden lg:block space-y-8">
                        <div className="sticky top-24 space-y-6">
                            <div className="p-6 bg-white border border-[#111111]/5">
                                <h3 className="font-serif font-bold text-lg mb-2">Context</h3>
                                <p className="text-sm opacity-60 leading-relaxed">
                                    This panel provides context-sensitive help and actions for the current step.
                                </p>
                            </div>

                            <div className="p-6 bg-[#111111]/5 border border-[#111111]/5">
                                <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">Actions</h4>
                                <button className="w-full py-3 bg-[#111111] text-white text-sm font-medium hover:bg-[#8B0000] transition-colors">
                                    Verification Action
                                </button>
                            </div>
                        </div>
                    </aside>

                </div>
            </main>

            <ProofFooter />
        </div>
    );
};

export default KodNestLayout;
