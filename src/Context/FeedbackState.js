import React, { createContext } from 'react'
import { host } from "../config/config";

export const feedbackcontext = createContext()
 
const FeedbackState = ( props ) => {
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
        if(json.success){
            // FEEDBACK SUBMITTED MODAL
            alert("Feedback Successfully submitted")
            
        } else{
            alert("Error: Feedback could not be submitted")
        }
    }

    
    return (
        <feedbackcontext.Provider value={{ checkFB, createFeedback }} >
        {props.children}
    </feedbackcontext.Provider>
  )
}

export default FeedbackState