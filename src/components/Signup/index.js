//http://localhost:5000
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import "./style.css";

const Signup = () => {
  const BASE_URL = "https://recipe-note-book.herokuapp.com";
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    setUser(JSON.parse(userStorage));
  }, []);

  const signup = async (e) => {
    e.preventDefault();
    // setMessage("Faild");
    console.log(userName, email, password);
    try {
      const res = await axios.post(`${BASE_URL}/user/register`, {
        userName: userName,
        email: email,
        password: password,
      });
      console.log(res.data.message);
      if (typeof res.data.user === "object") {
        localStorage.setItem("user", JSON.stringify({ user: res.data.user }));
        navigate("/Recipes");
      }
      setMessage(res.data.message);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  return (
    <div id="signup">
      {user ? (
        navigate("/Recipes")
      ) : (
        <div className="form22">
          <div className="imgSingup">
            <img
              id="imgSingup"
              src="https://i.pinimg.com/564x/2c/db/bc/2cdbbc8df8c84e5011079dfad28af397.jpg"
            />
          </div>
          <div className="yellow">
            <form className="form2" onSubmit={signup} method="POST">
              <h1 className="title">Create an Account</h1>
              <div className="yellowLine"></div>
              <input
                type="text"
                name="userName"
                placeholder="Name"
                className="input2"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
              <br />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input2"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input2"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {message ? <p className="message"> {message}</p> : ""}
              <div className="flex">
                <input type="submit" className="btn" value="Go" />
              </div>
              <div>
                <p>
                  Have an Account?
                  <Link to="/"> Back to Login! </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
