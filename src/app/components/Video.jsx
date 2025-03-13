"use client"; // Mark this component as a Client Component

import React, { useState } from "react";

function Video() {
    const [isLoaded, setIsLoaded] = useState(false);

 
  return (
    <>
      <div id="dots" />
      <video 
      autoPlay 
       id="video"
      loop 
      muted 
      playsInline 
       disablePictureInPicture
       className={`background-video ${isLoaded ? "loaded" : ""}`}
       onLoadedData={() => setIsLoaded(true)} // Hide fallback when video loads
        >
    <source src="/assets/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}

export default Video;