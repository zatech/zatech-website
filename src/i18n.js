import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import hero from './locales/en/hero.json';
import faq from './locales/en/faq.json';
import aboutSection from './locales/en/aboutSection.json';
import inviteSection from './locales/en/inviteSection.json';
import sponsorship from './locales/en/sponsorship.json';
import sponsorshipSection from './locales/en/sponsorshipSection.json';
import home from './locales/en/home.json';

// Initialize i18next for internationalization support
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        hero,
        faq,
        aboutSection,
        inviteSection,
        sponsorship,
        sponsorshipSection,
        home,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    ns: [
      'hero',
      'faq',
      'aboutSection',
      'inviteSection',
      'sponsorship',
      'sponsorshipSection',
      'home',
    ],
    defaultNS: 'home',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;