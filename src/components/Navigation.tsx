import { useState, useEffect } from 'react';

const links = [
  { id: 'hero', label: 'Home' },
  { id: 'problem', label: 'Problem' },
  { id: 'technology', label: 'Platform' },
  { id: 'stats', label: 'Scale' },
  { id: 'team', label: 'Team' },
  { id: 'contact', label: 'Contact' },
];

export function Navigation({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#040608]/90 backdrop-blur-xl border-b border-[#00ff88]/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00ccff] flex items-center justify-center">
              <span className="text-[#040608] font-black text-sm tracking-tighter">P</span>
            </div>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00ccff] blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Peta<span className="text-[#00ff88]">Scale</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                activeSection === link.id
                  ? 'text-[#00ff88]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {activeSection === link.id && (
                <div className="absolute inset-0 bg-[#00ff88]/10 rounded-full border border-[#00ff88]/20" />
              )}
              <span className="relative">{link.label}</span>
            </button>
          ))}
          <a
            href="https://petadex.net"
            target="_blank"
            rel="noopener"
            className="ml-3 px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-[#00ff88] to-[#00ccff] text-[#040608] hover:shadow-[0_0_24px_rgba(0,255,136,0.4)] transition-all duration-300"
          >
            PetaDex →
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`w-6 h-0.5 bg-[#00ff88] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-[#00ff88] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-[#00ff88] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#040608]/95 backdrop-blur-xl border-t border-[#00ff88]/10 p-6 flex flex-col gap-3">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-left text-lg font-medium py-2 ${
                activeSection === link.id ? 'text-[#00ff88]' : 'text-zinc-400'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
