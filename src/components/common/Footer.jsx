import PropTypes from "prop-types";
import { Github, Linkedin } from "lucide-react";
import footerStyles from "./Footer.css?inline";

if (typeof document !== "undefined" && !document.querySelector('style[data-footer-styles="true"]')) {
  const styleTag = document.createElement("style");
  styleTag.setAttribute("data-footer-styles", "true");
  styleTag.textContent = footerStyles;
  document.head.appendChild(styleTag);
}

function Footer({ className }) {
  return (
    <footer className={`main-footer ${className || ""}`.trim()}>
      <div className="footer-sponsorship">
        <p className="sponsorship-text">Hosting sponsored by</p>
        <a
          href="https://www.namhost.com"
          target="_blank"
          rel="dofollow"
          aria-label="Namhost - Fast, Affordable & Reliable Hosting"
          className="sponsorship-link"
        >
          <img
            src="/namhost-logo.svg"
            alt="Namhost Logo"
            className="sponsorship-logo"
          />
        </a>
        <p className="sponsorship-tagline">Fast, Affordable & Reliable</p>
      </div>
      <div className="footer-bottom">
        <p className="footer-disclaimer">© 2025 ZATech. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#cookies">Cookies Settings</a>
        </div>
        <div className="footer-socials" aria-label="Social Media Links">
          <a
            href="https://github.com/Accompany-VC/zatech-website"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github size={22} />
          </a>
          <a
            href="https://www.linkedin.com/company/zatech-slack/about/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
