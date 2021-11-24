import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    const res = await axios.post("http://localhost:5000/user/register", {
      userName: userName,
      email: email,
      password: password,
    });
    console.log(res.data);
    if (res.data.message === "Login Successfuly") {
      localStorage.setItem("user", JSON.stringify({ user: res.data.user }));
      navigate("/Recipes");
    } else {
      setMessage(res.data.message);
    }
  };

  return (
    <div id="signup">
      {user ? (
        navigate("/Recipes")
      ) : (
        <div className="form">
          <div className="imgSingup">
            <img
              id="imgSingup"
              src="https://static.parade.com/wp-content/uploads/2020/05/iStock-1226987291.jpg"
            />
          </div>
          <div className="yellow">
            <form>
              <h1 className="title">Register</h1>
              <input
                type="text"
                name="userName"
                placeholder="Name"
                className="input"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
              <br />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {message ? <p className="message"> {message}</p> : ""}
              <input
                type="submit"
                className="btn"
                value="Go"
                onClick={signup}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;

// // http://localhost:5000/user/signout
// const Login = () => {

//   const singUpFun = async (e) => {
//     e.preventDefault();
//     try {
//       let userName = e.target.userName.value;
//       let email = e.target.email.value;
//       let password = e.target.password.value;
//       const res = await axios.post(`http://localhost:5000/user/register`, {
//         userName: userName,
//         email: email,
//         password: password,
//       });
//       if (res.data.user) {
//         console.log(res.data.message,"yes");
//       } else {
//         console.log(res.data.message);
//       }
//     } catch (error) {
//       console.log("login error", error.message);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={singUpFun}>
//         <input type="text" name="userName" placeholder="User Name" />
//         <input type="text" name="email" placeholder="email" />
//         <input type="password" name="password" placeholder="password" />
//         <button>singup</button>
//       </form>

//     </div>
//   );
// };

// export default Login;
