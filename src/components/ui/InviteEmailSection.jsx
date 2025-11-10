import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation, Trans } from "react-i18next";
import "./InviteEmailSection.css";

// AI helped to refine the animation logic for typing effect in the email preview.
// Sample email data for typing animation
const emailSamples = [
  {
    name: "Zinhle",
    occupation: "product designer",
    location: "Cape Town",
    reason:
      "collaborate with other builders and share usability insights from our startup journey",
    source: "a friend from the DevConf community",
    linkLabel: "LinkedIn",
    linkUrl: "https://www.linkedin.com/in/zinhle-example/",
  },
  {
    name: "Michael",
    occupation: "software engineer",
    location: "Port Elizabeth",
    reason: "swap lessons from scaling our logistics platform and learn from others",
    source: "a former colleague",
    linkLabel: "GitHub",
    linkUrl: "https://github.com/michael-example",
  },
  {
    name: "Priya",
    occupation: "product manager",
    location: "Mumbai",
    reason: "connect with the South African tech scene as I relocate later this year",
    source: "a LinkedIn post",
    linkLabel: "Portfolio",
    linkUrl: "https://priya.pm/portfolio",
  },
  {
    name: "Alex",
    occupation: "frontend developer",
    location: "Cape Town",
    reason: "swap ideas about accessibility tooling and stay close to SA tech news",
    source: "News24",
    linkLabel: "Personal site",
    linkUrl: "https://alexcodes.dev",
  },
  {
    name: "Lerato",
    occupation: "data scientist",
    location: "Durban",
    reason:
      "find peers working with machine learning in production and share responsible AI practices",
    source: "Twitter",
    linkLabel: "Portfolio",
    linkUrl: "https://lerato.ai/portfolio",
  },
  {
    name: "Thabo",
    occupation: "DevOps engineer",
    location: "Pretoria",
    reason: "compare tooling for our hybrid cloud rollout and mentor junior engineers",
    source: "the ZATech podcast",
    linkLabel: "GitHub",
    linkUrl: "https://github.com/thabo-dev",
  },
  {
    name: "Aisha",
    occupation: "UX researcher",
    location: "Johannesburg",
    reason: "get feedback on inclusive research practices and meet designers in fintech",
    source: "a UX community meetup",
    linkLabel: "LinkedIn",
    linkUrl: "https://www.linkedin.com/in/aisha-research/",
  },
  {
    name: "Daniel",
    occupation: "mobile developer",
    location: "Windhoek",
    reason: "learn from Android teams building at scale and share Flutter tips",
    source: "a GitHub issue thread",
    linkLabel: "GitHub",
    linkUrl: "https://github.com/daniel-mobile",
  },
  {
    name: "Carmen",
    occupation: "QA lead",
    location: "Lisbon",
    reason: "stay plugged into the SA tech scene while working remotely for a local startup",
    source: "an ex-colleague in Cape Town",
    linkLabel: "LinkedIn",
    linkUrl: "https://www.linkedin.com/in/carmen-tests/",
  },
  {
    name: "Sipho",
    occupation: "AI ethics researcher",
    location: "Gqeberha",
    reason: "discuss policy implications of AI tools with practitioners shipping real products",
    source: "a University of Pretoria lecture",
    linkLabel: "Publications",
    linkUrl: "https://sipho.ai/papers",
  },
  {
    name: "Fatima",
    occupation: "security analyst",
    location: "Doha",
    reason: "share threat intel relevant to SA fintech and keep tabs on local vendor news",
    source: "an OWASP meetup",
    linkLabel: "LinkedIn",
    linkUrl: "https://www.linkedin.com/in/fatima-sec/",
  },
  {
    name: "Johan",
    occupation: "CTO",
    location: "Stellenbosch",
    reason: "find peers scaling engineering culture in growing SaaS companies",
    source: "a TechCentral newsletter",
    linkLabel: "Company site",
    linkUrl: "https://veldtech.io/",
  },
  {
    name: "Nomsa",
    occupation: "cloud architect",
    location: "London",
    reason: "stay involved with SA technologists while working abroad on AWS projects",
    source: "friends in the #capetown channel",
    linkLabel: "LinkedIn",
    linkUrl: "https://www.linkedin.com/in/nomsa-architect/",
  },
  {
    name: "Rahul",
    occupation: "data engineer",
    location: "Bengaluru",
    reason: "share lessons from building data pipelines for African fintechs",
    source: "a partner company in Cape Town",
    linkLabel: "Portfolio",
    linkUrl: "https://rahuldata.dev",
  },
  {
    name: "Elena",
    occupation: "technical writer",
    location: "Barcelona",
    reason: "connect with teams who care about docs-as-code and contribute guides",
    source: "Twitter",
    linkLabel: "Docs site",
    linkUrl: "https://elenawrites.dev",
  },
  {
    name: "Kagiso",
    occupation: "robotics engineer",
    location: "Bloemfontein",
    reason: "find collaborators on computer vision and manufacturing automation projects",
    source: "a Stellenbosch robotics forum",
    linkLabel: "LinkedIn",
    linkUrl: "https://www.linkedin.com/in/kagiso-robotics/",
  },
  {
    name: "Chloe",
    occupation: "marketing technologist",
    location: "Cape Town",
    reason: "share experiences integrating CDPs and learn from martech builders",
    source: "the Heavy Chef newsletter",
    linkLabel: "Personal site",
    linkUrl: "https://chloemakesstuff.com",
  },
  {
    name: "Nikhil",
    occupation: "game developer",
    location: "Durban",
    reason: "connect with other Unity devs shipping mobile titles in Africa",
    source: "a MakeGamesSA Discord post",
    linkLabel: "Portfolio",
    linkUrl: "https://nikhilgames.dev",
  },
  {
    name: "Grace",
    occupation: "legal technologist",
    location: "Nairobi",
    reason: "discuss compliance automation with teams facing POPIA and GDPR requirements",
    source: "a panel at Africa Legal Innovation",
    linkLabel: "LinkedIn",
    linkUrl: "https://www.linkedin.com/in/grace-legaltech/",
  },
];

