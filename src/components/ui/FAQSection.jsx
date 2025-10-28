import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './FAQSection.css';

// FAQSection component to display frequently asked questions
function FAQSection({ className }) {
  const { t } = useTranslation('faq');

  // Use returnObjects: true so we get arrays instead of strings
  const generalFAQs = t('general', { returnObjects: true });
  const jobFAQs = t('jobs', { returnObjects: true });

  return (
    <section id="faqs" className={`faq-section ${className || ''}`.trim()}>
      <h2>{t('title')}</h2>
      <p>{t('subtitle')}</p>

      {/* ---- FAQ Items ---- */}
      <div className="faq-container">
        {/* ---- Column 1 ---- */}
        <div className="faq-category">
          <h3>{t('general.title')}</h3>
          {Array.isArray(generalFAQs) &&
            generalFAQs.map((faq, index) => (
              <details key={index} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
        </div>

        {/* ---- Column 2 ---- */}
        <div className="faq-category">
          <h3>{t('jobs.title')}</h3>
          {Array.isArray(jobFAQs) &&
            jobFAQs.map((faq, index) => (
              <details key={index} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
        </div>
      </div>
    </section>
  );
}

// Prop types validation
FAQSection.propTypes = {
  className: PropTypes.string,
};

export default FAQSection;