import React, { useContext, useEffect } from "react";
import { Routes, Route,useNavigate } from "react-router-dom";
import Create from "../Create Service/Create";
import Info_creator from "../Creator info/Info_creator";
import Dashboard from "../Dashboard/Dashboard";
import Logout_Model from "../Modals/Logout_Model";
import Service from "../Services/Service";
import Navbar from "../Side Navbar/Navbar";
import Subscribers from "../Subscribers/Subscribers";
import { linkedinContext } from "../../Context/LinkedinState";

import "./Home.css";

function Home(props) {
  const navigate = useNavigate()
  const { loginlinkedinUser, usergooglelogin, loginCreator } = useContext(linkedinContext)

  useEffect(() => {

    if(localStorage.getItem('isUser') && localStorage.getItem('from')){
      if (localStorage.getItem('from') === 'linkedin'){
        loginlinkedinUser()
      }else{
        usergooglelogin()
      }
      navigate(`${localStorage.getItem('url')}`)
    } else if ( localStorage.getItem('isUser')==="" && !localStorage.getItem('from')) {
      loginCreator()
      navigate('/dashboard')
    }
    else {
      if(localStorage.getItem("url")){
        navigate(`${localStorage.getItem('url')}`)
      }
      else{
        navigate('/login/creators')

      }
    }

  }, [])

  return (
    <div className="main_box">
      <Navbar />
      <div className="right_container">
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/creator_info" element={<Info_creator progress={props.progress}/>} />
          <Route path="/createservice" element={<Create progress={props.progress}/>} />
          <Route path="/servicelist" element={<Service progress={props.progress}/>} />
          <Route path="/subscriberlist" element={<Subscribers/>} />
          <Route path="/logout" element={<Logout_Model progress={props.progress}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
