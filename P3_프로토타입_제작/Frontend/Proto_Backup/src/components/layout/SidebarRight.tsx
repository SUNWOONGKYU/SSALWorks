export default function SidebarRight() {
    return (
        <aside className="col-start-3 row-start-2 bg-white border-l border-slate-200 flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-tertiary">Knowledge & Tools</h3>
                <button className="text-slate-400 hover:text-slate-600">
                    <span className="sr-only">Settings</span>
                    ⚙️
                </button>
            </div>

            {/* AI Tools */}
            <div className="p-4 border-b border-slate-100">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    AI Assistants
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 hover:border-primary hover:bg-primary-light/20 transition-all group">
                        <span className="text-xl mb-1 group-hover:scale-110 transition-transform">🤖</span>
                        <span className="text-xs font-medium text-slate-600">ChatGPT</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 hover:border-primary hover:bg-primary-light/20 transition-all group">
                        <span className="text-xl mb-1 group-hover:scale-110 transition-transform">🧠</span>
                        <span className="text-xs font-medium text-slate-600">Claude</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 hover:border-primary hover:bg-primary-light/20 transition-all group">
                        <span className="text-xl mb-1 group-hover:scale-110 transition-transform">✨</span>
                        <span className="text-xs font-medium text-slate-600">Gemini</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 hover:border-primary hover:bg-primary-light/20 transition-all group">
                        <span className="text-xl mb-1 group-hover:scale-110 transition-transform">🔍</span>
                        <span className="text-xs font-medium text-slate-600">Search</span>
                    </button>
                </div>
            </div>

            {/* Quick Knowledge */}
            <div className="flex-1 p-4">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Quick Knowledge
                </div>
                <div className="space-y-3">
                    <div className="p-3 bg-slate-50 rounded-md border border-slate-100 hover:border-secondary hover:shadow-sm transition-all cursor-pointer">
                        <div className="text-xs font-bold text-secondary-dark mb-1">TIP</div>
                        <div className="text-sm text-slate-700 line-clamp-2">
                            How to structure your first landing page for conversion.
                        </div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-md border border-slate-100 hover:border-secondary hover:shadow-sm transition-all cursor-pointer">
                        <div className="text-xs font-bold text-secondary-dark mb-1">GUIDE</div>
                        <div className="text-sm text-slate-700 line-clamp-2">
                            Connecting Supabase to your Next.js project.
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
