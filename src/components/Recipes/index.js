import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import SingleRecipe from "../SingleRecipe";
import Unreachable from "../Unreachable";
import Header from "../Header";
import "./style.css";

const Recipes = ({getRecipes,recipes}) => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const user = JSON.parse(userStorage);
    setUser(user);
  }, []);

  useEffect(() => {
    getRecipes();
  }, []);

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
            {recipes&& recipes.length !== 0 ? (
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
