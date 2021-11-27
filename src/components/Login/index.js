import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Login = () => {
  const BASE_URL ="https://recipe-note-book.herokuapp.com"
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    setUser(JSON.parse(userStorage));
  }, []);

  const login = async (e) => {
    e.preventDefault()
    console.log(email , password);
    const res = await axios.post(`${BASE_URL}/user/login`, {
      email: email,
      password: password,
    });
    console.log(res);
    if (typeof res.data.user === "object") {
      localStorage.setItem("user", JSON.stringify({ user: res.data.user }));
      navigate("/Recipes");
    } 
      console.log(res.data.message);
      setMessage(res.data.message);
    
  };

  return (
    <div className="login">
      {user ? (
        navigate("/Recipes")
      ) : (
        <div className="form">
          <form onSubmit={login} method="POST">
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              required
              onChange={(e) =>setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            {message ? <p className="message"> {message}</p> : ""}
            <input type="submit" value="Go" className="btn"  />
          </form>
          <div>
            <p>
              Not Register?
              <Link to="/Signup"> Create an Account! </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;