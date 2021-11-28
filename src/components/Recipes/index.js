import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import SingleRecipe from "../SingleRecipe";
import Unreachable from "../Unreachable";
import Header from "../Header";
import "./style.css";

const Recipes = () => {
  const BASE_URL = "https://recipe-note-book.herokuapp.com";
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

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
      const res = await axios.get(`${BASE_URL}/yourRecipes/${id}`, {
        username: userData.username,
      });
      setRecipes(res.data.filter((elem) => elem.isDeleted !== true));
    }
  };

  return (
    <div className="recipes">
      {!user ? (
        <Unreachable />
      ) : (
        <>
          <Header />
          <div className="main">
            <div className="add">
              <IoMdAdd
                className="icon"
                id="addIcon"
                onClick={() => {
                  navigate("/AddRecipe");
                }}
              />
            </div>
            {recipes.length !== 0 ? (
              <div className="mainRecipes">
                {recipes.map((elem) => (
                  <SingleRecipe elem={elem} getRecipes={getRecipes} />
                ))}
              </div>
            ) : (
              <div className="emptyRecipe">
                <p>
                  You do not have any recipes yet .. To add new one click on
                </p>
                <IoMdAdd
                  className="icon"
                  id="addIcon"
                  onClick={() => {
                    navigate("/AddRecipe");
                  }}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Recipes;
