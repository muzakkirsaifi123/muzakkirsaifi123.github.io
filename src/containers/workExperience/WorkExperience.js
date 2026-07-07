import React, {useContext, useState, useEffect, useRef} from "react";
import "./WorkExperience.scss";
import {workExperiences} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import developerLottie from "../../assets/lottie/codingPerson";

/* Pull the first 4-digit year out of a date range string
   ("Jan 2021 – Jan 2022" → "2021") to label the dot. */
function startYear(dateStr) {
  const m = /\d{4}/.exec(dateStr || "");
  return m ? m[0] : "";
}

/* How many columns the snake path uses — collapses to a single
   column on narrow screens, same as the rest of the responsive
   layout (see the ≤768px breakpoint in the stylesheet). */
function useCols() {
  const getCols = () => (window.innerWidth <= 768 ? 1 : 2);
  const [cols, setCols] = useState(getCols);
  useEffect(() => {
    const onResize = () => setCols(getCols());
    window.addEventListener("resize", onResize, {passive: true});
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return cols;
}

/* Boustrophedon ("snake") placement: fills a row left-to-right, then
   the next row right-to-left, then left-to-right again — like a
   game-board path. Oldest role starts at the top-left; adding a new
   role over time just extends the path, no reflow of earlier ones. */
function snakeLayout(n, cols) {
  const rows = Math.ceil(n / cols) || 1;
  return Array.from({length: n}, (_, i) => {
    const row = Math.floor(i / cols);
    const colInRow = i % cols;
    const col = row % 2 === 0 ? colInRow : cols - 1 - colInRow;
    return {row, col, rows};
  });
}

/* Smooth path through each position's centre (as a 0–100 percentage
   of the grid, matching the CSS grid exactly without measuring any
   DOM element) — cubic-bezier through midpoints softens the turns
   at the end of each row into a gentle curve instead of a hard corner. */
function buildSnakePath(positions, cols) {
  if (!positions.length) return "";
  const rows = positions[0].rows;
  const pt = p => [(p.col + 0.5) / cols * 100, (p.row + 0.5) / rows * 100];
  const pts = positions.map(pt);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i];
    const [bx, by] = pts[i + 1];
    const midX = (ax + bx) / 2;
    d += ` C ${midX},${ay} ${midX},${by} ${bx},${by}`;
  }
  return d;
}

/* ── Snake node — a compact glowing year-dot on the path; the role's
   card stays hidden until the dot is hovered, focused, or tapped,
   then drops down from it. Keeps the path compact by default —
   only the dots are visible at rest. ── */
