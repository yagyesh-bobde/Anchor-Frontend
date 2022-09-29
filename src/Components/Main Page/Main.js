import React from 'react'
import "./Main.css"
import {Link, Navigate} from "react-router-dom"
import { useState } from 'react'

function Main() {

  const [data,setData] = useState("")

  const handleChange = (e) =>{
    setData(e.target.value)
  }
  

  return (
    <div className="main_creator_page">
        <div className="creator_login_header">
      <div className="logo">
          <img src={require("../logo.png")} alt="Logo" />
          <span>Anchors</span>
          </div>
        <Link to={localStorage.getItem("jwtToken") ? "/dashboard" : "/login/creators"}><button className="waitlist">{(localStorage.getItem("jwtToken") && localStorage.getItem("isUser")==="") ? "My Account" : "Login as Creator"}</button></Link>
      </div>

      <div className="main_page_contents">
      <div className="gyan_container" style={{textAlign:"center"}}>
          Start Monetizing your <span>Content</span>, <span>Skills</span>,<span>Expertise</span> and help your
          followers to grow
        </div>

        <form className='form_data_main'>
            <input type="text" className='input_anchors' value={data} onChange={handleChange}  placeholder='yourname'/>
            <button disabled={data?.length < 3 ? true : false} type="submit" onClick={()=>{window.open("https://forms.gle/BSX2K1ty1bQF7J3t8")}}>Join Now</button>
        </form>

        <span>#beanchorite</span>

      </div>
    </div>
 )
}   

export default Main