import React, {useContext, useEffect, useState, useCallback, useRef} from "react";
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
  skills:       {label: "Skills",        lottie: codingPerson,  icon: "fas fa-code"},
  experience:   {label: "Experience",    lottie: buildLottie,   icon: "fas fa-briefcase"},
  projects:     {label: "Projects",      lottie: landingPerson, icon: "fas fa-rocket"},
  achievements: {label: "Achievements",  lottie: splashAnim,    icon: "fas fa-trophy"},
  blogs:        {label: "Blogs",         lottie: buildLottie,   icon: "fas fa-pen-nib"},
  talks:        {label: "Talks",         lottie: codingPerson,  icon: "fas fa-microphone"},
  contact:      {label: "Contact Me",    lottie: emailLottie,   icon: "fas fa-envelope"}
};

function Header() {
  const {isDark}       = useContext(StyleContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [transition, setTransition]       = useState(null);
  const pendingSectionRef = useRef(null);
  const panelRef          = useRef(null);
  const btnRef            = useRef(null);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const ids = ["greeting","skills","experience","projects","achievements","blogs","talks","contact"];
    const obs = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        {threshold: 0.3, rootMargin: "-60px 0px -40% 0px"}
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o && o.disconnect());
  }, []);

  /* Close panel on click outside */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = e => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        btnRef.current   && !btnRef.current.contains(e.target)
      ) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  /* Close on Escape */
  useEffect(() => {
    const handler = e => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    const info = SECTION_LOTTIE[sectionId];
    if (!info) return;
    setMenuOpen(false);
    pendingSectionRef.current = sectionId;
    setTransition({...info, sectionId});
  }, []);

  const handleTransitionDone = useCallback(() => {
    const sectionId = pendingSectionRef.current;
    pendingSectionRef.current = null;
    setTransition(null);
    if (sectionId) window.location.hash = `#/${sectionId}`;
  }, []);

  /* Build nav items list */
  const navItems = [
    skillsSection.display     && {id: "skills",       ...SECTION_LOTTIE.skills},
    workExperiences.display   && {id: "experience",   ...SECTION_LOTTIE.experience},
    openSource.display        && {id: "projects",     ...SECTION_LOTTIE.projects},
    achievementSection.display&& {id: "achievements", ...SECTION_LOTTIE.achievements},
    blogSection.display       && {id: "blogs",        ...SECTION_LOTTIE.blogs},
    talkSection.display       && {id: "talks",        ...SECTION_LOTTIE.talks},
                                 {id: "contact",      ...SECTION_LOTTIE.contact},
  ].filter(Boolean);

  return (
    <>
      {transition && (
        <NavTransition section={transition} onDone={handleTransitionDone} />
      )}

      <div className="header-sticky">
        <header className={isDark ? "dark-menu header" : "header"}>
          {/* Logo */}
          <a href="/" className="logo">
            <span className="grey-color">&lt;</span>
            <span className="logo-name">{greeting.username}</span>
            <span className="grey-color">/&gt;</span>
          </a>

          {/* Right controls */}
          <div className="hdr-controls">
            <ToggleSwitch />

            {/* Hamburger button */}
            <button
              ref={btnRef}
              className={`hdr-menu-btn${menuOpen ? " hdr-menu-btn--open" : ""}${isDark ? " hdr-menu-btn--dark" : ""}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              <span className="hdr-bar hdr-bar--1" />
              <span className="hdr-bar hdr-bar--2" />
              <span className="hdr-bar hdr-bar--3" />
            </button>
          </div>
        </header>

        {/* Floating nav panel */}
        {menuOpen && (
          <nav
            ref={panelRef}
            className={`hdr-panel${isDark ? " hdr-panel--dark" : ""}`}
          >
            {navItems.map((item, i) => (
              <a
                key={item.id}
                href={`#/${item.id}`}
                className={`hdr-nav-item${activeSection === item.id ? " hdr-nav-item--active" : ""}`}
                style={{animationDelay: `${i * 0.055}s`}}
                onClick={e => handleNavClick(e, item.id)}
              >
                <span className="hdr-nav-icon"><i className={item.icon} /></span>
                <span className="hdr-nav-label">{item.label}</span>
              </a>
            ))}
          </nav>
        )}
      </div>
    </>
  );
}

export default Header;