function SnakeNode({card, pos, isDark, isOpen, onToggle, onHoverChange, isActive}) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const visible = isOpen || hovered;

  /* Keep the popup fully on-screen horizontally — nudge it back in
     with a CSS custom property rather than fighting the stylesheet's
     own transform. */
  useEffect(() => {
    const el = cardRef.current;
    if (!visible || !el) return;
    el.style.setProperty("--shift-x", "0px");
    const rect = el.getBoundingClientRect();
    const margin = 12;
    let shift = 0;
    if (rect.left < margin) shift = margin - rect.left;
    else if (rect.right > window.innerWidth - margin) shift = (window.innerWidth - margin) - rect.right;
    if (shift !== 0) el.style.setProperty("--shift-x", `${shift}px`);
  }, [visible]);

  const setHoveredBoth = v => {
    setHovered(v);
    onHoverChange(v);
  };

  return (
    <div className={`exp-snake-node${isActive ? " exp-snake-node--active" : ""}`} style={{gridRow: pos.row + 1, gridColumn: pos.col + 1}}>
      <button
        type="button"
        className="exp-snake-dot"
        onClick={onToggle}
        onMouseEnter={() => setHoveredBoth(true)}
        onMouseLeave={() => setHoveredBoth(false)}
        onFocus={() => onHoverChange(true)}
        onBlur={() => onHoverChange(false)}
        aria-expanded={isOpen}
        aria-label={`${card.role} at ${card.company}, ${card.date}`}
      >
        {startYear(card.date)}
      </button>

      <div
        ref={cardRef}
        className={`exp-snake-card${isDark ? " exp-snake-card--dark" : ""}${visible ? " exp-snake-card--open" : ""}`}
      >
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
            {card.descBullets.map((b, bi) => <li key={bi}>{b}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ── Animated right panel ───────────────────────────────────── */
function ExpRightPanel({isDark, stats}) {
  return (
    <div className={`exp-right-panel${isDark ? " exp-right-panel--dark" : ""}`}>

      {/* Orbital ring decoration */}
      <div className="exp-orbit exp-orbit--1">
        <span className="exp-orbit-dot" />
      </div>
      <div className="exp-orbit exp-orbit--2">
        <span className="exp-orbit-dot" />
      </div>
      <div className="exp-orbit exp-orbit--3">
        <span className="exp-orbit-dot" />
      </div>

      {/* Floating orbs */}
      <div className="exp-orb exp-orb--a" />
      <div className="exp-orb exp-orb--b" />
      <div className="exp-orb exp-orb--c" />

      {/* Central Lottie */}
      <div className="exp-rp-lottie">
        <DisplayLottie animationData={developerLottie} />
      </div>

      {/* Stat chips */}
      <div className="exp-rp-stats">
        {stats.map((s, i) => (
          <div className="exp-rp-stat" key={i}>
            <span className="exp-rp-stat-num">{s.value}</span>
            <span className="exp-rp-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Floating tag pills */}
      <span className="exp-tag exp-tag--1">DevOps</span>
      <span className="exp-tag exp-tag--2">Cloud</span>
      <span className="exp-tag exp-tag--3">CI/CD</span>
      <span className="exp-tag exp-tag--4">K8s</span>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function WorkExperience() {
  const {isDark} = useContext(StyleContext);
  const [openIdx, setOpenIdx] = useState(null);
  const [hoverIdx, setHoverIdx] = useState(null);
  const cols = useCols();
  const activeIdx = openIdx !== null ? openIdx : hoverIdx;

  /* Scrolling implies the user is moving on — close whatever card is
     open instead of leaving it floating over content further down
     (or requiring an explicit click to dismiss it). */
  useEffect(() => {
    if (openIdx === null) return;
    const close = () => setOpenIdx(null);
    window.addEventListener("scroll", close, {passive: true});
    return () => window.removeEventListener("scroll", close);
  }, [openIdx]);

  const cards = workExperiences.display ? workExperiences.experience : [];   // index 0 = oldest — the path starts here
  const stats = workExperiences.expStats || [{value:"4+",label:"Years Exp"},{value:"50+",label:"Deployments"},{value:"99%",label:"Uptime"}];
  const positions = snakeLayout(cards.length, cols);
  const rows = positions.length ? positions[0].rows : 1;
  const pathD = buildSnakePath(positions, cols);

  if (!workExperiences.display) return null;

  return (
    <div id="experience">
      <div className="experience-container">
        <h1
          className={isDark ? "dark-mode experience-heading" : "experience-heading"}
          data-reveal="up"
        >
          Experiences
        </h1>

        <div className="exp-layout">
          {/* ── Left: snake path, oldest role first, wrapping left-to-right then right-to-left ── */}
          <div
            className="exp-col-left exp-snake"
            style={{
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, auto)`,
            }}
          >
            <svg className="exp-snake-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="snakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#6a11cb" />
                  <stop offset="50%"  stopColor="#9b59b6" />
                  <stop offset="100%" stopColor="#2575fc" />
                </linearGradient>
              </defs>
              <path
                key={pathD}
                d={pathD}
                fill="none"
                stroke="url(#snakeGrad)"
                strokeWidth="1.2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="exp-snake-path"
              />
            </svg>

            {/* Dims/blurs the rest of the path while a card is open or
               hovered, instead of it visually clashing with whatever
               dot happens to sit behind the popup. */}
            {activeIdx !== null && <div className="exp-snake-backdrop" aria-hidden="true" />}

            {cards.map((card, i) => (
              <SnakeNode
                key={i}
                card={card}
                pos={positions[i]}
                isDark={isDark}
                isOpen={openIdx === i}
                isActive={activeIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                onHoverChange={hovering => setHoverIdx(prev => (hovering ? i : (prev === i ? null : prev)))}
              />
            ))}
          </div>

          {/* ── Right: animated panel ── */}
          <div className="exp-col-right">
            <ExpRightPanel isDark={isDark} stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
}
