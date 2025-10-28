import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './AboutSection.css';
import LiteYouTube from './LiteYouTube';

// Preload the YouTube video iframe for performance
function AboutSection({ className }) {
  const { t } = useTranslation('aboutSection');
  
  // Preload YouTube iframe
  return (
    <section id="about" className={`about-section ${className || ''}`.trim()}>
      <h2>{t('title')}</h2>
      <p>{t('intro')}</p>

      <div className="about-video">
        <LiteYouTube
          videoId="Ze_C-Fwz_Ec"
          title={t('videoTitle')}
          className="about-video-player"
        />
        <a
          href="https://www.youtube.com/watch?v=Ze_C-Fwz_Ec"
          target="_blank"
          rel="noreferrer"
          className="youtube-link"
        >
          {t('youtubeLink')}
        </a>
        <div className="about-card">
          <h3>{t('card.title')}</h3>
          <p>{t('card.text')}</p>
        </div>
      </div>
    </section>
  );
}

// Prop types validation
AboutSection.propTypes = {
  className: PropTypes.string,
};

export default AboutSection;