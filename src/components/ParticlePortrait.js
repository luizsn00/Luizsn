import React, { useEffect, useRef, useState } from "react";

const BG_THRESHOLD = 80;

function isBackground(r, g, b, bgR, bgG, bgB) {
  const dr = r - bgR;
  const dg = g - bgG;
  const db = b - bgB;
  return Math.sqrt(dr * dr + dg * dg + db * db) < BG_THRESHOLD;
}

const ParticlePortrait = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const particlesRef = useRef([]);
  const imageLoadedRef = useRef(false);
  const startTimeRef = useRef(null);
  const [size, setSize] = useState(500);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setSize(Math.min(220, width - 40));
      } else if (width <= 768) {
        setSize(Math.min(280, width - 60));
      } else {
        setSize(400);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const canvasWidth = size;
    const canvasHeight = size;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let animationId;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = "/profile.png";

    img.onload = () => {
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      offscreen.width = canvasWidth;
      offscreen.height = canvasHeight;

      const scale = 0.85;
      const imgAspect = img.width / img.height;

      let drawHeight = canvasHeight * scale;
      let drawWidth = drawHeight * imgAspect;
      if (drawWidth > canvasWidth * scale) {
        drawWidth = canvasWidth * scale;
        drawHeight = drawWidth / imgAspect;
      }

      const offsetX = (canvasWidth - drawWidth) / 2;
      const offsetY = (canvasHeight - drawHeight) / 2;

      offCtx.imageSmoothingEnabled = false;
      offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      const imageData = offCtx.getImageData(0, 0, canvasWidth, canvasHeight);
      const pixels = imageData.data;

      const bgI = 0;
      const bgR = pixels[bgI];
      const bgG = pixels[bgI + 1];
      const bgB = pixels[bgI + 2];

      const particles = [];
      const gap = size <= 280 ? 3 : 4;

      for (let y = 0; y < canvasHeight; y += gap) {
        for (let x = 0; x < canvasWidth; x += gap) {
          const i = (y * canvasWidth + x) * 4;
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];

          if (isBackground(r, g, b, bgR, bgG, bgB)) continue;

          const angle = Math.random() * Math.PI * 2;
          const dist = 200 + Math.random() * 200;

          particles.push({
            x: canvasWidth / 2 + Math.cos(angle) * dist,
            y: canvasHeight / 2 + Math.sin(angle) * dist,
            targetX: x,
            targetY: y,
            vx: 0,
            vy: 0,
            r,
            g,
            b,
            size: gap,
            baseAlpha: 0.85 + Math.random() * 0.15,
            currentAlpha: 0,
            delay: Math.random() * 0.6,
          });
        }
      }

      particlesRef.current = particles;
      imageLoadedRef.current = true;
      startTimeRef.current = performance.now();
    };

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      if (!imageLoadedRef.current) return;

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const elapsed = (performance.now() - startTimeRef.current) / 1000;

      for (let idx = 0; idx < particles.length; idx++) {
        const p = particles[idx];
        const particleTime = elapsed - p.delay;
        if (particleTime < 0) continue;

        const fadeProgress = Math.min(particleTime / 1.2, 1);
        const easedFade = 1 - Math.pow(1 - fadeProgress, 2);
        p.currentAlpha = p.baseAlpha * easedFade;

        const moveProgress = Math.min(particleTime / 2.0, 1);
        const easedMove = 1 - Math.pow(1 - moveProgress, 3);

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 50;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 3;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const pullStrength = 0.02 + easedMove * 0.08;
        p.vx += dx * pullStrength;
        p.vy += dy * pullStrength;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.currentAlpha})`;
        ctx.fillRect(
          Math.round(p.x),
          Math.round(p.y),
          p.size,
          p.size,
        );
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleLeave);

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleLeave);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className="simulation-container"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: "crosshair",
      }}
    />
  );
};

export default ParticlePortrait;