// Time interval between sample switches (in ms)
const SAMPLE_INTERVAL = 7000;
const fieldsToType = ["name", "occupation", "location", "reason", "source", "linkLabel"];

// Create a typed state slice for the given progress (0 to 1)
const createTypedState = (sample, progress = 0) =>
  fieldsToType.reduce((acc, field) => {
    const fullText = sample[field] || "";
    const sliceLength = Math.floor(fullText.length * progress);
    acc[field] = fullText.slice(0, sliceLength);
    return acc;
  }, { linkUrl: sample.linkUrl });

// InviteEmailSection component to display the invite email section
function InviteEmailSection({ className }) {
  const { t } = useTranslation('inviteSection');
  const [sampleIndex, setSampleIndex] = useState(0);
  const [typedSample, setTypedSample] = useState(() => createTypedState(emailSamples[0], 1));
  const [isTyping, setIsTyping] = useState(false);

  const _fieldMinWidths = useMemo(() => {
    const map = {};
    fieldsToType.forEach((field) => {
      map[field] = Math.max(
        6,
        ...emailSamples.map((entry) => (entry[field] ? entry[field].length : 0))
      );
    });
    return map;
  }, []);

  // Cycle through samples at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setSampleIndex((current) => (current + 1) % emailSamples.length);
    }, SAMPLE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Animate typing effect when sampleIndex changes
  useEffect(() => {
    const nextSample = emailSamples[sampleIndex];
    const startTime = performance.now();
    const duration = 1600;
    let rafId;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setTypedSample(createTypedState(nextSample, progress));
      setIsTyping(progress < 1);
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };
    // Start the animation
    setIsTyping(true);
    setTypedSample(createTypedState(nextSample, 0));
    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [sampleIndex]);

  const sample = emailSamples[sampleIndex];

  const mailtoSubject = encodeURIComponent("ZATech invite request - [Your Name]");
  const mailtoBody = encodeURIComponent(
    `Hi, I'm [Your Name], a [Your Role] based in [Your Location].\n\n` +
      `I'd love to join ZATech to [Why you want to join].\n\n` +
      `I heard about the community through [How you found us].\n\n` +
      `You can check me out here: [LinkedIn/GitHub/Portfolio] – [URL].\n\n` +
      `Thanks for your time!\n[Your Name]`
  );
  const mailtoLink = `mailto:invite@zatech.co.za?subject=${mailtoSubject}&body=${mailtoBody}`;

  const tokenClass = (field) => {
    const classes = ["email-token"];
    const full = sample[field] || "";
    const typedValue = typedSample[field] || "";
    if (typedValue.length && typedValue.length < full.length) {
      classes.push("email-token--typing");
    }
    return classes.join(" ");
  };

  const displayValue = (field) => {
    const typedValue = typedSample[field];
    if (!typedValue) return isTyping ? "" : sample[field] || "";
    return typedValue;
  };

  const tokenStyle = () => ({});

  return (
    <section id="invite-email" className={`invite-section ${className || ""}`.trim()}>
      <div className="invite-section-inner">
        <div className="invite-content-wrapper">
          <div className="invite-content">
            {/* LEFT SIDE */}
            <div className="invite-info">
              <h2>{t('title')}</h2>
              <p className="invite-email-line">
                <Trans i18nKey="intro" ns="inviteSection">
                  Email <a className="invite-email" href="mailto:invite@zatech.co.za">invite@zatech.co.za</a> with a short introduction.
                </Trans>
              </p>
              <p className="invite-summary">{t('summary')}</p>
              <ol className="invite-steps">
                {t('steps', { returnObjects: true }).map((step, idx) => (
                  <li key={idx}>
                    <span className="invite-step-title">{step.title}</span>
                    <span className="invite-step-detail">{step.detail}</span>
                  </li>
                ))}
              </ol>
              <div className="invite-actions">
                <a className="mailto-button" href={mailtoLink}>
                  {t('button')}
                </a>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className={`email-preview${isTyping ? " email-preview--typing" : ""}`}>
              <div className="email-header">
                <p className="email-meta">{t('email.to')}</p>
                <p className="email-meta">
                  {t('email.subject')}
                  <span className={tokenClass("name")} style={tokenStyle("name")}> 
                    {displayValue("name") || sample.name}
                  </span>
                </p>
              </div>
              <div className="email-body">
                <p>
                  Hi, I'm{" "}
                  <span className={tokenClass("name")} style={tokenStyle("name")}> 
                    {displayValue("name") || sample.name}
                  </span>
                  , a{" "}
                  <span className={tokenClass("occupation")} style={tokenStyle("occupation")}> 
                    {displayValue("occupation") || sample.occupation}
                  </span>{" "}
                  based in{" "}
                  <span className={tokenClass("location")} style={tokenStyle("location")}> 
                    {displayValue("location") || sample.location}
                  </span>.
                </p>
                <p>
                  I'd love to join ZATech to{" "}
                  <span className={tokenClass("reason")} style={tokenStyle("reason")}> 
                    {displayValue("reason") || sample.reason}
                  </span>.
                </p>
                <p>
                  I heard about the community through{" "}
                  <span className={tokenClass("source")} style={tokenStyle("source")}> 
                    {displayValue("source") || sample.source}
                  </span>.
                </p>
                <p>
                  You can check me out here:
                  <br />
                  <a href={sample.linkUrl} target="_blank" rel="noreferrer" className="email-link">
                    <span className={tokenClass("linkLabel")} style={tokenStyle("linkLabel")}> 
                      {displayValue("linkLabel") || sample.linkLabel}
                    </span>
                    <span className="email-link-url">{sample.linkUrl}</span>
                  </a>
                </p>
                <p>{t('email.thanks')}</p>
                <p>
                  {t('email.regards')}
                  <br />
                  <span className={tokenClass("name")} style={tokenStyle("name")}> 
                    {displayValue("name") || sample.name}
                  </span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// Prop types validation
InviteEmailSection.propTypes = {
  className: PropTypes.string,
};

export default InviteEmailSection;