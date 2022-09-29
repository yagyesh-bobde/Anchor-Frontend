import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Model.css";

function Feedback_Modal({open, onClose, name,slug}) {
    const navigate = useNavigate()

    const handleClick = () =>{
        navigate(`/feedback/${slug}`)
    }

    if (!open) {
        return null;
      }

  return (
    <div onClick={onClose} className="logout_model_logout fb_modal">
      <div onClick={(e)=>e.stopPropagation()} className="fb_modal_main_box model_main_box ">
        <i className="fa-solid fa-xmark fa-2x"  onClick={onClose}></i>
        <span className="fb_span_one model_question">
          Review the Previous Service 
        </span>
        <span className="fb_span_two model_gyan">
          Share your valuable feedback for Service - <b>{name}</b> with other users.
        </span>
        <div className="model_buttons">
          <button className="fb_model_button model_button " onClick={handleClick}>
            Give Your Feedback
          </button>
        </div>
      </div>
    </div>
  )
}

export default Feedback_Modal