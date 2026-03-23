import React, {useState, useEffect, useContext} from "react";
import "./Education.scss";
import EducationCard from "../../components/educationCard/EducationCard";
import {educationInfo} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

function EduModal({school, isDark, onClose}) {
  /* Close on Escape */
  useEffect(() => {
    const handler = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="edu-modal-backdrop" onClick={onClose}>
      <div
        className={`edu-modal${isDark ? " edu-modal--dark" : ""}`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Spinning border */}
        <div className="edu-modal-border-spin" />

        <div className="edu-modal-body">
          {/* Close button */}
          <button className="edu-modal-close" onClick={onClose} aria-label="Close">
            <i className="fas fa-xmark" />
          </button>

          {/* Logo + titles */}
          <div className="edu-modal-head">
            {school.logo && (
              <div className="edu-modal-logo">
                <img src={school.logo} alt={school.schoolName} />
              </div>
            )}
            <div>
              <h2 className="edu-modal-school">{school.schoolName}</h2>
              <h3 className="edu-modal-degree">{school.subHeader}</h3>
            </div>
          </div>

          {/* Duration */}
          {school.duration && (
            <span className="edu-modal-duration">
              <i className="far fa-calendar-alt" /> {school.duration}
            </span>
          )}

          {/* Divider */}
          <div className="edu-modal-divider" />

          {/* Description */}
          {school.desc && (
            <p className="edu-modal-desc">{school.desc}</p>
          )}

          {/* Bullets */}
          {school.descBullets && school.descBullets.length > 0 && (
            <ul className="edu-modal-bullets">
              {school.descBullets.map((b, i) => (
                <li key={i}>
                  <span className="edu-modal-dot" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  const {isDark}     = useContext(StyleContext);
  const [modal, setModal] = useState(null);   // school object or null

  if (!educationInfo.display) return null;

  return (
    <div id="education" className={`edu-section${isDark ? " dark-mode" : ""}`}>
      <h1 className="edu-heading" data-reveal="up">Education</h1>

      <div className="edu-timeline">
        <div className="edu-timeline-line" />
        {educationInfo.schools.map((school, i) => (
          <EducationCard
            key={i}
            school={school}
            index={i}
            onOpen={() => setModal(school)}
          />
        ))}
      </div>

      {modal && (
        <EduModal
          school={modal}
          isDark={isDark}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
