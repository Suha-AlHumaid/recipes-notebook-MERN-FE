import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SingleRecipe from "../SingleRecipe";
import SingOut from "../SingOut";
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
        <p>
          You have to <Link to="/Login">Login</Link> first, if you dont have an account {" "}
          <Link to="/Signup">Signup</Link> now!
        </p>
      ) : (
        <div>
           <SingOut />
          {recipes.length ===0? (
            <div>
              {recipes.map((elem) => (
                <SingleRecipe elem={elem} />
              ))}
            </div>
          ) : (
            <p>you do not have any recipe yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Recipes;
