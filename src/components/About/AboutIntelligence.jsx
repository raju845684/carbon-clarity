import React from "react";
import Vector1 from "../../assets/Vector-1.png";
import Vector2 from "../../assets/Vector-2.png";
import Vector3 from "../../assets/Vector-3.png";
import Vector4 from "../../assets/Vector-4.png";
import Vector5 from "../../assets/Vector-5.png";
import Vector6 from "../../assets/Vector-6.png";

const AboutIntelligence = () => {
  return (
    <div className="about-intelligence">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>
              We partner with organizations across sectors to build more
              responsible, energy-aware Al ecosystems, aligning technology and
              climate responsibility for a net-zero future.
            </h2>
            <p>
              CarbonClarity.AI is purpose-built for enterprise, on-prem
              environments with granular, per-model observability at its core.
              Monitor, optimize, <br /> and govern AI workloads without sending secure
              data offsite.
            </p>
          </div>
        </div>
        <div className="col-12 box-container">
          <h2 className="box-title">Why real-time intelligence?</h2>
          <div className="box-row">
            <div className="box">
              <div className="bg">
                <img src={Vector1} alt="Vector1" />
                <p>Seamless integration with existing on-prem infra</p>
              </div>
            </div>
            <div className="box">
              <div className="bg">
                <img src={Vector2} alt="Vector2" />
                <p>Enterprise security</p>
              </div>
            </div>
            <div className="box">
              <div className="bg">
                <img src={Vector3} alt="Vector3" />
                <p>
                  Per-model observability across performance and energy metrics
                </p>
              </div>
            </div>
          </div>
          <div className="box-row">
            <div className="box">
              <div className="bg">
                <img src={Vector4} alt="Vector4" />
                <p>Actionable optimization guidance</p>
              </div>
            </div>
            <div className="box">
              <div className="bg">
                <img src={Vector5} alt="Vector5" />
                <p>Role-based dashboards, alerts, and governance reporting</p>
              </div>
            </div>
            <div className="box">
              <div className="bg">
                <img src={Vector6} alt="Vector6" />
                <p>Dedicated enterprise support and SLAs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutIntelligence;
