import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    setUser(JSON.parse(userStorage));
  }, []);

  const login = async () => {
    const res = await axios.post("http://localhost:5000/user/login", {
      email: email,
      password: password,
    });
    console.log(res);
    if (typeof res.data.user === "object") {
      localStorage.setItem("user", JSON.stringify({ user: res.data.user }));
      navigate("/Recipes");
    } else {
      console.log(res.data.message);
      setMessage(res.data.message);
    }
  };

  return (
    <div>
      {user ? (
        <h1>
          You are already logged in, go to <Link to="/Recipes">Recipes</Link>
        </h1>
      ) : (
        <div>
          <h1>Login</h1>
          {message ? <div>{message}</div> : ""}
          <div >
            <input
              type="text"
              name="email"
              placeholder="Enter Your Email "
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="login"
            onClick={login}
          />
          <div>
            <p>
              If you don't have an account,{" "}
              <Link to="/Signup">Register now!</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;