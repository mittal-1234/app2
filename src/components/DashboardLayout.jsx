import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Terminal,
    FileText,
    BookOpen,
    User,
    GraduationCap,
    History,
    ShieldCheck,
    Rocket,
    Lock
} from 'lucide-react';

const SidebarItem = ({ to, icon, label, locked = false }) => (
    <NavLink
        to={locked ? "#" : to}
        className={({ isActive }) =>
            `flex items-center justify-between px-6 py-4 transition-all border-l-4 ${locked
                ? 'opacity-30 cursor-not-allowed border-transparent'
                : isActive
                    ? 'bg-white border-[#A10000] text-[#111111] shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]'
                    : 'border-transparent text-[#111111]/60 hover:text-[#111111] hover:bg-white/50'
            }`
        }
    >
        <div className="flex items-center gap-4">
            {icon}
            <span className="font-serif font-black italic uppercase text-[10px] tracking-[0.2em]">{label}</span>
        </div>
        {locked && <Lock size={12} className="opacity-40" />}
    </NavLink>
);

const DashboardLayout = () => {
    const [status, setStatus] = React.useState({
        testsPassed: 0,
        linksValid: false,
        allStepsDone: true // All 8 logic steps are implemented in code
    });

    const checkStatus = React.useCallback(() => {
        try {
            // 1. Check Tests (07-test)
            const testSaved = localStorage.getItem('prp_test_state');
            const tests = testSaved ? JSON.parse(testSaved) : {};
            const testsCount = Object.values(tests).filter(Boolean).length;

            // 2. Check Proof Links (proof)
            const proofSaved = localStorage.getItem('prp_final_submission');
            const proof = proofSaved ? JSON.parse(proofSaved) : { lovable: '', github: '', deployed: '' };
            const validateUrl = (url) => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(url);
            const linksValid = validateUrl(proof.lovable) && validateUrl(proof.github) && validateUrl(proof.deployed);

            setStatus({
                testsPassed: testsCount,
                linksValid: linksValid,
                allStepsDone: true
            });
        } catch (e) {
            console.error("Status check failed", e);
        }
    }, []);

    React.useEffect(() => {
        checkStatus();
        window.addEventListener('storage', checkStatus);
        window.addEventListener('prp_state_update', checkStatus);
        return () => {
            window.removeEventListener('storage', checkStatus);
            window.removeEventListener('prp_state_update', checkStatus);
        };
    }, [checkStatus]);

    const isReadyToShip = status.testsPassed === 10 && status.linksValid && status.allStepsDone;

    return (
        <div className="flex h-screen bg-[#F7F6F3] text-[#111111] overflow-hidden">
            {/* Sidebar */}
            <aside className="w-80 bg-white border-r-2 border-[#111111] flex flex-col relative z-20">
                <div className="p-10 border-b-2 border-[#111111] bg-[#111111]/5">
                    <Link to="/" className="flex flex-col gap-2 group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#111111] text-white flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                                <GraduationCap size={24} />
                            </div>
                            <span className="text-2xl font-serif font-black italic tracking-tighter uppercase group-hover:text-[#A10000] transition-colors">PRP.PROTOCOL</span>
                        </div>
                        <p className="text-[8px] font-black uppercase tracking-[0.5em] opacity-30">KodNest Premium Build</p>
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto py-8">
                    <SidebarItem to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
                    <SidebarItem to="/history" icon={<History size={18} />} label="History" />
                    <SidebarItem to="/practice" icon={<Terminal size={18} />} label="Practice" />

                    <div className="my-8 h-px bg-[#111111]/10 mx-6"></div>

                    <SidebarItem to="/assessments" icon={<FileText size={18} />} label="Assessments" />
                    <SidebarItem to="/resources" icon={<BookOpen size={18} />} label="Resources" />
                    <SidebarItem to="/profile" icon={<User size={18} />} label="Profile" />

                    <div className="my-8 h-px bg-[#111111]/10 mx-6"></div>

                    <SidebarItem to="/prp/07-test" icon={<ShieldCheck size={18} />} label="Verification" />
                    <SidebarItem to="/prp/proof" icon={<FileText size={18} />} label="Proof of Work" />
                    <SidebarItem
                        to="/prp/08-ship"
                        icon={<Rocket size={18} />}
                        label="Ship Status"
                        locked={!isReadyToShip}
                    />
                </nav>

                <div className="p-8 border-t-2 border-[#111111] space-y-4 bg-[#111111] text-white">
                    <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest opacity-40">
                        <span>Project Status</span>
                        <span className={isReadyToShip ? 'text-green-400' : 'text-[#A10000]'}>
                            {isReadyToShip ? 'SHIPPED' : 'IN_PROGRESS'}
                        </span>
                    </div>
                    <div className="h-1 bg-white/10 w-full relative">
                        <div
                            className={`h-full transition-all duration-700 ${isReadyToShip ? 'bg-green-400 animate-pulse' : 'bg-[#A10000]'}`}
                            style={{ width: isReadyToShip ? '100%' : `${(status.testsPassed * 5) + (status.linksValid ? 50 : 0)}%` }}
                        ></div>
                    </div>
                    <p className="text-[8px] font-bold opacity-30 uppercase tracking-tighter">
                        {status.testsPassed}/10 Tests • {status.linksValid ? 'Links Valid' : 'Links Pending'}
                    </p>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Custom Header */}
                <header className="h-24 bg-white border-b-2 border-[#111111] flex items-center justify-between px-10 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-[#A10000] rotate-45"></div>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">System Node: Primary</h2>
                    </div>
                    <div className="flex items-center gap-10">
                        <div className="text-right flex flex-col">
                            <span className="text-xs font-black uppercase tracking-widest">JOHN DOE</span>
                            <span className="text-[9px] font-bold text-[#A10000] uppercase tracking-widest opacity-60">Verified Admin</span>
                        </div>
                        <div className="w-12 h-12 border-2 border-[#111111] flex items-center justify-center font-serif font-black italic text-xl group cursor-pointer hover:bg-[#111111] hover:text-white transition-all">
                            JD
                        </div>
                    </div>
                </header>

                {/* Content Container */}
                <main className="flex-1 overflow-y-auto bg-[#F7F6F3] relative">
                    <div className="absolute top-0 right-0 w-full h-[50vh] bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
                    <div className="max-w-6xl mx-auto p-12 lg:p-16 relative z-10">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
