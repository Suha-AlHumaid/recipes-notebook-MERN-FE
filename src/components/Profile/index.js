import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Unreachable from "../Unreachable";
import "./style.css"
import axios from "axios";
import Header from "../Header";
const Profile = () => {
  const BASE_URL ="https://recipe-note-book.herokuapp.com"
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  // const { id } = useParams();
  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    setUser(JSON.parse(userStorage));
  }, []);
  // useEffect(() => {
  //   updateProfile();
  // }, []);
const updateProfile =async (e)=>{
  e.preventDefault()
  console.log("updateProfile");
  console.log( userName, email,password);
  const res = await axios.put(`${BASE_URL}/${user.user._id}`,{
    userName:userName, email:email, password:password
  });
  console.log(res.data);
  if (typeof res.data == "object") {
    localStorage.setItem("user", JSON.stringify({ user: res.data }));
    // navigate("/Recipes");
  } else {
    console.log(res.data);
    setMessage("Sorry, Not updated");
  }

}
  return (
    <div className="profilec">
      {user ? (
        <>
        <Header/>
        <div className="userP">
            <img src="https://media.istockphoto.com/photos/young-charming-pretty-woman-is-smiling-while-smelling-the-aroma-of-picture-id944872822?k=20&m=944872822&s=612x612&w=0&h=wRFVEc_MoKAYce6UtfLpxgF8TH1uy8XJo_baNzlVKoU="  className="profileImg"/>
       
        <div className="userProfile">
        <form className="prfileForm" method="POST" onSubmit={updateProfile}>
              <h1 className="title">Update Your Account</h1>
              <div className="yellowLine"></div>
              <input
                type="text"
                name="userName"
                placeholder="Name"
                className="input size"
                
                defaultValue={user.user.userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <br />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input size"
                
                defaultValue={user.user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input size"
              
            defaultValue={user.user.password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {message ? <p className="message2"> {message}</p> : ""}
              <div className="flex">
              <input
                type="submit"
                className="btn"
                value="Update"
             
              />
              </div>
              <div>
            <p>
              <Link to="/Recipes"> Back to Recipes! </Link>
            </p>
          </div>
    
            </form>
        </div>
       </div>
       </>
      ) : (
<Unreachable/>
      )}
    </div>
  );
};

export default Profile;
