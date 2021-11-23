import React from "react";
import "./style.css";

const SingleRecipe = (props) => {
  return (
    <div>
    {props.elem.title}
    </div>
  );
};

export default SingleRecipe;