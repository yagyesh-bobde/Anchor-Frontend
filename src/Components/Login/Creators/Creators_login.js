import React,{useRef,useContext, useState} from "react";
import "./Creators_login.css";
import {host} from "../../../config/config.js"


function Creators_login() {
  const ref = useRef()
 


  const handleShowPassword = () =>{
    const doc = document.getElementById("show_pass")
    if(doc.checked == true){
      ref.current.type = "text"
    }else{
      ref.current.type = "password"
    }
  }

  const _handleSignInClick = async () => {
    localStorage.setItem('isUser' , "")
    window.open(`${host}/login/auth/linkedin`, "_self");
  };

  return (
    <div className="creator_login">
      <div className="creator_login_header">
        <img src="..." alt="Logo" />
        <button className="waitlist">Join Waitlist</button>
      </div>
      <div className="main_page_login">
        <div className="gyan_container">
          Start Monetizing your content, skills, Expertise and help your
          followers to grow
        </div>
        <div className="login_container">
          <h2>Welcome Back Anchorite</h2>
          <button className="linkedin_auth_link" onClick={_handleSignInClick} >
            <i class="fa-brands fa-linkedin-in"></i> Login with LinkedIn
          </button>
          <div className="or_section"><hr/>or<hr/></div>
          <form>
            <input
              className="input_cred"
              type="email"
              name="email_id"
              id="email_id"
              placeholder="Enter your email"
            />
            <input
              className="input_cred"
              ref={ref}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <div className="login_check">
            <input type="checkbox" name="show_pass" id="show_pass"  onClick={handleShowPassword}/>
            <label htmlFor="show_pass" onClick={handleShowPassword}>Show Password</label>
            </div>
            <input type="submit" className="login_submit" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Creators_login;
