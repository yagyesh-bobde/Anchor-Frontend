import React,{useContext, useState, useEffect} from "react";
import { creatorContext } from "../../Context/CreatorState";
import "./Info_creator.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import googleAnalyticsAction from "../../utils/google_analyticsiinit.js";


function Info_creator(props) {
  const { allCreatorInfo, getAllCreatorInfo, setCreatorInfo } = useContext(creatorContext)
  const [data, setdata] = useState({
    name: "",
    phone: 0,
    tagLine: "",
    aboutMe: "",
    linkedInLink: "",
    ytLink: "",
    instaLink: "",
    fbLink: "",
    twitterLink: "",
  });

  useEffect(() => {
    googleAnalyticsAction().then(() => {});
  });

  useEffect(() => {
    getAllCreatorInfo()
  
  }, [])
  
useEffect(() => {
    setdata({
      ...data,
      ...allCreatorInfo
    })
  }, [getAllCreatorInfo])
  

  // Auto resize of textare
  const textarea = document.querySelector("#about");
  textarea?.addEventListener("input", autoResize, false);

  function autoResize() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  // Change in values of input tags
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    props.progress(0)
    e.preventDefault()
    const success = setCreatorInfo(data)
    if(success){
      toast.success("Changes Saved Successfully ",{
        position:"top-center",
        autoClose:2000
      })}else{
        toast.error("Changes Saved Successfully ",{
          position:"top-center",
          autoClose:2000
    })}
    props.progress(100)
  
  }

  return (
    <>
    <ToastContainer/>
    <div className="create_box creator_info">
      <form  onSubmit={e => onSubmit(e)} className="entries">
        <div>
          <div className="left_entry_box">
            <label htmlFor="name" className="entry_labels">
              Full Name <small>*</small>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={data.name}
            
            />
            <label htmlFor="contact" className="entry_labels">
              Contact Number <small>*</small>
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              onChange={handleChange}
              value={data.phone}
            
            />
            <label htmlFor="tagLine" className="entry_labels">
              Tagline <small>*</small>
            </label>
            <input
              type="text"
              name="tagLine"
              id="tagLine"
              onChange={handleChange}
              value={data.tagLine}
              
              placeholder="Ex. Product Manager at Google"
            />
            <label htmlFor="aboutMe" className="entry_labels">
              About Me <small>*</small>
            </label>
            <textarea
              name="aboutMe"
              onChange={handleChange}
              value={data.aboutMe}
              id="about"
              
              placeholder="Please describe your service..."
            />
            
          </div>
          <div className="right_entry_box">
            <label htmlFor="linkedInLink" className="entry_labels">
              LinkedIn Link <small>*</small>
            </label>
            <input
              type="url"
              name="linkedInLink"
              id="linkedIn"
              onChange={handleChange}
              value={data.linkedInLink}
              
            />
            <label htmlFor="ytLink" className="entry_labels">
              Youtube Link 
            </label>
            <input
              type="url"
              name="ytLink"
              id="ytLink"
              onChange={handleChange}
              value={data.ytLink}
            />
            <label htmlFor="instaLink" className="entry_labels">
              Instagram Link 
            </label>
            <input
              type="text"
              name="instaLink"
              id="instagram"
              onChange={handleChange}
              value={data.instaLink}
            />
            <label htmlFor="fbLink" className="entry_labels">
              Facebook Link 
            </label>
            <input
              type="url"
              name="fbLink"
              id="fbLink"
              onChange={handleChange}
              value={data.fbLink}
            />
            <label htmlFor="twitterLink" className="entry_labels">
              Twitter Link 
            </label>
            <input
              type="url"
              name="twitterLink"
              id="twitterLink"
              onChange={handleChange}
              value={data.twitterLink}
            />
            
          </div>
        </div>

        <button className="submit_button" type="submit">
          Save Details
        </button>
      </form>
    </div>
    </>
  );
}

export default Info_creator;
