import React from "react";
import "./Style/Button.css";

function ButtonWrapper(props) {
  return (
    <div className="Button-Wrapper">
      <button className="Button-Name" type="submit">
        {props.text}
      </button>
    </div>
  );
}

export default ButtonWrapper;
