import React, {useContext, useEffect, useState} from "react";
import "./SplashScreen.css";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import {greeting, splashScreen} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

/* DevOps / DevSecOps tools shown as floating icons */
const TOOLS = [
  {cls: "devicon-docker-plain colored",                    label: "Docker"},
  {cls: "devicon-kubernetes-plain colored",                label: "Kubernetes"},
  {cls: "devicon-terraform-plain colored",                 label: "Terraform"},
  {cls: "devicon-jenkins-plain",                           label: "Jenkins"},
  {cls: "devicon-amazonwebservices-plain-wordmark colored", label: "AWS"},
  {cls: "devicon-azure-plain colored",                     label: "Azure"},
  {cls: "devicon-googlecloud-original colored",            label: "GCP"},
  {cls: "devicon-ansible-plain",                           label: "Ansible"},
  {cls: "devicon-linux-plain",                             label: "Linux"},
  {cls: "devicon-python-plain colored",                    label: "Python"},
  {cls: "devicon-git-plain colored",                       label: "Git"},
  {cls: "devicon-github-original",                         label: "GitHub"},
  {cls: "devicon-prometheus-original colored",             label: "Prometheus"},
  {cls: "devicon-grafana-original colored",                label: "Grafana"},
  {cls: "devicon-helm-plain colored",                      label: "Helm"},
  {cls: "devicon-bash-plain",                              label: "Bash"},
  {cls: "devicon-gitlab-plain colored",                    label: "GitLab"},
  {cls: "devicon-nginx-original colored",                  label: "Nginx"},
];

/* Deterministic placement — spread icons evenly so they don't cluster */
function makeIcons() {
  const cols = 6, rows = 3;
  const cellW = 100 / cols, cellH = 100 / rows;
  const offsets = [
    // row 0
    [12,18],[28,8],[46,14],[62,6],[78,20],[90,12],
    // row 1
    [5,45],[22,52],[40,42],[58,55],[75,44],[92,50],
    // row 2
    [10,72],[26,80],[44,68],[60,76],[80,82],[95,70],
  ];
  return TOOLS.map((t, i) => {
    const [left, top] = offsets[i] || [Math.random()*90, Math.random()*80];
    const dur  = 6 + (i % 5) * 1.8;
    const del  = (i % 7) * 0.9;
    const size = 28 + (i % 3) * 8;   // 28 / 36 / 44 px
    const anim = ["sp-float","sp-drift","sp-float","sp-spin","sp-float","sp-drift"][i % 6];
    return {...t, left, top, dur, del, size, anim};
  });
}

const ICONS = makeIcons();

/* Typewriter hook */
function useTypewriter(words, speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [wi, setWi]     = useState(0);
  const [ci, setCi]     = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wi];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, ci + 1));
        if (ci + 1 === word.length) setTimeout(() => setDeleting(true), pause);
        else setCi(c => c + 1);
      } else {
        setText(word.slice(0, ci - 1));
        if (ci - 1 === 0) {
          setDeleting(false);
          setWi(w => (w + 1) % words.length);
          setCi(0);
        } else {
          setCi(c => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [ci, deleting, wi, words, speed, pause]);

  return text;
}

export default function SplashScreen() {
  const {isDark} = useContext(StyleContext);
  const typed    = useTypewriter(["DevOps Engineer", "DevSecOps Engineer", "Cloud Architect", "SRE Enthusiast"]);
  const [progress, setProgress] = useState(0);

  /* Animate loading bar */
  useEffect(() => {
    const total = splashScreen.duration || 2000;
    const step  = 30;
    let elapsed = 0;
    const id = setInterval(() => {
      elapsed += step;
      setProgress(Math.min(100, Math.round((elapsed / total) * 100)));
      if (elapsed >= total) clearInterval(id);
    }, step);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`sp-root${isDark ? " sp-root--dark" : ""}`}>

      {/* ── Background: flying DevOps tool icons ── */}
      <div className="sp-bg" aria-hidden="true">
        {ICONS.map((icon, i) => (
          <div
            key={i}
            className={`sp-tool ${icon.anim}`}
            style={{
              left:              `${icon.left}%`,
              top:               `${icon.top}%`,
              animationDuration: `${icon.dur}s`,
              animationDelay:    `${icon.del}s`,
              fontSize:          `${icon.size}px`,
            }}
            title={icon.label}
          >
            <i className={icon.cls} />
          </div>
        ))}

        {/* Radial glow orbs */}
        <div className="sp-orb sp-orb--1" />
        <div className="sp-orb sp-orb--2" />
        <div className="sp-orb sp-orb--3" />
      </div>

      {/* ── Centre content ── */}
      <div className="sp-center">
        {/* Lottie */}
        <div className="sp-lottie">
          <DisplayLottie animationData={splashScreen.animation} />
        </div>

        {/* Name */}
        <div className="sp-name-row">
          <span className="sp-bracket">&lt;</span>
          <span className="sp-name">{greeting.username}</span>
          <span className="sp-bracket">/&gt;</span>
        </div>

        {/* Typewriter subtitle */}
        <p className="sp-subtitle">
          {typed}<span className="sp-cursor">|</span>
        </p>

        {/* Loading bar */}
        <div className="sp-bar-wrap">
          <div className="sp-bar" style={{width: `${progress}%`}} />
        </div>
      </div>
    </div>
  );
}
