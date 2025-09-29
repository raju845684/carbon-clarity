import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoWhite from "../assets/logo-white.svg";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleContactUs = () => {
    if (location.pathname === "/") {
      // If on home page, scroll to the section
      const element = document.getElementById("request-demo");
      if (element) {
        element.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        });
      }
    } else {
      // If on other pages, navigate to home and then scroll
      navigate("/");
      // Use setTimeout to ensure the page has loaded before scrolling
      setTimeout(() => {
        const element = document.getElementById("request-demo");
        if (element) {
          element.scrollIntoView({ 
            behavior: "smooth",
            block: "start"
          });
        }
      }, 100);
    }
  };

  return (
    <div className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="footer-logo">
              <img src={logoWhite} alt="logo" />
              <a href="mailto:admin@carbonclarity.ai">Contact Us</a>
              <p>&copy; All rights Reserved 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
