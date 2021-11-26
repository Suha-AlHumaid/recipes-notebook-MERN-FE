import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Unreachable from "../Unreachable";
import "./style.css";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(
    "https://aqaarplus.com/assets/uploads/default.png"
  );
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [extraNote, setExtraNote] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    setUser(JSON.parse(userStorage));
  }, []);

  const addRecipe = async () => {
    const publisher = user.user._id;
    const res = await axios.post(`https://recipe-note-book.herokuapp.com/recipe`, {
      title: title,
      image: image,
      ingredients: ingredients,
      directions: directions,
      extraNote: extraNote,
      publisher: publisher,
    });
    navigate("/Recipes");
    setMessage(res.data.message);
  };

  return user ? (
    <div>
      <div className="addRecipe">
        <div className="addForm">
          <form
            className="formAdd"
            onSubmit={() => {
              addRecipe();
              navigate("/Recipes");
            }}
          >
            <h1> Add New Recipe </h1>
            <div className="yellowLine"></div>
            <input
              type="text"
              name="title"
              className="input"
              rows="1"
          
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />

     
            <textarea
            
              type="text"
              name="ingredients"
              className="input"
              rows="5"
              placeholder="Ingredients"
              required
              onChange={(e) => setIngredients(e.target.value)}
            />
          
    
            <br />
            <textarea
              type="text"
              name="Directions"
              className="input"
              rows="5"
              placeholder="Directions"
              required
              onChange={(e) => setDirections(e.target.value)}
            />
            <br />
            <textarea
              type="text"
              name="extraNote"
              className="input"
              rows="5"
              placeholder="Extra Note"
              onChange={(e) => setExtraNote(e.target.value)}
            />
            <br />
            <input
              type="text"
              name="image"
              className="input"
              placeholder="Image"
              onChange={(e) =>
                e.target.value.trim()
                  ? setImage(e.target.value)
                  : setImage("https://aqaarplus.com/assets/uploads/default.png")
              }
            />

            <input type="submit" value="Save" className="btn" />{" "}
            <div>
              <p>
                <Link to="/Recipes"> Back to Recipes </Link>
              </p>
            </div>
          </form>
        </div>
        <img
          className="addImg"
          src="https://images03.nicepage.com/a1389d7bc73adea1e1c1fb7e/5258432c70db515c9f2536ce/pexels-photo-2351274.jpeg"
        />
      </div>
    </div>
  ) : (
    <Unreachable />
  );
};

export default AddRecipe;
