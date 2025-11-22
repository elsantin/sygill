"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

export default function GoldenSmoke() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 30; // Reduced from 50 for subtlety

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        vx: (Math.random() - 0.5) * 1, // Slower horizontal movement
        vy: -(Math.random() * 1.5 + 1), // Slower vertical rise
        life: 0,
        maxLife: Math.random() * 100 + 150, // Longer life
        size: Math.random() * 20 + 10, // Slightly smaller
        opacity: 0,
      });
    }

    function animate() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Fade in and out
        if (p.life < 20) {
          p.opacity = p.life / 20;
        } else if (p.life > p.maxLife - 30) {
          p.opacity = (p.maxLife - p.life) / 30;
        } else {
          p.opacity = 1;
        }

        // Golden smoke gradient
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size
        );
        gradient.addColorStop(0, `rgba(255, 215, 0, ${p.opacity * 0.15})`);
        gradient.addColorStop(0.4, `rgba(255, 185, 0, ${p.opacity * 0.1})`);
        gradient.addColorStop(1, `rgba(255, 140, 0, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      const allDead = particles.every((p) => p.life >= p.maxLife);
      if (!allDead) {
        requestAnimationFrame(animate);
      }
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-100"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
