import React from "react";

const KasperskyCyberMap = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "50%", // aspect ratio
        minHeight: "450px",
        overflow: "hidden",
        borderRadius: "12px",
      }}
    >
      <iframe
        src="https://cybermap.kaspersky.com/en/widget/dynamic/dark"
        title="Kaspersky Global Cyber Threat Map"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
};

export default KasperskyCyberMap;
