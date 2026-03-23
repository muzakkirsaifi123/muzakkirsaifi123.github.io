import React, {useContext} from "react";
import "./WorkExperience.scss";
import {workExperiences} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

function TimelineCard({card, isDark, index}) {
  const isEven = index % 2 === 0;

  return (
    <div
      data-reveal={isEven ? "left" : "right"}
      style={{transitionDelay: `${index * 0.15}s`}}
      className={`timeline-item ${isEven ? "timeline-item--left" : "timeline-item--right"}`}
    >
      <div className="timeline-dot">
        <img
          src={card.companylogo}
          alt={card.company}
          className="timeline-logo"
        />
      </div>
      <div className={isDark ? "timeline-card timeline-card--dark" : "timeline-card"}>
        <div className="timeline-card-header">
          <div className="timeline-card-header-info">
            <h3 className="timeline-role">{card.role}</h3>
            <h4 className="timeline-company">{card.company}</h4>
          </div>
          <span className="timeline-date">{card.date}</span>
        </div>
        {card.desc && (
          <p className={isDark ? "timeline-desc dark-mode-text" : "timeline-desc subTitle"}>
            {card.desc}
          </p>
        )}
        {card.descBullets && card.descBullets.length > 0 && (
          <ul className="timeline-bullets">
            {card.descBullets.map((bullet, i) => (
              <li key={i} className={isDark ? "dark-mode-text" : "subTitle"}>
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function WorkExperience() {
  const {isDark} = useContext(StyleContext);
  if (!workExperiences.display) return null;

  return (
    <div id="experience">
      <div className="experience-container" id="workExperience">
        <h1
          className={isDark ? "dark-mode experience-heading" : "experience-heading"}
          data-reveal="up"
        >
          Experiences
        </h1>
        <div className="timeline">
          <div className="timeline-line" />
          {workExperiences.experience.map((card, i) => (
            <TimelineCard key={i} card={card} isDark={isDark} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
