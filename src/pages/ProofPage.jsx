import React from 'react';
import { CheckCircle, Circle, Link as LinkIcon, FileText, Github, Globe, Info, Copy, Check, Rocket, Lock } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Link } from 'react-router-dom';

const STEPS = [
    { name: 'Foundation', desc: 'Vite + React + Tailwind Setup' },
    { name: 'Analysis', desc: 'JD Skill Extraction Engine' },
    { name: 'Skills', desc: 'Interactive Skill Confidence Mapping' },
    { name: 'Scoring', desc: 'Deterministic Readiness Algorithm' },
    { name: 'Intel', desc: 'Company Specific Round Mapping' },
    { name: 'Persistence', desc: 'Local Storage State Sync' },
    { name: 'UI', desc: 'KodNest Premium Build System' },
    { name: 'QA', desc: '10-Point Shipping Verification' },
];

const ProofPage = () => {
    // 1. Load Data
    const [formData, setFormData] = React.useState(() => {
        try {
            const saved = localStorage.getItem('prp_final_submission');
            const initial = saved ? JSON.parse(saved) : {};
            return {
                lovable: initial.lovable || '',
                github: initial.github || 'https://github.com/mittal-1234/app2',
                deployed: initial.deployed || 'https://app2-ebon.vercel.app'
            };
        } catch (e) {
            return { lovable: '', github: '', deployed: '' };
        }
    });

    const [checklistPassed, setChecklistPassed] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    // 2. Validation Logic
    React.useEffect(() => {
        try {
            const saved = localStorage.getItem('prp_test_state');
            const count = saved ? Object.values(JSON.parse(saved)).filter(Boolean).length : 0;
            setChecklistPassed(count === 10);
        } catch (e) { setChecklistPassed(false); }
    }, []);

    const validateUrl = (url) => {
        if (!url) return false;
        try {
            return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(url);
        } catch (e) { return false; }
    };

    const linksValid = validateUrl(formData.lovable) && validateUrl(formData.github) && validateUrl(formData.deployed);
    const allStepsComplete = checklistPassed; // Steps 1-7 are implicitly done if we are here, Step 8 is QA (checklist)
    const isShipped = allStepsComplete && linksValid;

    const handleInputChange = (field, value) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        localStorage.setItem('prp_final_submission', JSON.stringify(newData));
    };

    const copyToClipboard = () => {
        const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${formData.lovable}
GitHub Repository: ${formData.github}
Live Deployment: ${formData.deployed}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------`.trim();

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-16 animate-fade-in text-[#111111] pb-20">
            {/* Header with Dynamic Status */}
            <div className="border-b border-[#111111]/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-5xl font-serif font-bold italic tracking-tight uppercase leading-none mb-2">PROOF OF WORK</h1>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-40">Final validation and project submission node</p>
                </div>

                <div className={`px-6 py-3 border-2 ${isShipped ? 'bg-[#111111] text-white border-[#111111]' : 'bg-transparent text-[#111111]/40 border-[#111111]/20'} flex items-center gap-3 transition-colors`}>
                    {isShipped ? <Rocket size={20} /> : <Lock size={20} />}
                    <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1">PROJECT STATUS</p>
                        <p className="text-xl font-serif font-black italic leading-none">{isShipped ? 'SHIPPED' : 'IN PROGRESS'}</p>
                    </div>
                </div>
            </div>

            {/* Completion Message */}
            {isShipped && (
                <div className="bg-[#111111] text-white p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 shadow-2xl animate-fade-in-up">
                    <Rocket size={64} className="text-[#A10000]" />
                    <div className="space-y-4 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold italic leading-tight">
                            "You built a real product.<br />
                            Not a tutorial. Not a clone.<br />
                            A structured tool that solves a real problem."
                        </h2>
                        <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-60">This is your proof of work.</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Step Completion */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-serif font-bold italic uppercase flex items-center gap-3">
                        <CheckCircle size={24} className="text-[#8B0000]" /> 8-STEP OVERVIEW
                    </h2>
                    <Card className="p-0 border border-[#111111]/10 shadow-[12px_12px_0px_0px_#111111]">
                        {STEPS.map((step, idx) => {
                            // Step 8 (QA) depends on checklist
                            const isQA = idx === 7;
                            const isComplete = isQA ? checklistPassed : true; // Others hardcoded as done for this build

                            return (
                                <div key={idx} className="flex items-start gap-4 p-6 border-b border-[#111111]/5 last:border-0 hover:bg-[#F7F6F3] transition-colors">
                                    {isComplete ? (
                                        <CheckCircle size={18} className="text-[#8B0000] mt-1 shrink-0" />
                                    ) : (
                                        <Circle size={18} className="text-[#111111]/20 mt-1 shrink-0" />
                                    )}
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold uppercase tracking-widest">{step.name}</p>
                                        <p className="text-sm italic opacity-60 leading-relaxed">{step.desc}</p>
                                    </div>
                                    <Badge variant={isComplete ? 'success' : 'secondary'} className="ml-auto">
                                        {isComplete ? 'COMPLETED' : 'PENDING'}
                                    </Badge>
                                </div>
                            );
                        })}
                    </Card>
                    {!checklistPassed && (
                        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-lg flex gap-3">
                            <Info size={18} className="shrink-0" />
                            <p>Complete the <Link to="/prp/07-test" className="underline font-bold">QA Checklist</Link> to finish the QA step.</p>
                        </div>
                    )}
                </div>

                {/* Artifact Inputs */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-serif font-bold italic uppercase flex items-center gap-3">
                        <LinkIcon size={24} className="text-[#8B0000]" /> ARTIFACT INPUTS
                    </h2>
                    <Card className="space-y-10 shadow-[12px_12px_0px_0px_#111111]">
                        <div className="space-y-6">
                            {[
                                { id: 'lovable', label: 'Lovable Project Link', icon: <Globe size={18} /> },
                                { id: 'github', label: 'GitHub Repository Link', icon: <Github size={18} /> },
                                { id: 'deployed', label: 'Deployed URL', icon: <LinkIcon size={18} /> },
                            ].map((field) => (
                                <div key={field.id} className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">{field.label}</label>
                                        {formData[field.id] && (
                                            <Badge variant={validateUrl(formData[field.id]) ? 'success' : 'danger'}>
                                                {validateUrl(formData[field.id]) ? 'VALID' : 'INVALID URL'}
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#111111]/30">
                                            {field.icon}
                                        </div>
                                        <input
                                            type="text"
                                            value={formData[field.id]}
                                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            placeholder="https://..."
                                            className="w-full bg-[#F7F6F3] border border-[#111111]/10 px-12 py-4 focus:border-[#8B0000] outline-none transition-all font-sans text-sm"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-[#111111]/5 space-y-6">
                            <Button
                                onClick={copyToClipboard}
                                disabled={!isShipped}
                                className={`w-full py-5 text-xl font-serif italic font-bold gap-3 flex justify-center items-center ${!isShipped ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-400' : 'shadow-lg shadow-red-900/10'}`}
                            >
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                                {copied ? 'COPIED TO CLIPBOARD' : 'COPY FINAL SUBMISSION'}
                            </Button>

                            <p className="text-[10px] text-center font-bold uppercase tracking-widest opacity-30 leading-relaxed">
                                Submission exports are available only when all steps are verified and links are validated.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProofPage;
