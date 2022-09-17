import React,{useState,useContext,useEffect} from 'react'
import "./Feedback.css"
import { useParams } from 'react-router-dom'
import { feedbackcontext } from '../../Context/FeedbackState'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import googleAnalyticsAction from "../../utils/google_analyticsiinit.js";

function Feedback(props) {
    const [feedback, setfeedback] = useState({comment:""})
    const [rating, setrating] = useState(0)
    const { checkFB, createFeedback } = useContext(feedbackcontext)
    const { id  } = useParams()

    useEffect(() => {
        googleAnalyticsAction().then(() => {});
      });

    useEffect(() => {
        //   CHECK USER LOGIN  eLSE a login modal
    
        checkFB(id) // CHECK IF THE USER ALREDY SUBMITTED THE FORM
    //  SHOW THE SUBMIT SUCCESS MODAL
        
        }, [])


    const handleratingclick = (e) =>{
        if(document.getElementById(`${e.target.id}`).style.color !== "red"){
            for (let index = e.target.id; index > 0; index--) {
                document.getElementById(`${index}`).style.color = "red"   
            }
            for (let index = e.target.id+1; index < 6; index++) {
                document.getElementById(`${index}`).style.color = "black"   
            }
            let temp = e.target.id
            setrating(temp)
        
        }else{
            for (let index = 1; index < 6; index++) {
                document.getElementById(`${index}`).style.color = "black"
            }
            let temp = 0
            setrating(temp)
        }
    }

    const handleChange = (e)=>{
        setfeedback({ ...feedback, comment: e.target.value })
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        const id = toast.loading("Please wait...",{
            position: "top-center"
          })
        props.progress(0)
        createFeedback(id , rating , feedback.comment)
        props.progress(100)
        toast.update(id, {render: "Feedback Submitted Successfully ", type: "success", isLoading: false,autoClose: 3000});
    }

  return (
    <>
    <div className="profile_header">
        <img src=".." alt="Logo" />
      </div>
    <div className="rating">
        <h1>User rating's Feedback form</h1>
        <div className="stars">
        <i className="fa-regular fa-star fa-2x" id={1} onClick={handleratingclick}></i>
        <i className="fa-regular fa-star fa-2x" id={2} onClick={handleratingclick}></i>
        <i className="fa-regular fa-star fa-2x" id={3} onClick={handleratingclick}></i>
        <i className="fa-regular fa-star fa-2x" id={4} onClick={handleratingclick}></i>
        <i className="fa-regular fa-star fa-2x" id={5} onClick={handleratingclick}></i>
        
        </div>
        <textarea name="comment" id="comment" cols="60" rows="10" placeholder='Please describe your experience here..' value={feedback.comment} onChange={handleChange}></textarea>
        <button className="submit" onClick={onSubmit} >Submit</button>
    </div>

    <ToastContainer />
    
    </>
  )
}

export default Feedback