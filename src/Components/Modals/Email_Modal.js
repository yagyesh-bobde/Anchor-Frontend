import React, { useContext,useState } from "react";
import "./Model.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { creatorContext } from "../../Context/CreatorState";


function Email_Model({ id, open, onClose, progress }) {
  const context = useContext(creatorContext);
  const { getAllSubscribers,getSubsInfo, } = context;

  const [data, setData] = useState({fromEmail:"Yuvraj",subjectEmail:"Message from Himanshu Shekhar!!!!!!",contentEmail:"Himanshu this side and hope all going great in life.\nI want your valuable feedback on the last service you use on Anchors which was <b>\"Most Frequent Questions on Google\"</b>.\nSo waiting for your valuable reply."})

  const handleChange = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  //EMail Sending API Context

  const getUserMails = async () => {
    const subsData = await getAllSubscribers();
    const subsInfod = await getSubsInfo(subsData);
    if (subsInfod.length !== 0) {
      let users = "";
      for (let index = 0; index < subsInfod.length; index++) {
        let email = subsInfod[index]?.email ? subsInfod[index]?.email : "";
        users = users + email + ",";
      }
      return users;
    }
    return null;
  };

  

  const sendMail = async (userMails) => {
    const res = await fetch("https://6ht3n8kja3.execute-api.ap-south-1.amazonaws.com/sendEmail", {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          "creatorName" : data?.fromEmail,
          "receiverEmail" : "rajpootyuvraj02@gmail.com",
          "message" : {
            "greet": "Hey Buddy",
            "main": "Himanshu this side and hope all going great in life.\nI want your valuable feedback on the last service you use on Anchors which was <b>\"Most Frequent Questions on Google\"</b>.\nSo waiting for your valuable reply.",
            "closing": "Your Friend"
          },
          "subject" : data?.subjectEmail,
          "link":"https://www.anchors.in"
        }
      ),
    });
    //let response = await res.json()
    //console.log(response)
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    progress(0)
    //mixpanel.track("Email Sent to Subscribers", {
    //    serviceName: "The Service Name",
    //    creatorName: "CreatorName"
    //})
    const userMails = await getUserMails();
    console.log(userMails); 
    if (userMails) {
      await sendMail(userMails);
      toast.success("Email Sent Successfully",{
        position:"top-center",
        autoClose:2000
      })
      onClose();
    } else {
      console.log("No Subscribers");
    }
    progress(100)
    //setsent(true)
  };


  if (!open) {
    return null;
  }

  return (
    <>
      <div onClick={onClose} className="model">
        <div
          onClick={(e) => e.stopPropagation()}
          className="model_main_box email_box"
        >
          <span className="model_question">
            Notify your Subscribers through Email
          </span>
          <form noValidate autoComplete="off" className="email_form">
            <div>
            <label htmlFor="fromEmail"  className="entry_labels">
                From
            </label>
            <input type="text" name="fromEmail" id="fromEmail" placeholder="From" onChange={handleChange}  value={data.fromEmail}/>
            </div>
            <div>
                <label htmlFor="subjectEmail"  className="entry_labels">Subject</label>
                <input type="text" name="subjectEmail" id="subjectEmail"  placeholder="Subject"  onChange={handleChange} value={data.subjectEmail}/>
            </div>
            <div>
                <label htmlFor="contentEmail"  className="entry_labels">Content of Email</label>
                <textarea name="contentEmail" id="contentEmail" onChange={handleChange} value={data.contentEmail}></textarea>
            </div>
          
          </form>

          <div className="model_buttons" style={{alignItems:"center"}}>
            <button className="model_button" style={{border:"2px solid red", color:"red"}} onClick={handleSubmitEmail}>
                Send Mail
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Email_Model;
