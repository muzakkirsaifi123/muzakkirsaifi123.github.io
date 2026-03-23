import React, {useState, useEffect} from "react";
import "./SectionPage.scss";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import useScrollReveal from "../../hooks/useScrollReveal";
import {StyleProvider} from "../../contexts/StyleContext";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import Skills from "../skills/Skills";
import StackProgress from "../skillProgress/skillProgress";
import WorkExperience from "../workExperience/WorkExperience";
import StartupProject from "../StartupProjects/StartupProject";
import Achievement from "../achievement/Achievement";
import Education from "../education/Education";
import Blogs from "../blogs/Blogs";
import Footer from "../../components/footer/Footer";
import Contact from "../contact/Contact";
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
  blogs: {
    label: "Blogs",
    subtitle: "My writing & articles",
    lottie: buildLottie,
    components: [Blogs]
  },
  contact: {
    label: "Contact",
    subtitle: "Let's Connect",
    lottie: emailLottie,
    components: [Contact, Footer]
  }
};

export default function SectionPage({section}) {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [visible, setVisible] = useState(false);
  useScrollReveal();

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
    window.history.pushState("", "", window.location.pathname + window.location.search);
    window.dispatchEvent(new Event("hashchange"));
  };

  const goSection = sectionId => {
    window.history.pushState("", "", `${window.location.pathname}${window.location.search}#/${sectionId}`);
    window.dispatchEvent(new Event("hashchange"));
  };

  const NAV_ITEMS = [
    {id: "skills", label: "Skills"},
    {id: "experience", label: "Experience"},
    {id: "projects", label: "Projects"},
    {id: "achievements", label: "Achievements"},
    {id: "blogs", label: "Blogs"},
    {id: "contact", label: "Contact"}
  ];

  return (
    <div className={isDark ? "dark-mode section-page" : "section-page"}>
      <StyleProvider value={{isDark, changeTheme: () => setIsDark(!isDark)}}>
        {/* ── Top bar ── */}
        <header className={isDark ? "dark-menu sp-topbar" : "sp-topbar"}>
          <button className="sp-back-btn" onClick={goHome} title="Go Home">
            <span className="sp-back-bracket">&lt;</span>
            <span className="sp-back-name">{greeting.username}</span>
            <span className="sp-back-bracket">/&gt;</span>
          </button>
          <nav className="sp-nav">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`sp-nav-link${section === item.id ? " sp-nav-link--active" : ""}`}
                onClick={() => goSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
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
