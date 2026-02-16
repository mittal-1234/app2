import React from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const DesignSystemPage = () => {
    return (
        <div className="space-y-16">
            <div>
                <h1 className="text-4xl mb-4 font-serif font-bold italic">Design System Showcase</h1>
                <p className="text-lg opacity-60">Verification of the KodNest Premium Build System components and styles.</p>
            </div>

            <section className="space-y-6">
                <h2 className="text-xl font-bold border-b border-[#111111]/10 pb-2">Typography</h2>
                <div className="space-y-4">
                    <h1 className="text-5xl">Display Headline (H1)</h1>
                    <h2 className="text-4xl">Section Title (H2)</h2>
                    <h3 className="text-3xl">Component Title (H3)</h3>
                    <p className="max-w-[720px] text-lg leading-relaxed opacity-80">
                        Body text should be clean, readable, and well-spaced. The max-width is constrained to ensure optimal line length for reading. The font family uses Inter for high legibility at small sizes, while headings use a serif font for a premium feel.
                    </p>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-xl font-bold border-b border-[#111111]/10 pb-2">Colors</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="h-24 bg-[#F7F6F3] border border-[#111111]/10 flex items-center justify-center font-mono text-xs">Background</div>
                    <div className="h-24 bg-[#111111] text-white flex items-center justify-center font-mono text-xs">Foreground</div>
                    <div className="h-24 bg-[#8B0000] text-white flex items-center justify-center font-mono text-xs">Accent</div>
                    <div className="h-24 bg-[#2F5E3D] text-white flex items-center justify-center font-mono text-xs">Success</div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-xl font-bold border-b border-[#111111]/10 pb-2">Buttons</h2>
                <div className="flex gap-4 items-center">
                    <Button variant="primary">Primary Action</Button>
                    <Button variant="secondary">Secondary Action</Button>
                    <Button variant="ghost">Ghost Action</Button>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-xl font-bold border-b border-[#111111]/10 pb-2">Inputs</h2>
                <div className="max-w-md space-y-4">
                    <Input label="Email Address" placeholder="name@example.com" />
                    <Input label="Password" type="password" placeholder="••••••••" />
                    <Input label="Error State" placeholder="Invalid input" error="This field is required" />
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-xl font-bold border-b border-[#111111]/10 pb-2">Cards</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <h3 className="text-lg font-bold mb-2">Standard Card</h3>
                        <p className="opacity-60 text-sm">
                            Cards use a subtle border and generous padding. No drop shadows are used to maintain a flat, clean aesthetic.
                        </p>
                    </Card>
                    <Card className="bg-[#111111] text-white border-none">
                        <h3 className="text-lg font-bold mb-2 text-white">Inverted Card</h3>
                        <p className="opacity-60 text-sm text-white">
                            Dark mode cards can be used for emphasis or contrast sections.
                        </p>
                    </Card>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-xl font-bold border-b border-[#111111]/10 pb-2">Badges</h2>
                <div className="flex gap-4">
                    <Badge variant="neutral">Neutral</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                </div>
            </section>
        </div>
    );
};

export default DesignSystemPage;
