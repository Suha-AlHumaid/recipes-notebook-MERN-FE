import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SingOut from "./components/SignOut";
import Recipes from "./components/Recipes";
import Profile from "./components/Profile";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";
import Recipe from "./components/Recipe";
import "./style.css";

const App = () => {
  const BASE_URL = "https://recipe-note-book.herokuapp.com";
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Signup" element={<Signup />} />
        <Route exact path="/SingOut" element={<SingOut />} />
        <Route exact path="/Recipes" element={<Recipes />} />
        <Route exact path="/Recipe/:id" element={<Recipe />} />
        <Route exact path="/Profile" element={<Profile />} />
        <Route exact path="/AddRecipe" element={<AddRecipe />} />
        <Route exact path="/EditRecipe/:id" element={<EditRecipe />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
