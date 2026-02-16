import React from 'react';
import { CheckCircle, Circle, Link as LinkIcon, FileText, Github, Globe, Info, Copy, Check } from 'lucide-react';

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
            return {
                lovable: '',
                github: 'https://github.com/mittal-1234/app2',
                deployed: 'https://app2-ebon.vercel.app'
            };
        }
    });

    const [copied, setCopied] = React.useState(false);

    const validateUrl = (url) => {
        try {
            return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(url);
        } catch (e) { return false; }
    };

    const isValid = validateUrl(formData.lovable) && validateUrl(formData.github) && validateUrl(formData.deployed);

    const handleInputChange = (field, value) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        localStorage.setItem('prp_final_submission', JSON.stringify(newData));
        // Trigger layout update
        window.dispatchEvent(new CustomEvent('prp_state_update'));
    };

    const copyToClipboard = () => {
        const text = `
------------------------------------------
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
------------------------------------------
`.trim();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-16 animate-fade-in pb-24 text-[#111111]">
            <div className="border-b-2 border-[#111111] pb-10">
                <h1 className="text-5xl font-serif font-black italic tracking-tighter uppercase leading-none">PROOF OF WORK</h1>
                <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-40 mt-2">Final validation and project submission node</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Step Completion */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-serif font-black italic uppercase italic flex items-center gap-3">
                        <CheckCircle size={24} className="text-[#A10000]" /> 8-STEP OVERVIEW
                    </h2>
                    <div className="bg-white border-2 border-[#111111] p-10 space-y-6 shadow-[12px_12px_0px_0px_#111111]">
                        {STEPS.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 border-b border-[#111111]/5 last:border-0 hover:bg-[#F7F6F3] transition-colors">
                                <CheckCircle size={18} className="text-[#A10000] mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest">{step.name}</p>
                                    <p className="text-sm italic opacity-50">{step.desc}</p>
                                </div>
                                <span className="ml-auto text-[8px] font-black uppercase text-green-600 bg-green-50 px-2 py-1">COMPLETED</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Artifact Inputs */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-serif font-black italic uppercase italic flex items-center gap-3">
                        <LinkIcon size={24} className="text-[#A10000]" /> ARTIFACT INPUTS
                    </h2>
                    <div className="bg-white border-2 border-[#111111] p-10 space-y-10 shadow-[12px_12px_0px_0px_#111111]">
                        <div className="space-y-6">
                            {[
                                { id: 'lovable', label: 'Lovable Project Link', icon: <Globe size={18} /> },
                                { id: 'github', label: 'GitHub Repository Link', icon: <Github size={18} /> },
                                { id: 'deployed', label: 'Deployed URL', icon: <LinkIcon size={18} /> },
                            ].map((field) => (
                                <div key={field.id} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">{field.label}</label>
                                        {formData[field.id] && (
                                            <span className={`text-[8px] font-black uppercase ${validateUrl(formData[field.id]) ? 'text-green-600' : 'text-[#A10000]'}`}>
                                                {validateUrl(formData[field.id]) ? 'VALID' : 'INVALID URL'}
                                            </span>
                                        )}
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#111111]/20">
                                            {field.icon}
                                        </div>
                                        <input
                                            type="text"
                                            value={formData[field.id]}
                                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            placeholder="https://..."
                                            className="w-full bg-[#F7F6F3] border-2 border-[#111111]/10 px-12 py-4 focus:border-[#A10000] outline-none transition-all font-sans text-sm"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-[#111111]/5 space-y-6">
                            <button
                                onClick={copyToClipboard}
                                disabled={!isValid}
                                className={`w-full py-5 font-serif italic text-xl font-black flex items-center justify-center gap-3 transition-all ${!isValid
                                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed border-2 border-dashed border-gray-200'
                                    : 'bg-[#111111] text-white hover:bg-[#A10000]'
                                    }`}
                            >
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                                {copied ? 'COPIED TO CLIPBOARD' : 'COPY FINAL SUBMISSION'}
                            </button>
                            <p className="text-[9px] text-center font-bold uppercase tracking-widest opacity-30 leading-relaxed">
                                Submission exports are available only when all links are validated.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProofPage;
