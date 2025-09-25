import React, { useRef, useEffect, useState } from "react";

const MediaBanner = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const mediaRef = useRef(null);
  const headerDetailsRefs = useRef([]);
  const backgroundMaskRef = useRef(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!mediaRef.current || !headerDetailsRefs.current[0]) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Determine scroll direction
      setIsScrollingUp(scrollTop < lastScrollTop);
      setLastScrollTop(scrollTop);

      const mediaRect = mediaRef.current.getBoundingClientRect();
      const firstHeaderRect =
        headerDetailsRefs.current[0].getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const mediaHeight = mediaRect.height;

      // Calculate scroll progress through the media section
      const scrolled = windowHeight - mediaRect.top;
      const totalScrollDistance = windowHeight + mediaHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));

      setScrollProgress(progress);

      // Check if header-detail-box is visible in the viewport
      const isHeaderVisible =
        firstHeaderRect.top < windowHeight && firstHeaderRect.bottom > 0;
      setIsVisible(isHeaderVisible);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  // Dynamic background transform - gradual scale increase based on scroll progress
  const calculateBackgroundScale = () => {
    if (scrollProgress <= 0) {
      return "scale(1)"; // Start at scale(1)
    } else if (scrollProgress >= 1) {
      return "scale(1.15)"; // Max scale at full scroll
    } else {
      // Gradual scale increase from 1 to 1.15
      const scaleValue = 1 + scrollProgress * 0.15; // 0.15 = 1.15 - 1
      return `scale(${scaleValue.toFixed(5)})`; // 5 decimal places for precision
    }
  };

  const backgroundTransform = calculateBackgroundScale();

  // Individual transform for each box
  const box1Transform = `translateY(${-scrollProgress * 100}vh)`; // Box 1 moves up
  const box2Transform = `translateY(${-scrollProgress * 100 + 100}vh)`; // Box 2 starts 40vh lower

  // Individual opacity calculation for each header box
  const calculateIndividualOpacity = (index) => {
    const headerRect =
      headerDetailsRefs.current[index]?.getBoundingClientRect();
    if (!headerRect) return 0;

    const windowHeight = window.innerHeight;
    const fadeDistance = windowHeight * 0.25; // 25% of viewport height for fade effect

    // Calculate element's position in viewport
    const elementTop = headerRect.top;
    const elementBottom = headerRect.bottom;

    if (index === 0) {
      // Logic for box-1: fade in from bottom, fade out at top
      if (elementTop > windowHeight) {
        // Completely below viewport
        return 0;
      } else if (
        elementTop <= windowHeight &&
        elementTop > windowHeight - fadeDistance
      ) {
        // Fade in when entering from bottom
        const fadeProgress = (windowHeight - elementTop) / fadeDistance;
        return Math.max(0, Math.min(1, fadeProgress));
      } else if (elementBottom >= 0 && elementBottom < fadeDistance) {
        // Fade out when exiting at top
        const fadeProgress = elementBottom / fadeDistance;
        return Math.max(0, Math.min(1, fadeProgress));
      } else if (elementTop < 0) {
        // Completely above viewport
        return 0;
      }
      // Fully visible
      return 1;
    } else if (index === 1) {
      // Logic for box-2: only fade in after box-1 is fully faded out
      const box1Rect = headerDetailsRefs.current[0]?.getBoundingClientRect();
      if (box1Rect && box1Rect.bottom > 0) {
        // Box-1 is still in viewport, so box-2 remains hidden
        return 0;
      }

      // Fade logic for box-2
      if (elementTop > windowHeight) {
        // Completely below viewport
        return 0;
      } else if (
        elementTop <= windowHeight &&
        elementTop > windowHeight - fadeDistance
      ) {
        // Fade in when entering from bottom
        const fadeProgress = (windowHeight - elementTop) / fadeDistance;
        return Math.max(0, Math.min(1, fadeProgress));
      } else if (elementBottom >= 0 && elementBottom < fadeDistance) {
        // Fade out when exiting at top
        const fadeProgress = elementBottom / fadeDistance;
        return Math.max(0, Math.min(1, fadeProgress));
      } else if (elementTop < 0) {
        // Completely above viewport
        return 0;
      }
      // Fully visible
      return 1;
    }
    return 0;
  };

  // Calculate opacity for each header box
  const firstBoxOpacity = calculateIndividualOpacity(0);
  const secondBoxOpacity = calculateIndividualOpacity(1);

  // Fixed container height - no dynamic calculation based on scroll
  const containerHeight = `calc(100vh + 100vh + 80vh)`; // Fixed height: 100vh + 100vh for box offset + 200vh for scroll distance

  return (
    <div
      className="media-banner-container"
      style={{ minHeight: containerHeight }}
    >
      {/* Fixed Background Media Section */}
      <div ref={mediaRef} className="media" id="media">
        <div
          ref={backgroundMaskRef}
          className="media-backgroundMask"
          style={{
            transform: backgroundTransform,
            transition: "transform 100ms",
            // transition: "transform 0.1s ease-out",
          }}
        />
      </div>

      {/* Scrolling Content Overlay */}
      <div className="media-header-scrollover">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                ref={(el) => (headerDetailsRefs.current[0] = el)}
                className="header-detail-box box-1"
                style={{
                  opacity: firstBoxOpacity,
                  transform: box1Transform,
                  transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
                }}
              >
                <div className="bg-box">
                  <h3>
                    Fueled by the growth of AI, global electricity usage from
                    data centers is set to more than double over the next five
                    years. 30% of AI compute resources are wasted on inefficient
                    model operations.
                  </h3>
                </div>
              </div>
              {/* <div
                ref={(el) => (headerDetailsRefs.current[1] = el)}
                className="header-detail-box box-2"
                style={{
                  opacity: secondBoxOpacity,
                  transform: box2Transform,
                  transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
                }}
              >
                <h3>
                  4.4% of all the energy in the US now goes toward data centers.
                </h3>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaBanner;
