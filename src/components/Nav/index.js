import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Nav = () => {
  return (
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Login">Login</Link></li>
        <li><Link to="/Signup">Signup</Link></li>
        <li><Link to="/SingOut">SingOut</Link></li>
        <li><Link to="/Recipes">Recipes</Link></li>
    </ul>
  )
};
export default Nav;
