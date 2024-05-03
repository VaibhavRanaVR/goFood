import React, { useEffect } from "react";
import "./Style/TypeWriter.css";

const Typewriter = ({ textArray, color, fontSize }) => {
  return (
    <div className="Typewriter-Container">
      {textArray.map((element, index) => (
        <h1
          className="Typewriter-Text"
          style={{
            color: color,
            fontSize: fontSize,
            animation: `typing 3s steps(65, end), ease-out`,
            animationDelay: `${3 * index + 0.5}s`,
            visibility: "hidden",
          }}
          key={index}
          onAnimationEnd={(event) =>
            (event.target.style.visibility = "visible")
          }
        >
          {element}
        </h1>
      ))}
    </div>
  );
};

export default Typewriter;
