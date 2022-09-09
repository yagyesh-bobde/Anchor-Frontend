import React, { useContext, useEffect, useState } from "react";
import "./Service.css";
import { creatorContext } from "../../Context/CreatorState";
import { userContext } from "../../Context/UserState";
import ServiceContext from "../../Context/services/serviceContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { WhatsappShareButton } from "react-share";
import User_login from "../Login/Users/User_login";
import { ToastContainer, toast } from "react-toastify";
import {linkedinContext} from "../../Context/LinkedinState"


function Service(props) {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(ServiceContext);
  const [openModel, setOpenModel] = useState(false);
  const { serviceInfo, getserviceinfo } = context;
  const { getBasicCreatorInfo, basicCreatorInfo } = useContext(creatorContext);
  const {loginInfo} = useContext(linkedinContext)

  const { check, userPlaceOrder, addSubscriber, checkSubscriber } =
    useContext(userContext);

  localStorage.setItem("url", location.pathname);

  const handledropdown = () => {
    document.querySelector(".user_logout").style.display !== "none"
      ? (document.querySelector(".user_logout").style.display = "none")
      : (document.querySelector(".user_logout").style.display = "inline-block");
  };

  useEffect(() => {
    const process = async () => {
      getBasicCreatorInfo(serviceInfo.c_id);
      getserviceinfo(slug);
      await checkSubscriber(basicCreatorInfo.creatorID);
    };

    process();
    // eslint-disable-next-line
  }, [serviceInfo]);

  useEffect(() => {
    if (check) {
      document.getElementById("unsubscribe").style.display = "none";
      document.getElementById("subscribe").style.display = "inline-block";
    } else {
      document.getElementById("subscribe").style.display = "none";
      document.getElementById("unsubscribe").style.display = "inline-block";
    }
  }, [check]);

  const downloadService = async () => {
    console.log("downloading...");
    if (
      localStorage.getItem("isUser") === "true" &&
      localStorage.getItem("jwtToken")
    ) {
      console.log("downloading frrreasd...");
      const success = await userPlaceOrder(serviceInfo.ssp, 1, serviceInfo._id);
      if (success) {
        toast.success("Order Placed Successfully");
      } else {
        toast.error("Order not Placed Due to some error");
      }
    } else if (
      localStorage.getItem("isUser") === "" &&
      localStorage.getItem("jwtToken")
    ) {
      console.log("download freeely creator");
    } else {
      return setOpenModel(true);
    }
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
    if (localStorage.getItem("jwtToken")) {
      props.progress(8);
      const subscribe = addSubscriber(basicCreatorInfo.creatorID, 0);
      if (subscribe) {
        document.querySelector("#unsubscribe").style.display = "none";
        document.querySelector("#subscribe").style.display = "inline-block";
      } else {
        toast.info("You are Already Subscribed", {
          position: "top-center",
          autoClose: 2000,
        });
      }
      props.progress(75);
      props.progress(100);
    } else {
      return setOpenModel(true); //open the user model for authentication
    }
  };

  if (serviceInfo?.status === 0) return alert("The service doesn't exist");

  if (!slug) return alert("The service doesn't exist");

  return (
    <>
      <div className="service_section">
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
        <div
          className="creator_profile_details"
          style={{ border: "none", width: "40vw" }}
        >
          <div className="main_details_profile">
            <img
              src="https://e7.pngegg.com/pngimages/889/832/png-clipart-google-contacts-mobile-app-contact-manager-app-store-android-application-package-email-miscellaneous-blue.png"
              alt="..."
              className="profile_pic_creator"
            />
            <div className="profile_data">
              <span className="creator_name">{basicCreatorInfo.name}</span>
              <span className="creator_tagline">
                {basicCreatorInfo.tagLine}
              </span>
              <section>
                {basicCreatorInfo.linkedInLink && (
                  <a
                    target="_blank"
                    without
                    rel="noreferrer"
                    href={basicCreatorInfo.linkedInLink}
                    className=""
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fa-brands fa-linkedin fa-xl linkedin_icon"></i>
                  </a>
                )}
                {basicCreatorInfo.ytLink && (
                  <a
                    target="_blank"
                    without
                    rel="noreferrer"
                    href={basicCreatorInfo.ytLink}
                    className=""
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fa-brands fa-youtube fa-xl youtube_icon"></i>
                  </a>
                )}
                {basicCreatorInfo.instaLink && (
                  <a
                    target="_blank"
                    without
                    rel="noreferrer"
                    href={basicCreatorInfo.instaLink}
                    className=""
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fa-brands fa-instagram fa-xl insta_icon"></i>
                  </a>
                )}
                {basicCreatorInfo.twitterLink && (
                  <a
                    target="_blank"
                    without
                    rel="noreferrer"
                    href={basicCreatorInfo.twitterLink}
                    className=""
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fa-brands fa-twitter fa-xl twitter_icon"></i>
                  </a>
                )}
                {basicCreatorInfo.fbLink && (
                  <a
                    target="_blank"
                    without
                    rel="noreferrer"
                    href={basicCreatorInfo.fbLink}
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
                  <button
                    onClick={subscribeMe}
                    className="subscribe_now "
                    id="unsubscribe"
                  >
                    <i className="fa-solid fa-user-plus"></i> Subscribe Free
                  </button>
                  <button className="subscribe_now" id="subscribe">
                    <i className="fa-solid fa-check"></i> Subscribed
                  </button>
                  <span>
                    Subscribe me free and get latest updates on your email
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="service_section_content">
          <img
            src={serviceInfo.simg}
            alt="service_image"
            className="service_section_image"
          />
          <div className="service_section_details">
            <div className="left_service_section">
              <h1>{serviceInfo.sname}</h1>
              <p className="service_sdesc">{serviceInfo.sdesc}</p>

              <h2>What will you get?</h2>
              <p className="service_sdesc">{serviceInfo.ldesc}</p>
            </div>

            <button className="download_service" onClick={downloadService}>
              <i className="fa-solid fa-circle-down fa-lg"></i> Download Free
            </button>
          </div>
          <div className="share_on_whatsapp">
            <span>Do you think it can be useful to your friends?</span>
            <WhatsappShareButton
              title={`Hey! Checkout this awesome resources at`}
              url={`https://www.anchors.in/service/${slug}`}
            >
              <button className="whatsapp_button">
                <i className="fa-brands fa-whatsapp fa-lg"></i> Share to your
                friends
              </button>
            </WhatsappShareButton>
          </div>
        </div>

        <div className="footer_service">
          <a
            href="https://www.linkedin.com/company/beanchorite"
            target="_blank"
            rel="noreferrer"
          >
            <span>Follow us on LinkedIn</span>
          </a>
          <span>Facing any issue? email us - ravi@anchors.in</span>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Service;
