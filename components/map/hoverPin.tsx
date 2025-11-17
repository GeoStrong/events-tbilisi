import React, { useState } from "react";

interface HoverPinProps {
  id: string;
}

const HoverPin: React.FC<HoverPinProps> = ({ id }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      id={id}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center justify-center"
      style={{
        transform: hover ? "scale(1.25)" : "scale(1)",
        transition: "transform 0.18s ease",
      }}
    >
      {/* Glow */}
      <div className="absolute h-8 w-8 rounded-full bg-white opacity-20 blur-md"></div>

      {/* SVG Pin */}
      <svg width="32" height="32" viewBox="0 0 24 24">
        <path
          d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z"
          fill="#ff4757"
        />
        <circle cx="12" cy="9" r="3" fill="white" />
      </svg>
    </div>
  );
};

export default HoverPin;
