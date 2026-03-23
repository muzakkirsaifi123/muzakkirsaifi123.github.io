import React, {useState} from "react";
import "./Admin.scss";
import {
  greeting,
  socialMediaLinks,
  skillsSection,
  techStack,
  contactInfo
} from "../../portfolio";

/* ─── helpers ────────────────────────────────────────────────── */
function buildPortfolioJs(data) {
  return `/* Change this file to get your personal Portfolio */
// To change portfolio colors globally go to the _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation";

const splashScreen = { enabled: true, animation: splashAnimation, duration: 2000 };

const illustration = { animated: true };

const greeting = {
  username: ${JSON.stringify(data.username)},
  title: ${JSON.stringify(data.title)},
  subTitle: emoji(${JSON.stringify(data.subTitle)}),
  resumeLink: ${JSON.stringify(data.resumeLink)},
  displayGreeting: true
};

const socialMediaLinks = {
  github:   ${JSON.stringify(data.github)},
  linkedin: ${JSON.stringify(data.linkedin)},
  gmail:    ${JSON.stringify(data.gmail)},
  display: true
};

const skillsSection = {
  title: ${JSON.stringify(data.skillsTitle)},
  subTitle: ${JSON.stringify(data.skillsSubTitle)},
  skills: ${JSON.stringify(data.skills.filter(Boolean).map(s => s))},
  softwareSkills: ${JSON.stringify(
    data.softwareSkills.filter(s => s.skillName),
    null,
    2
  )},
  display: true
};

// ── Keep the rest of portfolio.js unchanged below this line ──
// (Work experience, education, achievements, etc. were not edited via admin)
`;
}

