import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Unreachable = () => {
  return (
    <div className="empty">
      <h1>Sorry, </h1>
      <p>
        You Need to <Link to="/">Login</Link> first, if you dont have an account{" "}
        <Link to="/Signup">Signup</Link> now!
      </p>
    </div>
  );
};

export default Unreachable;
