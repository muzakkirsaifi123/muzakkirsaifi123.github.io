import React, {useEffect, useRef, useCallback} from "react";
import "./CursorEffect.scss";

const COLORS = ["#8c43ce", "#55198b", "#aaa5ff", "#c8c4ff", "#e0b3ff"];

export default function CursorEffect() {
  const cursorRingRef = useRef(null);
  const cursorDotRef = useRef(null);
  const sparklesRef = useRef([]);
  const posRef = useRef({x: -200, y: -200});
  const rafRef = useRef(null);
  const ringPosRef = useRef({x: -200, y: -200});

  const createSparkle = useCallback((x, y) => {
    const el = document.createElement("div");
    el.className = "cursor-sparkle";
    const size = 4 + Math.random() * 6;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist = 12 + Math.random() * 20;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    el.style.cssText = `
      width:${size}px;height:${size}px;
      left:${x}px;top:${y}px;
      background:${color};
      --dx:${dx}px;--dy:${dy}px;
    `;
    document.body.appendChild(el);
    sparklesRef.current.push(el);
    setTimeout(() => {
      el.remove();
      sparklesRef.current = sparklesRef.current.filter(s => s !== el);
    }, 700);
  }, []);

  useEffect(() => {
    document.body.classList.add("cursor-effect-on");
    return () => document.body.classList.remove("cursor-effect-on");
  }, []);

  useEffect(() => {
    let lastSparkleTime = 0;
    const SPARKLE_INTERVAL = 40;

    const onMove = e => {
      const x = e.clientX;
      const y = e.clientY;
      posRef.current = {x, y};

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      const now = Date.now();
      if (now - lastSparkleTime > SPARKLE_INTERVAL) {
        createSparkle(x, y);
        lastSparkleTime = now;
      }
    };

    const tick = () => {
      if (cursorRingRef.current) {
        const {x: tx, y: ty} = posRef.current;
        const {x: rx, y: ry} = ringPosRef.current;
        const nx = rx + (tx - rx) * 0.14;
        const ny = ry + (ty - ry) * 0.14;
        ringPosRef.current = {x: nx, y: ny};
        cursorRingRef.current.style.transform = `translate(${nx}px, ${ny}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      if (cursorRingRef.current) cursorRingRef.current.style.opacity = "1";
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = "1";
    };
    const onLeave = () => {
      if (cursorRingRef.current) cursorRingRef.current.style.opacity = "0";
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [createSparkle]);

  return (
    <>
      <div ref={cursorRingRef} className="cursor-ring" aria-hidden="true" />
      <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
