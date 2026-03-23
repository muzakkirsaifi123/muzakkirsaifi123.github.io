import React, {useRef, useState, useEffect} from "react";
import "./Progress.scss";
import {illustration, techStack} from "../../portfolio";
import {Fade} from "react-reveal";
import Build from "../../assets/lottie/build";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";

export default function StackProgress() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {threshold: 0.08, rootMargin: "0px 0px -5% 0px"}
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (techStack.viewSkillBars) {
    return (
      <div ref={sectionRef}>
      <Fade bottom duration={1000} distance="20px">
        <div className="skills-container">
          <div className="skills-bar">
            <h1 className="skills-heading">Proficiency</h1>
            {techStack.experience.map((exp, i) => {
              const barStyle = {
                width: isVisible ? exp.progressPercentage : "0%",
                transition: isVisible
                  ? `width 1.4s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.18}s`
                  : "none"
              };
              return (
                <div key={i} className="skill">
                  <div className="skill-label-row">
                    <p className="skill-name">{exp.Stack}</p>
                    <span
                      className="skill-pct"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transition: `opacity 0.4s ease ${i * 0.18 + 1}s`
                      }}
                    >
                      {exp.progressPercentage}
                    </span>
                  </div>
                  <div className="meter">
                    <span style={barStyle}></span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="skills-image">
            {illustration.animated ? (
              <DisplayLottie animationData={Build} />
            ) : (
              <img
                alt="Skills"
                src={require("../../assets/images/skill.svg")}
              />
            )}
          </div>
        </div>
      </Fade>
      </div>
    );
  }
  return null;
}
