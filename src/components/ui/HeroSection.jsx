import PropTypes from 'prop-types';
import './HeroSection.css';
import MapSVG from '../../assets/images/South_Africa_blank_map.svg';
import scrollSectionIntoView from '../../utils/scrollToSection';

function HeroSection({ className }) {
  const handleScrollToInvite = (event) => {
    event.preventDefault();
    scrollSectionIntoView('invite-email', { offset: 24 });
    if (typeof window !== 'undefined' && window.location.hash !== '#invite-email') {
      window.history.replaceState(null, '', '#invite-email');
    }
  };

  return (
    <section className={`hero ${className || ''}`.trim()} id="home">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">South Africa's Largest Tech Community</h1>
          <p className="hero-description">
            With over 15 000 members, we connect developers,
            entrepreneurs, and other technical professionals
            across the country.
          </p>
          <a
            href="#invite-email"
            className="cta-button"
            onClick={handleScrollToInvite}
          >
            Join Our Slack Community →
          </a>
        </div>
        <div className="hero-map">
          <img src={MapSVG} alt="South Africa Map" className="map-svg" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  className: PropTypes.string,
};

export default HeroSection;
