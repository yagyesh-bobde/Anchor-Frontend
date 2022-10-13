import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import ServiceContext from "../../Context/services/serviceContext";
import { creatorContext } from "../../Context/CreatorState";
import { userContext } from "../../Context/UserState";
import { Link, useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import User_login from "../Login/Users/User_login";
import { Cross as Hamburger } from "hamburger-react";
import mixpanel from "mixpanel-browser";
import { feedbackcontext } from "../../Context/FeedbackState";
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay, Navigation,Pagination} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Profile(props) {
  const location = useLocation();
  const context = useContext(ServiceContext);
  const { slug } = useParams();
  const [openModel, setOpenModel] = useState(false);
  const [cid] = useState();
  const { services, getallservicesusingid } = context;
  const { getcreatoridUsingSlug, basicCreatorInfo, basicCdata } =
    useContext(creatorContext);

  const { getallfeedback, feedbacks } = useContext(feedbackcontext);

  const { addSubscriber, checkSubscriber } = useContext(userContext);

  let count = 0;

  useEffect(() => {
    const process = async () => {
      getcreatoridUsingSlug(slug).then((data) => {
        getallfeedback(data);
        getallservicesusingid(data).then(() => {});
      });
      if (
        localStorage.getItem("isUser") === "true" &&
        localStorage.getItem("jwtToken")
      ) {
        await checkSubscriber(basicCreatorInfo.creatorID);
      }
    };
    toast.promise(
      process,
      {
        pending: "Please Wait for few seconds..",
        error: "Try Again by reloading the page!",
      },
      {
        position: "top-center",
        autoClose: 2000,
      }
    );

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
      checkSubscriber(basicCreatorInfo.creatorID).then((data) => {
        if (data) {
          if (dox1 && dox2) {
            dox1.style.display = "none";
            dox2.style.display = "inline-block";
          }
        }
      });
    }
  }, 100);

  if (!localStorage.getItem("isUser") === "") {
    localStorage.removeItem("url");
  } else {
    localStorage.setItem("url", location.pathname);
  }

  const handledropdown = () => {
    document.querySelector(".user_logout").style.display !== "none"
      ? (document.querySelector(".user_logout").style.display = "none")
      : (document.querySelector(".user_logout").style.display = "inline-block");
  };

  const userlogout = () => {
    window.location.pathname = "/logout";
  };

  const handleServiceClick = (slug) => {
    mixpanel.track("Service Card Clicked", {
      creator: basicCdata?.slug,
      service: slug,
    });
  };

  const subscribeMe = async () => {
    if (!localStorage.getItem("jwtToken")) {
      return setOpenModel(true); //open the user model for authentication
    }
    props.progress(8);
    const subscribe = addSubscriber(basicCreatorInfo.creatorID, 0);
    if (subscribe) {
      document.querySelector("#unsubscribe").style.display = "none";
      document.querySelector("#subscribe").style.display = "inline-block";
      mixpanel.track("Subscribed Creator on Creator Page", {
        creator: basicCdata?.slug,
      });
    } else {
      toast.info("You are Already Subscribed", {
        position: "top-center",
        autoClose: 2000,
      });
    }
    props.progress(75);
    props.progress(100);
  };

  if (basicCdata.status === 0) return alert("The Creator doesn't exist");

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
        <div className="profile_header" style={{ border: "none" }}>
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
                  <span className="user_login_name">
                    {localStorage.getItem("user").slice(0, 12) ===
                    localStorage.getItem("user")
                      ? localStorage.getItem("user")
                      : localStorage.getItem("user").slice(0, 12) + ".."}
                    <i
                      className="fa-solid fa-caret-down"
                      onClick={handledropdown}
                    ></i>
                    <Hamburger
                      className="hamburger-react"
                      size={20}
                      onToggle={(toggled) => {
                        if (toggled) {
                          document.querySelector(
                            ".hamburger-menu"
                          ).style.display = "block";
                        } else {
                          document.querySelector(
                            ".hamburger-menu"
                          ).style.display = "none";
                          // close a menu
                        }
                      }}
                    />
                    <button className="user_logout" onClick={userlogout}>
                      Logout
                    </button>
                    <ul className="hamburger-menu">
                      <li className="hamburger-item" onClick={userlogout}>
                        Logout
                      </li>
                    </ul>
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
              <span className="creator_name">
                {basicCdata ? basicCdata.name : basicCreatorInfo.name}
              </span>
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
          <div className="about_creator_profile">
            <h2 className="header_tag">About me</h2>
            <div className="about_details_c">
              {document.querySelector(".about_details_c")
                ? (document.querySelector(".about_details_c").innerHTML =
                    basicCreatorInfo?.aboutMe)
                : ""}
            </div>
          </div>
        </div>
      </div>

      <h2 className="headers_tag">Live Services</h2>
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
                <div
                  className="item_displayed"
                  onClick={() => handleServiceClick(e.slug)}
                >
                  <img src={e.simg} alt="..." />
                  <h2>{e.sname}</h2>
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

      <h2 className="headers_tag">Comments</h2>
      <div className="user_comments_lists">
        <Swiper
          slidesPerView={window.matchMedia("(max-width: 500px)").matches ? 1 : 3}
          spaceBetween={window.matchMedia("(max-width: 500px)").matches ? 5 : 20}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Autoplay,Pagination]}
          className="mySwiper"
        >
          {feedbacks?.length !== 0 ?
            feedbacks?.map((e2, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="comment_box" >
                    <section>
                      <img
                        src={e2?.photo}
                        alt="user"
                        className="user_profile_pic"
                      />
                      <span className="user_name">{e2?.name}</span>
                    </section>
                    <p className="fb_desc">{e2?.desc}</p>
                  </div>
                </SwiperSlide>
              );
            }):(
              <h1 className="no_services">No comments to display</h1>
            )}
        </Swiper>
      </div>
    </>
  );
}

export default Profile;
