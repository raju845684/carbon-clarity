import React from "react";
import aboutHero from "../../assets/about-us.svg";

const AboutHero = () => {
  return (
    <div className="about-hero">
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-7 right-content">
            <h1>
              Helping business succeed while building AI models responsibly.{" "}
            </h1>
            <p>
              We help organizations monitor and reduce the energy footprint of
              their AI systems. As AI adoption accelerates, we ensure innovation
              goes hand-in-hand with energy impact.
            </p>
          </div>
          <div className="col-5 left-content">
            <img src={aboutHero} style={{ width: "100%" }} alt="about-hero" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
