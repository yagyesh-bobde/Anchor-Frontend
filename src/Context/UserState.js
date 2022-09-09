import { createContext, useState } from "react";
import { host } from "../config/config";

export const userContext = createContext();

const UserState = (props) => {
    const [isuserLoggedIn, setisuserLoggedIn] = useState(false)
    const [check, setcheck] = useState(false)


    // ROUTE 1 : USER SIGN up
    const userSignup = async( name, email, password, location) =>{
        const response = await fetch(`${host}/api/user/createuser`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({
                name,email, password ,location
            })
        })
        const json = await response.json();
        if (json.success) {
            setisuserLoggedIn(true)
            localStorage.setItem('jwtToken', json.jwtToken)
        } else {
            if (typeof (json.error) === 'object') {
                 alert(json.error[0].msg)
                return;
            }
            alert(json.error)
        }
    }
    // ROUTE 2 : USER LOG IN
    const userlogIn = async ( email, password) => {
        const response = await fetch(`${host}/api/user/login`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({
                 email, password
            })
        })
        const json = await response.json();
        if (json.success) {
            setisuserLoggedIn(true)
            localStorage.setItem('jwtToken', json.jwtToken)
        } else {
            if (typeof (json.error) === 'object') {
                alert(json.error[0].msg)
                return;
            }
            alert(json.error)
        }
    }

    // ROUTE 3 : USER ORDER
    const userPlaceOrder = async ( amount , status , serviceid ) => {
        const response = await fetch(`${host}/api/user/service/neworder/${serviceid}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                'jwt-token': localStorage.getItem('jwtToken')
            },
            body: JSON.stringify({
                amount , status 
            })
        })
        await fetch(`${host}/api/services/addDownload/${serviceid}`)
        const json = await response.json();

        // TODO: CHANGE THE ISPAID TYPE TO DYNAMIC LATER
        await addSubscriber(serviceid , 0)
        return json.success
    }

    const addSubscriber = async (id , isPaid) => { // USER LOGIN IS REQUIRED
        const response = await fetch(`${host}/api/subscribe/new/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "jwt-token": localStorage.getItem('jwtToken')
            },
            body: JSON.stringify({
                isPaid : isPaid
            })
        })
        const res = await response.json()
        console.log(res)
        return res.success
    }


    const checkSubscriber = async (id) => { // USER LOGIN IS REQUIRED
        const response = await fetch(`${host}/api/subscribe/checkforsubscribe`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "jwt-token": localStorage.getItem('jwtToken')
            },
            body: JSON.stringify({
                id:id
            })
        })
        const res = await response.json()
        setcheck(res.success)
    }



    return (
        <userContext.Provider value={{ check,isuserLoggedIn,checkSubscriber, userSignup, userlogIn, userPlaceOrder, addSubscriber }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;