import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import ServiceContext from "../../Context/services/serviceContext";
import { creatorContext } from "../../Context/CreatorState";
import { userContext } from "../../Context/UserState";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import User_login from "../Login/Users/User_login";
import {linkedinContext} from "../../Context/LinkedinState"

function Profile(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(ServiceContext);
  const { slug } = useParams();
  const [openModel, setOpenModel] = useState(false);
  const { services, getallservicesusingid } = context;
  const { getcreatoridUsingSlug, getBasicCreatorInfo, basicCreatorInfo } =
    useContext(creatorContext);
    const {loginInfo} = useContext(linkedinContext)

  const { check, addSubscriber, checkSubscriber } = useContext(userContext);

  localStorage.setItem("url", location.pathname);

  let count = 0;

  useEffect(() => {
    const process = async () => {
      const id = await getcreatoridUsingSlug(slug);
      getBasicCreatorInfo(id);
      await checkSubscriber(basicCreatorInfo.creatorID);
      getallservicesusingid(id);
    };

    
    process();
    // eslint-disable-next-line
  }, []);

  useEffect(()=>{
    if(check){
      document.querySelector("#unsubscribe").style.display="none"
      document.querySelector("#subscribe").style.display="inline-block"
    }else{
      document.querySelector("#subscribe").style.display="none"
      document.querySelector("#unsubscribe").style.display="inline-block"
    }  
  },[check])
  
  
  const handledropdown = () => {
    document.querySelector(".user_logout").style.display !== "none"
      ? (document.querySelector(".user_logout").style.display = "none")
      : (document.querySelector(".user_logout").style.display = "inline-block");
  };

  const userlogout = () => {
    localStorage.removeItem("isUser");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("form");
    toast.success("Logged Out successfully", {
      position: "top-center",
      autoClose: 2000,
    });
    document.querySelector(
      ".subscribe_now"
    ).innerHTML = `<i className="fa-solid fa-check"></i> Subscribed`;
    navigate(`${localStorage.getItem("url")}`);
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
          <img src=".." alt="Logo" />
          {localStorage.getItem("isUser") === "" ? (
            ""
          ) : (
            <div className="user_login">
              <span>
                {!localStorage.getItem("jwtToken") ? (
                  <span
                    onClick={() => {
                      setOpenModel(true);
                    }}
                  >
                    Login
                  </span>
                ) : (
                  <>
                    Hello, {loginInfo?.name}
                    <i
                      className="fa-solid fa-caret-down"
                      onClick={handledropdown}
                    ></i>
                    <button className="user_logout" onClick={userlogout}>
                      Logout
                    </button>
                  </>
                )}
              </span>
            </div>
          )}
        </div>

        <div className="creator_profile_details">
          <div className="main_details_profile">
            <img
              src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=721&q=80"
              alt="..."
              className="profile_pic_creator"
            />
            <div className="profile_data">
              <span className="creator_name">{basicCreatorInfo?.name}</span>
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
                to={`/service/${e.slug}`}
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
