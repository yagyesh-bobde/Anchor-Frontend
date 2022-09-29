import React, { createContext,useState } from 'react'
import { Navigate } from 'react-router-dom';
import { host } from "../config/config";

export const feedbackcontext = createContext()
 
const FeedbackState = ( props ) => {
    const [feedbacks, setFeedbacks] = useState([])


    // CHECK IF THE FEEDBACK IS ALREADY SUBMITTED
    const checkFB = async(serviceID) => {
        const response = await fetch(`${host}/api/feedback/checkFeedback/${serviceID}` , {
            method: "GET",
            headers: {
                "jwt-token": localStorage.getItem('jwtToken') // USER LOGIN
            }
        })
        const json = await response.json()
        return json.success;
    }



    // Get all the feedbacks for a particular service using serviceid
    //const allfbforservice = async(id) =>{
    //    const response = await fetch(`${host}/api/feedback/all/${id}` , {
    //        method: "GET",
    //    })
    //    const json = await response.json()
    //    return json
    //}


    //get all the feedback of a creator
    const getallfeedback = async (id)=>{
        const response = await fetch(`${host}/api/feedback/all/${id}`,{
            method:"GET"
        })
        const json = await response.json()
        if(json.success){
            setFeedbacks(json.res)
        }
        else{
            //error
        }
    }

    

    const createFeedback = async(serviceID ,rating , description) => {
        const response = await fetch(`${host}/api/feedback/giveFeedback/${serviceID}`, {
            method: "POST",
            headers: {
                "Content-type" : "application/json",
                "jwt-token": localStorage.getItem('jwtToken') // USER LOGIN
            },
            body : JSON.stringify({
                rating,
                desc : description
            })
        })
        const json = await response.json()
        return json.success
    }

    
    return (
        <feedbackcontext.Provider value={{ feedbacks,checkFB, createFeedback,getallfeedback }} >
        {props.children}
    </feedbackcontext.Provider>
  )
}

export default FeedbackState