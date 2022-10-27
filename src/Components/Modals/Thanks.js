import React from "react";
import { useNavigate } from "react-router-dom";
import "./Model.css";
import mixpanel from "mixpanel-browser";
import { ShareSocial } from "react-share-social";

function Thanks({ open, onClose, copyURL, slug, name }) {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    copyURL
      ? window.open(
          `https://api.whatsapp.com/send?text=Checkout this Important resource -- *${name}* at https://www.anchors.in/r/${copyURL}?utm_medium=whatsapp&utm_source=wahtsapp&utm_campaign=company-question`
        )
      : window.open(
          `https://api.whatsapp.com/send?text=Checkout this Important resource -- *${name}* at https://www.anchors.in/s/${slug}?utm_medium=whatsapp&utm_source=wahtsapp&utm_campaign=company-question`
        );
    mixpanel.track("Shared On Whatsapp", {
      service: slug,
    });
  };

  const handleLinkedIn = async () =>{
    const shareData = {
      title: `${name} at Anchors`,
      text: 'Checkout this Important resource',
      url: copyURL ? `https://www.anchors.in/r/${copyURL}` : `https://www.anchors.in/s/${slug}`
    }
    if(navigator.share){
      await navigator.share(shareData);
    }else{
      navigator.clipboard.writeText( `Checkout this Important resource -- *${name}* at ${copyURL ? `https://www.anchors.in/r/${copyURL}` : `https://www.anchors.in/s/${slug}` }` )
      alert("Message has been copied, Do share it")
    }
  }

  if (!open) {
    return null;
  }

  return (
    <>
    <div onClick={onClose} className="logout_model_logout">
      <div onClick={(e) => e.stopPropagation()} className="thanks_model ">
        
        <i className="fa-solid fa-xmark fa-2x" onClick={onClose}></i>
        <span className="thanks_model_header">
          <i class="fa-solid fa-cloud-arrow-down fa-xl"></i>
          <br />
          Thanks for downloading...
        </span>
        <span className="thanks_model_content">
          Do you really think it can help to your <br /> friends? Share with
          friends
        </span>
        <div className="thanks_model_button">
             {/* <button className="linkedin_btn">
              <i class="fa-brands fa-linkedin fa-xl"></i>&nbsp; Linkedin
            </button>  */}
          <button className="whatsapp_btn" onClick={handleWhatsApp}>
            <i class="fa-brands fa-whatsapp fa-xl"></i>&nbsp;WhatsApp
          </button>
        </div>
      </div>  
    </div>
    </>
  );
}

export default Thanks;
