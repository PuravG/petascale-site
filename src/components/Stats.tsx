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

function CountUp({ end, decimals = 0, suffix = '', duration = 2500 }: { end: number; decimals?: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setVal(eased * end);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}

const stats = [
  {
    value: <CountUp end={215.7} decimals={1} suffix="M" />,
    label: 'Enzyme Families Discovered',
    detail: 'Expanding the known PETase landscape by 100,000×',
    color: '#00ff88',
    glow: 'from-[#00ff88]/20',
  },
  {
    value: <CountUp end={1.12} decimals={2} suffix="B" />,
    label: 'Candidate Sequences',
    detail: 'Mined from 27M+ public DNA sequencing datasets',
    color: '#00ccff',
    glow: 'from-[#00ccff]/20',
  },
  {
    value: <CountUp end={80} suffix="+" />,
    label: 'Research Team',
    detail: 'Across University of Toronto, Western, and McGill',
    color: '#8844ff',
    glow: 'from-[#8844ff]/20',
  },
  {
    value: <CountUp end={20} suffix="+" />,
    label: 'Expert Advisors',
    detail: 'Vector Institute, AWS, BioZone, Institut Pasteur',
    color: '#ffaa00',
    glow: 'from-[#ffaa00]/20',
  },
];

const comparisons = [
  { label: 'Known PETases (Before)', value: '~2,000', width: '1%', color: '#ff4466' },
  { label: 'PetaScale Discovery', value: '215.7M', width: '100%', color: '#00ff88' },
];

export const Stats = forwardRef<HTMLElement>((_props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section
      id="stats"
      ref={(el) => {
        sectionRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8844ff]/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8844ff]/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00ff88]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-[#8844ff] text-sm font-mono tracking-widest uppercase">By The Numbers</span>
          <h2 className="text-4xl sm:text-5xl font-black mt-4 mb-6">
            Operating at <span className="bg-gradient-to-r from-[#00ff88] via-[#00ccff] to-[#8844ff] bg-clip-text text-transparent">planetary scale</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`relative group p-8 rounded-2xl border border-white/5 bg-[#0a0a12]/60 backdrop-blur-sm text-center transition-all duration-700 hover:scale-[1.02] ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${stat.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="text-5xl font-black mb-3" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-white font-semibold text-sm mb-2">{stat.label}</div>
                <div className="text-zinc-500 text-xs leading-relaxed">{stat.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison bar */}
        <div className={`max-w-3xl mx-auto transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-center text-lg font-bold mb-8 text-zinc-300">
            Enzyme Landscape: Before vs. After PetaScale
          </h3>
          <div className="space-y-4">
            {comparisons.map((comp, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-44 text-right text-sm text-zinc-400 shrink-0">
                  {comp.label}
                </div>
                <div className="flex-1 h-10 bg-white/5 rounded-lg overflow-hidden relative">
                  <div
                    className="h-full rounded-lg flex items-center justify-end px-3 transition-all duration-2000 ease-out"
                    style={{
                      width: inView ? comp.width : '0%',
                      background: `linear-gradient(90deg, ${comp.color}40, ${comp.color})`,
                      transitionDelay: `${800 + i * 400}ms`,
                    }}
                  >
                    <span className="text-xs font-bold text-white whitespace-nowrap drop-shadow-lg">
                      {comp.value}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-zinc-600 mt-4">
            100,000× expansion of the known PETase landscape
          </p>
        </div>
      </div>
    </section>
  );
});

Stats.displayName = 'Stats';
