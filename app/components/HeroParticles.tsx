'use client';

import React, { useEffect, useRef } from 'react';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  baseX: number;
  baseY: number;
  density: number;
  canvasWidth: number;
  canvasHeight: number;

  constructor(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.size = Math.random() * 2 + 1;
    this.color = `rgba(100, 200, 255, ${Math.random() * 0.5 + 0.2})`;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random() * 30) + 1;
  }

  update(mouse: { x: number; y: number }, mouseDistance: number) {
    // Mouse interaction
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance === 0) {
      distance = 0.001;
    }
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouseDistance;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouseDistance) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }

    // Movement
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > this.canvasWidth) this.vx = -this.vx;
    if (this.y < 0 || this.y > this.canvasHeight) this.vy = -this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

const HeroParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    const saveData = (navigator as any)?.connection?.saveData === true;

    if (prefersReducedMotion || saveData || window.innerWidth < 1024) {
      return;
    }

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles: Particle[] = [];
    let mouse = { x: width / 2, y: height / 2 };
    let animationFrameId: number;

    // Configuration
    const particleCount = Math.min(window.innerWidth / 10, 150); // Responsive count
    const connectionDistance = 150;
    const connectionDistanceSq = connectionDistance * connectionDistance;
    const mouseDistance = 200;

    // Spatial grid variables
    const cellSize = connectionDistance;
    let cols = Math.ceil(width / cellSize);
    let rows = Math.ceil(height / cellSize);
    let head = new Int32Array(cols * rows);
    const next = new Int32Array(particleCount);

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Reset spatial grid
      head.fill(-1);

      // Update particles, draw them, and add to grid
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update(mouse, mouseDistance);
        p.draw(ctx);

        const col = Math.max(0, Math.min(cols - 1, Math.floor(p.x / cellSize)));
        const row = Math.max(0, Math.min(rows - 1, Math.floor(p.y / cellSize)));
        const cellIndex = row * cols + col;
        next[i] = head[cellIndex];
        head[cellIndex] = i;
      }

      // Check connections using spatial grid
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const p1x = p1.x;
        const p1y = p1.y;

        const col = Math.max(0, Math.min(cols - 1, Math.floor(p1x / cellSize)));
        const row = Math.max(0, Math.min(rows - 1, Math.floor(p1y / cellSize)));

        const minCol = Math.max(0, col - 1);
        const maxCol = Math.min(cols - 1, col + 1);
        const minRow = Math.max(0, row - 1);
        const maxRow = Math.min(rows - 1, row + 1);

        for (let checkRow = minRow; checkRow <= maxRow; checkRow++) {
          for (let checkCol = minCol; checkCol <= maxCol; checkCol++) {
            const cellIndex = checkRow * cols + checkCol;
            let j = head[cellIndex];
            while (j !== -1) {
              if (i < j) {
                const p2 = particles[j];
                let dx = p1x - p2.x;
                let dy = p1y - p2.y;
                let distSq = dx * dx + dy * dy;

                if (distSq < connectionDistanceSq) {
                  let distance = Math.sqrt(distSq);
                  ctx.beginPath();
                  ctx.strokeStyle = `rgba(100, 200, 255, ${1 - distance / connectionDistance})`;
                  ctx.lineWidth = 1;
                  ctx.moveTo(p1x, p1y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.stroke();
                  ctx.closePath();
                }
              }
              j = next[j];
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);
      head = new Int32Array(cols * rows);
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default HeroParticles;
