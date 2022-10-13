import { createContext,useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../config/config";
import { toast } from "react-toastify";
import { userContext } from "./UserState";


export const paymentContext = createContext();


const PaymentState = (props) => {
    
// Used to create Razor pay order using amount
    const createRazorpayClientSecret = async(amount) =>{
         try {
            const response = await fetch(`${host}/api/payment/createOrder`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },
              body: JSON.stringify({ amount: parseInt(amount) * 100 }),
            });
            const json = await response.json();
            if(json.success){
                return json.order
            }
            return json.success
            
         } catch (error) {
            toast.error("Some Error from Razorpay",{
                position:"top-center",
                autoClose:2000
            })
         }
    }

    // used to get razor pay api 
    const razorpay_key = async() =>{
        const res = await fetch(`${host}/api/payment/get_razorpay_key`, {
            method: "GET",
          });
          return res.key;
    }


    const checkfororder = async (serviceID)=>{
      try {
        const response = await fetch(`${host}/api/payment/checkOrderPlaced`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "jwt-token" :localStorage.getItem("jwtToken")
          },
          body: JSON.stringify({ serviceID:serviceID }),
        });
        const json = await response.json()
        return json.success
        
     } catch (error) {
        
     }

    }



      
    

return (
    <paymentContext.Provider
      value={{createRazorpayClientSecret,razorpay_key,checkfororder}}
    >
      {props.children}
    </paymentContext.Provider>
  );
}

export default PaymentState;