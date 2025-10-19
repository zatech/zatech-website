import PropTypes from 'prop-types';
import './HeroSection.css';
import MapSVG from '../../assets/images/South_Africa_blank_map.svg';

function HeroSection({ className }) {
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
            href="https://app.slack.com/client/T03A23LJR/C03A23LKH"
            target="_blank"
            rel="noreferrer"
            className="cta-button"
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