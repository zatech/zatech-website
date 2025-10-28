import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './HeroSection.css';
import MapSVG from '../../assets/images/South_Africa_blank_map.svg';
import scrollSectionIntoView from '../../utils/scrollToSection';

// Preload the map SVG for performance
if (typeof document !== 'undefined') {
  const existingPreload = document.head.querySelector(`link[rel="preload"][href="${MapSVG}"]`);
  if (!existingPreload) {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = MapSVG;
    preloadLink.type = 'image/svg+xml';
    document.head.appendChild(preloadLink);
  }
}

// HeroSection component to display the hero section of the webpage
function HeroSection({ className }) {
  const { t } = useTranslation('hero');
  
  const handleScrollToInvite = (event) => {
    event.preventDefault();
    scrollSectionIntoView('invite-email', { offset: 24 });
    if (typeof window !== 'undefined' && window.location.hash !== '#invite-email') {
      window.history.replaceState(null, '', '#invite-email');
    }
  };

  // Render the hero section with title, description, CTA button, and map image
  return (
    <section className={`hero ${className || ''}`.trim()} id="home">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">{t('title')}</h1>
          <p className="hero-description">
            {t('description')}
          </p>
          <a
            href="#invite-email"
            className="cta-button"
            onClick={handleScrollToInvite}
          >
            {t('cta')}
          </a>
        </div>
        <div className="hero-map" aria-hidden="true">
          <img
            src={MapSVG}
            alt={t('mapAlt')}
            className="map-svg"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            width="640"
            height="640"
          />
        </div>
      </div>
    </section>
  );
}

// Prop types validation
HeroSection.propTypes = {
  className: PropTypes.string,
};

export default HeroSection;