import React ,{useState}from "react";
import "./Model.css";
import { useNavigate } from "react-router-dom";


function Logout_Model() {
    const navigate = useNavigate()
    
    const [openModel, setopenModel] = useState(true)

    const logout = () =>{
      localStorage.removeItem("isUser")
      localStorage.removeItem("jwtToken")      
      localStorage.removeItem("from") 
      localStorage.removeItem("url") 
      navigate("/login/creators")     

    }

    if(!openModel){
        navigate("/dashboard")
        return null
    }
 

  return (
    <div onClick={()=>setopenModel(false)}  className="model_logout">
      <div className="model_main_box">
        <span className="model_question">
          Are you sure you want to Logout?
        </span> 
        <span className="model_gyan">
          You will need to login again the next time you visit
        </span>
        <div className="model_buttons">
          <button className="model_button" onClick={()=>setopenModel(false)}>
            Cancel
          </button>
          <button className="model_button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout_Model;
