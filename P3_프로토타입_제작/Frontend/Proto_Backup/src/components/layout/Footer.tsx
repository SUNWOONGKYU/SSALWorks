"use client";

import Link from 'next/link';
import { useUI } from '@/context/UIContext';

export default function Footer() {
    const { openServiceIntro } = useUI();

    return (
        <footer className="col-span-3 row-start-3 bg-tertiary text-slate-400 text-xs py-3 px-6 flex items-center justify-between border-t border-slate-800">
            <div className="flex items-center gap-4">
                <span>&copy; 2025 SSALWorks. All rights reserved.</span>
                <span className="w-px h-3 bg-slate-700"></span>
                <button
                    onClick={openServiceIntro}
                    className="hover:text-white transition-colors"
                >
                    Service Introduction
                </button>
                <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                </Link>
            </div>

            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                <span>System Operational</span>
            </div>
        </footer>
    );
}
