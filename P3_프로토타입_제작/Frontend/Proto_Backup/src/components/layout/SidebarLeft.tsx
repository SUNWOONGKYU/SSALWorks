export default function SidebarLeft() {
    return (
        <aside className="col-start-1 row-start-2 bg-white border-r border-slate-200 flex flex-col h-full overflow-y-auto">
            {/* User Profile */}
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary-dark font-bold">
                    S
                </div>
                <div>
                    <div className="text-sm font-bold text-tertiary">Sunny Kim</div>
                    <div className="text-xs text-slate-500">Free Plan</div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-6">
                <div>
                    <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Workspace
                    </div>
                    <ul className="space-y-1">
                        <li>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-primary-dark bg-primary-light/50 rounded-md border-l-4 border-primary">
                                <span>🏠</span> Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-md transition-colors">
                                <span>📂</span> Projects
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-md transition-colors">
                                <span>📅</span> Calendar
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Growth
                    </div>
                    <ul className="space-y-1">
                        <li>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-md transition-colors">
                                <span>📚</span> Books (Learning)
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-md transition-colors">
                                <span>💎</span> Marketplace
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-md transition-colors">
                                <span>🤝</span> Mentoring
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-100">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-tertiary text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                    <span>✨</span> New Project
                </button>
            </div>
        </aside>
    );
}
