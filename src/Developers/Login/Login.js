import React,{useRef,useState} from "react";
import { host } from "../../config/config";
import {useNavigate} from "react-router-dom"

function Login() {
  const ref = useRef()
  const navigate = useNavigate()

  const [data, setData] = useState({email:"",password:""})
  
    const handleShowPassword = () =>{
      const doc = document.getElementById("show_pass")
      if(doc.checked === true){
        ref.current.type = "text"
      }else{
        ref.current.type = "password"
      }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch(`${host}/api/developer/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },
              body: JSON.stringify({email:data.email,password:data.password})
          });
          const json = await response.json();
          if(json.success){
            localStorage.setItem("jwtTokenD",json.jwtToken)
            localStorage.setItem("isDev",true)
            navigate("/developer/admin")
          }
          else{
            alert("Invalid Credentials Please Try Again")
          }
          
    }


    const handleChange = (e) =>{
        e.preventDefault();
        setData({...data,[e.target.name]:e.target.value})
    }

  return (
    <div className="creator_login">
      <div className="creator_login_header">
      <div className="logo">
          <img src={require("../../Components/logo.png")} alt="Logo" />
          <span>Anchors</span>
          </div>
      </div>
      <div className="main_page_login">
        <div className="gyan_container">
          Hello, Anchors Builders <br/>Let's work hard and raise the level of Anchors together.
        </div>
        <div className="login_container" style={{height: "79vh"}}>
          <h2 >Welcome Back Builders</h2>
          <img src={require("../../Components/logo2.png")} alt="logo" style={{width:"5rem",height:"5rem",marginBottom:"-50px"}} />
          <form>
            <input
              className="input_cred"
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <input
              className="input_cred"
              ref={ref}
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="Password"
            />
            <div className="login_check">
            <input type="checkbox" name="show_pass" id="show_pass"  onClick={handleShowPassword}/>
            <label htmlFor="show_pass" onClick={handleShowPassword}>Show Password</label>
            </div>
            <input type="submit" className="login_submit" value="Login" onClick={handleSubmit} />
          </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
