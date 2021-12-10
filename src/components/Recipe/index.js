import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosKeypad } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import Unreachable from "../Unreachable";
import Header from "../Header";
import "./style.css";

const Recipe = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    setUser(JSON.parse(userStorage));
  }, []);

  useEffect(() => {
    getRecipe();
     // eslint-disable-next-line
  }, []);

  const getRecipe = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/recipe/${id}`);
    setRecipe(res.data);
  };

  const deleteRecipe = async (e) => {
    setMessage("");

    e.preventDefault();
    const res = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/recipe/${recipe._id}`
    );

    if (typeof res.data === "object") {
      console.log(res.data);
      setMessage("Delete");
      navigate("/Recipes");
    } else {
      setMessage("Delete is Faild");
    }
  };

  return (
    <div className="recipeX">
      {user ? (
        <>
          <Header />
          {recipe && (
            <div className="recipeP">
              <div className="recipeXX">
                <div className="recipeNote">
                  <div id="note">
                    <div className="title">
                      <h1 id="title"> {recipe.title} </h1>
                      <div>
                        <AiOutlineEdit
                          className="icon"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/EditRecipe/${recipe._id}`);
                          }}
                        />
                        <IoIosKeypad
                          className="icon"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/Recipes");
                          }}
                        />
                      </div>
                    </div>
                    <div className="yellowLine"></div>
                    <br />
                    <div>
                      {" "}
                      <h2>Ingredients:</h2>
                      {recipe.ingredients}
                    </div>

                    <br />

                    <div>
                      {" "}
                      <h2>Directions:</h2>
                      {recipe.directions}
                    </div>
                    <br />

                    {recipe.extraNote ? (
                      <div>
                        {" "}
                        <h2>ExtraNote:</h2> {recipe.extraNote}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {message ? <p className="message"> {message}</p> : ""}
                  <div className="right">
                    <input
                      type="submit"
                      value="Delete"
                      className="btn"
                      onClick={deleteRecipe}
                    />
                  </div>
                </div>
              </div>
              <img alt="recipe img"src={recipe.image} className="recipeImgX" />
            </div>
          )}
        </>
      ) : (
        <Unreachable />
      )}
    </div>
  );
};

export default Recipe;
