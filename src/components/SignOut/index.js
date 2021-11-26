import React from "react";
import { useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import "./style.css";
const SignOut = (props) => {
  const navigate = useNavigate();

  const signOutFun = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    props.header();
    navigate("/");

  };

  return (
    <>
      <div className="logout">
        <BiLogOutCircle onClick={signOutFun} className="icon" id="signout" />
        <p id="logout">logout</p>
      </div>
    </>
  );
};

export default SignOut;
