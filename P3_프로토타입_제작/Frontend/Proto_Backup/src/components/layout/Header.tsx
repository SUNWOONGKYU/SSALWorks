import Link from 'next/link';

export default function Header() {
  return (
    <header className="col-span-3 row-start-1 bg-gradient-to-r from-primary to-primary-dark text-white flex items-center justify-between px-8 shadow-md z-50 relative h-[70px]">
      {/* Logo Area */}
      <div className="flex items-center gap-3 font-sans">
        <div className="flex items-center gap-1 -rotate-12">
          <div className="w-2 h-3.5 bg-white/90 rounded-full shadow-sm -rotate-6"></div>
          <div className="w-2 h-3.5 bg-white/90 rounded-full shadow-sm rotate-6 mt-0.5"></div>
          <div className="w-2 h-3.5 bg-white/90 rounded-full shadow-sm -rotate-3 -mt-0.5"></div>
        </div>
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          SSALWorks
        </Link>
      </div>

      {/* Center Tagline */}
      <div className="hidden md:flex flex-1 justify-center">
        <span className="text-sm font-semibold opacity-90 tracking-wide">
          Everyone Can Be a Builder
        </span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-white/15 border border-white/30 rounded-md text-sm font-medium hover:bg-white/25 transition-colors">
          My Projects
        </button>
        <button className="w-9 h-9 flex items-center justify-center bg-white/15 rounded-full hover:bg-white/25 transition-colors relative">
          <span className="text-lg">🔔</span>
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-danger border-2 border-primary rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
