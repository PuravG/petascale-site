import { forwardRef, useEffect, useRef, useState } from 'react';

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

const futureApps = [
  { title: 'Industrial Enzymes', desc: 'Beyond PET — engineering enzymes for all major plastic types', icon: '🏭' },
  { title: 'Therapeutic Enzymes', desc: 'Drug metabolism and rare disease applications', icon: '💊' },
  { title: 'Metabolic Engineering', desc: 'Biosynthesis pathway optimization', icon: '🧬' },
  { title: 'Environmental Bioremediation', desc: 'Cleaning contaminated soils and waterways', icon: '🌍' },
  { title: 'Synthetic Biology R&D', desc: 'Novel biological systems and materials', icon: '🔬' },
];

export const Contact = forwardRef<HTMLElement>((_props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section
      id="contact"
      ref={(el) => {
        sectionRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      className="relative py-32 px-6"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffaa00]/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#00ff88]/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Future applications */}
        <div className={`mb-24 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <span className="text-[#ffaa00] text-sm font-mono tracking-widest uppercase">Beyond PET</span>
            <h2 className="text-4xl sm:text-5xl font-black mt-4">
              A platform for <span className="text-[#ffaa00]">any enzyme</span>
            </h2>
            <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
              The same workflow — planetary-scale mining, AI design, high-throughput testing — applies far beyond PETases.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {futureApps.map((app, i) => (
              <div
                key={i}
                className={`group p-5 rounded-xl border border-white/5 bg-[#0a0a12]/60 hover:border-[#ffaa00]/20 hover:bg-[#ffaa00]/[0.03] transition-all duration-500 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="text-2xl">{app.icon}</span>
                <h3 className="text-sm font-bold text-white mt-3 mb-1">{app.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative max-w-3xl mx-auto p-12 rounded-3xl border border-[#00ff88]/10 bg-gradient-to-b from-[#00ff88]/[0.03] to-transparent overflow-hidden">
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-3xl opacity-50">
              <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-[#00ff88]/40 to-transparent" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Ready to <span className="bg-gradient-to-r from-[#00ff88] to-[#00ccff] bg-clip-text text-transparent">end plastic pollution?</span>
            </h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
              Whether you're a wastewater facility, recycling partner, investor, or researcher — we'd love to hear from you.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:guptapurav@gmail.com"
                className="group relative px-8 py-3.5 rounded-lg font-semibold text-[#040608] bg-gradient-to-r from-[#00ff88] to-[#00ccff] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,136,0.3)]"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </a>
              <a
                href="https://petadex.net"
                target="_blank"
                rel="noopener"
                className="px-8 py-3.5 rounded-lg font-semibold border border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/10 transition-all duration-300"
              >
                Explore PetaDex →
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#00ff88] to-[#00ccff] flex items-center justify-center">
              <span className="text-[#040608] font-black text-[10px]">P</span>
            </div>
            <span className="text-sm font-semibold">
              Peta<span className="text-[#00ff88]">Scale</span>
            </span>
          </div>
          <div className="text-xs text-zinc-600">
            Toronto, ON · <a href="https://petadex.net" target="_blank" rel="noopener" className="text-zinc-500 hover:text-[#00ff88] transition-colors">petadex.net</a>
          </div>
          <div className="text-xs text-zinc-600">
            © {new Date().getFullYear()} PetaScale. Engineering enzymes that eat plastic.
          </div>
        </footer>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
