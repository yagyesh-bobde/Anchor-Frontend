import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import ServiceContext from "../../Context/services/serviceContext";
import { creatorContext } from "../../Context/CreatorState";
import { userContext } from "../../Context/UserState";
import { Link, useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import User_login from "../Login/Users/User_login";

import googleAnalyticsAction from "../../utils/google_analyticsiinit.js"


function Profile(props) {
  const location = useLocation();
  const context = useContext(ServiceContext);
  const { slug } = useParams();
  const [openModel, setOpenModel] = useState(false);
  const { services, getallservicesusingid } = context;
  const { getcreatoridUsingSlug, basicCreatorInfo,basicCdata } =
    useContext(creatorContext);

  const { addSubscriber, checkSubscriber } = useContext(userContext);

  useEffect(()=>{
    googleAnalyticsAction().then(()=>{

    })
  })

  let count = 0;
  
  useEffect(() => {
    const process = async () => {
      getcreatoridUsingSlug(slug).then((data)=>{
        getallservicesusingid(data).then(()=>{})
      })
      if(localStorage.getItem("isUser")==="true" && localStorage.getItem("jwtToken")){
        await checkSubscriber(basicCreatorInfo.creatorID);
      }
    };
    toast.promise(
      process,
      {
        pending: 'Please Wait for few seconds..',
        error: 'Try Again by reloading the page!'
      },{
        position:"top-center",
        autoClose:2000
      }
  )
    
    process();
    
    // eslint-disable-next-line
  }, []);

  
  const dox1 = document.getElementById("unsubscribe");
  const dox2 = document.getElementById("subscribe");

  setTimeout(() => {
    if (
      localStorage.getItem("isUser") === "true" &&
      localStorage.getItem("jwtToken")
    ) {
      checkSubscriber(basicCreatorInfo.creatorID).then((data)=>{
        if(data){
          if(dox1 && dox2){
            dox1.style.display = "none";
            dox2.style.display = "inline-block";

          }
        }
      })  
    }
    
  }, 100);


if(!localStorage.getItem("isUser")==="" ){
  localStorage.removeItem("url")
}
else{
  localStorage.setItem("url",location.pathname)
}
  
  
  const handledropdown = () => {
    document.querySelector(".user_logout").style.display !== "none"
      ? (document.querySelector(".user_logout").style.display = "none")
      : (document.querySelector(".user_logout").style.display = "inline-block");
  };

  const userlogout = () => {
    window.location.pathname = "/logout"
  };

  const subscribeMe = async () => {
    if (!localStorage.getItem("jwtToken")) {
      return setOpenModel(true); //open the user model for authentication
    }
    props.progress(8);
    const subscribe = addSubscriber(basicCreatorInfo.creatorID, 0);
    if (subscribe) {
      document.querySelector("#unsubscribe").style.display="none"
      document.querySelector("#subscribe").style.display="inline-block"
    }
    else{
      toast.info("You are Already Subscribed",{
        position:"top-center",
        autoClose:2000
      })
    }
    props.progress(75);
    props.progress(100);
  };

  if (basicCdata.status ===0) return alert("The Creator doesn't exist");

  return (
    <>
      <ToastContainer />
      <div className="profile_section">
        <User_login
          open={openModel}
          onClose={() => {
            setOpenModel(false);
          }}
        />
        <div className="profile_header">
          <div className="logo">
          <img src={require("../logo.png")} alt="Logo" />
          <span>Anchors</span>
          </div>
          {localStorage.getItem("isUser") === "" ? (
            ""
          ) : (
            <div className="user_login">
              <span>
                {!localStorage.getItem("jwtToken") ? (
                  <span
                  className="login_button_user"
                    onClick={() => {
                      setOpenModel(true);
                    }}
                  >
                    Login
                  </span>
                ) : (
                  <span>
                    Hello, {localStorage.getItem("user")}
                    <i
                      className="fa-solid fa-caret-down"
                      onClick={handledropdown}
                    ></i>
                    <button className="user_logout" onClick={userlogout}>
                      Logout
                    </button>
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        <div className="creator_profile_details">
          <div className="main_details_profile">
            <img
              src={basicCdata.photo}
              alt="..."
              className="profile_pic_creator"
            />
            <div className="profile_data">
              <span className="creator_name">{basicCdata?basicCdata.name:basicCreatorInfo.name}</span>
              <span className="creator_tagline">
                {basicCreatorInfo?.tagLine}
              </span>
              <section>
                {basicCreatorInfo?.linkedInLink && (
                  <a
                    target="_blank"
                    without
                    rel="noreferrer"
                    href={basicCreatorInfo?.linkedInLink}
                    className=""
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fa-brands fa-linkedin fa-xl linkedin_icon"></i>
                  </a>
                )}
                {basicCreatorInfo?.ytLink && (
                  <a
                    target="_blank"
                    without
                    rel="noreferrer"
                    href={basicCreatorInfo?.ytLink}
                    className=""
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fa-brands fa-youtube fa-xl youtube_icon"></i>
                  </a>
                )}
                {basicCreatorInfo?.instaLink && (
                  <a
                    target="_blank"
                    without
                    rel="noreferrer"
                    href={basicCreatorInfo?.instaLink}
                    className=""
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fa-brands fa-instagram fa-xl insta_icon"></i>
                  </a>
                )}
                {basicCreatorInfo?.twitterLink && (
                  <a
                    target="_blank"
                    without
                    rel="noreferrer"
                    href={basicCreatorInfo?.twitterLink}
                    className=""
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fa-brands fa-twitter fa-xl twitter_icon"></i>
                  </a>
                )}
                {basicCreatorInfo?.fbLink && (
                  <a
                    target="_blank"
                    without
                    rel="noreferrer"
                    href={basicCreatorInfo?.fbLink}
                    className=""
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fa-brands fa-facebook fa-xl fb_icon"></i>
                  </a>
                )}
              </section>
              {localStorage.getItem("isUser") === "" &&
              localStorage.getItem("jwtToken") ? (
                ""
              ) : (
                <>
                  <button onClick={subscribeMe} className="subscribe_now " id="unsubscribe">
                    <i className="fa-solid fa-user-plus"></i> Subscribe Free
                  </button>
                  <button
                    className="subscribe_now"
                    id="subscribe"
                  >
                    <i className="fa-solid fa-check"></i> Subscribed
                  </button>
                  <span>
                    Subscribe me free and get latest updates on your email
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="about_creator_profile">
            <h2>About me</h2>
            <p>{basicCreatorInfo?.aboutMe}</p>
          </div>
        </div>
      </div>

      <div className="display_services_list">
        {services.res?.map((e) => {
          if (e.status === 1) {
            count++;
            return (
              <Link
                to={`/s/${e.slug}`}
                key={e._id}
                style={{ textDecoration: "none" }}
              >
                <div className="item_displayed">
                  <img src={e.simg} alt="..." />
                  <h2>{e.sname}</h2>
                  <p>{e.stype === 0 ? "Downloadable Content" : "nikal ja"}</p>
                  <span
                    className={`${
                      e.isPaid === true ? "paid" : "free"
                    }_tag_dispalyed`}
                  >
                    {e.isPaid === true ? "Paid" : "Free"}
                  </span>
                </div>
              </Link>
            );
          } else {
            return "";
          }
        })}
        {count === 0 ? (
          <h1 className="no_services">No services to display</h1>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Profile;
