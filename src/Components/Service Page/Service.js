import React, { useContext, useEffect, useState } from "react";
import "./Service.css";
import { creatorContext } from "../../Context/CreatorState";
import { userContext } from "../../Context/UserState";
import ServiceContext from "../../Context/services/serviceContext";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import User_login from "../Login/Users/User_login";
import { ToastContainer, toast } from "react-toastify";
import { saveAs } from "file-saver";
import { Cross as Hamburger } from "hamburger-react";
import mixpanel from "mixpanel-browser"

function Service(props) {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(ServiceContext);
  const [openModel, setOpenModel] = useState(false);
  const { serviceInfo, getserviceinfo } = context;
  const { basicCdata, getBasicCreatorInfo, basicCreatorInfo,allSubscribers,getAllSubscribers,subsInfo,getSubsInfo } =
    useContext(creatorContext);

  const { userPlaceOrder, addSubscriber, checkSubscriber } =
    useContext(userContext);

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

  useEffect(() => {
    const process = async () => {
      const id = await getserviceinfo(slug);
      await getBasicCreatorInfo(id[0]);
    };

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
          dox1.style.display = "none";
          dox2.style.display = "inline-block";
        }
      });
    }
  }, 100);


  const getUserMails = async () =>{
    const subsData = await getAllSubscribers()
    const subsInfod = await getSubsInfo(subsData)
    if(subsInfod.length !== 0){
      let users = ""
      for (let index = 0; index < subsInfod.length; index++) {
        let email = subsInfod[index]?.email ? subsInfod[index]?.email : ""
        users = users + email + ","
      }
      return users
    }
    return null

  }


  const sendMail = async( userMails ) => {
    fetch('https://6ht3n8kja3.execute-api.ap-south-1.amazonaws.com/sendEmail', {
        method: "POST",
        mode: "no-cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            senderEmail: "no-reply@www.anchors.in",
            receiverEmail: userMails,
            subject: "Testing: New service by",
            message: "New try ;+- Hello from Anchors"
        })
    })
    // let response = await res.json()
    // console.log(response)
}

const handleSubmitEmail = async (e) =>{
    e.preventDefault()
    //mixpanel.track("Email Sent to Subscribers", {
    //    serviceName: "The Service Name",
    //    creatorName: "CreatorName"
    //})
    const userMails = await getUserMails()
    console.log(userMails)
    if(userMails){
      sendMail(userMails)
    }else{
      console.log("No Subscribers")
    }
    //setsent(true)
}

  const downloadFile = () => {
    let oReq = new XMLHttpRequest();
    let URLToPDF = serviceInfo.surl;
    oReq.open("GET", URLToPDF, true);
    oReq.setRequestHeader(
      "Access-Control-Allow-Origin",
      "http://www.anchors.in"
    );
    oReq.setRequestHeader("Access-Control-Allow-Methods", "GET");

    oReq.responseType = "blob";

    oReq.onload = function () {
      let file = new Blob([oReq.response], {
        type: "application/pdf",
      });

      saveAs(file, `${serviceInfo.sname}.pdf`);
    };
    oReq.send();
  };

  const download_service = async () => {
    const ext = serviceInfo.surl?.split(".").at(-1);
    if (
      localStorage.getItem("isUser") === "true" &&
      localStorage.getItem("jwtToken")
    ) {
      const success = await userPlaceOrder(
        serviceInfo.ssp,
        1,
        serviceInfo._id,
        basicCreatorInfo.creatorID
      );
      if (success) {
        toast.success("Order Placed Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        if (ext === "pdf") {
          downloadFile();
        } else {
          let link = document.createElement("a");
          link.href = serviceInfo.surl;
          link.target = "_blank";
          link.dispatchEvent(new MouseEvent("click"));
        }
      } else {
        toast.error("Order not Placed Due to some error", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } else if (
      localStorage.getItem("isUser") === "" &&
      localStorage.getItem("jwtToken")
    ) {
      if (ext === "pdf") {
        downloadFile();
      } else {
        let link = document.createElement("a");
        link.href = serviceInfo.surl;
        link.target = "_blank";
        link.dispatchEvent(new MouseEvent("click"));
      }
    } else {
      return setOpenModel(true);
    }
  };

  const userlogout = () => {
    window.location.pathname = "/logout";
  };

  const subscribeMe = async () => {
    if (localStorage.getItem("jwtToken")) {
      props.progress(8);
      const subscribe = await addSubscriber(basicCreatorInfo.creatorID, 0);
      if (subscribe) {
        document.querySelector("#unsubscribe").style.display = "none";
        document.querySelector("#subscribe").style.display = "inline-block";
        mixpanel.track("Subscribed Creator",{
          creator:basicCdata?.slug
        })
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


  const handleWhatsApp =() =>{
    mixpanel.track("Shared On Whatsapp",{
      service:serviceInfo?.slug
    })
  }

  if (serviceInfo?.status === 0 || basicCdata?.status === 0)
    return alert("The service doesn't exist");

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
        <div className="profile_header" style={{ border: "none" }}>
          <div className="logo">
            <img src={require("../logo.png")} alt="Logo" />
            <span>Anchors</span>
          </div>
          {localStorage.getItem("isUser") === "" ? (
            //<button className="send_Email" onClick={handleSubmitEmail}>Send Email to Subscribers</button>
            ""
          ) : (
            <div className="user_login">
              <span>
                {!localStorage.getItem("jwtToken") ? (
                  <span
                    onClick={() => {
                      setOpenModel(true);
                    }}
                    className="login_button_user"
                  >
                    Login
                  </span>
                ) : (
                  <span className="user_login_name">
                    {localStorage.getItem("user").slice(0,12)=== localStorage.getItem("user") ? localStorage.getItem("user") : localStorage.getItem("user").slice(0,12) + ".." }
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

        <div className="service_section_content">
          <img
            src={serviceInfo?.simg}
            alt="service_image"
            className="service_section_image"
          />
          <div className="service_section_details">
            <div className="left_service_section">
              <h1>{serviceInfo?.sname}</h1>
              <p className="service_sdesc">{serviceInfo?.sdesc}</p>

              <h2>What will you get?</h2>
              <p className="service_sdesc">{serviceInfo?.ldesc}</p>
            </div>

            <button className="download_service" onClick={download_service}>
              <i className="fa-solid fa-circle-down fa-lg"></i> Download Free
              Now
            </button>
          </div>
          <div className="share_on_whatsapp">
            <span>Do you think it can be useful to your friends?</span>

            <a
              href={`https://api.whatsapp.com/send?text=Hey! Checkout this awesome resources -- *${serviceInfo?.sname}* at http://www.anchors.in/s/${slug}`}
              target="_blank"
              rel="noreferrer"
            >
              <button className="whatsapp_button" onClick={handleWhatsApp}>
                <i className="fa-brands fa-whatsapp fa-lg"></i> Share to your
                friends
              </button>
            </a>
          </div>
        </div>
        <h3 className="about_c">About Creator</h3>
        <div className="creator_profile_details service_page_creator">
          <div className="main_details_profile">
            <Link
              to={`/c/${basicCdata?.slug}`}
              style={{ textDecoration: "none" }}
            >
              <img
                src={basicCdata?.photo}
                alt="creator"
                className="profile_pic_creator"
              />
            </Link>
            <div className="profile_data">
              <span className="creator_name">{basicCdata?.name}</span>
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
