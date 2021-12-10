import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Unreachable from "../Unreachable";
import Header from "../Header";
import { storage } from "../firebase";
import "./style.css";

const AddRecipe = ({getRecipes}) => {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(
    "https://aqaarplus.com/assets/uploads/default.png"
  );
  const [image1, setImage1] = useState(null);
  const [url, setUrl] = useState(
    "https://aqaarplus.com/assets/uploads/default.png"
  );
  const [progress, setProgress] = useState(0);
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
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/recipe`, {
      title: title,
      image: url,
      ingredients: ingredients,
      directions: directions,
      extraNote: extraNote,
      publisher: publisher,
    });

    if (res.data.message === "success") {
      getRecipes();
      setMessage(res.data.message);
      navigate("/Recipes");
    } else {
      setMessage("sorry, something wrong");
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage1(e.target.files[0]);
    }
  };

  const handleUpload = () => {
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

  console.log("image: ", image1);

  return user ? (
    <div>
      <Header />

      <div className="addRecipe">
        <div className="addForm">
          <form
            method="POST"
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
            {/* <input
              type="text"
              name="image"
              className="input"
              placeholder="Image"
              onChange={(e) =>
                e.target.value.trim()
                  ? setImage(e.target.value)
                  : setImage("https://aqaarplus.com/assets/uploads/default.png")
              }
            /> */}

            <div className="upload">
              <input type="file" onChange={handleChange} />
              <div className="prograss">
                <button className="btn" onClick={handleUpload}>
                  Upload
                </button>
                <progress className="black" value={progress} max="100" />
              </div>
            </div>
            {message ? <p className="message"> {message}</p> : ""}

            <div className="deleRecipe">
              <p>
                <Link to="/Recipes"> Cancel </Link>
              </p>
              <input type="submit" value="Save" className="btn" />{" "}
            </div>
          </form>
        </div>
        <img src="https://i.pinimg.com/564x/84/7c/c4/847cc46a06efd12c34758be6978d16fc.jpg" className="addImg"/>
       
      </div>
    </div>
  ) : (
    <Unreachable />
  );
};

export default AddRecipe;
