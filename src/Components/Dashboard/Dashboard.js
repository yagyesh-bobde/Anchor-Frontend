import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import { linkedinContext } from "../../Context/LinkedinState";
import googleAnalyticsAction from "../../utils/google_analyticsiinit.js";

function Dashboard() {
  const { loginInfo, getStatus } = useContext(linkedinContext);
  const navigate = useNavigate();
  useEffect(() => {
    googleAnalyticsAction().then(() => {});
  });

  setInterval(() => {
    getStatus(localStorage.getItem("jwtToken")).then((data) => {
      if (data == 0) {
        navigate("/waitlist");
      }
    });
  }, 30000);

  return (
    <>
      <div className="dashboard">
        <div className="user_section">
          <h1>Welcome {loginInfo?.name},</h1>
          <span>
            Its high time to take first step to serve your follower ,<br />
            Start with first service
          </span>
          <Link to="/createservice">
            <div className="add_event">
              <i className="fa-solid fa-circle-plus fa-2x"></i>
              <h2>Create First Service</h2>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
