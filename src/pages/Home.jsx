import React, { useEffect } from "react";
import "./Home.css";
import HeroSection from "../components/ui/HeroSection";
import brandSlack from "../assets/icons/brand-slack.png";
import usersGroup from "../assets/icons/users-group.png";
import IconCard from "../components/ui/IconCard";
import TextCard from "../components/ui/TextCard";
import InviteEmailSection from "../components/ui/InviteEmailSection";
import AboutSection from "../components/ui/AboutSection";
import FAQSection from "../components/ui/FAQSection";
import WhyJoinImage from "../assets/images/why-join.optimized.jpg";
import WhyJoinImageWebp from "../assets/images/why-join.optimized.webp";
import WhyJoinImageSmall from "../assets/images/why-join.640w.jpg";
import WhyJoinImageSmallWebp from "../assets/images/why-join.640w.webp";
import EventsImage from "../assets/images/events.optimized.jpg";
import EventsImageWebp from "../assets/images/events.optimized.webp";
import EventsImageSmall from "../assets/images/events.700w.jpg";
import EventsImageSmallWebp from "../assets/images/events.700w.webp";
import scrollSectionIntoView from "../utils/scrollToSection";

import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
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
          <h2>Join Our Community</h2>
          <p>Connect, collaborate, and grow with thousands of tech professionals in South Africa.</p>
        </div>
        
        <div className="community-grid-new">
          {/* Card 1: Why Join (spans rows 1-2) */}
          <div className="community-card-large card-1">
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
                alt="Why Join"
                className="card-large-image"
                loading="lazy"
                decoding="async"
                width="640"
                height="480"
              />
            </picture>
            <div className="card-large-content">
              <h3>Why Join?</h3>
              <p>
                At ZATech, we bring together <strong>South Africa's brightest</strong> tech minds. 
                Join our Slack community and engage in meaningful discussions, skill sharing, and networking. 
                With hundreds of channels covering everything from coding and startups to gaming and mental health, there's a space for everyone.
              </p>
            </div>
          </div>

          {/* Card 2: Slack-Based Messaging */}
          <div className="card-2">
              <IconCard
                icon={<img src={brandSlack} alt="Slack" style={{ width: 40, height: 40 }} />}
                title="Slack-Based Messaging"
                content="Get your invite to our Slack workspace and join thousands of tech professionals in meaningful discussions, knowledge sharing, and networking."
                buttonText="Get Started"
                buttonLink="#invite-email"
              />
          </div>

          {/* Card 3: Hundreds of Topics */}
          <div className="card-3">
              <IconCard
                icon={<img src={usersGroup} alt="Users Group" style={{ width: 40, height: 40 }} />}
                title="Hundreds of Topics and Interests"
                content="We have hundreds of channels organized around locations like #capetown, languages like #python, specializations like #aws, and even non-tech topics like #cooking."
              />
          </div>

          {/* Card 4: Events and Jobs */}
          <div className="community-card-large card-4">
            <picture>
              <source
                srcSet={`${EventsImageSmallWebp} 700w, ${EventsImageWebp} 1600w`}
                sizes="(max-width: 768px) 100vw, 50vw"
                type="image/webp"
              />
              <source
                srcSet={`${EventsImageSmall} 700w, ${EventsImage} 1600w`}
                sizes="(max-width: 768px) 100vw, 50vw"
                type="image/jpeg"
              />
              <img
                src={EventsImageSmall}
                alt="Events and Jobs"
                className="card-large-image"
                loading="lazy"
                decoding="async"
                width="700"
                height="362"
              />
            </picture>
            <div className="card-large-content">
              <h3>Events, Job Postings, and More</h3>
              <p>
                We organize and share meetups, exchange knowledge about everything from tech to visas, 
                and host active #jobpostings and #freelance-jobpostings channels for finding work.
              </p>
            </div>
          </div>

          {/* Card 5: Some Things to Know */}
          <div className="card-5">
            <TextCard
              title="Some Things to Know Before Joining"
              content={`By joining, you agree to abide by the ZATech Code of Conduct. Please take a moment to read it and pay special attention to our specific rules about recruitment.
              
The group is intended to be high signal, low noise. Think of it as an overlapping series of professional groups rather than IRC in the 90s.

Be kind. Don't be snarky. Have curious conversations — don't cross-examine. Comments should become more thoughtful and substantive, not less, as a topic becomes more divisive.`}
              highlight="ZATech Code of Conduct"
            />
          </div>

          {/* Card 6: Request an Invite */}
          <div className="card-6">
            <TextCard
              title="Request an Invite"
              content={`We welcome nearly anyone to join our community, but to prevent spam we are invite-only.

To request an invite, send an email to invite@zatech.co.za from an address you intend to use long term (not your work email — you'll be in this community for a long time). Include your name, occupation, a brief explanation of why you want to join, and how you heard about us.

Finally, please include a link to your LinkedIn, Twitter, GitHub, or another site that shows you're a real person. None of the above information will be shared outside the admin team, who use it solely to assess your application. We approve 99% of applications and only reject spammers, scammers, and bots.`}
              highlight="invite@zatech.co.za"
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
