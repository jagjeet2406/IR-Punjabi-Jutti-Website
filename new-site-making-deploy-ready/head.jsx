import React from "react";
import React, { useState } from "react";
import Login from "./login_system/frontend/login";
import Signup from "./login_system/frontend/signup";
import { Link } from "react-router-dom";


const MEN = () => <h2>Men's Collection</h2>;
const WOMEN = () => <h2>Women's Collection</h2>;
const KID = () => <h2>Kids' Collection</h2>;
const WEDDINGSPECIAL = () => <h2>Wedding Special Collection</h2>;

export default function Head(){
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    return(
        <>
        <div className="head_cont">
            <div className="offer">
                <h4>GET   EXTRA  10% DISCOUNT  ON  YOUR  FIRST  ORDER   CODE : FIRST100</h4>
            </div>

            <div className="head">
                <input className="search" type="text" placeholder="search your jutti"/>
                <img className="logo" src="https://res.cloudinary.com/dqdeedzkp/image/upload/v1783839752/logo_vq6sqw.jpg" alt="logo" />
                <div className="headtitle">
                    <h1 className="heading">
                        IR   PUNJABI  JUTTI
                    </h1>
                    <p>
                        -----Everyday comfort, classic Punjabi style-----
                    </p>
                </div>
                
             <div className="Cart">
                <Link to="./cart">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSneqLItB2ZT5vzQEWv_VnX1d9E6wz5beeJkTFrG4g6Rg&s=10"/>
                </Link>

            </div>
            <div className="head_cont2">
          

           
            <div className="profile" style={{ position: "relative"}}>
                <img
                    src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{ cursor: "pointer" }}
                />

                {showDropdown && (
                    <div className="profile-dropdown">
                        <p onClick={() => { setShowLogin(true); setShowDropdown(false); }}>
                            Login
                        </p>
                        <p onClick={() => { setShowSignup(true); setShowDropdown(false); }}>
                            Signup
                        </p>
                    </div>
                )}
            </div>

          
            {showLogin && (
                <div className="modal-overlay" onClick={() => setShowLogin(false)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <Login />
                    </div>
                </div>
            )}

            {showSignup && (
                <div className="modal-overlay" onClick={() => setShowSignup(false)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                       
                        <Signup />
                    </div>
                </div>
            )}
           

        
            
        </div>
            </div>
        </div>
        
        
        
        </>
    
    


    );
}


























