import PropTypes from 'prop-types';
import './IconCard.css';
import scrollSectionIntoView from '../../utils/scrollToSection';

// IconCard component to display an icon with title, content, and optional button
function IconCard({ icon, title, content, buttonText, buttonLink }) {
  const handleButtonClick = (event) => {
    if (!buttonLink || !buttonLink.startsWith('#')) return;
    event.preventDefault();
    const targetId = buttonLink.slice(1);
    scrollSectionIntoView(targetId, { offset: 24 });
    if (typeof window !== 'undefined' && window.location.hash !== buttonLink) {
      window.history.replaceState(null, '', buttonLink);
    }
  };

  return (
    <div className="icon-card">
      <div className="icon-container">
        {icon}
      </div>
      <h3 className="icon-card-title">{title}</h3>
      <p className="icon-card-content">{content}</p>
      {buttonText && (
        <a href={buttonLink} className="icon-card-button" onClick={handleButtonClick}>
          {buttonText} →
        </a>
      )}
    </div>
  );
}

// Prop types validation
IconCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
};

export default IconCard;
