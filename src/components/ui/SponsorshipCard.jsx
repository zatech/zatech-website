import "./SponsorshipCard.css";

function SponsorshipCard({ icon, title, price, period, benefits, buttonText, accentColor }) {

// Dynamic mailto link
const mailtoSubject = encodeURIComponent(`ZATech ${title} Sponsorship - [Your Name/Company]`);
const mailtoBody = encodeURIComponent(
  'Hi ZATech Team,\n\n' +
  `I'm reaching out about the ${title} sponsorship tier.\n\n` +
  `I'm interested in learning more about the benefits and how to proceed with the sponsorship.\n\n` +
  `[Optional: Tell us a bit about yourself or your company, or any specific questions you have.]\n\n` +
  `Kind regards,\n[Your Name]\n` +
  `[Optional: Company Name]\n[Optional: Your Contact Details]`
);

const mailtoLink = `mailto:invite@zatech.co.za?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div className="sponsorship-card">
      <div className="accent-bar" style={{ backgroundColor: accentColor }} />
      {/* Header with icon and title */}
      <div className="card-header" aria-label={title}>
        <span className="tier-icon" aria-hidden>
          {icon}
        </span>
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
            <span className="checkmark">✓</span>
            {benefit}
          </li>
        ))}
      </ul>

      {/* Action button */}
      <a className="sponsor-button" href={mailtoLink}>
        {buttonText}
      </a>
    </div>
  );
}
export default SponsorshipCard;