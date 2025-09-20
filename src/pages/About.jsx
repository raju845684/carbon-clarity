import React from "react";
import Footer from "../components/Footer";
import AboutHero from "../components/About/AboutHero";
import AboutDetails from "../components/About/AboutDetails";
import AboutIntelligence from "../components/About/AboutIntelligence";

const About = () => {
  return (
    <div className="about-page">
      <AboutHero />
      <AboutDetails />
      <AboutIntelligence />
      <Footer />
    </div>
  );
};

export default About;
