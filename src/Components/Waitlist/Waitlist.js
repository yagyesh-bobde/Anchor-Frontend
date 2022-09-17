import React,{useContext,useEffect,useState} from "react";
import "./Waitlist.css";

import { linkedinContext } from "../../Context/LinkedinState";
import googleAnalyticsAction from "../../utils/google_analyticsiinit.js";

function Waitlist() {
  const {loginInfo} = useContext(linkedinContext)
  
  useEffect(() => {
    googleAnalyticsAction().then(() => {});
  });


  return (
    <>
    <div className="waitlist">
      <div className="creator_login_header">
        <div className="logo">
          <img src={require("../logo.png")} alt="Logo" />
          <span>Anchors</span>
        </div>
        <a href="https://forms.gle/BSX2K1ty1bQF7J3t8" rel="noreferrer" target="_blank">
          <button className="waitlist">Join Waitlist</button>
        </a>
      </div>

      <div className="main_waitlist">
        <h1 style={{textAlign:"left"}}>Hey, {loginInfo.name}</h1>
        <h1>Thanks for showing interest to become <span>Anchorite</span></h1>
        <p>Our Team will review your LinkedIn profile and inform you on the email if your profile is shortlisted for Anchorite.</p>
      </div>

      <div className="footer_service waitlist_footer">
          <a
            href="https://www.linkedin.com/company/beanchorite"
            target="_blank"
            rel="noreferrer"
          >
            <span>Follow us on LinkedIn</span>
          </a>
          <span>Facing any issue? email us - ravi@anchors.in</span>
        </div>
      </div>




      </>


  );
}

export default Waitlist;
