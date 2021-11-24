import React from 'react'
import Signup from '../Signup'
import Login from '../Login'
import "./style.css"
const Home =()=> {
    return (
        <div className="container">
        <div className="ImgBox" >
            <img className="homeImg" src="https://www.teahub.io/photos/full/19-194395_dark-mood-food-photography.jpg" />
        </div>
        <div className="loginBox">
            <div>
                <h1 className="homeh1">YUMMY</h1>
                <Login id="login"/>

            </div>
        </div>
        </div>
    )
}

export default Home