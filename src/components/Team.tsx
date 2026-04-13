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

const cofounders = [
  {
    name: 'Purav Gupta',
    role: 'Co-Founder',
    specialization: 'Bioinformatics + Molecular Genetics + CS',
    color: '#00ff88',
    initials: 'PG',
    desc: 'Leading computational biology and ML pipeline development. Bridges the gap between genomic data science and enzyme engineering.',
  },
  {
    name: 'Thomas Quigley',
    role: 'Co-Founder',
    specialization: 'Biochemistry Specialist',
    color: '#00ccff',
    initials: 'TQ',
    desc: 'Driving biochemical assay development and enzyme characterization. Expert in protein structure-function relationships.',
  },
  {
    name: 'Anthony Dinglasan',
    role: 'Co-Founder',
    specialization: 'Applied Genetics & Biotechnology + Immunology',
    color: '#8844ff',
    initials: 'AD',
    desc: 'Leading genetic engineering and expression system optimization. Specialized in scalable biotechnology applications.',
  },
];

const advisorOrgs = [
  { name: 'Vector Institute', type: 'AI Research' },
  { name: 'AWS', type: 'Cloud & Compute' },
  { name: 'RNAlab (Donnelly Centre)', type: 'Genomics' },
  { name: 'BioZone', type: 'Bioprocessing' },
  { name: 'Institut Pasteur', type: 'Microbiology' },
  { name: 'UofT Biomedical Engineering', type: 'Engineering' },
  { name: 'UofT Applied Science', type: 'Research' },
  { name: 'UofT Arts & Science', type: 'Research' },
];

const universities = [
  { name: 'University of Toronto', role: 'Primary Hub', color: '#00ff88' },
  { name: 'Western University', role: 'Satellite', color: '#00ccff' },
  { name: 'McGill University', role: 'Satellite', color: '#8844ff' },
];

export const Team = forwardRef<HTMLElement>((_props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section
      id="team"
      ref={(el) => {
        sectionRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      className="relative py-32 px-6"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-[#00ff88] text-sm font-mono tracking-widest uppercase">The Team</span>
          <h2 className="text-4xl sm:text-5xl font-black mt-4 mb-6">
            Built by <span className="text-[#00ff88]">scientists</span>,
            <br />
            <span className="text-zinc-500">powered by ambition</span>
          </h2>
        </div>

        {/* Cofounders */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {cofounders.map((person, i) => (
            <div
              key={i}
              className={`group relative p-8 rounded-2xl border border-white/5 bg-[#0a0a12]/60 backdrop-blur-sm transition-all duration-700 hover:border-opacity-40 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${i * 200}ms`,
                borderColor: `${person.color}10`,
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${person.color}08, transparent 70%)` }}
              />
              <div className="relative z-10">
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black mb-5"
                  style={{ background: `${person.color}15`, color: person.color }}
                >
                  {person.initials}
                </div>
                <h3 className="text-xl font-bold text-white">{person.name}</h3>
                <div className="text-sm font-semibold mt-1" style={{ color: person.color }}>{person.role}</div>
                <div className="text-xs text-zinc-500 font-mono mt-1 mb-4">{person.specialization}</div>
                <p className="text-sm text-zinc-400 leading-relaxed">{person.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* R&D team + Universities */}
        <div className={`grid md:grid-cols-2 gap-6 mb-16 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 rounded-2xl border border-white/5 bg-[#0a0a12]/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center">
                <span className="text-[#00ff88] text-lg">🔬</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">80+ Researchers</h3>
                <p className="text-xs text-zinc-500">Research & Development Team</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {universities.map((uni, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/5 bg-white/[0.02]"
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: uni.color }} />
                  <span className="text-sm text-zinc-300">{uni.name}</span>
                  <span className="text-xs text-zinc-600">({uni.role})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-2xl border border-white/5 bg-[#0a0a12]/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#ffaa00]/10 flex items-center justify-center">
                <span className="text-[#ffaa00] text-lg">🧠</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">20+ Advisors</h3>
                <p className="text-xs text-zinc-500">World-Class Advisory Network</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {advisorOrgs.map((org, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-zinc-400"
                >
                  <span className="text-zinc-300 font-medium">{org.name}</span>
                  <span className="text-zinc-600 ml-1">· {org.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Team.displayName = 'Team';
