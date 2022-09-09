
import "./Dashboard.css";
import { Link} from "react-router-dom";
import React , { useEffect } from 'react'
import { useContext } from 'react'
import { creatorContext } from '../../Context/CreatorState'
import { linkedinContext } from "../../Context/LinkedinState";

function Dashboard() {
  const {  loginInfo } = useContext(linkedinContext)



  return (
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
  );

}

export default Dashboard;
