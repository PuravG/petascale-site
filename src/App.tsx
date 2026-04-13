import { useEffect, useRef, useState, useCallback } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Technology } from './components/Technology';
import { Stats } from './components/Stats';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { ParticleBackground } from './components/ParticleBackground';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  const registerSection = useCallback((id: string, el: HTMLElement | null) => {
    sectionsRef.current[id] = el;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    Object.values(sectionsRef.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#040608] text-white overflow-x-hidden">
      <ParticleBackground />
      <Navigation activeSection={activeSection} />
      <Hero ref={(el) => registerSection('hero', el)} />
      <Problem ref={(el) => registerSection('problem', el)} />
      <Technology ref={(el) => registerSection('technology', el)} />
      <Stats ref={(el) => registerSection('stats', el)} />
      <Team ref={(el) => registerSection('team', el)} />
      <Contact ref={(el) => registerSection('contact', el)} />
    </div>
  );
}

export default App;
