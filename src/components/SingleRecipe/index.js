import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";

const SingleRecipe = (props) => {
  const navigate = useNavigate();
  
  // const deleteRecipe = async (e) => {
  //   e.preventDefault();
  //   const _id = props.elem._id;
  //   const res = await axios.delete(
  //     `http://localhost:5000/recipe/${props.elem._id}`
  //   );
  //   props.getRecipes();
  //   // setMessage(res.data.message);
  // };
  // const editRecipe = async (e) => {
  //   e.preventDefault();
  //   const _id = props.elem._id;
  //   console.log(_id);
  //   const res = await axios.put(
  //     `http://localhost:5000/recipe/${props.elem._id}`
  //   );
  //   props.getRecipes();
  //   // setMessage(res.data.message);
  // };
  return (
    <div className="single">
      <div className="recipeHolder">
        <img src={props.elem.image} className="imgRecipe" onClick={()=>{navigate(`/Recipe/${props.elem._id}`)}}/>
        <div className="name">
          <p>
            {props.elem.title}
          </p>
          <AiOutlineEdit
              className="icon"
              onClick={(e) => navigate(`/EditRecipe/${props.elem._id}`)}
            />
                  {/* <AiOutlineDelete className="icon" onClick={deleteRecipe} /> */}
        </div>
      </div>

    </div>
  );
};

export default SingleRecipe;
