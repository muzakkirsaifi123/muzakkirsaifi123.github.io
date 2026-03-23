import React, {useState, useRef} from "react";
// Reuse OwnAdmin's polished stylesheet — same layout, consistent look
import "../ownadmin/OwnAdmin.scss";
import {
  greeting,
  socialMediaLinks,
  skillsSection,
  techStack,
  workExperiences,
  educationInfo,
  bigProjects,
  achievementSection,
  blogSection,
  contactInfo
} from "../../portfolio";

/* ─────────────────────────────────────────────────────────────
   Image reference helper for generated portfolio.js
   - Local path  (./assets/...)  → require("path")
   - External URL (http/https)   → "url"  (plain string)
   - Empty                       → null
──────────────────────────────────────────────────────────────*/
function imgRef(val) {
  if (!val) return "null";
  if (val.startsWith("http") || val.startsWith("//") || val.startsWith("data:"))
    return JSON.stringify(val);
  return `require("${val}")`;
}

/* ─────────────────────────────────────────────────────────────
   portfolio.js generator
──────────────────────────────────────────────────────────────*/
function buildPortfolioJs(d) {
  const heroStatsJs = (d.heroStats || [])
    .filter(s => s.value || s.label)
    .map(s => `    { value: ${JSON.stringify(s.value)}, label: ${JSON.stringify(s.label)} }`)
    .join(",\n");

  const softSkillsJs = d.softwareSkills
    .filter(s => s.skillName)
    .map(s => {
      const parts = [`skillName: ${JSON.stringify(s.skillName)}`];
      if (s.fontAwesomeClassname) parts.push(`fontAwesomeClassname: ${JSON.stringify(s.fontAwesomeClassname)}`);
      if (s.imageUrl) parts.push(`imageUrl: ${JSON.stringify(s.imageUrl)}`);
      return `    { ${parts.join(", ")} }`;
    })
    .join(",\n");

  const schoolsJs = d.schools
    .filter(s => s.schoolName)
    .map(s => `    {
      schoolName: ${JSON.stringify(s.schoolName)},
      logo: ${imgRef(s.logoPath)},
      subHeader: ${JSON.stringify(s.subHeader)},
      duration: ${JSON.stringify(s.duration)},
      desc: ${JSON.stringify(s.desc)},
      descBullets: ${JSON.stringify(s.descBullets.filter(Boolean))}
    }`)
    .join(",\n");

  const profJs = d.proficiency
    .filter(p => p.stack)
    .map(p => `    { Stack: ${JSON.stringify(p.stack)}, progressPercentage: ${JSON.stringify(p.percent)} }`)
    .join(",\n");

  const expJs = d.experiences
    .filter(e => e.role)
    .map(e => `    {
      role: ${JSON.stringify(e.role)},
      company: ${JSON.stringify(e.company)},
      companylogo: ${imgRef(e.logoPath)},
      date: ${JSON.stringify(e.date)},
      desc: ${JSON.stringify(e.desc)},
      descBullets: ${JSON.stringify(e.descBullets.filter(Boolean))}
    }`)
    .join(",\n");

  const projJs = d.projects
    .filter(p => p.projectName)
    .map(p => `    {
      image: ${imgRef(p.imagePath)},
      projectName: ${JSON.stringify(p.projectName)},
      projectDesc: ${JSON.stringify(p.projectDesc)},
      footerLink: ${JSON.stringify(p.footerLinks.filter(l => l.name))}
    }`)
    .join(",\n");

  const achJs = d.achievements
    .filter(a => a.title)
    .map(a => `    {
      title: ${JSON.stringify(a.title)},
      subtitle: ${JSON.stringify(a.subtitle)},
      image: ${imgRef(a.imagePath)},
      imageAlt: ${JSON.stringify(a.title)},
      footerLink: ${JSON.stringify(a.footerLinks.filter(l => l.name))}
    }`)
    .join(",\n");

  const blogsJs = d.blogs
    .filter(b => b.title)
    .map(b => `    {
      url: ${JSON.stringify(b.url)},
      title: ${JSON.stringify(b.title)},
      description: ${JSON.stringify(b.description)}
    }`)
    .join(",\n");

  return `/* Change this file to get your personal Portfolio */
// To change portfolio colors globally go to the _globalColor.scss file

import splashAnimation from "./assets/lottie/splashAnimation";

const splashScreen = { enabled: true, animation: splashAnimation, duration: 2000 };

const illustration = { animated: true };

const greeting = {
  username: ${JSON.stringify(d.username)},
  title: ${JSON.stringify(d.title)},
  subTitle: ${JSON.stringify(d.subTitle)},
  resumeLink: ${JSON.stringify(d.resumeLink)},
  heroStats: [
${heroStatsJs}
  ],
  displayGreeting: true
};

const socialMediaLinks = {
  github:   ${JSON.stringify(d.github)},
  linkedin: ${JSON.stringify(d.linkedin)},
  gmail:    ${JSON.stringify(d.gmail)},
  display: true
};

const skillsSection = {
  title: ${JSON.stringify(d.skillsTitle)},
  subTitle: ${JSON.stringify(d.skillsSubTitle)},
  skills: ${JSON.stringify(d.skills.filter(Boolean))},
  softwareSkills: [
${softSkillsJs}
  ],
  display: true
};

const educationInfo = {
  display: true,
  schools: [
${schoolsJs}
  ]
};

const techStack = {
  viewSkillBars: true,
  experience: [
${profJs}
  ],
  displayCodersrank: false
};

const workExperiences = {
  display: true,
  experience: [
${expJs}
  ]
};

const openSource = {
  showGithubProfile: "true",
  display: true
};

const bigProjects = {
  title: ${JSON.stringify(d.projectsTitle)},
  subtitle: ${JSON.stringify(d.projectsSubtitle)},
  projects: [
${projJs}
  ],
  display: true
};

const achievementSection = {
  title: ${JSON.stringify(d.achievementsTitle)},
  subtitle: ${JSON.stringify(d.achievementsSubtitle)},
  achievementsCards: [
${achJs}
  ],
  display: true
};

const blogSection = {
  title: ${JSON.stringify(d.blogsTitle)},
  subtitle: ${JSON.stringify(d.blogsSubtitle)},
  displayMediumBlogs: "false",
  blogs: [
${blogsJs}
  ],
  display: true
};

const talkSection    = { title: "TALKS", talks: [], display: false };
const podcastSection = { title: "Podcast", podcast: [], display: false };

const contactInfo = {
  title: "Contact Me",
  subtitle: ${JSON.stringify(d.contactSubtitle)},
  email_address: ${JSON.stringify(d.gmail)}
};

const twitterDetails = { userName: "twitter", display: false };
const isHireable = false;

export {
  illustration, greeting, socialMediaLinks, splashScreen,
  skillsSection, educationInfo, techStack, workExperiences,
  openSource, bigProjects, achievementSection, blogSection,
  talkSection, podcastSection, contactInfo, twitterDetails, isHireable
};
`;
}

