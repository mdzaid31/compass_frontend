'use client';

import React from "react";

const VideoEmbed = () => {
  return (
    <div className="items-center">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <iframe
          src="https://drive.google.com/file/d/1-A_ZORQUiWXq9Nr4TJ5Vng7VbZBIMu8H/preview"
          width="740"
          height="480"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex items-center">
        <div className="p-2 items=center">Team A</div>
        <div className="p-2 items=center">Team B</div>
        <div className="p-2 items=center">Team C</div>
      </div>
    </div>
  );
};

export default VideoEmbed;