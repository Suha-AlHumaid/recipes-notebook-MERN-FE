import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Login from '../Login'
import "./style.css"
const Home =()=> {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const userStorage = localStorage.getItem("user");
        const user = JSON.parse(userStorage);
        setUser(user);
      }, []);

    return (
        <div className="container">
                    {user ? (
            navigate("/Recipes")
               ) : (<div>
        <div className="ImgBox" >
            <img className="homeImg" src="https://www.teahub.io/photos/full/19-194395_dark-mood-food-photography.jpg" />
        </div>
        <div className="loginBox">
            <div className="titleBox">
                <h1 className="title">YUMMY</h1>
            </div>
            <Login id="login"/>
        </div>
        </div>
        )}

        </div>
        )
}

export default Home