function downloadFile(content, filename) {
  const blob = new Blob([content], {type: "text/javascript"});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

/* ─────────────────────────────────────────────────────────────
   Extract plain text from emoji() React elements
──────────────────────────────────────────────────────────────*/
function emojiToText(val) {
  if (typeof val === "string") return val;
  if (Array.isArray(val)) return val.map(emojiToText).filter(x => typeof x === "string").join("");
  if (val && typeof val === "object" && val.props) return emojiToText(val.props.children);
  return "";
}

/* ─────────────────────────────────────────────────────────────
   Known local asset paths
──────────────────────────────────────────────────────────────*/
const LOGO_MAP = {Knoldus: "./assets/images/knol.png", Nashtech: "./assets/images/nash.png"};
const PROJECT_IMG_MAP = {"EMS-Duck Creek": "./assets/images/DCT.webp", "3-tier logic": "./assets/images/3TL.png"};
const SCHOOL_IMG_MAP = {"Dr. A.P.J Abdul Kalam University, Lucknow": "./assets/images/logo.png"};
const CERT_IMG_MAP = {
  "Google Associate Certificate": "./assets/images/GCP_associate_certficate.png",
  "Microsoft Certified: DevOps Engineer Expert": "./assets/images/badge-devops-expert.webp",
  "Microsoft Certified: Azure Database Administrator Associate": "./assets/images/microsoft-certified-associate.webp",
  "Microsoft Certified: Azure Fundamentals": "./assets/images/azure_fun.webp",
  "Microsoft Certified: Security, Compliance, and Identity Fundamentals": "./assets/images/azure_fun.webp"
};

function buildInitial() {
  return {
    /* greeting */
    username:   greeting.username || "",
    title:      greeting.title    || "",
    subTitle:   emojiToText(greeting.subTitle),
    resumeLink: greeting.resumeLink || "",
    heroStats: (greeting.heroStats || []).map(s => ({value: s.value || "", label: s.label || ""})),
    /* social */
    github:   socialMediaLinks.github   || "",
    linkedin: socialMediaLinks.linkedin || "",
    gmail:    socialMediaLinks.gmail    || "",
    /* contact */
    contactSubtitle: contactInfo?.subtitle || "Discuss a project or just want to say hi? My Inbox is open for all.",
    /* skills */
    skillsTitle:    skillsSection.title    || "",
    skillsSubTitle: skillsSection.subTitle || "",
    skills: (skillsSection.skills || []).map(emojiToText),
    softwareSkills: (skillsSection.softwareSkills || []).map(s => ({
      skillName:            s.skillName            || "",
      fontAwesomeClassname: s.fontAwesomeClassname || "",
      imageUrl:             s.imageUrl             || ""
    })),
    /* proficiency */
    proficiency: (techStack?.experience || []).map(p => ({
      stack:   p.Stack             || "",
      percent: p.progressPercentage || "70%"
    })),
    /* experience */
    experiences: (workExperiences?.experience || []).map(e => ({
      role:        e.role        || "",
      company:     e.company     || "",
      logoPath:    LOGO_MAP[e.company] || "",
      date:        e.date        || "",
      desc:        e.desc        || "",
      descBullets: e.descBullets ? [...e.descBullets] : [""]
    })),
    /* education */
    schools: (educationInfo?.schools || []).map(s => ({
      schoolName:  s.schoolName  || "",
      logoPath:    SCHOOL_IMG_MAP[s.schoolName] || "",
      subHeader:   s.subHeader   || "",
      duration:    s.duration    || "",
      desc:        s.desc        || "",
      descBullets: s.descBullets ? [...s.descBullets] : [""]
    })),
    /* projects */
    projectsTitle:    bigProjects?.title    || "Big Projects",
    projectsSubtitle: bigProjects?.subtitle || "",
    projects: (bigProjects?.projects || []).map(p => ({
      projectName: p.projectName || "",
      imagePath:   PROJECT_IMG_MAP[p.projectName] || "",
      projectDesc: p.projectDesc || "",
      footerLinks: p.footerLink?.length
        ? p.footerLink.map(l => ({name: l.name || "", url: l.url || ""}))
        : [{name: "", url: ""}]
    })),
    /* achievements */
    achievementsTitle:    emojiToText(achievementSection?.title) || "Achievements And Certifications",
    achievementsSubtitle: achievementSection?.subtitle           || "",
    achievements: (achievementSection?.achievementsCards || []).map(a => ({
      title:       a.title    || "",
      imagePath:   CERT_IMG_MAP[a.title] || "",
      subtitle:    a.subtitle || "",
      footerLinks: a.footerLink?.length
        ? a.footerLink.map(l => ({name: l.name || "", url: l.url || ""}))
        : [{name: "", url: ""}]
    })),
    /* blogs */
    blogsTitle:    blogSection?.title    || "Blogs",
    blogsSubtitle: blogSection?.subtitle || "",
    blogs: (blogSection?.blogs || []).map(b => ({
      title:       b.title       || "",
      url:         b.url         || "",
      description: b.description || ""
    }))
  };
}

/* ─────────────────────────────────────────────────────────────
   Tabs
──────────────────────────────────────────────────────────────*/
const TABS = [
  {id: "profile",      label: "Profile"},
  {id: "skills",       label: "Skills"},
  {id: "skillicons",   label: "Skill Icons"},
  {id: "proficiency",  label: "Proficiency"},
  {id: "experience",   label: "Experience"},
  {id: "education",    label: "Education"},
  {id: "achievements", label: "Achievements"},
  {id: "blogs",        label: "Blogs"},
  {id: "projects",     label: "Projects"}
];

/* ─────────────────────────────────────────────────────────────
   Component
──────────────────────────────────────────────────────────────*/
export default function Admin() {
  const [auth, setAuth]     = useState(localStorage.getItem("admin_auth") === "yes");
  const [password, setPassword] = useState("");
  const [tab, setTab]       = useState("profile");
  const [form, setForm]     = useState(buildInitial);
  const [downloaded, setDownloaded] = useState(false);

  /* ── auth ── */
  function handleLogin(e) {
    e.preventDefault();
    const pass = process.env.REACT_APP_ADMIN_PASSWORD || "admin123";
    if (password === pass) { localStorage.setItem("admin_auth", "yes"); setAuth(true); }
    else alert("Wrong password. Default: admin123");
  }
  function handleLogout() { localStorage.removeItem("admin_auth"); setAuth(false); }

  /* ── generic helpers ── */
  const set = (key, val) => setForm(f => ({...f, [key]: val}));

  const setItem = (key, index, subKey, val) =>
    setForm(f => {
      const arr = [...f[key]];
      arr[index] = {...arr[index], [subKey]: val};
      return {...f, [key]: arr};
    });

  const addItem = (key, template) => setForm(f => ({...f, [key]: [...f[key], {...template}]}));

  const removeItem = (key, index) =>
    setForm(f => ({...f, [key]: f[key].filter((_, i) => i !== index)}));

  /* ── download ── */
  function handleDownload() {
    downloadFile(buildPortfolioJs(form), "portfolio.js");
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  }

  /* ── login screen ── */
  if (!auth) {
    return (
      <div className="oa-wrap" style={{alignItems: "center", justifyContent: "center"}}>
        <div style={{
          background: "#161b27", border: "1px solid rgba(140,67,206,0.3)",
          borderRadius: "16px", padding: "40px 48px", maxWidth: "380px", width: "100%"
        }}>
          <h1 style={{color: "#e2e8f0", marginBottom: "8px", fontSize: "1.6rem"}}>
            <span style={{color: "#8c43ce"}}>&lt;</span>
            Admin
            <span style={{color: "#8c43ce"}}>/&gt;</span>
          </h1>
          <p style={{color: "#64748b", fontSize: "0.82rem", marginBottom: "24px"}}>
            Default password: <code style={{color: "#c084fc"}}>admin123</code><br />
            Set <code style={{color: "#c084fc"}}>REACT_APP_ADMIN_PASSWORD</code> in <code>.env</code> to change it.
          </p>
          <form onSubmit={handleLogin} style={{display: "flex", flexDirection: "column", gap: "12px"}}>
            <input
              className="oa-input"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
            <button type="submit" className="oa-btn oa-btn--save">Login</button>
          </form>
        </div>
      </div>
    );
  }

  /* ── main UI ── */
  return (
    <div className="oa-wrap">
      <header className="oa-header">
        <span className="oa-logo">
          <span className="oa-bracket">&lt;</span>Admin<span className="oa-bracket">/&gt;</span>
        </span>
        <span className="oa-sub">
          Fill in all fields → Download portfolio.js → replace <code style={{color:"#c084fc"}}>src/portfolio.js</code> → push to deploy
        </span>
        <div className="oa-header-actions">
          <a href="/" className="oa-btn oa-btn--preview">View Site</a>
          <button className="oa-btn oa-btn--save" onClick={handleDownload}>
            {downloaded ? "Downloaded!" : "Download portfolio.js"}
          </button>
          <button className="oa-btn oa-btn--reset" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="oa-body">
        {/* Sidebar */}
        <nav className="oa-tabs">
          {TABS.map(t => (
            <button key={t.id} className={`oa-tab${tab === t.id ? " oa-tab--active" : ""}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>

        <div className="oa-panel">
          <div className="oa-hint" style={{marginBottom: "20px"}}>
            <strong>Images:</strong> For local files in <code>src/assets/images/</code> enter path like <code>./assets/images/logo.png</code> — generates <code>require()</code>.
            For external images paste a full URL — included as a string. Uploaded files are previewed only; save the file to assets and enter the path.
          </div>

          {/* ── PROFILE ── */}
          {tab === "profile" && (
            <section>
              <h2 className="oa-section-title">Profile</h2>
              <div className="oa-group">
                <h3 className="oa-group-title">Greeting</h3>
                <OaField label="Username (nav logo)" value={form.username}   onChange={v => set("username", v)} />
                <OaField label="Hero H1 title"       value={form.title}      onChange={v => set("title", v)} />
                <OaField label="Bio subtitle"        value={form.subTitle}   onChange={v => set("subTitle", v)} textarea />
                <OaField label="Resume link (URL)"   value={form.resumeLink} onChange={v => set("resumeLink", v)} />
              </div>
              <div className="oa-group">
                <h3 className="oa-group-title">Hero Stats</h3>
                {(form.heroStats || []).map((s, i) => (
                  <div key={i} style={{display:"flex", gap:"12px", marginBottom:"12px", alignItems:"flex-end"}}>
                    <OaField label={`#${i+1} Value`} value={s.value} onChange={v => setItem("heroStats", i, "value", v)} />
                    <OaField label="Label"            value={s.label} onChange={v => setItem("heroStats", i, "label", v)} />
                    <button className="oa-remove" style={{marginBottom:"16px"}} onClick={() => removeItem("heroStats", i)}>✕</button>
                  </div>
                ))}
                <button className="oa-add" onClick={() => addItem("heroStats", {value:"", label:""})}>+ Add Stat</button>
              </div>
              <div className="oa-group">
                <h3 className="oa-group-title">Social Links</h3>
                <OaField label="GitHub URL"    value={form.github}   onChange={v => set("github", v)} />
                <OaField label="LinkedIn URL"  value={form.linkedin} onChange={v => set("linkedin", v)} />
                <OaField label="Gmail address" value={form.gmail}    onChange={v => set("gmail", v)} />
              </div>
              <div className="oa-group">
                <h3 className="oa-group-title">Contact Section</h3>
                <OaField label="Contact subtitle" value={form.contactSubtitle} onChange={v => set("contactSubtitle", v)} textarea />
              </div>
            </section>
          )}

          {/* ── SKILLS ── */}
          {tab === "skills" && (
            <section>
              <h2 className="oa-section-title">Skills Section</h2>
              <div className="oa-group">
                <OaField label="Section Title"    value={form.skillsTitle}    onChange={v => set("skillsTitle", v)} />
                <OaField label="Section Subtitle" value={form.skillsSubTitle} onChange={v => set("skillsSubTitle", v)} />
              </div>
              <div className="oa-group">
                {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                <h3 className="oa-group-title">Skill Bullets (use ⚡ prefix)</h3>
                {form.skills.map((s, i) => (
                  <div key={i} style={{display:"flex", gap:"8px", marginBottom:"10px"}}>
                    <input className="oa-input" value={s} placeholder={`⚡ Skill ${i+1}`} onChange={e => {
                      const a = [...form.skills]; a[i] = e.target.value; set("skills", a);
                    }} />
                    <button className="oa-remove" onClick={() => removeItem("skills", i)}>✕</button>
                  </div>
                ))}
                <button className="oa-add" onClick={() => set("skills", [...form.skills, ""])}>+ Add Bullet</button>
              </div>
            </section>
          )}

          {/* ── SKILL ICONS ── */}
          {tab === "skillicons" && (
            <section>
              <h2 className="oa-section-title">Skill Icons / Tools</h2>
              <p className="oa-hint">
                Find classes at <strong>devicon.dev</strong>.
                Set Image URL/path to override the icon class with an image.
              </p>
              {form.softwareSkills.map((s, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{s.skillName || `Skill #${i+1}`}</span>
                    <button className="oa-remove" onClick={() => removeItem("softwareSkills", i)}>Remove</button>
                  </div>
                  <OaField label="Skill Name"      value={s.skillName}            onChange={v => setItem("softwareSkills", i, "skillName", v)} />
                  <OaField label="Devicon/FA class" value={s.fontAwesomeClassname} onChange={v => setItem("softwareSkills", i, "fontAwesomeClassname", v)} />
                  <OaField label="Image URL or local path (overrides class)" value={s.imageUrl} onChange={v => setItem("softwareSkills", i, "imageUrl", v)} />
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("softwareSkills", {skillName:"",fontAwesomeClassname:"",imageUrl:""})}>
                + Add Skill Icon
              </button>
            </section>
          )}

          {/* ── PROFICIENCY ── */}
          {tab === "proficiency" && (
            <section>
              <h2 className="oa-section-title">Proficiency</h2>
              {form.proficiency.map((p, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{p.stack || `#${i+1}`}</span>
                    <button className="oa-remove" onClick={() => removeItem("proficiency", i)}>Remove</button>
                  </div>
                  <OaField label="Stack / Technology"    value={p.stack}   onChange={v => setItem("proficiency", i, "stack", v)} />
                  <OaField label="Percentage (e.g. 85%)" value={p.percent} onChange={v => setItem("proficiency", i, "percent", v)} />
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("proficiency", {stack:"", percent:"70%"})}>+ Add Skill Bar</button>
            </section>
          )}

          {/* ── EXPERIENCE ── */}
          {tab === "experience" && (
            <section>
              <h2 className="oa-section-title">Work Experience</h2>
              {form.experiences.map((e, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{e.role || `Entry #${i+1}`} @ {e.company}</span>
                    <button className="oa-remove" onClick={() => removeItem("experiences", i)}>Remove</button>
                  </div>
                  <OaField label="Role / Title"  value={e.role}    onChange={v => setItem("experiences", i, "role", v)} />
                  <OaField label="Company"       value={e.company} onChange={v => setItem("experiences", i, "company", v)} />
                  <OaImageField label="Company Logo (local path or URL)"
                    value={e.logoPath}
                    onChange={v => setItem("experiences", i, "logoPath", v)} />
                  <OaField label="Date range"    value={e.date}    onChange={v => setItem("experiences", i, "date", v)} />
                  <OaField label="Description"   value={e.desc}    onChange={v => setItem("experiences", i, "desc", v)} textarea />
                  <h4 className="oa-group-title" style={{marginTop:"12px"}}>Bullet Points</h4>
                  {e.descBullets.map((b, j) => (
                    <div key={j} style={{display:"flex", gap:"8px", marginBottom:"8px"}}>
                      <input className="oa-input" value={b} placeholder={`Bullet ${j+1}`}
                        onChange={ev => {
                          const a = [...form.experiences];
                          const bullets = [...a[i].descBullets];
                          bullets[j] = ev.target.value;
                          a[i] = {...a[i], descBullets: bullets};
                          set("experiences", a);
                        }} />
                      <button className="oa-remove" onClick={() => {
                        const a = [...form.experiences];
                        a[i] = {...a[i], descBullets: a[i].descBullets.filter((_, x) => x !== j)};
                        set("experiences", a);
                      }}>✕</button>
                    </div>
                  ))}
                  <button className="oa-add" style={{marginTop:"4px"}} onClick={() => {
                    const a = [...form.experiences];
                    a[i] = {...a[i], descBullets: [...a[i].descBullets, ""]};
                    set("experiences", a);
                  }}>+ Add Bullet</button>
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("experiences", {role:"",company:"",logoPath:"",date:"",desc:"",descBullets:[""]})}>
                + Add Experience
              </button>
            </section>
          )}

          {/* ── EDUCATION ── */}
          {tab === "education" && (
            <section>
              <h2 className="oa-section-title">Education</h2>
              {form.schools.map((s, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{s.schoolName || `School #${i+1}`}</span>
                    <button className="oa-remove" onClick={() => removeItem("schools", i)}>Remove</button>
                  </div>
                  <OaField label="School Name"        value={s.schoolName} onChange={v => setItem("schools", i, "schoolName", v)} />
                  <OaImageField label="School Logo (local path or URL)"
                    value={s.logoPath}
                    onChange={v => setItem("schools", i, "logoPath", v)} />
                  <OaField label="Degree / Subheader" value={s.subHeader}  onChange={v => setItem("schools", i, "subHeader", v)} />
                  <OaField label="Duration"           value={s.duration}   onChange={v => setItem("schools", i, "duration", v)} />
                  <OaField label="Description"        value={s.desc}       onChange={v => setItem("schools", i, "desc", v)} textarea />
                  <h4 className="oa-group-title" style={{marginTop:"12px"}}>Bullet Points</h4>
                  {s.descBullets.map((b, j) => (
                    <div key={j} style={{display:"flex", gap:"8px", marginBottom:"8px"}}>
                      <input className="oa-input" value={b} placeholder={`Bullet ${j+1}`}
                        onChange={ev => {
                          const a = [...form.schools];
                          const bullets = [...a[i].descBullets];
                          bullets[j] = ev.target.value;
                          a[i] = {...a[i], descBullets: bullets};
                          set("schools", a);
                        }} />
                      <button className="oa-remove" onClick={() => {
                        const a = [...form.schools];
                        a[i] = {...a[i], descBullets: a[i].descBullets.filter((_, x) => x !== j)};
                        set("schools", a);
                      }}>✕</button>
                    </div>
                  ))}
                  <button className="oa-add" style={{marginTop:"4px"}} onClick={() => {
                    const a = [...form.schools];
                    a[i] = {...a[i], descBullets: [...a[i].descBullets, ""]};
                    set("schools", a);
                  }}>+ Add Bullet</button>
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("schools", {schoolName:"",logoPath:"",subHeader:"",duration:"",desc:"",descBullets:[""]})}>
                + Add School
              </button>
            </section>
          )}

          {/* ── ACHIEVEMENTS ── */}
          {tab === "achievements" && (
            <section>
              <h2 className="oa-section-title">Achievements &amp; Certifications</h2>
              <div className="oa-group">
                <OaField label="Section Title"    value={form.achievementsTitle}    onChange={v => set("achievementsTitle", v)} />
                <OaField label="Section Subtitle" value={form.achievementsSubtitle} onChange={v => set("achievementsSubtitle", v)} textarea />
              </div>
              {form.achievements.map((a, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{a.title || `Card #${i+1}`}</span>
                    <button className="oa-remove" onClick={() => removeItem("achievements", i)}>Remove</button>
                  </div>
                  <OaField label="Title"    value={a.title}    onChange={v => setItem("achievements", i, "title", v)} />
                  <OaField label="Subtitle" value={a.subtitle} onChange={v => setItem("achievements", i, "subtitle", v)} textarea />
                  <OaImageField label="Badge / Image (local path or URL)"
                    value={a.imagePath}
                    onChange={v => setItem("achievements", i, "imagePath", v)} />
                  <h4 className="oa-group-title" style={{marginTop:"12px"}}>Footer Links</h4>
                  {a.footerLinks.map((l, j) => (
                    <div key={j} style={{display:"flex", gap:"8px", marginBottom:"8px"}}>
                      <input className="oa-input" value={l.name} placeholder="Link text" style={{flex:"0 0 160px"}}
                        onChange={ev => {
                          const arr = [...form.achievements];
                          const links = [...arr[i].footerLinks];
                          links[j] = {...links[j], name: ev.target.value};
                          arr[i] = {...arr[i], footerLinks: links};
                          set("achievements", arr);
                        }} />
                      <input className="oa-input" value={l.url} placeholder="URL"
                        onChange={ev => {
                          const arr = [...form.achievements];
                          const links = [...arr[i].footerLinks];
                          links[j] = {...links[j], url: ev.target.value};
                          arr[i] = {...arr[i], footerLinks: links};
                          set("achievements", arr);
                        }} />
                      <button className="oa-remove" onClick={() => {
                        const arr = [...form.achievements];
                        arr[i] = {...arr[i], footerLinks: arr[i].footerLinks.filter((_, x) => x !== j)};
                        set("achievements", arr);
                      }}>✕</button>
                    </div>
                  ))}
                  <button className="oa-add" style={{marginTop:"4px"}} onClick={() => {
                    const arr = [...form.achievements];
                    arr[i] = {...arr[i], footerLinks: [...arr[i].footerLinks, {name:"",url:""}]};
                    set("achievements", arr);
                  }}>+ Add Link</button>
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("achievements", {title:"",subtitle:"",imagePath:"",footerLinks:[{name:"",url:""}]})}>
                + Add Achievement
              </button>
            </section>
          )}

          {/* ── BLOGS ── */}
          {tab === "blogs" && (
            <section>
              <h2 className="oa-section-title">Blogs</h2>
              <div className="oa-group">
                <OaField label="Section Title"    value={form.blogsTitle}    onChange={v => set("blogsTitle", v)} />
                <OaField label="Section Subtitle" value={form.blogsSubtitle} onChange={v => set("blogsSubtitle", v)} />
              </div>
              {form.blogs.map((b, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{b.title || `Blog #${i+1}`}</span>
                    <button className="oa-remove" onClick={() => removeItem("blogs", i)}>Remove</button>
                  </div>
                  <OaField label="Title"       value={b.title}       onChange={v => setItem("blogs", i, "title", v)} />
                  <OaField label="URL"         value={b.url}         onChange={v => setItem("blogs", i, "url", v)} />
                  <OaField label="Description" value={b.description} onChange={v => setItem("blogs", i, "description", v)} textarea />
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("blogs", {title:"",url:"",description:""})}>+ Add Blog</button>
            </section>
          )}

          {/* ── PROJECTS ── */}
          {tab === "projects" && (
            <section>
              <h2 className="oa-section-title">Projects</h2>
              <div className="oa-group">
                <OaField label="Section Title"    value={form.projectsTitle}    onChange={v => set("projectsTitle", v)} />
                <OaField label="Section Subtitle" value={form.projectsSubtitle} onChange={v => set("projectsSubtitle", v)} />
              </div>
              {form.projects.map((p, i) => (
                <div className="oa-item" key={i}>
                  <div className="oa-item-header">
                    <span className="oa-item-num">{p.projectName || `Project #${i+1}`}</span>
                    <button className="oa-remove" onClick={() => removeItem("projects", i)}>Remove</button>
                  </div>
                  <OaField label="Project Name"   value={p.projectName} onChange={v => setItem("projects", i, "projectName", v)} />
                  <OaField label="Description"    value={p.projectDesc} onChange={v => setItem("projects", i, "projectDesc", v)} textarea />
                  <OaImageField label="Project Image (local path or URL)"
                    value={p.imagePath}
                    onChange={v => setItem("projects", i, "imagePath", v)} />
                  <h4 className="oa-group-title" style={{marginTop:"12px"}}>Footer Links</h4>
                  {p.footerLinks.map((l, j) => (
                    <div key={j} style={{display:"flex", gap:"8px", marginBottom:"8px"}}>
                      <input className="oa-input" value={l.name} placeholder="Link text" style={{flex:"0 0 160px"}}
                        onChange={ev => {
                          const arr = [...form.projects];
                          const links = [...arr[i].footerLinks];
                          links[j] = {...links[j], name: ev.target.value};
                          arr[i] = {...arr[i], footerLinks: links};
                          set("projects", arr);
                        }} />
                      <input className="oa-input" value={l.url} placeholder="URL"
                        onChange={ev => {
                          const arr = [...form.projects];
                          const links = [...arr[i].footerLinks];
                          links[j] = {...links[j], url: ev.target.value};
                          arr[i] = {...arr[i], footerLinks: links};
                          set("projects", arr);
                        }} />
                      <button className="oa-remove" onClick={() => {
                        const arr = [...form.projects];
                        arr[i] = {...arr[i], footerLinks: arr[i].footerLinks.filter((_, x) => x !== j)};
                        set("projects", arr);
                      }}>✕</button>
                    </div>
                  ))}
                  <button className="oa-add" style={{marginTop:"4px"}} onClick={() => {
                    const arr = [...form.projects];
                    arr[i] = {...arr[i], footerLinks: [...arr[i].footerLinks, {name:"",url:""}]};
                    set("projects", arr);
                  }}>+ Add Link</button>
                </div>
              ))}
              <button className="oa-add" onClick={() => addItem("projects", {projectName:"",projectDesc:"",imagePath:"",footerLinks:[{name:"",url:""}]})}>
                + Add Project
              </button>
            </section>
          )}
        </div>
      </div>

      {downloaded && (
        <div className="oa-toast">
          Downloaded! Replace <code>src/portfolio.js</code> then push to deploy.
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Shared field components (copied from OwnAdmin pattern)
──────────────────────────────────────────────────────────────*/
function OaField({label, value, onChange, textarea, rows = 3}) {
  return (
    <label className="oa-field">
      <span className="oa-label">{label}</span>
      {textarea ? (
        <textarea className="oa-input oa-textarea" rows={rows} value={value || ""}
          onChange={e => onChange(e.target.value)} />
      ) : (
        <input className="oa-input" type="text" value={value || ""}
          onChange={e => onChange(e.target.value)} />
      )}
    </label>
  );
}

function OaImageField({label, value, onChange}) {
  const fileRef = useRef();
  const handleFile = e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // Show preview only — user must manually place the file in src/assets/images/
    const reader = new FileReader();
    reader.onload = ev => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };
  return (
    <div className="oa-field">
      <span className="oa-label">{label}</span>
      <div className="oa-img-row">
        <input className="oa-input oa-img-url" type="text"
          placeholder="./assets/images/file.png  or  https://…"
          value={value && !value.startsWith("data:") ? value : ""}
          onChange={e => onChange(e.target.value)} />
        <button type="button" className="oa-img-upload-btn"
          onClick={() => fileRef.current.click()} title="Preview file (save file to assets manually)">
          Preview
        </button>
        <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFile} />
      </div>
      {value && (
        <div className="oa-img-preview">
          <img src={value} alt="preview" />
          <button className="oa-img-clear" onClick={() => onChange("")}>✕</button>
        </div>
      )}
      {value && value.startsWith("data:") && (
        <p style={{fontSize:"0.72rem",color:"#f59e0b",marginTop:"4px"}}>
          Preview only — save this file to <code>src/assets/images/</code> and enter the path above for the generated code to work.
        </p>
      )}
    </div>
  );
}
