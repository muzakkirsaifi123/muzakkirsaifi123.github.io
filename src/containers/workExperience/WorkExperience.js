import React, {useState, useRef, useEffect, useContext} from "react";
import "./WorkExperience.scss";
import {workExperiences} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

const BEACON   = 58;   // logo circle diameter (px)
const STEP_H   = 100;  // vertical gap between nodes
const PAD_T    = 40;
const PAD_B    = 48;
const L_PCT    = 0.35; // left-side x as fraction of width
const R_PCT    = 0.65; // right-side x as fraction of width

/* Calculate all node positions given container width */
function calcPositions(N, W) {
  return Array.from({length: N}, (_, i) => {
    // i=0 → oldest → bottom;  i=N-1 → newest → top
    const side = i % 2 === 0 ? "left" : "right";
    const x    = Math.round((side === "left" ? L_PCT : R_PCT) * W);
    const y    = PAD_T + (N - 1 - i) * STEP_H;
    return {x, y, side};
  });
}

/* Build smooth S-curve SVG path through all nodes */
function buildPath(positions) {
  if (!positions.length) return "";
  let d = `M ${positions[0].x} ${positions[0].y}`;
  for (let i = 0; i < positions.length - 1; i++) {
    const a = positions[i];
    const b = positions[i + 1];
    const midY = (a.y + b.y) / 2;
    d += ` C ${a.x},${midY} ${b.x},${midY} ${b.x},${b.y}`;
  }
  return d;
}

