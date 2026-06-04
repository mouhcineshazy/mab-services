'use client';

import { useEffect, useRef } from 'react';

interface Particle { x: number; y: number; vx: number; vy: number; r: number; o: number }
interface Star      extends Particle { phase: number; speed: number; bright: boolean; baseO: number }

const STAR_COUNT = 260;
const NET_COUNT  = 120;
const MAX_DIST   = 145;
const NET_SPEED  = 0.28;

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let rafId: number;
    let stars: Star[]     = [];
    let nets:  Particle[] = [];

    function resize() {
      canvas!.width  = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }

    function mkStar(): Star {
      return {
        x: Math.random() * canvas!.width,  y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.06, vy: (Math.random() - 0.5) * 0.06,
        r: Math.random() * 0.9 + 0.2,     o: 0,
        baseO: Math.random() * 0.55 + 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.018 + 0.004,
        bright: Math.random() < 0.15,
      };
    }

    function mkNet(): Particle {
      return {
        x: Math.random() * canvas!.width,  y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * NET_SPEED, vy: (Math.random() - 0.5) * NET_SPEED,
        r: Math.random() * 1.6 + 1.0, o: Math.random() * 0.45 + 0.25,
      };
    }

    function init() {
      resize();
      stars = Array.from({ length: STAR_COUNT }, mkStar);
      nets  = Array.from({ length: NET_COUNT  }, mkNet);
    }

    function draw() {
      const W = canvas!.width, H = canvas!.height;
      ctx.clearRect(0, 0, W, H);

      // ── Layer 1: twinkling stars ──────────────────
      for (const s of stars) {
        s.phase += s.speed;
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = W; else if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H; else if (s.y > H) s.y = 0;
        const o = Math.max(0, s.baseO + Math.sin(s.phase) * 0.28);
        const r = s.bright ? s.r * 1.6 : s.r;
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle = s.bright ? `rgba(180,255,230,${o})` : `rgba(220,255,245,${o})`;
        ctx.fill();
      }

      // ── Layer 2: network — update ─────────────────
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      for (const p of nets) {
        if (mx !== null && my !== null) {
          const dx = p.x - mx, dy = p.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < 16900) {
            const d = Math.sqrt(d2), f = (130 - d) / 130;
            p.vx += (dx / d) * f * 0.07;
            p.vy += (dy / d) * f * 0.07;
          }
        }
        p.vx *= 0.982; p.vy *= 0.982;
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 1.1) { p.vx = p.vx / spd * 1.1; p.vy = p.vy / spd * 1.1; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;
      }

      // ── Layer 2: connections ──────────────────────
      for (let i = 0; i < nets.length; i++) {
        for (let j = i + 1; j < nets.length; j++) {
          const dx = nets[i].x - nets[j].x, dy = nets[i].y - nets[j].y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_DIST) {
            ctx.strokeStyle = `rgba(16,185,129,${(1 - d / MAX_DIST) * 0.32})`;
            ctx.lineWidth   = 0.55;
            ctx.beginPath();
            ctx.moveTo(nets[i].x, nets[i].y);
            ctx.lineTo(nets[j].x, nets[j].y);
            ctx.stroke();
          }
        }
      }

      // ── Layer 2: dots ─────────────────────────────
      for (const p of nets) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52,211,153,${p.o})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    const hero = canvas.parentElement!;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: null, y: null }; };

    // ResizeObserver avoids forced synchronous layout reads on window.resize
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    hero.addEventListener('mousemove', onMouseMove as EventListener);
    hero.addEventListener('mouseleave', onMouseLeave);

    // Defer init+draw past first paint so the canvas setup does not block LCP.
    // startRafId cancels the deferred start if the component unmounts immediately.
    const startRafId = requestAnimationFrame(() => {
      init();
      draw();
    });

    return () => {
      cancelAnimationFrame(startRafId);
      cancelAnimationFrame(rafId);
      ro.disconnect();
      hero.removeEventListener('mousemove', onMouseMove as EventListener);
      hero.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
