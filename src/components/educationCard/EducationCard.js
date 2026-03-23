import React, {useContext} from "react";
import "./EducationCard.scss";
import StyleContext from "../../contexts/StyleContext";

export default function EducationCard({school, index, onOpen}) {
  const {isDark} = useContext(StyleContext);
  const isEven   = index % 2 === 0;

  return (
    <div
      className={[
        "edu-item",
        isEven ? "edu-item--left" : "edu-item--right",
        isDark ? "edu-item--dark" : "",
      ].filter(Boolean).join(" ")}
      style={{animationDelay: `${index * 0.12}s`}}
    >
      {/* Timeline dot */}
      <div className="edu-dot">
        <div className="edu-dot-ring edu-dot-ring--1" />
        <div className="edu-dot-ring edu-dot-ring--2" />
        <div className="edu-dot-core">
          {school.logo
            ? <img src={school.logo} alt={school.schoolName} />
            : <i className="fas fa-graduation-cap" />}
        </div>
      </div>

      {/* Compact card — click opens modal */}
      <button
        className={`edu-card${isDark ? " edu-card--dark" : ""}`}
        onClick={onOpen}
        aria-label={`View details for ${school.schoolName}`}
      >
        <div className="edu-card-left">
          {school.logo && (
            <div className="edu-card-thumb">
              <img src={school.logo} alt={school.schoolName} />
            </div>
          )}
          <div className="edu-card-text">
            <p className="edu-card-name">{school.schoolName}</p>
            <p className="edu-card-degree">{school.subHeader}</p>
          </div>
        </div>

        <div className="edu-card-right">
          {school.duration && (
            <span className="edu-card-badge">
              <i className="far fa-calendar-alt" /> {school.duration}
            </span>
          )}
          <span className="edu-card-open-hint">
            <i className="fas fa-arrow-up-right-from-square" />
          </span>
        </div>
      </button>
    </div>
  );
}
