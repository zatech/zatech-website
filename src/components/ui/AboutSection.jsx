import PropTypes from 'prop-types';
import './AboutSection.css';
import LiteYouTube from './LiteYouTube';

function AboutSection({ className }) {
  return (
    <section id="about" className={`about-section ${className || ''}`.trim()}>
      <h2>About Us</h2>
      <p>Here's a four-minute video with some more information about who we are and a look inside our Slack group.</p>

      <div className="about-video">
        <LiteYouTube
          videoId="Ze_C-Fwz_Ec"
          title="ZATech Video"
          className="about-video-player"
        />
        <a
          href="https://www.youtube.com/watch?v=Ze_C-Fwz_Ec"
          target="_blank"
          rel="noreferrer"
          className="youtube-link"
        >
          Watch on YouTube
        </a>
        <div className="about-card">
          <h3>How we started</h3>
          <p>Founded in 2015, ZATech started as a small Slack group and has grown into South Africa's largest tech community. We connect software engineers, product managers, UX designers, and entrepreneurs who share a passion for tech and innovation.</p>
        </div>
      </div>
    </section>
  );
}

AboutSection.propTypes = {
  className: PropTypes.string,
};

export default AboutSection;
