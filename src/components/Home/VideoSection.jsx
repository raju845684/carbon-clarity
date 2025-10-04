import React, { useState, useRef } from "react";
// import Modal from "react-bootstrap/Modal";
// import video1 from "../assets/video/climeworks-v4-060421-trimmed.mp4";
// import play from "../assets/play.svg";

const VideoSection = () => {
  const [show, setShow] = useState(false);
  const videoRef = useRef(null);

  const handleClose = () => {
    setShow(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleShow = () => {
    setShow(true);

    // Ensure video plays after a short delay
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      }
    }, 100);
  };

  return (
    <div className="video-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 top-header">
            <h4>Amet minim mollit</h4>
            <h2>A fundamental shift in the power grid is happening</h2>
            <p>
              AI's unprecedented electricity demand is reshaping the power grid
              and delaying the transition to clean energy. By 2030, 27% of
              hardware may move onsite as nuclear restarts and stopgap measures
              struggle to keep pace. Companies can no longer ignore the deep
              link between their models and the energy they consume.
            </p>
          </div>
          <div className="col-md-8 col-sm-12 col-xs-12">
            <video
              src={"https://carbonclarity.ai/assets/videos/datacenter_3.mp4"}
              autoPlay
              loop
              muted
            />
          </div>
          <div className="col-md-4 col-sm-12 col-xs-12 bottom-header">
            <h3>Model Energy Monitor</h3>
            <p>
              AI models are driving a surge in data-center demand - but most
              teams have no visibility into how much energy each model consumes.
              CarbonClarity's SDK plugs directly into model inference to surface
              live metrics like watts, joules per token, and GPU/CPU
              contributions. With this transparency, companies can quantify
              energy waste, track efficiency over time, and build the foundation
              for real reductions.
            </p>
            {/* <button 
              className="play-button" 
              onClick={handleShow}
            >
              <img src={play} alt="play" />
              Play
            </button> */}
          </div>
          <div
            className="col-12 col-md-12 col-sm-12 col-xs-12 margin-bottom"
            style={{ marginBottom: "120px" }}
          ></div>
          <div className="col-md-4 col-sm-12 col-xs-12 bottom-header order-2 order-md-1">
            <h3>Model Energy Monitor</h3>
            <p>
              AI models are driving a surge in data-center demand - but most
              teams have no visibility into how much energy each model consumes.
              CarbonClarity's SDK plugs directly into model inference to surface
              live metrics like watts, joules per token, and GPU/CPU
              contributions. With this transparency, companies can quantify
              energy waste, track efficiency over time, and build the foundation
              for real reductions.
            </p>
            {/* <button 
              className="play-button"
              onClick={handleShow}
            >
              <img src={play} alt="play" />
              Play
            </button> */}
          </div>
          <div className="col-md-8 col-sm-12 col-xs-12 order-1 order-md-2">
            <video
              src={"https://carbonclarity.ai/assets/videos/datacenter_2.mp4"}
              autoPlay
              loop
              muted
            />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {/* <Modal
        show={show}
        onHide={handleClose}
        centered
        size="xl"
        dialogClassName="video-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Model Energy Monitor</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <video
            ref={videoRef}
            src={video1}
            controls
            autoPlay
            style={{
              maxWidth: "100%",
              maxHeight: "70vh",
              objectFit: "contain",
            }}
          />
        </Modal.Body>
      </Modal> */}
    </div>
  );
};

export default VideoSection;
