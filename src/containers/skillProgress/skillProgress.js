import React, {useContext, useRef, useState, useEffect} from "react";
import "./Progress.scss";
import {techStack} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 326.7

// Color palette — shades within the site's own purple → blue gradient
// family (matching the hero, splash screen and experience path)
// instead of an unrelated rainbow, so this section reads as part of
// the same app rather than a clashing add-on.
const COLORS = [
  {a: "#6a11cb", b: "#9b59b6", glow: "rgba(106,17,203,0.5)"},
  {a: "#7b2ff7", b: "#a78bfa", glow: "rgba(123,47,247,0.5)"},
  {a: "#8c43ce", b: "#c084fc", glow: "rgba(140,67,206,0.5)"},
  {a: "#5b21b6", b: "#818cf8", glow: "rgba(91,33,182,0.5)"},
  {a: "#4f46e5", b: "#38bdf8", glow: "rgba(79,70,229,0.5)"},
  {a: "#2575fc", b: "#67e8f9", glow: "rgba(37,117,252,0.5)"}
];

function levelLabel(pct) {
  if (pct >= 90) return "Expert";
  if (pct >= 75) return "Advanced";
  if (pct >= 60) return "Proficient";
  if (pct >= 45) return "Intermediate";
  return "Learning";
}

function RingCard({exp, index, isVisible, isDark}) {
  const pct  = parseInt(String(exp.progressPercentage), 10) || 70;
  const col  = COLORS[index % COLORS.length];
  const gradId = `grad-${index}`;
  const trackColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(85,25,139,0.08)";
  const levelTextColor = isDark ? "rgba(226,232,240,0.55)" : "rgba(51,51,51,0.55)";

  // stroke-dashoffset: CIRCUMFERENCE when empty, target offset when filled
  const targetOffset = CIRCUMFERENCE * (1 - pct / 100);
  const offset = isVisible ? targetOffset : CIRCUMFERENCE;

  return (
    <div
      className="ring-card"
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? "scale(1) translateY(0)" : "scale(0.75) translateY(24px)",
        transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s cubic-bezier(0.34,1.1,0.64,1) ${index * 0.1}s`
      }}
    >
      {/* Floating glow blob behind ring */}
      <div className="ring-glow" style={{background: col.glow}} />

      <svg
        className="ring-svg"
        width="130"
        height="130"
        viewBox="0 0 130 130"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor={col.a} />
            <stop offset="100%" stopColor={col.b} />
          </linearGradient>
        </defs>

        {/* Background track */}
        <circle
          cx="65" cy="65" r={RADIUS}
          fill="none"
          stroke={trackColor}
          strokeWidth="8"
        />

        {/* Animated fill */}
        <circle
          cx="65" cy="65" r={RADIUS}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90 65 65)"
          style={{
            transition: isVisible
              ? `stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1) ${index * 0.12}s`
              : "none",
            filter: `drop-shadow(0 0 6px ${col.a})`
          }}
        />

        {/* Centre text */}
        <text x="65" y="60" textAnchor="middle" className="ring-pct-text" fill={col.b}>
          {isVisible ? `${pct}%` : ""}
        </text>
        <text x="65" y="76" textAnchor="middle" className="ring-level-text" fill={levelTextColor}>
          {levelLabel(pct)}
        </text>
      </svg>

      <p className="ring-name">{exp.Stack}</p>

      {/* Dot indicator strip */}
      <div className="ring-dots">
        {Array.from({length: 5}).map((_, d) => {
          const filled = d < Math.round(pct / 20);
          return (
            <span
              key={d}
              className={`ring-dot${filled ? " ring-dot--on" : ""}`}
              style={filled ? {background: col.b, boxShadow: `0 0 6px ${col.a}`} : {}}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function StackProgress() {
  const {isDark} = useContext(StyleContext);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      {threshold: 0.08}
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!techStack.viewSkillBars) return null;

  return (
    <div ref={sectionRef}>
      <Fade bottom duration={1000} distance="20px">
        <div className="prof-section">
          <h1 className={isDark ? "dark-mode prof-heading" : "prof-heading"}>Proficiency</h1>
          <div className="ring-grid">
            {techStack.experience.map((exp, i) => (
              <RingCard key={i} exp={exp} index={i} isVisible={isVisible} isDark={isDark} />
            ))}
          </div>
        </div>
      </Fade>
    </div>
  );
}
