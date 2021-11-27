import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams , Link} from "react-router-dom";
import Unreachable from "../Unreachable";
import Header from "../Header";
import "./style.css";

const EditRecipe = () => {
  const BASE_URL ="https://recipe-note-book.herokuapp.com"
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [extraNote, setExtraNote] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    setUser(JSON.parse(userStorage));
  }, []);

  useEffect(() => {
    getRecipe();
  }, []);
  // console.log(id);

  const getRecipe = async () => {
    const res = await axios.get(`${BASE_URL}/recipe/${id}`);
    setRecipe(res.data);
  };

  const editRecipe = async (e) => {
    setMessage("")
 

    const publisher = user.user._id;
    const res = await axios.put(`${BASE_URL}/recipe/${id}`, {
      title: title,
      image: image,
      ingredients: ingredients,
      directions: directions,
      extraNote: extraNote,
      publisher: publisher,
    });
    console.log(res.data._id);
if(res.data._id === id){
  setRecipe(res.data);
  setMessage("Updated Successfully");
  // navigate("/Recipes");
}
else{
  setMessage("Some thing wont wrong!");
}

  };

  return ( !user?(<Unreachable />):(
  <div>
   {recipe && (
      <div>
        <Header/>
          <div className="editRecipe">
          <div className="editForm">
        <form
    
         className="formEdit"
          onSubmit={(e) => {
            e.preventDefault()
            editRecipe();
           
          }}
          // method="POST"
        >
          <h1> Edit Your Recipe </h1>
          <div className="yellowLine"></div>
          <input
            type="text"
            name="title"
            className="input"
            defaultValue={recipe.title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <input
            type="text"
            name="image"
            className="input"
            defaultValue={recipe.image}
            placeholder="Image"
            onChange={(e) => e.target.value.trim()? setImage(e.target.value): setImage("https://aqaarplus.com/assets/uploads/default.png") }
          />
          <textarea
            type="text"
            name="ingredients"
            className="input"
            defaultValue={recipe.ingredients}
            placeholder="Ingredients"
            onChange={(e) => setIngredients(e.target.value)}
          />
          <br />
          <textarea
            type="text"
            name="Directions"
            className="input"
            defaultValue={recipe.directions}
            placeholder="Directions"
            onChange={(e) => setDirections(e.target.value)}
          />
          <br />
          <textarea
            type="text"
            name="extraNote"
            className="input"
            defaultValue={recipe.extraNote}
            placeholder="Extra Note"
            onChange={(e) => setExtraNote(e.target.value)}
          />
          {message ? <p className="message"> {message}</p> : ""}
          <div className="deleRecipe">
         
          <input type="submit" value="Save" className="btn" />
          <div >
              <p>
                <Link to="/Recipes"> Back to Recipes </Link>
              </p>
            </div>
            </div>
        </form>
        </div>
        <img
          className="addImg"
          src={recipe.image}
        />
        </div>
   
      </div> 
    )}
 </div> )
  );
};

export default EditRecipe;
