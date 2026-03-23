# MuZakkir Saifi — DevOps Portfolio

A personal portfolio site built with React, featuring animated Lottie illustrations, dark/light mode, scroll-progress bar, glassmorphism UI, and 20+ DevOps tool icons. Deployed automatically on GitHub Pages.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [How to Update Portfolio Content](#how-to-update-portfolio-content)
4. [Adding/Removing Sections](#addingremoving-sections)
5. [Changing Colors and Theme](#changing-colors-and-theme)
6. [Deploy to GitHub Pages](#deploy-to-github-pages)
7. [Admin Page (local)](#admin-page-local)
8. [Environment Variables](#environment-variables)
9. [FAQ](#faq)

---

## Quick Start

### Prerequisites
- Node.js >= 14
- npm >= 6

### Run locally

```bash
# 1. Clone the repo
git clone https://github.com/TrickyZone/portfolio.git
cd portfolio

# 2. Copy env example (GitHub token for the pinned repos section)
cp env.example .env

# 3. Install dependencies
npm install

# 4. Start dev server
npm start
```

The site opens at `http://localhost:3000`.

---

## Project Structure

```
src/
├── portfolio.js          <-- ALL content lives here (name, skills, experience...)
├── _globalColor.scss     <-- ALL colors in one place
├── containers/           <-- Page sections (Greeting, Skills, Experience...)
│   └── admin/            <-- Local admin editor UI
├── components/           <-- Reusable UI pieces (Header, Button, Cards...)
└── assets/
    ├── lottie/           <-- Lottie JSON animations
    └── images/           <-- Company logos, cert images
```

---

## How to Update Portfolio Content

**All content is in one file: `src/portfolio.js`**

Open it and find the section you want to change.

---

### Your Name and Title

```js
const greeting = {
  username: "Your Name",           // shown in header nav logo
  title: "Hey!! I'm YourName",     // big H1 on hero
  subTitle: emoji("Your bio here"),
  resumeLink: "https://drive.google.com/...",  // "" to hide button
  displayGreeting: true
};
```

---

### Typing Animation Titles (hero)

In `src/containers/greeting/Greeting.js`, around line 14:

```js
const titles = ["DevOps Engineer. .", "Cloud Engineer. .", "Blogger. ."];
```

Add/remove strings to change what cycles through.

---

### Hero Stats Bar

In the same file, around line 18:

```js
const stats = [
  { value: "4+",  label: "Years Experience" },
  { value: "3",   label: "Clouds (AWS/Azure/GCP)" },
  { value: "5+",  label: "Certifications" },
  { value: "15+", label: "Projects Delivered" }
];
```

Edit the numbers and labels as needed.

---

### Social Media Links

```js
const socialMediaLinks = {
  github:   "https://github.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourprofile",
  gmail:    "you@gmail.com",
  // gitlab, facebook, instagram, twitter, medium, stackoverflow, kaggle
  display: true
};
```

Comment out any link you don't want shown.

---

### Skills and Tech Icons

```js
const skillsSection = {
  title: "What I do",
  subTitle: "Your tagline",
  skills: [
    emoji("Your skill description 1"),
  ],
  softwareSkills: [
    // Devicons (https://devicon.dev) -- click any icon, copy the class
    { skillName: "Docker",    fontAwesomeClassname: "devicon-docker-plain colored" },
    { skillName: "AWS",       fontAwesomeClassname: "devicon-amazonwebservices-plain-wordmark colored" },
    // Font Awesome 5 (https://fontawesome.com/icons)
    { skillName: "Pulumi",    fontAwesomeClassname: "fas fa-cloud-upload-alt" },
  ],
  display: true
};
```

**Where to find icon classes:**
- **Devicon** (best for tech logos): https://devicon.dev — search, click, copy the `<i class="">` value
- **Font Awesome 5**: https://fontawesome.com/icons — search, copy the class

---

### Proficiency Bars

```js
const techStack = {
  viewSkillBars: true,
  experience: [
    { Stack: "Infrastructure Automation", progressPercentage: "90%" },
    { Stack: "CI/CD",                     progressPercentage: "90%" },
    { Stack: "Azure",                     progressPercentage: "80%" },
    { Stack: "AWS",                       progressPercentage: "70%" },
  ]
};
```

---

### Work Experience

```js
const workExperiences = {
  display: true,
  experience: [
    {
      role: "Senior DevOps Engineer",
      company: "Company Name",
      companylogo: require("./assets/images/logo.png"),
      date: "Jan 2022 - Present",
      desc: "Short description",
      descBullets: ["Bullet 1", "Bullet 2"]  // optional
    },
  ]
};
```

To add a company logo: drop the image into `src/assets/images/` then use `require("./assets/images/yourlogo.png")`.

---

### Projects

```js
const bigProjects = {
  title: "Big Projects",
  subtitle: "Projects I have worked on",
  projects: [
    {
      image: require("./assets/images/projectlogo.png"),
      projectName: "Project Name",
      projectDesc: "What you did on this project",
      footerLink: [
        { name: "Visit Website", url: "https://example.com" }
      ]
    },
  ],
  display: true
};
```

---

### Certifications and Achievements

```js
const achievementSection = {
  title: emoji("Achievements And Certifications"),
  subtitle: "Certs, awards...",
  achievementsCards: [
    {
      title: "Cert Name",
      subtitle: "Short description",
      image: require("./assets/images/cert.png"),
      imageAlt: "Alt text",
      footerLink: [
        { name: "View Credential", url: "https://..." }
      ]
    },
  ],
  display: true
};
```

---

### Education

```js
const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "University Name",
      logo: require("./assets/images/universityLogo.png"),
      subHeader: "Bachelor of Technology in CS",
      duration: "Aug 2017 - May 2021",
      desc: "Short description",
      descBullets: ["Achievement 1", "Achievement 2"]
    }
  ]
};
```

---

### Contact Info

```js
const contactInfo = {
  title: emoji("Contact Me"),
  subtitle: "Discuss a project or just want to say hi?",
  number: "+91-XXXXXXXXXX",   // remove to hide
  email_address: "you@gmail.com"
};
```

---

## Adding/Removing Sections

Every section has a `display` flag. Set it to `false` to hide it completely:

```js
const blogSection = { ..., display: false };   // hides Blogs
const talkSection = { ..., display: false };   // hides Talks
const openSource  = { ..., display: false };   // hides GitHub pinned repos
```

---

## Changing Colors and Theme

Open `src/_globalColor.scss`. Every color used site-wide is defined here:

```scss
$buttonColor:  #55198b;   // primary purple - buttons, highlights
$buttonHover:  #8c43ce;   // hover state
$skillsColor:  #645beb;   // skill icon hover color
$darkBackground: #171c28; // dark mode background
```

Change values here to retheme the whole site instantly. No other files need to change.

---

## Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `react-scripts build` then pushes the build to the `main` branch using `gh-pages`.

Make sure `homepage` in `package.json` matches your GitHub Pages URL:

```json
"homepage": "https://<your-github-username>.github.io/<repo-name>/"
```

A GitHub Actions workflow at `.github/workflows/deploy.yml` auto-deploys on every push to `main`.

---

## Admin Page (local)

A built-in admin editor is available so you can update portfolio data in your browser:

1. Start the dev server: `npm start`
2. Open `http://localhost:3000?admin=1`
3. Edit any field in the form
4. Click **"Download portfolio.js"** — it downloads the updated file
5. Replace `src/portfolio.js` with the downloaded file
6. The dev server hot-reloads automatically — done

> The admin page is a local editing helper only. It does not write files or push to GitHub directly. After replacing `portfolio.js`, run `npm run deploy` to publish the changes.

---

## Environment Variables

Copy `env.example` to `.env` and fill in:

```
REACT_APP_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

This token fetches your pinned GitHub repos for the Open Source section.

**How to create one:**
1. Go to GitHub Settings > Developer Settings > Personal Access Tokens > Tokens (classic)
2. Click "Generate new token"
3. Select scope: `read:user`
4. Copy the token into `.env`

---

## FAQ

**Q: How do I add a skill icon that is not in Devicon or Font Awesome?**
Add an `image` field to the skill entry and update `src/components/softwareSkills/SoftwareSkill.js` to render an `<img>` tag when the `image` field is present instead of an `<i>` tag.

**Q: The GitHub repos section shows nothing.**
Set `REACT_APP_GITHUB_TOKEN` in `.env` and restart the dev server with `npm start`.

**Q: How do I replace a Lottie animation?**
Get a free `.json` animation from lottiefiles.com, drop it in `src/assets/lottie/`, import it in the relevant container file, and pass it to `<DisplayLottie animationData={yourAnimation} />`.

**Q: How do I change the browser tab title and SEO description?**
Edit `public/index.html` — update `<title>`, `<meta name="description">`, and the Open Graph / Twitter card tags near the top.

**Q: How do I add a Medium blog feed instead of manual entries?**
Set `displayMediumBlogs: "true"` in `blogSection` and make sure `REACT_APP_MEDIUM_USERNAME` is set in `.env`.
