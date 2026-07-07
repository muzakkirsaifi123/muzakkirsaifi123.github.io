import React, {useEffect, useState} from "react";
import "./ComingSoon.css";
import {greeting, socialMediaLinks, maintenanceMode} from "../../portfolio";

/* Same floating DevOps-icon backdrop used on the splash screen, kept here
   so this page still feels like part of the same site. */
const TOOLS = [
  {cls: "devicon-docker-plain colored", label: "Docker"},
  {cls: "devicon-kubernetes-plain colored", label: "Kubernetes"},
  {cls: "devicon-terraform-plain colored", label: "Terraform"},
  {cls: "devicon-jenkins-plain", label: "Jenkins"},
  {cls: "devicon-amazonwebservices-plain-wordmark colored", label: "AWS"},
  {cls: "devicon-azure-plain colored", label: "Azure"},
  {cls: "devicon-googlecloud-original colored", label: "GCP"},
  {cls: "devicon-ansible-plain", label: "Ansible"},
  {cls: "devicon-linux-plain", label: "Linux"},
  {cls: "devicon-python-plain colored", label: "Python"},
  {cls: "devicon-git-plain colored", label: "Git"},
  {cls: "devicon-github-original", label: "GitHub"},
];

function makeIcons() {
  const offsets = [
    [8, 15], [24, 8], [42, 18], [60, 6], [78, 16], [92, 10],
    [6, 62], [22, 78], [40, 68], [58, 80], [76, 66], [93, 76],
  ];
  return TOOLS.map((t, i) => {
    const [left, top] = offsets[i];
    return {
      ...t,
      left,
      top,
      dur: 7 + (i % 5) * 1.6,
      del: (i % 6) * 0.8,
      size: 26 + (i % 3) * 8,
      anim: ["cs-float", "cs-drift", "cs-float", "cs-spin"][i % 4]
    };
  });
}

const ICONS = makeIcons();

/* Rotates through the maintenance messages with a fade transition */
function useRotatingMessage(messages, interval = 2600) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!messages || messages.length < 2) return;
    const id = setInterval(() => {
      setIndex(i => (i + 1) % messages.length);
    }, interval);
    return () => clearInterval(id);
  }, [messages, interval]);
  return messages && messages.length ? messages[index] : "";
}

export default function ComingSoon() {
  const message = useRotatingMessage(maintenanceMode.messages);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    setFadeKey(k => k + 1);
  }, [message]);

  return (
    <div className="cs-root">
      <div className="cs-bg" aria-hidden="true">
        {ICONS.map((icon, i) => (
          <div
            key={i}
            className={`cs-tool ${icon.anim}`}
            style={{
              left: `${icon.left}%`,
              top: `${icon.top}%`,
              animationDuration: `${icon.dur}s`,
              animationDelay: `${icon.del}s`,
              fontSize: `${icon.size}px`
            }}
            title={icon.label}
          >
            <i className={icon.cls} />
          </div>
        ))}
        <div className="cs-orb cs-orb--1" />
        <div className="cs-orb cs-orb--2" />
        <div className="cs-orb cs-orb--3" />
      </div>

      <div className="cs-center">
        <div className="cs-badge">
          <i className="fas fa-tools cs-badge-icon" />
          Under Maintenance
        </div>

        <div className="cs-name-row">
          <span className="cs-bracket">&lt;</span>
          <span className="cs-name">{greeting.username}</span>
          <span className="cs-bracket">/&gt;</span>
        </div>

        <h1 className="cs-heading">{maintenanceMode.heading}</h1>

        <p key={fadeKey} className="cs-message cs-fade-in">
          {message}
        </p>

        <div className="cs-bar-wrap">
          <div className="cs-bar-indeterminate" />
        </div>

        <p className="cs-subtext">
          The portfolio is getting a fresh coat of paint. Please check back
          soon &mdash; in the meantime, feel free to reach out.
        </p>

        <div className="cs-social">
          {socialMediaLinks.github && (
            <a
              href={socialMediaLinks.github}
              className="cs-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i className="fab fa-github" />
            </a>
          )}
          {socialMediaLinks.linkedin && (
            <a
              href={socialMediaLinks.linkedin}
              className="cs-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in" />
            </a>
          )}
          {socialMediaLinks.gmail && (
            <a
              href={`mailto:${socialMediaLinks.gmail}`}
              className="cs-social-link"
              aria-label="Email"
            >
              <i className="fas fa-envelope" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
