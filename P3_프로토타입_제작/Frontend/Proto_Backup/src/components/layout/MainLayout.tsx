import { ReactNode } from 'react';
import Header from './Header';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import Footer from './Footer';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans grid grid-cols-[240px_1fr_280px] grid-rows-[70px_1fr_40px]">
            <Header />
            <SidebarLeft />

            {/* Main Workspace Area */}
            <main className="col-start-2 row-start-2 bg-slate-50 p-6 overflow-y-auto relative">
                <div className="max-w-5xl mx-auto h-full">
                    {children}
                </div>
            </main>

            <SidebarRight />
            <Footer />
        </div>
    );
}
