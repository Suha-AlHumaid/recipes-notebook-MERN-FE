import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SingOut from "../SignOut";
import { CgProfile } from "react-icons/cg";
import "./style.css"
const Header = (props) => {
const [off,setoff]=useState(false)

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
      getUser();
      // headerOn ()
      // eslint-disable-next-line

    }, [props.userName]);
    
const getUser =()=>{
  const userStorage = localStorage.getItem("user");
  setUser(JSON.parse(userStorage));
}


const header =()=>{
  setoff(true)
}
// console.log(user.user.userName);

  return (<>
    {user ? ( <div>
    <div className="headerContainer">
    <div className="header">
      <SingOut header ={header}/>
      <div className="user">
      <p> Hi, {user.user.userName} </p>
      <CgProfile
        className="icon"
        onClick={() => {
          navigate("/Profile");
        }}
      /> 
      </div>
      </div>
      </div>
    </div>)
:""}
</>
  );
};

export default Header;
