import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Singup from "./components/Singup"
import SingOut from "./components/SingOut";
import Recipes from "./components/Recipes"

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Singup" element={<Singup />} />
        <Route exact path="/SingOut" element={<SingOut />} />
        <Route exact path="/Recipes" element={<Recipes />} />
      </Routes>
    </>
  );
};

export default App;
