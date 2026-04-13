import { useEffect, useRef } from 'react';

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; color: string; alpha: number }[] = [];

    const colors = ['#00ff88', '#00ccff', '#8844ff', '#00ff88'];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = document.documentElement.scrollHeight;
    }

    function initParticles() {
      particles = [];
      const count = Math.floor((canvas!.width * canvas!.height) / 18000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.1,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.alpha;
        ctx!.fill();
      }

      // Draw connections
      ctx!.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx!.beginPath();
            ctx!.strokeStyle = particles[i].color;
            ctx!.globalAlpha = (1 - dist / 100) * 0.08;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      ctx!.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      initParticles();
    });
    resizeObserver.observe(document.body);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
