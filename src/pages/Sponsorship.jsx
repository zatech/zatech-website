import { useTranslation } from 'react-i18next';
import SponsorshipCard from '../components/ui/SponsorshipCard';
import './Sponsorship.css';

function SponsorshipPage() {
  const { t } = useTranslation('sponsorship');

  // Get Slack admin contact from translations
  const slackContactId = t('config.slackContactId');
  const slackLink = `https://zatech.slack.com/team/${slackContactId}`;

  // Get tiers from translations
  const tiers = t('tiers', { returnObjects: true });

  return (
    <div className="sponsorship-page">
      {/* Header section */}
      <div className="page-header">
        <h1>{t('header.title')}</h1>
        <p className="subtitle">{t('header.subtitle')}</p>
      </div>

      {/* Mission section */}
      <div className="mission-section">
        <h2>{t('mission.title')}</h2>
        <p>
          {t('mission.description')}
        </p>
      </div>

      {/* Main sponsorship tiers */}
      <div className="tiers-container">
        {Array.isArray(tiers) && tiers.map(tier => (
          <SponsorshipCard key={tier.title} {...tier} />
        ))}
      </div>

      {/* Bottom call-to-action */}
      <div className="bottom-cta">
        <h2>{t('cta.title')}</h2>
        <p>
          {t('cta.description')}
        </p>
        <a href={slackLink} target="_blank" rel="noopener noreferrer" className="cta-link">
          {t('cta.linkText')}
        </a>
      </div>
    </div>
  );
}

export default SponsorshipPage;