import React from "react";
import { useNavigate } from "react-router-dom";

const SingOut = () => {
  const navigate = useNavigate();

  const singOutFun = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <h1> SingOut </h1>
      <button onClick={singOutFun}>Sign Out</button>
    </div>
  );
};

export default SingOut;
