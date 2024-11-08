import React from "react";
import "./LevelNav.css";

export const LevelNav = ({ currentLevel, onLevelClick }) => {
  const levels = Array.from({ length: 10 }, (_, i) => `Level ${i + 1}`);

  const scrollContainerRef = React.createRef();

  const handleScroll = (direction) => {
    const scrollAmount = direction === "left" ? -200 : 200;
    scrollContainerRef.current.scrollLeft += scrollAmount;
  };

  return (
    <div className="level-nav">
      <button className="nav-arrow" onClick={() => handleScroll("left")}>
        {<i class="fa fa-angle-left" aria-hidden="true"></i>}
      </button>
      <div className="levels-container" ref={scrollContainerRef}>
        {levels.map((level, index) => (
          <button
            key={index}
            className={`level-button ${currentLevel === index + 1 ? "active" : ""}`}
            onClick={() => onLevelClick(index + 1)} // Call onLevelClick when clicked
          >
            {level}
          </button>
        ))}
      </div>
      <button className="nav-arrow" onClick={() => handleScroll("right")}>
        {<i class="fa fa-angle-right" aria-hidden="true"></i>}
      </button>
    </div>
  );
};
