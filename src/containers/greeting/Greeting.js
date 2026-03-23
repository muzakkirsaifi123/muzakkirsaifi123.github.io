import React, {useContext, useEffect, useState} from "react";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
import landingPerson from "../../assets/lottie/landingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";

import {illustration, greeting} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

// Define titles outside the component
const titles = ["DevOps Engineer. .", "Cloud Engineer. .", "Blogger. ."];

const stats = [
  {value: "4+", label: "Years Experience"},
  {value: "3", label: "Clouds (AWS/Azure/GCP)"},
  {value: "5+", label: "Certifications"},
  {value: "15+", label: "Projects Delivered"}
];

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typingIndex < titles[titleIndex].length) {
        setCurrentTitle(
          prevTitle => prevTitle + titles[titleIndex][typingIndex]
        );
        setTypingIndex(prevIndex => prevIndex + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setTypingIndex(0);
          setCurrentTitle("");
          setTitleIndex(prevIndex => (prevIndex + 1) % titles.length);
        }, 700); // Wait for 2 seconds before typing the next title
      }
    }, 150); // Typing speed: 100 milliseconds per letter

    return () => clearInterval(interval);
  }, [titleIndex, typingIndex]);

  if (!greeting.displayGreeting) {
    return null;
  }

  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        {/* Decorative background blobs */}
        <div className="hero-blob hero-blob-1" aria-hidden="true" />
        <div className="hero-blob hero-blob-2" aria-hidden="true" />

        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              {/* Open-to-work badge */}
              <span
                className={
                  isDark ? "dark-mode hire-badge" : "hire-badge"
                }
              >
                <span className="hire-dot" />
                Senior DevOps Engineer
              </span>

              <h1
                className={isDark ? "dark-mode greeting-text" : "greeting-text"}
              >
                {greeting.title}{" "}
                <span className="wave-emoji">{emoji("👋")}</span>
              </h1>
              <h2 className="greeting-title2">
                I am a {currentTitle}
                <span className="cursor-blink">|</span>
              </h2>
              <p
                className={
                  isDark
                    ? "dark-mode greeting-text-p"
                    : "greeting-text-p subTitle"
                }
              >
                {greeting.subTitle}
              </p>
              <SocialMedia />
              <div className="button-greeting-div">
                <Button text="Contact me" href="#contact" />
                {greeting.resumeLink && (
                  <Button
                    text="See my resume"
                    newTab={true}
                    href={greeting.resumeLink}
                  />
                )}
              </div>

              {/* Stats bar */}
              <div
                className={
                  isDark ? "dark-mode hero-stats" : "hero-stats"
                }
              >
                {stats.map((s, i) => (
                  <div key={i} className="hero-stat-item">
                    <span className="hero-stat-value">{s.value}</span>
                    <span className="hero-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="greeting-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={landingPerson} />
            ) : (
              <img
                alt="man sitting on table"
                src={require("../../assets/images/manOnTable.svg")}
              ></img>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}

