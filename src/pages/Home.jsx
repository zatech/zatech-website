import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Home.css";
import HeroSection from "../components/ui/HeroSection";
import brandSlack from "../assets/icons/brand-slack.png";
import usersGroup from "../assets/icons/users-group.png";
import IconCard from "../components/ui/IconCard";
import TextCard from "../components/ui/TextCard";
import AboutSection from "../components/ui/AboutSection";
import FAQSection from "../components/ui/FAQSection";
import InviteEmailSection from "../components/ui/InviteEmailSection";
import WhyJoinImage from "../assets/images/why-join.optimized.jpg";
import WhyJoinImageWebp from "../assets/images/why-join.optimized.webp";
import WhyJoinImageSmall from "../assets/images/why-join.640w.jpg";
import WhyJoinImageSmallWebp from "../assets/images/why-join.640w.webp";
import NewEventsImage from "../assets/images/new-events-image.png";
import scrollSectionIntoView from "../utils/scrollToSection";
import { useLocation, useNavigate } from "react-router-dom";

// Home component representing the main landing page
export default function Home() {
  const { t } = useTranslation('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to section if URL param present (for Navbar section links)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scrollTo");
    if (scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (el) {
          scrollSectionIntoView(el, { offset: 24 });
        }
        // Clean up URL (remove ?scrollTo=...)
        navigate("/", { replace: true });
      }, 100);
    }
  }, [location, navigate]);

  return (
    <div>
      <HeroSection />

      {/* Community Section */}
      <section className="community-section">
        <div className="community-section-header">
          <h2>{t('community.header.title')}</h2>
          <p>
            {t('community.header.description')}
          </p>
        </div>

        <div className="community-grid-new">
          {/* Card 1: Why Join (spans rows 1-2) */}
          <div className="community-card-large card-1">
            <div className="card-media">
              <picture>
                <source
                  srcSet={`${WhyJoinImageSmallWebp} 640w, ${WhyJoinImageWebp} 1200w`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  type="image/webp"
                />
                <source
                  srcSet={`${WhyJoinImageSmall} 640w, ${WhyJoinImage} 1200w`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  type="image/jpeg"
                />
                <img
                  src={WhyJoinImageSmall}
                  alt={t('images.whyJoinAlt')}
                  className="card-large-image"
                  loading="lazy"
                  decoding="async"
                  width="640"
                  height="480"
                />
              </picture>
            </div>
            <div className="card-large-content">
              <h3>{t('community.whyJoin.title')}</h3>
              <p>
                {t('community.whyJoin.description')}
              </p>
            </div>
          </div>

          {/* Card 2: Slack-Based Messaging */}
          <div className="card-2">
            <IconCard
              icon={
                <img
                  src={brandSlack}
                  alt={t('images.slackAlt')}
                  style={{ width: 40, height: 40 }}
                />
              }
              title={t('community.slackBased.title')}
              content={t('community.slackBased.description')}
              buttonText={t('community.slackBased.buttonText')}
              buttonLink="#invite-email"
            />
          </div>

          {/* Card 3: Hundreds of Topics */}
          <div className="card-3">
            <IconCard
              icon={
                <img
                  src={usersGroup}
                  alt={t('images.usersGroupAlt')}
                  style={{ width: 40, height: 40 }}
                />
              }
              title={t('community.topics.title')}
              content={t('community.topics.description')}
            />
          </div>

          {/* Card 4: Events and Jobs */}
          <div className="community-card-large card-4">
            <div className="card-media">
                <img
                  src={NewEventsImage}
                  alt={t("images.eventsJobsAlt")}
                  className="card-large-image"
                  loading="lazy"
                  decoding="async"
                  width="700"
                  height="362"
                />
            </div>
            <div className="card-large-content">
              <h3>{t('community.eventsJobs.title')}</h3>
              <p>
                {t('community.eventsJobs.description')}
              </p>
            </div>
          </div>

          {/* Card 5: Some Things to Know */}
          <div className="card-5">
            <TextCard
              title={t('community.thingsToKnow.title')}
              content={t('community.thingsToKnow.content')}
              highlight={t('community.thingsToKnow.highlight')}
              highlightHref={t('community.thingsToKnow.highlightHref')}
            />
          </div>

          {/* Card 6: Request an Invite */}
          <div className="card-6">
            <TextCard
              title={t('community.requestInvite.title')}
              content={t('community.requestInvite.content')}
              highlight={t('community.requestInvite.highlight')}
              highlightHref={t('community.requestInvite.highlightHref')}
            />
          </div>

          {/* Card 7: Invite Email Section */}
          <div className="card-7">
            <InviteEmailSection />
          </div>
        </div>
      </section>

      <AboutSection />
      <FAQSection />
    </div>
  );
}