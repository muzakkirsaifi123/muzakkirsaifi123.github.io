import React, {useContext, useEffect, useRef} from "react";
import "./Contact.scss";
import {socialMediaLinks, contactInfo} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

const SOCIAL_ICONS = {
  github:        {icon: "fab fa-github",        label: "GitHub",         cls: "ct-github"},
  linkedin:      {icon: "fab fa-linkedin-in",   label: "LinkedIn",       cls: "ct-linkedin"},
  gmail:         {icon: "fas fa-envelope",       label: "Email",          cls: "ct-gmail"},
  twitter:       {icon: "fab fa-twitter",        label: "Twitter",        cls: "ct-twitter"},
  instagram:     {icon: "fab fa-instagram",      label: "Instagram",      cls: "ct-instagram"},
  medium:        {icon: "fab fa-medium",         label: "Medium",         cls: "ct-medium"},
  stackoverflow: {icon: "fab fa-stack-overflow", label: "Stack Overflow", cls: "ct-stackoverflow"},
  gitlab:        {icon: "fab fa-gitlab",         label: "GitLab",         cls: "ct-gitlab"},
};

const PARTICLE_COUNT = 28;

function Particles({isDark}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const color = isDark ? "rgba(167,139,250," : "rgba(106,17,203,";

    const dots = Array.from({length: PARTICLE_COUNT}, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      o:  Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.dx;
        d.y += d.dy;
        if (d.x < 0 || d.x > canvas.width)  d.dx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.dy *= -1;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${d.o})`;
        ctx.fill();
      });

      // Draw connecting lines between nearby dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `${color}${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="ct-particles" aria-hidden="true" />;
}

export default function Contact() {
  const {isDark} = useContext(StyleContext);

  const socialLinks = Object.entries(SOCIAL_ICONS)
    .filter(([key]) => socialMediaLinks[key])
    .map(([key, meta]) => ({
      ...meta,
      href: key === "gmail"
        ? `mailto:${socialMediaLinks[key]}`
        : socialMediaLinks[key],
    }));

  return (
    <Fade bottom duration={1000} distance="30px">
      <div className={`ct-section${isDark ? " dark-mode" : ""}`} id="contact">
        {/* Animated particle canvas */}
        <Particles isDark={isDark} />

        {/* Floating blobs */}
        <div className="ct-blob ct-blob--1" aria-hidden="true" />
        <div className="ct-blob ct-blob--2" aria-hidden="true" />
        <div className="ct-blob ct-blob--3" aria-hidden="true" />

        <div className="ct-inner">
          {/* Header */}
          <Fade top duration={900}>
            <div className="ct-header">
              <span className="ct-tag">
                <span className="ct-tag-dot" />
                Available for opportunities
              </span>
              <h2 className="ct-title">{contactInfo.title}</h2>
              <p className="ct-subtitle">{contactInfo.subtitle}</p>
            </div>
          </Fade>

          {/* Main CTA */}
          <Fade bottom duration={800} delay={150}>
            <a
              className="ct-cta-btn"
              href={`mailto:${contactInfo.email_address}`}
            >
              <span className="ct-cta-icon"><i className="fas fa-paper-plane" /></span>
              <span>Send me an email</span>
              <span className="ct-cta-ripple" aria-hidden="true" />
            </a>
          </Fade>

          {/* Info cards */}
          <div className="ct-cards">
            <Fade left duration={800} delay={100}>
              <a className="ct-card ct-card--email" href={`mailto:${contactInfo.email_address}`}>
                <div className="ct-card-border" aria-hidden="true" />
                <div className="ct-card-glow"   aria-hidden="true" />
                <div className="ct-card-icon"><i className="fas fa-envelope" /></div>
                <div className="ct-card-body">
                  <span className="ct-card-label">Email</span>
                  <span className="ct-card-value">{contactInfo.email_address}</span>
                </div>
                <div className="ct-card-arrow"><i className="fas fa-external-link-alt" /></div>
              </a>
            </Fade>

            {contactInfo.number && (
              <Fade right duration={800} delay={200}>
                <a className="ct-card ct-card--phone" href={`tel:${contactInfo.number}`}>
                  <div className="ct-card-border" aria-hidden="true" />
                  <div className="ct-card-glow"   aria-hidden="true" />
                  <div className="ct-card-icon"><i className="fas fa-phone" /></div>
                  <div className="ct-card-body">
                    <span className="ct-card-label">Phone</span>
                    <span className="ct-card-value">{contactInfo.number}</span>
                  </div>
                  <div className="ct-card-arrow"><i className="fas fa-external-link-alt" /></div>
                </a>
              </Fade>
            )}
          </div>

          {/* Divider */}
          <div className="ct-divider" aria-hidden="true">
            <span />
            <span className="ct-divider-text">or connect on</span>
            <span />
          </div>

          {/* Social buttons */}
          {socialLinks.length > 0 && (
            <Fade bottom duration={800} delay={250}>
              <div className="ct-socials-row">
                {socialLinks.map((link, i) => (
                  <a
                    key={link.label}
                    className={`ct-social-btn ${link.cls}`}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    style={{animationDelay: `${i * 60}ms`}}
                  >
                    <i className={link.icon} />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </Fade>
          )}
        </div>
      </div>
    </Fade>
  );
}
