import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { IoIosKeypad } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { storage } from "../firebase";
import Unreachable from "../Unreachable";
import Header from "../Header";
import "./style.css";

const EditRecipe = () => {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [extraNote, setExtraNote] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    setUser(JSON.parse(userStorage));
  }, []);

  useEffect(() => {

    getRecipe();
  
  }, []);
 

  const getRecipe = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/recipe/${id}`);
    setRecipe(res.data);
  };

  const editRecipe = async () => {
    setMessage("");
 
    const publisher = user.user._id;
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/recipe/${id}`, {
      title: title,
      image: url,
      ingredients: ingredients,
      directions: directions,
      extraNote: extraNote,
      publisher: publisher,
    });
    console.log(res.data._id);
    if (res.data._id === id) {
      setRecipe(res.data);
      setMessage("Updated Successfully");
      navigate(`/Recipe/${id}`);
    } else {
      setMessage("Some thing wont wrong!");
    }
  };
  const [progress, setProgress] = useState(0);
  const [image1, setImage1] = useState(null);
  const [url, setUrl] = useState("https://aqaarplus.com/assets/uploads/default.png");


  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage1(e.target.files[0]);

    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image1.name}`).put(image1);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image1.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };


  return !user ? (
    <Unreachable />
  ) : (
    <div>
      {recipe && (
        <div>
          <Header />
          <div className="editRecipe">
            <div className="editForm">
              <form
                className="formEdit"
                onSubmit={(e) => {
                  e.preventDefault();
                  editRecipe();
                }}
                // method="POST"
              >
               
                <div className="title">
                      <h1 id="title"> Edit Your Recipe </h1>

                        <IoIosKeypad
                          className="icon"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/Recipes");
                          }}
                        />
        
                    </div>
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
                {/* <input
                  type="text"
                  name="image"
                  className="input"
                  defaultValue={recipe.image}
                  placeholder="Image"
                  onChange={(e) =>
                    e.target.value.trim()
                      ? setImage(e.target.value)
                      : setImage(
                          "https://aqaarplus.com/assets/uploads/default.png"
                        )
                  }
                /> */}
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
                            <div className="upload">
              <input type="file" onChange={
                 handleChange} />
             <div className="prograss">
              <button className="btn" onClick={
                handleUpload}>Upload</button>
              <progress className="black" value={progress} max="100" />
             </div>
            </div>
                {message ? <p className="message"> {message}</p> : ""}
                <div className="center">
                  <input type="submit" value="Save" className="btn" />
                  {/* <input type="button" value="Cancel" className="btn" onClick={(e)=>{   e.preventDefault();    navigate(`/Recipe/${id}`);}}/> */}
                  {/* <div>
                    <p>
                      <Link to="/Recipes"> Back to Recipes </Link>
                    </p>
                  </div> */}
                </div>
              </form>
            </div>
            <img alt="add img" className="addImg" src={recipe.image} />
          </div>
        </div>
      )
      }
    </div>
  )
};

export default EditRecipe;
