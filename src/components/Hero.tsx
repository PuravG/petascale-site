import { forwardRef, useEffect, useRef, useState } from 'react';

export const Hero = forwardRef<HTMLElement>((_props, ref) => {
  const [visible, setVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Animated enzyme/molecule visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 500;
    canvas.height = 500;

    let frame = 0;
    let animId: number;

    const nodes: { x: number; y: number; r: number; angle: number; speed: number; orbit: number; color: string }[] = [];
    const center = { x: 250, y: 250 };

    // Create orbital nodes representing amino acids
    for (let i = 0; i < 40; i++) {
      const orbit = 60 + Math.random() * 140;
      nodes.push({
        x: 0, y: 0,
        r: 3 + Math.random() * 5,
        angle: Math.random() * Math.PI * 2,
        speed: (0.003 + Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : -1),
        orbit,
        color: orbit < 100 ? '#00ff88' : orbit < 150 ? '#00ccff' : '#8844ff',
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, 500, 500);
      frame++;

      // Central glow
      const grad = ctx!.createRadialGradient(center.x, center.y, 0, center.x, center.y, 80);
      grad.addColorStop(0, 'rgba(0, 255, 136, 0.3)');
      grad.addColorStop(0.5, 'rgba(0, 204, 255, 0.1)');
      grad.addColorStop(1, 'transparent');
      ctx!.fillStyle = grad;
      ctx!.fillRect(0, 0, 500, 500);

      // Orbital rings
      for (const ring of [80, 120, 160, 200]) {
        ctx!.beginPath();
        ctx!.arc(center.x, center.y, ring, 0, Math.PI * 2);
        ctx!.strokeStyle = 'rgba(0, 255, 136, 0.06)';
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // Update and draw nodes
      for (const node of nodes) {
        node.angle += node.speed;
        node.x = center.x + Math.cos(node.angle) * node.orbit;
        node.y = center.y + Math.sin(node.angle) * (node.orbit * 0.85);

        // Glow
        const glow = ctx!.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 3);
        glow.addColorStop(0, node.color);
        glow.addColorStop(1, 'transparent');
        ctx!.fillStyle = glow;
        ctx!.globalAlpha = 0.4;
        ctx!.fillRect(node.x - node.r * 3, node.y - node.r * 3, node.r * 6, node.r * 6);

        // Node
        ctx!.globalAlpha = 0.9;
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx!.fillStyle = node.color;
        ctx!.fill();
      }

      // Connections between nearby nodes
      ctx!.globalAlpha = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.strokeStyle = nodes[i].color;
            ctx!.globalAlpha = (1 - dist / 60) * 0.3;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      // Central core
      ctx!.globalAlpha = 1;
      const pulse = Math.sin(frame * 0.03) * 5 + 20;
      const coreGrad = ctx!.createRadialGradient(center.x, center.y, 0, center.x, center.y, pulse);
      coreGrad.addColorStop(0, 'rgba(0, 255, 136, 0.8)');
      coreGrad.addColorStop(0.6, 'rgba(0, 204, 255, 0.3)');
      coreGrad.addColorStop(1, 'transparent');
      ctx!.beginPath();
      ctx!.arc(center.x, center.y, pulse, 0, Math.PI * 2);
      ctx!.fillStyle = coreGrad;
      ctx!.fill();

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00ff88]/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#040608] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00ff88]/20 bg-[#00ff88]/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[#00ff88] text-sm font-medium tracking-wide">AI-Powered Enzyme Engineering</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6">
            <span className="block text-white">Engineering</span>
            <span className="block bg-gradient-to-r from-[#00ff88] via-[#00ccff] to-[#8844ff] bg-clip-text text-transparent">
              enzymes
            </span>
            <span className="block text-white">that eat plastic</span>
          </h1>

          <p className="text-lg text-zinc-400 max-w-lg mb-8 leading-relaxed">
            PetaScale combines planetary-scale genomic data with AI-driven design to create PET-degrading enzymes
            built for real-world environments — from wastewater plants to open oceans.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://petadex.net"
              target="_blank"
              rel="noopener"
              className="group relative px-8 py-3.5 rounded-lg font-semibold text-[#040608] bg-gradient-to-r from-[#00ff88] to-[#00ccff] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,136,0.3)]"
            >
              <span className="relative z-10">Explore PetaDex</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </a>
            <button
              onClick={() => document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 rounded-lg font-semibold border border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/10 transition-all duration-300"
            >
              Our Platform →
            </button>
          </div>

          {/* Metrics ticker */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-white/5">
            <div>
              <div className="text-2xl font-black text-[#00ff88]">215.7M</div>
              <div className="text-xs text-zinc-500 mt-1">Enzyme Families</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#00ccff]">1.12B</div>
              <div className="text-xs text-zinc-500 mt-1">Candidate Sequences</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#8844ff]">100K×</div>
              <div className="text-xs text-zinc-500 mt-1">Landscape Expansion</div>
            </div>
          </div>
        </div>

        {/* Right: Animated enzyme visualization */}
        <div className={`flex items-center justify-center transition-all duration-1000 delay-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="relative">
            <canvas ref={canvasRef} width={500} height={500} className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040608] via-transparent to-[#040608] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#040608] via-transparent to-[#040608] pointer-events-none opacity-50" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-zinc-500">Scroll</span>
        <div className="w-5 h-8 border border-zinc-600 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#00ff88] rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
