"use client";

import { useEffect, useState } from 'react';

interface ServiceIntroModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ServiceIntroModal({ isOpen, onClose }: ServiceIntroModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-tertiary">About SSALWorks</h2>
                        <p className="text-sm text-slate-500">Everyone Can Be a Builder</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    {/* 1. Etymology */}
                    <section>
                        <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                            <span className="text-2xl">🌾</span> What is "SSAL"?
                        </h3>
                        <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100 text-slate-700 space-y-2">
                            <p>
                                <strong>SSAL (쌀)</strong> means "Rice" in Korean. Just as rice is the staple food that fuels life,
                                SSALWorks aims to be the essential foundation for your digital creations.
                            </p>
                            <div className="my-3 border-t border-emerald-200/50"></div>
                            <p className="text-sm">
                                It also represents the coordinate system <strong>(Sunny + SAL)</strong>.
                                Like a 3D grid that defines space, we provide the structure where your ideas take shape.
                            </p>
                        </div>
                    </section>

                    {/* 2. Philosophy */}
                    <section>
                        <h3 className="text-lg font-bold text-secondary mb-3 flex items-center gap-2">
                            <span className="text-2xl">💪</span> Muscle Memory Outsourcing
                        </h3>
                        <div className="prose prose-slate text-slate-600">
                            <p>
                                Learning to code requires building "muscle memory" for syntax, shortcuts, and tools.
                                This is a huge barrier for founders.
                            </p>
                            <p className="mt-2">
                                <strong>We outsource that muscle memory to AI.</strong>
                            </p>
                            <p className="mt-2">
                                You focus on <em>"What to Build"</em> (Value & Logic).<br />
                                AI handles <em>"How to Build"</em> (Syntax & Implementation).
                            </p>
                        </div>
                    </section>

                    {/* 3. Vision */}
                    <section>
                        <h3 className="text-lg font-bold text-tertiary mb-3 flex items-center gap-2">
                            <span className="text-2xl">🚀</span> Beyond Building
                        </h3>
                        <p className="text-slate-600">
                            SSALWorks is not just a tool; it's your <strong>Running Mate</strong>.
                            Founded by a CPA & Accelerator, we support your journey from the first line of code
                            to your first investment.
                        </p>
                        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                            <div className="p-3 bg-slate-50 rounded-lg">
                                <div className="font-bold text-primary">Build</div>
                                <div className="text-xs text-slate-500">AI-Powered</div>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg">
                                <div className="font-bold text-secondary">Grow</div>
                                <div className="text-xs text-slate-500">Mentoring</div>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg">
                                <div className="font-bold text-tertiary">Scale</div>
                                <div className="text-xs text-slate-500">Investment</div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors shadow-sm"
                    >
                        Let's Build
                    </button>
                </div>
            </div>
        </div>
    );
}
