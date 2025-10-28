import { Link, useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import navbarStyles from "./Navbar.css?inline";
import scrollSectionIntoView from "../../utils/scrollToSection";

// Inject navbar styles into the document head
if (typeof document !== "undefined" && !document.querySelector('style[data-navbar-styles="true"]')) {
  const styleTag = document.createElement("style");
  styleTag.setAttribute("data-navbar-styles", "true");
  styleTag.textContent = navbarStyles;
  document.head.appendChild(styleTag);
}

// Navbar component with responsive menu and section navigation
export default function Navbar({ className }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to navigate to home and scroll to section
  const handleSectionNav = (sectionId) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === "/") {
      if (typeof document === "undefined") return;
      const target = document.getElementById(sectionId);
      if (target) {
        scrollSectionIntoView(target, { offset: 24 });
        if (typeof window !== "undefined") {
          window.history.replaceState(null, "", `#${sectionId}`);
        }
      } else if (typeof window !== "undefined") {
        window.location.hash = `#${sectionId}`;
      }
    } else {
      navigate(`/?scrollTo=${sectionId}`);
    }
  };

  // Close menu on navigation
  const handleNavClick = (cb) => (e) => {
    setMenuOpen(false);
    if (cb) cb(e);
  };

  // Logo click behavior
  const handleLogoClick = (e) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    if (isMobile) {
      e.preventDefault();
      setMenuOpen((open) => !open);
      return;
    }
    // Desktop behavior
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  // Navbar JSX structure
  return (
    <nav className={`navbar ${className || ""}`.trim()}>
      <div className="navbar-container">

        <div className="navbar-logo-hamburger">
          <Link
            to="/"
            className="navbar-logo"
            aria-label="ZATech Home"
            onClick={handleLogoClick}
          >
            ZATech
          </Link>
        </div>

        <div
          className={`navbar-links${menuOpen ? " open" : ""}`}
          id="navbar-menu"
        >
          <Link
            to="/"
            className="nav-link"
            onClick={e => {
              setMenuOpen(false);
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            Home
          </Link>
          <Link to="/sponsorship" className="nav-link" onClick={handleNavClick()}>
            Sponsorship
          </Link>
          <a href="#about" className="nav-link" onClick={handleSectionNav("about")}>
            About
          </a>
          <a href="#faqs" className="nav-link" onClick={handleSectionNav("faqs")}>
            FAQ
          </a>
          <a 
            href="https://wiki.zatech.co.za" 
            target="_blank" 
            rel="noreferrer" 
            className="nav-link nav-link-external" 
            onClick={handleNavClick()}
          >
            Wiki
          </a>
          <a 
            href="https://zatech.co.za/coc" 
            target="_blank" 
            rel="noreferrer" 
            className="nav-link nav-link-external" 
            onClick={handleNavClick()}
          >
            Code of Conduct
          </a>
        </div>

        <a
          href="#invite-email"
          className="request-invite-btn"
          onClick={handleSectionNav("invite-email")}
        >
          Request Invite →
        </a>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  className: PropTypes.string,
};
