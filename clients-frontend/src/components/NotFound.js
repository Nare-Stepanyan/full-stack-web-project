import React from "react";
import error from "./../images/error.jpeg";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="error">
      <Link to="/">
        <img src={error} style={{ cursor: "pointer" }} />
      </Link>
    </div>
  );
}

export default NotFound;
