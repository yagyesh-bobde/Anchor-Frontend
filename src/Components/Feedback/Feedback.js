import React, { useState, useContext, useEffect } from "react";
import "./Feedback.css";
import { useParams,useNavigate } from "react-router-dom";
import { feedbackcontext } from "../../Context/FeedbackState";
import { ToastContainer, toast } from "react-toastify";
import ServiceContext from "../../Context/services/serviceContext";
import "react-toastify/dist/ReactToastify.css";

function Feedback(props) {
  const [feedback, setfeedback] = useState({ comment: "" });
  const [rating, setrating] = useState(0);
  const { checkFB, createFeedback } = useContext(feedbackcontext);
  const { getserviceinfo,serviceInfo } = useContext(ServiceContext);
  const { slug } = useParams(); 
  const navigate = useNavigate()

  const [id, setId] = useState(null)
  const [checked, setChecked] = useState(false)

  
  useEffect(() => {
    //   CHECK USER LOGIN  eLSE a login modal
    getserviceinfo(slug).then((id)=>{
      setId(id[1])
      checkFB(id[1]).then((check)=>{
        setChecked(check)
      })
    })

    // eslint-disable-next-line
  }, []);

  const handleratingclick = (e) => {
    if (document.getElementById(`${e.target.id}`).style.color !== "red") {
      for (let index = e.target.id; index > 0; index--) {
        document.getElementById(`${index}`).style.color = "red";
      }
      for (let index = e.target.id + 1; index < 6; index++) {
        document.getElementById(`${index}`).style.color = "black";
      }
      let temp = e.target.id;
      setrating(temp);
    } else {
      for (let index = 1; index < 6; index++) {
        document.getElementById(`${index}`).style.color = "black";
      }
      let temp = 0;
      setrating(temp);
    }
  };

  const handleChange = (e) => {
    setfeedback({ ...feedback, comment: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const load = toast.loading("Please wait...", {
      position: "top-center",
    });
    props.progress(0);
    const success = createFeedback(id, rating, feedback.comment);
    if(success){
      toast.update(load, {
        render: "Thanks for your Valuable Feedback ",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      window.open(localStorage.getItem("url"),"_self")
    }
    else{
      toast.update(load, {
        render: "Feedback Not Submitted Please Try Again ",
        type: "serror",
        isLoading: false,
        autoClose: 2000,
      });
    }
    props.progress(100);
  };

  const textarea = document.getElementById("comment");
  textarea?.addEventListener("input", autoResize, false);

  function autoResize() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }


  if(checked) {
    alert("You have already filled the feedback for this Service")
    //toast.info("You have already filled the feedback for this Service",{
    //  position:"top-center",
    //  autoClose:2000
    //})
     return navigate(localStorage.getItem("url"))
  }

  if(!localStorage.getItem("jwtToken")){
    alert("Login first for giving the feedback")
    //toast.error("Login first for giving the feedback",{
    //  position:"top-center",
    //  autoClose:3000
    //})
    return navigate(localStorage.getItem("url"))
  }

  return (
    <>
      <div className="rating">
        <h1>Please tell us your experience with {serviceInfo.sname}</h1>
        <div className="stars">
          <i
            className="fa-solid fa-star fa-2x"
            id={1}
            onClick={handleratingclick}
          ></i>
          <i
            className="fa-solid fa-star fa-2x"
            id={2}
            onClick={handleratingclick}
          ></i>
          <i
            className="fa-solid fa-star fa-2x"
            id={3}
            onClick={handleratingclick}
          ></i>
          <i
            className="fa-solid fa-star fa-2x"
            id={4}
            onClick={handleratingclick}
          ></i>
          <i
            className="fa-solid fa-star fa-2x"
            id={5}
            onClick={handleratingclick}
          ></i>
        </div>
        <textarea
          name="comment"
          id="comment"
          placeholder="Please describe your experience here.."
          value={feedback.comment}
          onChange={handleChange}
        ></textarea>
        <button className="submit" onClick={onSubmit}>
          Submit
        </button>
      </div>

      <ToastContainer />
    </>
  );
}

export default Feedback;
