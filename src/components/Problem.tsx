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

function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
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
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const facts = [
  {
    icon: '🌊',
    stat: <AnimatedCounter end={14} />,
    unit: 'million tons',
    desc: 'of plastic enter oceans every year',
    color: '#00ccff',
  },
  {
    icon: '🧬',
    stat: <AnimatedCounter end={83} suffix="%" />,
    unit: 'contaminated',
    desc: 'of tap water worldwide contains microplastics',
    color: '#00ff88',
  },
  {
    icon: '💀',
    stat: <AnimatedCounter end={5} />,
    unit: 'grams/week',
    desc: 'of microplastic ingested per person — a credit card\'s worth',
    color: '#ff4466',
  },
  {
    icon: '⚠️',
    stat: '0',
    unit: 'solutions',
    desc: 'exist today to remove microplastics before they reach the human body',
    color: '#ffaa00',
  },
];

export const Problem = forwardRef<HTMLElement>((_props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section
      id="problem"
      ref={(el) => {
        sectionRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      className="relative py-32 px-6"
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff4466]/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-[#ff4466] text-sm font-mono tracking-widest uppercase">The Crisis</span>
          <h2 className="text-4xl sm:text-5xl font-black mt-4 mb-6">
            Plastic is <span className="text-[#ff4466]">everywhere.</span>
            <br />
            <span className="text-zinc-500">In every ecosystem. In every body.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Microplastics contaminate every ecosystem on Earth — accumulating in human brains,
            placentas, and arteries. Current technology cannot remove them at scale.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((fact, i) => (
            <div
              key={i}
              className={`group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-[${fact.color}]/20 transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${fact.color}08, transparent 70%)` }}
              />
              <span className="text-3xl">{fact.icon}</span>
              <div className="mt-4 text-4xl font-black" style={{ color: fact.color }}>
                {fact.stat}
              </div>
              <div className="text-sm text-zinc-500 mt-1 font-medium">{fact.unit}</div>
              <p className="text-zinc-400 mt-3 text-sm leading-relaxed">{fact.desc}</p>
            </div>
          ))}
        </div>

        {/* Divider transition */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-4">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#00ff88]/40" />
            <span className="text-[#00ff88] text-sm font-mono tracking-widest">THE SOLUTION</span>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#00ff88]/40" />
          </div>
        </div>
      </div>
    </section>
  );
});

Problem.displayName = 'Problem';
