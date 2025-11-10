import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Trophy, Award, Medal, Heart, User, Check } from 'lucide-react';
import './SponsorshipCard.css';

// Icon mapping for string-based icon names from JSON
const iconMap = {
  Trophy: Trophy,
  Award: Award,
  Medal: Medal,
  Heart: Heart,
  User: User
};

// AI was used to help with the grid layout of the sponsorship cards.
// SponsorshipCard component to display sponsorship tier information
function SponsorshipCard({ title, price, period, benefits, buttonText, accentColor, icon }) {
  const { t } = useTranslation('sponsorshipSection');

  // Slack admin contact link
  const slackContactId = 'U896THM5J';
  const slackLink = `https://zatech.slack.com/team/${slackContactId}`;

  // Get the icon component from the map, default to User if not found
  const IconComponent = iconMap[icon] || User;

  return (
    <div className="sponsorship-card">
      <div className="accent-bar" style={{ backgroundColor: accentColor }} />

      {/* Header (icon and title) */}
      <div className="card-header" aria-label={title}>
        <IconComponent 
          className="tier-icon" 
          size={28} 
          strokeWidth={2}
          aria-hidden="true"
        />
        <h2 className="tier-title">{title}</h2>
      </div>

      {/* Price section */}
      <div className="price-section">
        <span className="price">{price}</span>
        <span className="period">/{period}</span>
      </div>

      {/* Separator */}
      <div className="card-separator" />

      {/* Benefits list */}
      <ul className="benefits-list">
        {benefits.map((benefit, index) => (
          <li key={index} className="benefit-item">
            <Check 
              className="checkmark-icon" 
              size={16} 
              strokeWidth={3}
              aria-hidden="true"
            />
            {benefit}
          </li>
        ))}
      </ul>

      {/* Contact button */}
      <p className="sponsor-button-description">
        {t('contactDescription')}
      </p>
      <a
        className="sponsor-button"
        href={slackLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {buttonText || t('button')}
      </a>
    </div>
  );
}

// Prop types validation
SponsorshipCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  benefits: PropTypes.arrayOf(PropTypes.string).isRequired,
  buttonText: PropTypes.string,
  accentColor: PropTypes.string,
  icon: PropTypes.string, 
};

export default SponsorshipCard;