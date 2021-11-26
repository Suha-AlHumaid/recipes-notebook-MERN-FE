import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SingleRecipe from "../SingleRecipe";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Unreachable from "../Unreachable";

import "./style.css";
const Recipes = () => {
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
      const res = await axios.get(`https://recipe-note-book.herokuapp.com/yourRecipes/${id}`, {
        username: userData.username,
      });
      setRecipes(res.data.filter((elem) => elem.isDeleted != true));
    }
  };

  return (
    <div className="recipes">
      {!user ? (
<Unreachable/>
      ) : (
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
             <p>You do not have any recipes yet .. To add new one click on</p><IoMdAdd
              className="icon"
              id="addIcon"
              onClick={() => {
                navigate("/AddRecipe");
              }} 
            /> 
            </div>
          )}

 
        </div>
        
      )}

    </div>
  );
};

export default Recipes;
