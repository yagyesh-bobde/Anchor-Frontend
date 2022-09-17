import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate,useLocation } from "react-router-dom";
import Create from "../Create Service/Create";
import Info_creator from "../Creator info/Info_creator";
import Dashboard from "../Dashboard/Dashboard";
import Service from "../Services/Service";
import Navbar from "../Side Navbar/Navbar";
import Subscribers from "../Subscribers/Subscribers";
import { linkedinContext } from "../../Context/LinkedinState";
import { ToastContainer,toast } from "react-toastify";
import "./Home.css";
import Loading from "../Modals/Loading";
import googleAnalyticsAction from "../../utils/google_analyticsiinit.js";


function Home(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginlinkedinUser, usergooglelogin, loginCreator } =
    useContext(linkedinContext);

    useEffect(() => {
      googleAnalyticsAction().then(() => {});
    });


  useEffect(() => {
    if (localStorage.getItem("isUser") && localStorage.getItem("from")) {
      if (localStorage.getItem("from") === "linkedin") {
        loginlinkedinUser();
      } else {
        usergooglelogin();
      }
      navigate(`${localStorage.getItem("url")}`);
    } else if (
      localStorage.getItem("isUser") === "" &&
      !localStorage.getItem("from")
    ) {
      loginCreator();
    } else {
      if (localStorage.getItem("url")) {
        navigate(`${localStorage.getItem("url")}`);
      } else {
        navigate("/login/creators");
      }
    }
  }, []);


  return (
    <>
      <ToastContainer />
      {location.pathname === "/" && <Loading/>}
      <div className="main_box">
        <Navbar />
        <div className="right_container">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/creator_info"
              element={<Info_creator progress={props.progress} />}
            />
            <Route
              path="/createservice"
              element={<Create progress={props.progress} />}
            />
            <Route
              path="/servicelist"
              element={<Service progress={props.progress} />}
            />
            <Route path="/subscriberlist" element={<Subscribers />} />
            
          </Routes>
        </div>
      </div>

    </>
  );
}

export default Home;
