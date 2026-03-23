import React, {useEffect, useState} from "react";
import DisplayLottie from "../displayLottie/DisplayLottie";
import "./NavTransition.scss";

export default function NavTransition({section, onDone}) {
  const [phase, setPhase] = useState("enter"); // enter → hold → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 50);
    const t2 = setTimeout(() => setPhase("exit"), 900);
    const t3 = setTimeout(() => onDone(), 1300);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onDone]);

  if (!section) return null;

  return (
    <div className={`nav-transition nav-transition--${phase}`}>
      <div className="nav-transition-inner">
        <div className="nav-transition-lottie">
          <DisplayLottie animationData={section.lottie} />
        </div>
        <p className="nav-transition-label">{section.label}</p>
        <div className="nav-transition-bar">
          <span />
        </div>
      </div>
    </div>
  );
}
