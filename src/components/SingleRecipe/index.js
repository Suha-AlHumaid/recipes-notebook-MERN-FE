import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./style.css";

const SingleRecipe = (props) => {
  const navigate = useNavigate();
  return (
    <div className="single">
      <div className="recipeHolder">
        <img
        alt="recipeImg"
          src={props.elem.image}
          className="imgRecipe"
          onClick={() => {
            navigate(`/Recipe/${props.elem._id}`);
          }}
        />
        <div className="name">
          <p>{props.elem.title}</p>
          <AiOutlineEdit
            className="icon"
            onClick={(e) => navigate(`/EditRecipe/${props.elem._id}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;
