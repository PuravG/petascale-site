import { forwardRef, useEffect, useRef, useState } from 'react';

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

const pipeline = [
  {
    step: '01',
    title: 'Planetary-Scale Discovery',
    subtitle: 'LOGAN Index',
    desc: '27M+ public DNA datasets compressed into a searchable index. 1.12 billion candidate enzyme sequences identified across 215.7 million unique families.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="20" strokeDasharray="4 3" className="text-[#00ff88]/40" />
        <circle cx="24" cy="24" r="12" className="text-[#00ff88]" />
        <circle cx="24" cy="24" r="4" fill="#00ff88" stroke="none" />
        <line x1="24" y1="4" x2="24" y2="12" className="text-[#00ff88]/60" />
        <line x1="24" y1="36" x2="24" y2="44" className="text-[#00ff88]/60" />
        <line x1="4" y1="24" x2="12" y2="24" className="text-[#00ff88]/60" />
        <line x1="36" y1="24" x2="44" y2="24" className="text-[#00ff88]/60" />
      </svg>
    ),
    color: '#00ff88',
  },
  {
    step: '02',
    title: 'AI-Guided Design',
    subtitle: 'Machine Learning Models',
    desc: 'ML models navigate the vast sequence–function landscape to identify high-potential enzyme variants. Model-guided selection, activity prediction, and large-scale sequence labeling.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="8" width="32" height="32" rx="4" className="text-[#00ccff]/40" />
        <path d="M16 32 L22 20 L28 26 L34 14" className="text-[#00ccff]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="32" r="2" fill="#00ccff" stroke="none" />
        <circle cx="22" cy="20" r="2" fill="#00ccff" stroke="none" />
        <circle cx="28" cy="26" r="2" fill="#00ccff" stroke="none" />
        <circle cx="34" cy="14" r="2" fill="#00ccff" stroke="none" />
      </svg>
    ),
    color: '#00ccff',
  },
  {
    step: '03',
    title: 'High-Throughput Validation',
    subtitle: 'Wet-Lab Pipeline',
    desc: 'Scalable 96-well bioreactors with Nile Red fluorescence assays quantify plastic breakdown. Automated data feeds back into ML models — a closed computational-experimental loop.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 8 L18 20 L10 36 Q8 40 12 42 L36 42 Q40 40 38 36 L30 20 L30 8" className="text-[#8844ff]" />
        <line x1="14" y1="8" x2="34" y2="8" className="text-[#8844ff]" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 30 Q24 24 34 30" className="text-[#8844ff]/60" strokeDasharray="2 2" />
        <ellipse cx="24" cy="34" rx="8" ry="3" fill="#8844ff" fillOpacity="0.2" stroke="none" />
      </svg>
    ),
    color: '#8844ff',
  },
  {
    step: '04',
    title: 'Deployable Hardware',
    subtitle: 'Real-World Integration',
    desc: 'Modular treatment units and filtration systems that integrate engineered enzymes into wastewater plants, landfills, and freshwater systems for real-world microplastic degradation.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="10" y="12" width="28" height="24" rx="3" className="text-[#ffaa00]" />
        <line x1="10" y1="20" x2="38" y2="20" className="text-[#ffaa00]/60" />
        <circle cx="16" cy="16" r="1.5" fill="#ffaa00" stroke="none" />
        <circle cx="21" cy="16" r="1.5" fill="#ffaa00" stroke="none" />
        <circle cx="26" cy="16" r="1.5" fill="#ffaa00" stroke="none" />
        <path d="M16 28 L20 24 L26 30 L32 26" className="text-[#ffaa00]" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="8" x2="24" y2="12" className="text-[#ffaa00]/60" />
        <line x1="20" y1="36" x2="20" y2="40" className="text-[#ffaa00]/60" />
        <line x1="28" y1="36" x2="28" y2="40" className="text-[#ffaa00]/60" />
      </svg>
    ),
    color: '#ffaa00',
  },
];

const environments = [
  { name: 'Wastewater Plants', emoji: '🏭' },
  { name: 'Landfills', emoji: '🗑️' },
  { name: 'Marine Systems', emoji: '🌊' },
  { name: 'Industrial Recycling', emoji: '♻️' },
  { name: 'Freshwater', emoji: '💧' },
  { name: 'Soil Remediation', emoji: '🌱' },
];

export const Technology = forwardRef<HTMLElement>((_props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section
      id="technology"
      ref={(el) => {
        sectionRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      className="relative py-32 px-6"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ccff]/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00ff88]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-[#00ccff] text-sm font-mono tracking-widest uppercase">Our Platform</span>
          <h2 className="text-4xl sm:text-5xl font-black mt-4 mb-6">
            Full-stack <span className="bg-gradient-to-r from-[#00ff88] to-[#00ccff] bg-clip-text text-transparent">biodegradation</span>
            <br />
            <span className="text-zinc-500">from sequence to deployment</span>
          </h2>
        </div>

        {/* Pipeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-24 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-gradient-to-r from-[#00ff88]/30 via-[#00ccff]/30 via-[#8844ff]/30 to-[#ffaa00]/30" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pipeline.map((step, i) => (
              <div
                key={i}
                className={`group relative p-6 rounded-2xl border border-white/5 bg-[#0a0a12]/80 backdrop-blur-sm transition-all duration-700 hover:border-opacity-40 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${i * 200}ms`,
                  borderColor: `${step.color}10`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${step.color}10, transparent 70%)` }}
                />

                {/* Step number */}
                <div
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                  style={{ background: step.color, color: '#040608' }}
                >
                  {step.step}
                </div>

                <div className="relative z-10">
                  {step.icon}
                  <h3 className="text-lg font-bold mt-4 mb-1" style={{ color: step.color }}>
                    {step.title}
                  </h3>
                  <div className="text-xs font-mono text-zinc-500 mb-3">{step.subtitle}</div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>

                {/* Arrow connector (between cards on large screens) */}
                {i < 3 && (
                  <div className="hidden lg:flex absolute -right-3 top-24 z-20">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke={step.color} strokeWidth="2">
                        <path d="M5 12h14m-7-7l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Environment targets */}
        <div className={`mt-20 transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-8">
            <span className="text-sm text-zinc-500 font-medium">Engineered for real-world environments</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {environments.map((env, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.02] hover:border-[#00ff88]/20 hover:bg-[#00ff88]/5 transition-all duration-300 cursor-default"
              >
                <span>{env.emoji}</span>
                <span className="text-sm text-zinc-300">{env.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Technology.displayName = 'Technology';
