import React, {useContext, useEffect, useState, useCallback} from "react";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import NavTransition from "../navTransition/NavTransition";
import codingPerson from "../../assets/lottie/codingPerson";
import buildLottie from "../../assets/lottie/build";
import landingPerson from "../../assets/lottie/landingPerson";
import emailLottie from "../../assets/lottie/email";
import splashAnim from "../../assets/lottie/splashAnimation";
import {
  greeting,
  workExperiences,
  skillsSection,
  openSource,
  blogSection,
  talkSection,
  achievementSection
} from "../../portfolio";

const SECTION_LOTTIE = {
  skills: {label: "Skills", lottie: codingPerson},
  experience: {label: "Experience", lottie: buildLottie},
  projects: {label: "Projects", lottie: landingPerson},
  achievements: {label: "Achievements", lottie: splashAnim},
  blogs: {label: "Blogs", lottie: buildLottie},
  talks: {label: "Talks", lottie: codingPerson},
  contact: {label: "Contact", lottie: emailLottie}
};

function Header() {
  const {isDark} = useContext(StyleContext);
  const viewExperience = workExperiences.display;
  const viewOpenSource = openSource.display;
  const viewSkills = skillsSection.display;
  const viewAchievement = achievementSection.display;
  const viewBlog = blogSection.display;
  const viewTalks = talkSection.display;
  const [activeSection, setActiveSection] = useState("");
  const [transition, setTransition] = useState(null); // {label, lottie, href}

  useEffect(() => {
    const sectionIds = ["greeting", "skills", "experience", "projects", "achievements", "blogs", "talks", "contact"];
    const observers = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        {threshold: 0.3, rootMargin: "-60px 0px -40% 0px"}
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    const info = SECTION_LOTTIE[sectionId];
    if (!info) return;
    setTransition({...info, sectionId});
    // close mobile menu
    const btn = document.getElementById("menu-btn");
    if (btn) btn.checked = false;
  }, []);

  const handleTransitionDone = useCallback(() => {
    const sectionId = transition?.sectionId;
    setTransition(null);
    if (sectionId) window.location.hash = `#/${sectionId}`;
  }, [transition]);

  const navLink = (href, label, sectionId) => (
    <a
      href={`#/${sectionId}`}
      className={activeSection === sectionId ? "active" : ""}
      onClick={e => handleNavClick(e, sectionId)}
    >
      {label}
    </a>
  );

  return (
    <>
      {transition && (
        <NavTransition section={transition} onDone={handleTransitionDone} />
      )}
      <Headroom>
        <header className={isDark ? "dark-menu header" : "header"}>
          <a href="/" className="logo">
            <span className="grey-color"> &lt;</span>
            <span className="logo-name">{greeting.username}</span>
            <span className="grey-color">/&gt;</span>
          </a>
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label
            className="menu-icon"
            htmlFor="menu-btn"
            style={{color: "white"}}
          >
            <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
          </label>
          <ul className={isDark ? "dark-menu menu" : "menu"}>
            {viewSkills && (
              <li>{navLink("#skills", "Skills", "skills")}</li>
            )}
            {viewExperience && (
              <li>{navLink("#experience", "Work Experiences", "experience")}</li>
            )}
            {viewOpenSource && (
              <li>{navLink("#projects", "Projects", "projects")}</li>
            )}
            {viewAchievement && (
              <li>{navLink("#achievements", "Achievements", "achievements")}</li>
            )}
            {viewBlog && (
              <li>{navLink("#blogs", "Blogs", "blogs")}</li>
            )}
            {viewTalks && (
              <li>{navLink("#talks", "Talks", "talks")}</li>
            )}
            <li>{navLink("#contact", "Contact Me", "contact")}</li>
            <li>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <ToggleSwitch />
              </a>
            </li>
          </ul>
        </header>
      </Headroom>
    </>
  );
}
export default Header;
