import React, {useEffect, useRef} from "react";

const PARTICLE_COUNT = 55;
const MAX_DIST       = 130;
const CURSOR_DIST    = 180;

export default function GlobalParticles() {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({x: -9999, y: -9999});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = e => {
      mouseRef.current = {x: e.clientX, y: e.clientY};
    };
    window.addEventListener("mousemove", onMove);

    const onTouch = e => {
      const t = e.touches[0];
      if (t) mouseRef.current = {x: t.clientX, y: t.clientY};
    };
    window.addEventListener("touchmove", onTouch, {passive: true});

    const dots = Array.from({length: PARTICLE_COUNT}, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      r:  Math.random() * 1.6 + 0.5,
      o:  Math.random() * 0.25 + 0.07,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const {x: mx, y: my} = mouseRef.current;

      // Determine current color from body class
      const dark = document.body.classList.contains("dark-mode");
      const col  = dark ? "rgba(167,139,250," : "rgba(106,17,203,";

      // Move dots
      dots.forEach(d => {
        d.x += d.dx;
        d.y += d.dy;
        if (d.x < 0 || d.x > canvas.width)  d.dx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.dy *= -1;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `${col}${d.o})`;
        ctx.fill();
      });

      // Lines between nearby dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx   = dots[i].x - dots[j].x;
          const dy   = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = 0.1 * (1 - dist / MAX_DIST);
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `${col}${alpha})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }

        // Lines from dot to cursor
        const cdx  = dots[i].x - mx;
        const cdy  = dots[i].y - my;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cdist < CURSOR_DIST) {
          const alpha = 0.35 * (1 - cdist / CURSOR_DIST);
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `${col}${alpha})`;
          ctx.lineWidth   = 0.9;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",
        zIndex:        1,
      }}
    />
  );
}
