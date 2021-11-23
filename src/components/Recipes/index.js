import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SingleRecipe from "../SingleRecipe";
import "./style.css";
const Recipes = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState("");

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const user = JSON.parse(userStorage);
    setUser(user);
  }, []);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);

    if (userData) {
      const id = userData.user._id;
      const res = await axios.get(`http://localhost:5000/yourRecipes/${id}`, {
        username: userData.username,
      });
      setRecipes(res.data);
      console.log(recipes);
    }
  };

  return (
    <div>
      {!user ? (
        <h1>
          You are not logeddin yet, so <Link to="/login">login</Link> or{" "}
          <Link to="/signup">signup</Link>
        </h1>
      ) : (
        <div>
          {recipes ? (
            <div>
              {recipes.map((elem) => (
                <SingleRecipe elem={elem} />
              ))}
            </div>
          ) : (
            <h1>you do not have any recipie yet</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Recipes;
