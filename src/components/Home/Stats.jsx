import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Stats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // animate only once
    threshold: 0.3, // start when 30% visible
  });

  return (
    <div className="stats" id="stats" ref={ref}>
      <div className="container">
        <div className="row">
          <div className="col-md-9 col-sm-12 col-xs-12 stats-content">
            <h2>
              Our Model Energy Monitor equips teams to observe, optimize, and
              report per-model energy usage - ensuring transparency, efficiency,
              cost savings, and regulatory readiness.
            </h2>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
            <div className="stats-container d-flex gap-4">
              <div className="stats-item">
                <h3>27 %</h3>
                <strong>Onsite Power</strong>
              </div>
              <div className="stats-item">
                <h3>30 %</h3>
                <strong>Model Waste</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
