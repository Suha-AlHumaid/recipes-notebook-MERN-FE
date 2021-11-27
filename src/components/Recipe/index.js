import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate, useParams, Link } from "react-router-dom";
import Unreachable from "../Unreachable";
import Header from "../Header";
import {IoIosKeypad} from "react-icons/io"
import "./style.css";

const Recipe = () => {
  const BASE_URL ="https://recipe-note-book.herokuapp.com"
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
  }, []);

  const getRecipe = async () => {
    const res = await axios.get(`${BASE_URL}/recipe/${id}`);
    // console.log(res.data);
    setRecipe(res.data);

    // const userStorage = localStorage.getItem("user");
    // const userData = JSON.parse(userStorage);

    // if (userData) {
    // const res = await axios.get(`http://localhost:5000/Recipe/${id}`);
    // console.log(res);
    // setRecipe(res.data)
    // }
  };
  const deleteRecipe = async (e) => {
    setMessage("")
    e.preventDefault();
    const res = await axios.delete(
      `http://localhost:5000/recipe/${recipe._id}`
    );
    // setMessage(res.data);
    // console.log(res.data);

    if (typeof res.data === "object") {
      navigate("/Recipes");
    }
    else{
      setMessage("Delete is Faild")
    }
  };
  return (
    <div className="recipeX">
      {user ? (
        <>
        <Header/>
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
                     onClick={(e)=>{
                       e.preventDefault()
                       navigate(`/EditRecipe/${recipe._id}`)}}
                   />
                   <IoIosKeypad      className="icon"
                     onClick={(e)=>{
                       e.preventDefault()
                       navigate("/Recipes")}}/></div>
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

                    {/* <p>
                      <Link to="/Recipes"> Back to Recipes </Link>
                    </p> */}
                  </div>
                </div>
              </div>
              <img src={recipe.image} className="recipeImgX" />
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
