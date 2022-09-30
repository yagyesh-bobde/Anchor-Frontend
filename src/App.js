import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import ServiceState from "./Context/services/ServiceState";
import Creators_login from "./Components/Login/Creators/Creators_login";
import Profile from "./Components/Creator Profile/Profile";
import CreatorState from './Context/CreatorState';
import UserState from './Context/UserState';
import Service from "./Components/Service Page/Service";
import {useState} from "react"
import LoadingBar from 'react-top-loading-bar'
import Feedback from "./Components/Feedback/Feedback";
import LinkedinState from "./Context/LinkedinState";
import FeedbackState from "./Context/FeedbackState"
import Privacy from "./Components/Privacy Policy/Privacy";
import Waitlist from "./Components/Waitlist/Waitlist";
import Logout_Model from "./Components/Modals/Logout_Model";
import UserCount from "./Developers/Count/UserCount";
import mixpanel from "mixpanel-browser"
import {mixPanelToken} from "./config/config.js"
import Main from "./Components/Main Page/Main";
import View from "./Developers/Dashboard/View";
import Login from "./Developers/Login/Login";



mixpanel.init( mixPanelToken , { debug : true })

function App() {
  const [progress, setprogress] = useState(0)

  const changeprogress= (progress) =>{
    setprogress(progress)
  }
  
  
  
  return (
    <Router>
    
    <LinkedinState>
    <ServiceState>
       <CreatorState> 
         <UserState> 
          <FeedbackState>
         <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Routes>
          <Route path="*" element={<Home progress={changeprogress}/>}></Route>    
          <Route path="/" element={<Main/>}></Route>
          <Route exact path="/c/:slug" element={<Profile progress={changeprogress}/>}></Route>   
          <Route path="/s/:slug" element={<Service progress={changeprogress}/>}></Route>  
          <Route path="/privacy-policy" element={<Privacy/>}></Route>  
          <Route path="/waitlist" element={<Waitlist/>}></Route>  
          <Route path="/developer/count" element={<UserCount/>}></Route>  
          <Route path="/developer/admin" element={<View/>}></Route>  
          <Route path="/developer/login" element={<Login/>}></Route>  
          <Route path="/feedback/:slug" element={<Feedback progress={changeprogress}/>}></Route>  
          {localStorage.getItem("jwtToken") && 
          <Route
              path="/logout"
              element={<Logout_Model progress={progress} />}
            />}
          <Route path="/login">
            <Route path="creators" element={<Creators_login  progress={changeprogress}/>}/>
          </Route>
        </Routes>

        </FeedbackState>
     </UserState> 
       </CreatorState> 
    </ServiceState>
       </LinkedinState>
      </Router>
  )
}


export default App;
