import React,{useContext} from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { linkedinContext } from "../../Context/LinkedinState";

function Navbar() {
    const location = useLocation()
    const {  loginInfo } = useContext(linkedinContext)
    console.log(loginInfo)
  
  return (
    <div className="side_navbar">
      <Link className="creators_profile" to="creator_profile">

        <img
          src={loginInfo?.photo}
          alt="..."
          className="c_pic"
        />
        <span className="c_name">{loginInfo?.name}</span>
        <span className="c_email">{loginInfo?.email}</span>
      </Link>

      <ul className="nav_items">
         <Link to="/creator_info" className={`${location.pathname==='/creator_info'?'active':""} items`}><li >
        Personel Info
        </li></Link>
        <Link to="/dashboard" className={`${location.pathname==='/dashboard'?'active':""} items`}><li >
        Dashboard
        </li></Link>
        <Link to="/subscriberlist" className={`${location.pathname==='/subscriberlist'?'active':""} items`}><li >
          Subscriber List
        </li></Link>
        <Link to="/servicelist" className={`${location.pathname==='/servicelist'?'active':""} items`}><li >
          Services Detail
        </li></Link>
        <Link to="/logout" className={`${location.pathname==='/logout'?'active':""} items`}><li >
          Logout
        </li></Link>
      </ul>
    </div>
  );
}

export default Navbar;
