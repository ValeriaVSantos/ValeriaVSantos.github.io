// Neural network hero canvas: nodes + connections that react to mouse
import React, { useEffect, useRef } from 'react'

export default function NeuralHero() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0, H = 0;
    let nodes = [];

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    }

    function buildNodes() {
      const targetDensity = 0.000048; // nodes per px^2
      const count = Math.max(40, Math.min(140, Math.floor(W * H * targetDensity)));
      nodes = new Array(count).fill(0).map(() => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.4 + 0.6,
        baseR: 0,
        hue: Math.random() < 0.5 ? 'v' : 'b',
        flash: 0,
      })).map(n => ({ ...n, baseR: n.r }));
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    }
    function onLeave() {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mActive = mouseRef.current.active;
      const MOUSE_R = 220;

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.x = Math.max(0, Math.min(W, n.x));
        n.y = Math.max(0, Math.min(H, n.y));

        if (mActive) {
          const dx = n.x - mx, dy = n.y - my;
          const d2 = dx*dx + dy*dy;
          if (d2 < MOUSE_R * MOUSE_R) {
            const d = Math.sqrt(d2) + 0.0001;
            const f = (1 - d / MOUSE_R) * 0.6;
            n.vx += (dx / d) * f * 0.06;
            n.vy += (dy / d) * f * 0.06;
            n.flash = Math.min(1, n.flash + 0.04);
          }
        }
        // damping
        n.vx *= 0.985; n.vy *= 0.985;
        // tiny perpetual jitter
        n.vx += (Math.random() - 0.5) * 0.006;
        n.vy += (Math.random() - 0.5) * 0.006;
        n.flash *= 0.96;
      }

      // Connections
      const CONN_R = 130;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx*dx + dy*dy;
          if (d2 > CONN_R * CONN_R) continue;
          const d = Math.sqrt(d2);
          let alpha = (1 - d / CONN_R) * 0.22;
          // Mouse boost
          if (mActive) {
            const mx1 = (a.x + b.x) / 2 - mx;
            const my1 = (a.y + b.y) / 2 - my;
            const md = Math.sqrt(mx1*mx1 + my1*my1);
            if (md < MOUSE_R) {
              const boost = (1 - md / MOUSE_R);
              alpha += boost * 0.55;
            }
          }
          if (alpha <= 0.01) continue;
          const flashAvg = (a.flash + b.flash) * 0.5;
          // color blend violet -> blue with flash mixing in white
          const useBlue = (a.hue === 'b' && b.hue === 'b');
          if (useBlue) {
            ctx.strokeStyle = `rgba(140, 210, 255, ${alpha})`;
          } else if (a.hue === 'v' && b.hue === 'v') {
            ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
          } else {
            ctx.strokeStyle = `rgba(154, 175, 252, ${alpha})`;
          }
          ctx.lineWidth = 0.7 + flashAvg * 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Mouse-to-node connections (highlight nearest)
      if (mActive) {
        for (const n of nodes) {
          const dx = n.x - mx, dy = n.y - my;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 160) {
            const a = (1 - d / 160) * 0.55;
            ctx.strokeStyle = `rgba(255, 255, 255, ${a * 0.6})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        const r = n.baseR + n.flash * 2.4;
        // glow
        const glowAlpha = 0.12 + n.flash * 0.6;
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6);
        if (n.hue === 'v') {
          grd.addColorStop(0, `rgba(167, 139, 250, ${glowAlpha})`);
        } else {
          grd.addColorStop(0, `rgba(92, 208, 255, ${glowAlpha})`);
        }
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 6, 0, Math.PI * 2);
        ctx.fill();

        // core
        ctx.fillStyle = n.hue === 'v' ? `rgba(214, 199, 255, ${0.75 + n.flash * 0.25})` : `rgba(190, 232, 255, ${0.75 + n.flash * 0.25})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Mouse cursor halo
      if (mActive) {
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 80);
        grd.addColorStop(0, 'rgba(167, 139, 250, 0.18)');
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(mx, my, 80, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas id="hero-canvas" ref={canvasRef}></canvas>;
}