/* ── Popup card ─────────────────────────────────────────────── */
function PopupCard({card, isDark, pos, containerW, onEnter, onLeave}) {
  const isLeft  = pos.side === "left";
  const POPUP_W = 420;

  // Position popup to the INNER side (toward centre of trail)
  const style = isLeft
    ? {left: pos.x - BEACON / 2 + BEACON + 20, top: pos.y, transform: "translateY(-50%)"}
    : {left: pos.x + BEACON / 2 - BEACON - 20 - POPUP_W, top: pos.y, transform: "translateY(-50%)"};

  // Clamp so popup never leaves the container
  if (style.left < 8)                    style.left = 8;
  if (style.left + POPUP_W > containerW - 8) style.left = containerW - POPUP_W - 8;

  return (
    <div
      className={`exp-popup${isDark ? " exp-popup--dark" : ""}`}
      style={{...style, width: POPUP_W}}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Caret arrow */}
      <div className={`exp-popup-caret exp-popup-caret--${isLeft ? "left" : "right"}`} />

      <div className="exp-popup-head">
        <div className="exp-popup-logo">
          <img src={card.companylogo} alt={card.company} />
        </div>
        <div className="exp-popup-titles">
          <h3 className="exp-popup-role">{card.role}</h3>
          <h4 className="exp-popup-company">{card.company}</h4>
        </div>
      </div>

      <span className="exp-popup-date">
        <i className="far fa-calendar-alt" /> {card.date}
      </span>

      {card.desc && <p className="exp-popup-desc">{card.desc}</p>}

      {card.descBullets && card.descBullets.length > 0 && (
        <ul className="exp-popup-bullets">
          {card.descBullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
    </div>
  );
}

/* ── Beacon node ───────────────────────────────────────────── */
function TrackNode({card, pos, isDark, isActive, isDimmed, onHover, onLeave, containerW}) {
  const halfB = BEACON / 2;

  return (
    <div
      className={[
        "exp-node",
        isActive  ? "exp-node--active"  : "",
        isDimmed  ? "exp-node--dimmed"  : "",
      ].filter(Boolean).join(" ")}
      style={{
        position: "absolute",
        left:     pos.x - halfB,
        top:      pos.y - halfB,
        width:    BEACON,
        height:   BEACON,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Radar rings */}
      <div className="exp-ring exp-ring--1" />
      <div className="exp-ring exp-ring--2" />

      {/* Logo circle */}
      <div className="exp-logo">
        <img src={card.companylogo} alt={card.company} />
      </div>

      {/* Date label — alternates above/below based on side */}
      <span className={`exp-node-date exp-node-date--${pos.side}`}>
        {card.date}
      </span>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function WorkExperience() {
  const {isDark}            = useContext(StyleContext);
  const [hov, setHov]       = useState(null);
  const wrapRef             = useRef(null);
  const pathRef             = useRef(null);
  const leaveTimer          = useRef(null);
  const [W, setW]           = useState(800);
  const [pathLen, setPathLen] = useState(0);

  const showNode = (i) => {
    clearTimeout(leaveTimer.current);
    setHov(i);
  };
  const hideNode = () => {
    leaveTimer.current = setTimeout(() => setHov(null), 180);
  };
  const cancelHide = () => clearTimeout(leaveTimer.current);

  /* Track container width */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const sync = () => setW(el.offsetWidth);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Measure path length for dash animation */
  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, [W]);

  if (!workExperiences.display) return null;

  const cards = workExperiences.experience;   // index 0 = oldest = bottom
  const N     = cards.length;
  const SVG_H = PAD_T + (N - 1) * STEP_H + PAD_B;
  const pos   = calcPositions(N, W);
  const pathD = buildPath(pos);
  const anyHov = hov !== null;

  return (
    <div id="experience">
      <div className="experience-container">
        <h1
          className={isDark ? "dark-mode experience-heading" : "experience-heading"}
          data-reveal="up"
        >
          Experiences
        </h1>

        {/* Track */}
        <div
          ref={wrapRef}
          className={`exp-track${anyHov ? " exp-track--hov" : ""}`}
          style={{height: SVG_H, position: "relative"}}
        >
          {/* SVG mountain trail */}
          <svg
            className="exp-svg"
            width={W}
            height={SVG_H}
            viewBox={`0 0 ${W} ${SVG_H}`}
            style={{position: "absolute", inset: 0, overflow: "visible"}}
          >
            <defs>
              <linearGradient id="trailGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%"   stopColor="#6a11cb" stopOpacity="0.5" />
                <stop offset="50%"  stopColor="#9b59b6" stopOpacity="0.75"/>
                <stop offset="100%" stopColor="#2575fc" stopOpacity="0.9" />
              </linearGradient>
              <filter id="trailGlow">
                <feGaussianBlur stdDeviation="4" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Glow duplicate */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#trailGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.18"
              style={pathLen ? {
                strokeDasharray: pathLen,
                strokeDashoffset: pathLen,
                animation: "expDraw 1.8s ease forwards 0.2s",
              } : {}}
            />

            {/* Main trail */}
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="url(#trailGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#trailGlow)"
              style={pathLen ? {
                strokeDasharray: pathLen,
                strokeDashoffset: pathLen,
                animation: "expDraw 1.8s ease forwards 0.2s",
              } : {}}
            />

            {/* Traveling spark */}
            {pathLen > 0 && (
              <g>
                <circle r="5" fill="white" opacity="0.85">
                  <animateMotion dur="5s" repeatCount="indefinite" path={pathD} />
                </circle>
                <circle r="10" fill="white" opacity="0.18">
                  <animateMotion dur="5s" repeatCount="indefinite" path={pathD} />
                </circle>
              </g>
            )}
          </svg>

          {/* Blur overlay (sits above svg, below active node) */}
          {anyHov && <div className="exp-overlay" />}

          {/* Beacon nodes */}
          {cards.map((card, i) => (
            <TrackNode
              key={i}
              card={card}
              pos={pos[i]}
              isDark={isDark}
              isActive={hov === i}
              isDimmed={anyHov && hov !== i}
              onHover={() => showNode(i)}
              onLeave={hideNode}
              containerW={W}
            />
          ))}

          {/* Popup rendered above overlay — stays open while cursor is on it */}
          {anyHov && (
            <PopupCard
              card={cards[hov]}
              isDark={isDark}
              pos={pos[hov]}
              containerW={W}
              onEnter={cancelHide}
              onLeave={hideNode}
            />
          )}
        </div>
      </div>
    </div>
  );
}
