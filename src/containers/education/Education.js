import React, {useContext} from "react";
import "./Education.scss";
import EducationCard from "../../components/educationCard/EducationCard";
import {educationInfo, illustration} from "../../portfolio";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import codingPerson from "../../assets/lottie/codingPerson";
import StyleContext from "../../contexts/StyleContext";

export default function Education() {
  const {isDark} = useContext(StyleContext);
  if (educationInfo.display) {
    return (
      <div
        className={isDark ? "dark-mode education-section" : "education-section"}
        id="education"
      >
        <h1 className="education-heading" data-reveal="up">Education</h1>
        <div className="education-body">
          <div className="education-card-container">
            {educationInfo.schools.map((school, index) => (
              <div key={index} data-reveal="left" style={{transitionDelay: `${index * 0.18}s`}}>
                <EducationCard school={school} />
              </div>
            ))}
          </div>
          {illustration.animated && (
            <div className="education-lottie-div" data-reveal="right" style={{transitionDelay: "0.2s"}}>
              <DisplayLottie animationData={codingPerson} />
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}