function downloadFile(content, filename) {
  const blob = new Blob([content], {type: "text/javascript"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ─── Component ─────────────────────────────────────────────── */
export default function Admin() {
  const [auth, setAuth] = useState(
    localStorage.getItem("admin_auth") === "yes"
  );
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState(false);

  /* form state initialised from current portfolio.js */
  const [form, setForm] = useState({
    username: greeting.username || "",
    title: greeting.title || "",
    subTitle:
      typeof greeting.subTitle === "string"
        ? greeting.subTitle
        : "",
    resumeLink: greeting.resumeLink || "",
    github: socialMediaLinks.github || "",
    linkedin: socialMediaLinks.linkedin || "",
    gmail: socialMediaLinks.gmail || "",
    skillsTitle: skillsSection.title || "",
    skillsSubTitle: skillsSection.subTitle || "",
    skills: skillsSection.skills
      ? skillsSection.skills.map(s =>
          typeof s === "string" ? s : s?.props?.children?.join?.("") || ""
        )
      : [""],
    softwareSkills: skillsSection.softwareSkills
      ? skillsSection.softwareSkills.map(s => ({
          skillName: s.skillName || "",
          fontAwesomeClassname: s.fontAwesomeClassname || ""
        }))
      : [{skillName: "", fontAwesomeClassname: ""}]
  });

  /* ── auth ── */
  function handleLogin(e) {
    e.preventDefault();
    const adminPass =
      process.env.REACT_APP_ADMIN_PASSWORD || "admin123";
    if (password === adminPass) {
      localStorage.setItem("admin_auth", "yes");
      setAuth(true);
    } else {
      alert("Wrong password. Set REACT_APP_ADMIN_PASSWORD in .env (default: admin123)");
    }
  }

  function handleLogout() {
    localStorage.removeItem("admin_auth");
    setAuth(false);
  }

  /* ── field helpers ── */
  function set(key, value) {
    setForm(f => ({...f, [key]: value}));
  }

  function setSkill(i, value) {
    const arr = [...form.skills];
    arr[i] = value;
    setForm(f => ({...f, skills: arr}));
  }

  function addSkill() {
    setForm(f => ({...f, skills: [...f.skills, ""]}));
  }

  function removeSkill(i) {
    setForm(f => ({...f, skills: f.skills.filter((_, idx) => idx !== i)}));
  }

  function setSoftSkill(i, key, value) {
    const arr = [...form.softwareSkills];
    arr[i] = {...arr[i], [key]: value};
    setForm(f => ({...f, softwareSkills: arr}));
  }

  function addSoftSkill() {
    setForm(f => ({
      ...f,
      softwareSkills: [
        ...f.softwareSkills,
        {skillName: "", fontAwesomeClassname: ""}
      ]
    }));
  }

  function removeSoftSkill(i) {
    setForm(f => ({
      ...f,
      softwareSkills: f.softwareSkills.filter((_, idx) => idx !== i)
    }));
  }

  /* ── export ── */
  function handleDownload() {
    const content = buildPortfolioJs(form);
    downloadFile(content, "portfolio.js");
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  /* ── login screen ── */
  if (!auth) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <h1 className="admin-logo">
            &lt;<span>Admin</span>/&gt;
          </h1>
          <p className="admin-login-hint">
            Default password: <code>admin123</code>
            <br />
            Set <code>REACT_APP_ADMIN_PASSWORD</code> in <code>.env</code> to
            change it.
          </p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              className="admin-input"
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
            <button type="submit" className="admin-btn admin-btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ── main admin UI ── */
  return (
    <div className="admin-page">
      <header className="admin-header">
        <span className="admin-logo">
          &lt;<span>Portfolio Admin</span>/&gt;
        </span>
        <div className="admin-header-actions">
          <a href="/" className="admin-btn admin-btn-ghost">
            View Site
          </a>
          <button
            className="admin-btn admin-btn-primary"
            onClick={handleDownload}
          >
            {saved ? "Downloaded!" : "Download portfolio.js"}
          </button>
          <button className="admin-btn admin-btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="admin-body">
        <div className="admin-notice">
          <strong>How to use:</strong> Edit fields below, click{" "}
          <em>Download portfolio.js</em>, then replace{" "}
          <code>src/portfolio.js</code> with the downloaded file. The dev server
          will hot-reload instantly.
        </div>

        {/* ── Greeting ── */}
        <section className="admin-section">
          <h2>Greeting / Hero</h2>
          <div className="admin-grid-2">
            <label>
              Username (nav logo)
              <input
                className="admin-input"
                value={form.username}
                onChange={e => set("username", e.target.value)}
              />
            </label>
            <label>
              Page title (H1)
              <input
                className="admin-input"
                value={form.title}
                onChange={e => set("title", e.target.value)}
              />
            </label>
          </div>
          <label>
            Bio subtitle
            <textarea
              className="admin-input admin-textarea"
              value={form.subTitle}
              onChange={e => set("subTitle", e.target.value)}
            />
          </label>
          <label>
            Resume link (Google Drive / PDF URL)
            <input
              className="admin-input"
              value={form.resumeLink}
              onChange={e => set("resumeLink", e.target.value)}
            />
          </label>
        </section>

        {/* ── Social ── */}
        <section className="admin-section">
          <h2>Social Media Links</h2>
          <div className="admin-grid-3">
            <label>
              GitHub URL
              <input
                className="admin-input"
                value={form.github}
                onChange={e => set("github", e.target.value)}
              />
            </label>
            <label>
              LinkedIn URL
              <input
                className="admin-input"
                value={form.linkedin}
                onChange={e => set("linkedin", e.target.value)}
              />
            </label>
            <label>
              Gmail address
              <input
                className="admin-input"
                value={form.gmail}
                onChange={e => set("gmail", e.target.value)}
              />
            </label>
          </div>
        </section>

        {/* ── Skills ── */}
        <section className="admin-section">
          <h2>Skills Section</h2>
          <div className="admin-grid-2">
            <label>
              Section title
              <input
                className="admin-input"
                value={form.skillsTitle}
                onChange={e => set("skillsTitle", e.target.value)}
              />
            </label>
            <label>
              Section subtitle / tagline
              <input
                className="admin-input"
                value={form.skillsSubTitle}
                onChange={e => set("skillsSubTitle", e.target.value)}
              />
            </label>
          </div>

          <h3>Skill bullet points</h3>
          {form.skills.map((s, i) => (
            <div key={i} className="admin-row-with-btn">
              <input
                className="admin-input"
                value={s}
                placeholder={`Skill ${i + 1}`}
                onChange={e => setSkill(i, e.target.value)}
              />
              <button
                className="admin-btn admin-btn-danger admin-btn-sm"
                onClick={() => removeSkill(i)}
              >
                Remove
              </button>
            </div>
          ))}
          <button className="admin-btn admin-btn-ghost" onClick={addSkill}>
            + Add bullet
          </button>

          <h3 style={{marginTop: "1.5rem"}}>
            Tool icons (Devicon / Font Awesome classes)
          </h3>
          <p className="admin-hint">
            Find classes at{" "}
            <a
              href="https://devicon.dev"
              target="_blank"
              rel="noreferrer"
            >
              devicon.dev
            </a>{" "}
            or{" "}
            <a
              href="https://fontawesome.com/icons"
              target="_blank"
              rel="noreferrer"
            >
              fontawesome.com/icons
            </a>
          </p>
          <div className="admin-skills-grid">
            {form.softwareSkills.map((sk, i) => (
              <div key={i} className="admin-skill-row">
                <input
                  className="admin-input"
                  placeholder="Tool name"
                  value={sk.skillName}
                  onChange={e => setSoftSkill(i, "skillName", e.target.value)}
                />
                <input
                  className="admin-input"
                  placeholder="Icon class (e.g. devicon-docker-plain colored)"
                  value={sk.fontAwesomeClassname}
                  onChange={e =>
                    setSoftSkill(i, "fontAwesomeClassname", e.target.value)
                  }
                />
                <i className={`${sk.fontAwesomeClassname} admin-icon-preview`} />
                <button
                  className="admin-btn admin-btn-danger admin-btn-sm"
                  onClick={() => removeSoftSkill(i)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <button
            className="admin-btn admin-btn-ghost"
            onClick={addSoftSkill}
            style={{marginTop: "8px"}}
          >
            + Add icon
          </button>
        </section>

        {/* ── Footer ── */}
        <div className="admin-footer">
          <button
            className="admin-btn admin-btn-primary admin-btn-lg"
            onClick={handleDownload}
          >
            {saved ? "Downloaded! Replace src/portfolio.js" : "Download portfolio.js"}
          </button>
          <p className="admin-hint">
            After replacing the file, run <code>npm run deploy</code> to publish.
          </p>
        </div>
      </div>
    </div>
  );
}
