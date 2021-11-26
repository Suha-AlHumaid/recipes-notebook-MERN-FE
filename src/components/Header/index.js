import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SingOut from "../SignOut";
import { CgProfile } from "react-icons/cg";
import "./style.css"
const Header = () => {
const [off,setoff]=useState(false)
let onn =false
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
      const userStorage = localStorage.getItem("user");
      setUser(JSON.parse(userStorage));
      // headerOn ()
    }, [off]);

const header =()=>{
  setoff(true)
}

  return (<>
    {user ? (<div>{off?(""):( <div>
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
    </div>)}

    </div>
    )
:""}
</>
  );
};

export default Header;
