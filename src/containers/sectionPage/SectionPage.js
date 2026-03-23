import React, {useState, useEffect} from "react";
import "./SectionPage.scss";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import {StyleProvider} from "../../contexts/StyleContext";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import Skills from "../skills/Skills";
import StackProgress from "../skillProgress/skillProgress";
import WorkExperience from "../workExperience/WorkExperience";
import StartupProject from "../StartupProjects/StartupProject";
import Achievement from "../achievement/Achievement";
import Education from "../education/Education";
import Footer from "../../components/footer/Footer";
import {greeting} from "../../portfolio";
import codingPerson from "../../assets/lottie/codingPerson";
import buildLottie from "../../assets/lottie/build";
import landingPerson from "../../assets/lottie/landingPerson";
import emailLottie from "../../assets/lottie/email";
import splashAnim from "../../assets/lottie/splashAnimation";

const SECTIONS = {
  skills: {
    label: "Skills",
    subtitle: "Technologies & Tools",
    lottie: codingPerson,
    components: [Skills, StackProgress]
  },
  experience: {
    label: "Experience",
    subtitle: "Where I've worked",
    lottie: buildLottie,
    components: [WorkExperience]
  },
  projects: {
    label: "Projects",
    subtitle: "Things I've built",
    lottie: landingPerson,
    components: [StartupProject]
  },
  achievements: {
    label: "Achievements",
    subtitle: "Certifications & Awards",
    lottie: splashAnim,
    components: [Achievement]
  },
  education: {
    label: "Education",
    subtitle: "Academic Background",
    lottie: codingPerson,
    components: [Education]
  },
  contact: {
    label: "Contact",
    subtitle: "Let's Connect",
    lottie: emailLottie,
    components: [Footer]
  }
};

export default function SectionPage({section}) {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const info = SECTIONS[section];
  if (!info) {
    window.location.hash = "";
    return null;
  }

  const goHome = () => {
    window.location.hash = "";
  };

  return (
    <div className={isDark ? "dark-mode section-page" : "section-page"}>
      <StyleProvider value={{isDark, changeTheme: () => setIsDark(!isDark)}}>
        {/* ── Top bar ── */}
        <header className={isDark ? "dark-menu sp-topbar" : "sp-topbar"}>
          <button className="sp-back-btn" onClick={goHome}>
            ← Home
          </button>
          <a className="sp-logo">
            <span className="grey-color">&lt;</span>
            <span className="sp-logo-name">{greeting.username}</span>
            <span className="grey-color">/&gt;</span>
          </a>
          <div className="sp-toggle">
            <ToggleSwitch />
          </div>
        </header>

        {/* ── Hero ── */}
        <div className={`sp-hero ${visible ? "sp-hero--visible" : ""}`}>
          <div className="sp-hero-lottie">
            <DisplayLottie animationData={info.lottie} />
          </div>
          <div className="sp-hero-text">
            <h1 className="sp-title">{info.label}</h1>
            <p className="sp-subtitle">{info.subtitle}</p>
          </div>
        </div>

        {/* ── Content ── */}
        <div className={`sp-content ${visible ? "sp-content--visible" : ""}`}>
          {info.components.map((Component, i) => (
            <Component key={i} />
          ))}
        </div>
      </StyleProvider>
    </div>
  );
}
