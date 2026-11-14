"use client";

import React, { useEffect, useState } from "react";

// The 8 MB looping background only plays where it's welcome: wide screens, motion allowed.
// Phones and reduced-motion users get the static background instead (and never download the file).
const VIDEO_QUERY = "(min-width: 992px) and (prefers-reduced-motion: no-preference)";

function Video() {
  const [showVideo, setShowVideo] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(VIDEO_QUERY);
    const update = () => setShowVideo(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <>
      <div id="dots" />
      {showVideo && (
        <video
          autoPlay
          id="video"
          loop
          muted
          playsInline
          disablePictureInPicture
          className={`background-video ${isLoaded ? "loaded" : ""}`}
          onLoadedData={() => setIsLoaded(true)}
        >
          <source src="/assets/bg.mp4" type="video/mp4" />
        </video>
      )}
    </>
  );
}

export default Video;
