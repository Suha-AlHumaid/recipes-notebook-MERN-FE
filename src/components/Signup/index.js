//http://localhost:5000
import React, { useState, useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";

import axios from "axios";
import "./style.css";

const Signup = () => {
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

  const signup = async () => {
    // setMessage("Faild");
    const res = await axios.post("http://localhost:5000/user/register", {
      userName: userName,
      email: email,
      password: password,
    });
    if (res.data.message === "Login Successfuly") {
      localStorage.setItem("user", JSON.stringify({ user: res.data.user }));
      navigate("/Recipes");
    } else {
      setMessage(res.data.message);
      setMessage("Faild");
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
              // src="https://i.pinimg.com/564x/18/7a/27/187a27739ddfd380e8ed4fa9c199e47f.jpg"
              // src="https://i.pinimg.com/564x/74/79/e3/7479e38cb7e95d2f9b1bdaec9d975800.jpg"
              // src="https://static.parade.com/wp-content/uploads/2020/05/iStock-1226987291.jpg"
            />
          </div>
          <div className="yellow">
            <form className="form2"  onSubmit={signup}>
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
                 
              <div className="flex">
             
              <input
                type="submit"
                className="btn"
                value="Go"
               
              />
                {message? <p className="message"> {message}</p> : ""}
              {/* <MdOutlineKeyboardBackspace
                className="backIcon"
                onClick={() => {
                  navigate("/");
                }}/> */}
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
