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

      <button onClick={singOutFun}>Sign Out</button>

  );
};

export default SingOut;
