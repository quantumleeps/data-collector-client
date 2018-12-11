import React from "react";
// import { Button, Glyphicon } from "react-bootstrap";
import "./DataPointBox.css";

export default ({
//   isLoading,
  text,
//   loadingText,
  className = "",
//   disabled = false,
  ...props
}) =>
  <div className={`DataPointBox ${className}`}>
      {text}
  </div>
