import React, { useState, useEffect } from "react";
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
import axios from "axios";
const App = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    if (userData) {
      const id = userData.user._id;
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/yourRecipes/${id}`, {
        username: userData.username,
      });
      setRecipes(res.data.filter((elem) => elem.isDeleted !== true));
    }
  };

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Signup" element={<Signup />} />
        <Route exact path="/SingOut" element={<SingOut />} />
        <Route exact path="/Recipes" element={<Recipes recipes={recipes} getRecipes={getRecipes}/>} />
        <Route exact path="/Recipe/:id" element={<Recipe />} />
        <Route exact path="/Profile" element={<Profile />} />
        <Route exact path="/AddRecipe" element={<AddRecipe getRecipes={getRecipes} />} />
        <Route exact path="/EditRecipe/:id" element={<EditRecipe />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
