import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import { linkedinContext } from "../../Context/LinkedinState";
import ServiceContext from "../../Context/services/serviceContext";
import { creatorContext } from "../../Context/CreatorState";


function Dashboard() {
  const { loginInfo, getStatus } = useContext(linkedinContext);
  const [firstService, setFirstService] = useState(false)
  const {checkFirstService} = useContext(ServiceContext)
  const{getAllCreatorInfo,basicNav} = useContext(creatorContext)
  const navigate = useNavigate();

useEffect(() => {
  getAllCreatorInfo()
  checkFirstService().then((e)=>{
    if(!e){
      setFirstService(false)
    }
    else if(e){
      setFirstService(true)
    } 
  })
  getStatus(localStorage.getItem("jwtToken")).then((data) => {
    if (data === 0) {
      navigate("/waitlist");
    }
  });

}, [])



  return (
    <>
      <div className="dashboard">
        <div className="user_section">
          <h1>Welcome {localStorage.getItem("isDev")==="true"? "Builders" : (loginInfo?.name ? loginInfo?.name : basicNav?.name)},</h1>
          <span>{firstService ? <>Its high time to take first step to serve your follower ,<br />
            Start with first service</> : <>Its high time to take your step to serve your follower ,<br />
            Start by creating a new service</>}
          </span>
          <Link to="/createservice">
            <div className="add_event">
              <i className="fa-solid fa-circle-plus fa-2x"></i>
              <h2>{firstService ? <>Create First Service</> : <>Create Service</>}</h2>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
