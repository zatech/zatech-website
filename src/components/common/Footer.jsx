import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";
import footerStyles from "./Footer.css?inline";

// Inject footer styles into the document head
if (typeof document !== "undefined" && !document.querySelector('style[data-footer-styles="true"]')) {
  const styleTag = document.createElement("style");
  styleTag.setAttribute("data-footer-styles", "true");
  styleTag.textContent = footerStyles;
  document.head.appendChild(styleTag);
}

// Footer component with social links and legal information
function Footer({ className }) {
  return (
    <footer className={`main-footer ${className || ""}`.trim()}>
      <div className="footer-bottom">
        <p className="footer-disclaimer">© 2025 ZATech. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <a
            href="https://github.com/zatech/code-of-conduct"
            target="_blank"
            rel="noreferrer"
            aria-label="Code of Conduct"
          >
            Code of Conduct
          </a>
        </div>
        <div className="footer-socials" aria-label="Social Media Links">
          <a
            href="https://github.com/zatech"
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

// Prop types for Footer component
Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
