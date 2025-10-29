import React from "react";
import { useTranslation } from 'react-i18next';
import "./Privacy.css";
// Reuse the shared text-card styles so this page matches site cards
import "../components/ui/TextCard.css";

// Privacy Policy page using i18n
export default function Privacy() {
  const { t } = useTranslation('privacy');

  return (
    <div className="section privacy-page">
      <div className="container">
        <div className="text-card privacy-card">
          <h1 className="text-card-title">{t('title')}</h1>
          <div className="text-card-content">
            <p>{t('content')}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
