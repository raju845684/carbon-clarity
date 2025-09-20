import React from "react";
import Hero from "../components/Home/Hero";
import MediaBanner from "../components/Home/MediaBanner";
import Message from "../components/Home/Message";
import Stats from "../components/Home/Stats";
import VideoSection from "../components/Home/VideoSection";
import GraphSection from "../components/Home/GraphSection";
import ContactForm from "../components/Home/ContactForm";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="scrollaway">
        <Hero />
      </div>
      <MediaBanner />
      <div className="scrollover">
        <Message />
        <Stats />
        <VideoSection />
        <GraphSection />
        <ContactForm />
        <Footer />
      </div>
    </>
  );
};

export default Home;
