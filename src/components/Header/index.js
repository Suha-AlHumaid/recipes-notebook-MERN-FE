import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SingOut from "../SignOut";
import { CgProfile } from "react-icons/cg";
import "./style.css";
const Header = (props) => {
   // eslint-disable-next-line
  const [off, setoff] = useState(false);

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser();
  }, [props.userName]);

  const getUser = () => {
    const userStorage = localStorage.getItem("user");
    setUser(JSON.parse(userStorage));
  };

  const header = () => {
    setoff(true);
  };

  return (
    <>
      {user ? (
        <div>
          <div className="headerContainer">
            <div className="header">
              <SingOut header={header} />
              <div className="user">
                <p id="logout"> Hi, {user.user.userName} </p>
                <CgProfile
                  className="icon"
                  onClick={() => {
                    navigate("/Profile");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
