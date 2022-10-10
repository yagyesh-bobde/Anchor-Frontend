import React , { useState , createContext } from "react";
import { host } from "../config/config";


export const creatorContext = createContext();

const CreatorState = (props) => {
    const [basicCreatorInfo, setbasicCreatorInfo] = useState({})
    const [basicCdata, setbasicCdata] = useState({})
    const [allCreatorInfo, setallCreatorInfo] = useState({})

    const [allSubscribers, setallSubscribers] = useState([])
    const [subsInfo, setsubsInfo] = useState([])
    const [subscriberCount, setsubscriberCount] = useState(
        {
            total: 0,
            paid: 0,
            free: 0
        }
    )
   
    
    // ROUTE 3 : UPDATE/Create User Info
    const setCreatorInfo = async ( info) =>{
        const response = await fetch(`${host}/api/creator/update/info`, 
        
        {
            method : "POST" ,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "jwt-token": localStorage.getItem('jwtToken')
            },
            body: JSON.stringify({
                name : info.name,
                phone: info.phone,
                aboutMe : info.aboutMe,
                tagLine: info.tagLine,
                profile: info.profile,
                linkedInLink: info.linkedInLink,
                twitterLink : info.twitterLink,
                ytLink: info.ytLink,
                instaLink: info.instaLink,
                fbLink: info.fbLink
            }) 
            })
            const json = await response.json()
            return json.success
    }   

    // ROUTE 4 : Get Basic Creator Info -> No login required
    const getBasicCreatorInfo = async (creator_id) => { // id=> creator id
        const response = await fetch(`${host}/api/creator/basic/${creator_id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        })
        const json = await response.json()
        if (json.success) {
            setbasicCreatorInfo(json.res)
            setbasicCdata(json.other)
        } else {
            console.error(json.error)
        }
    }
    
    // Route for searching id using slug
    const getcreatoridUsingSlug = async (slug) => { // id=> creator id
        const response = await fetch(`${host}/api/creator/idwithslug/${slug}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": true
            }
        })
        const json = await response.json()
        if (json.success) {
            await getBasicCreatorInfo(json.res._id)
            return json.res._id
        } else {
            //alert(json.error)
        }
    }


    // ROUTE 5: GET All Creator Info -> Creator Login Required
    const getAllCreatorInfo = async () => {
        const response = await fetch(`${host}/api/creator/advanced/info`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                'jwt-token': localStorage.getItem('jwtToken')
            },
        })
        const json = await response.json();
        if (json.success) {
            setallCreatorInfo(json.res)
        } else {
            //alert(json.error)
        }
    }

    // get status of a creator 
    const getStatus = async()=>{
        const response = await fetch(`${host}/api/creator/getstatus`,{
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                'jwt-token': localStorage.getItem('jwtToken')
            }
        })
        const json = await response.json()
        if(json.success){

            return json
        }else{
            //console.log(json.error)
        }
    }
    


    // FETCH ALL SUBSCRIBERS

    const [paging, setpaging] = useState({})

    const getAllSubscribers = async() => {
        const response = await fetch(`${host}/api/subscribe/getall`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "jwt-token": localStorage.getItem('jwtToken')
            }
        })
        const json = await response.json()
        if(json.success){
            setallSubscribers(json.res)
            setpaging({
                ...paging,
                ...json.info
            })
            return json.res
        } else {
            //return alert(json.error)
            return json.success;
        }

    }


    // SUBSCRIBER COUNTS => TOTAL < FREE < PAID
    const getSubCounts = () => {
        let paid = 0;
        let free = 0;
        if (allSubscribers.length !== 0){
            for (let i in allSubscribers){
                if (allSubscribers[i].isPaid === 1){
                    paid+=1;
                } else {
                    free++;
                }
            }
        }
        setsubscriberCount({
            total : allSubscribers.length,
            paid : paid,
            free: free
        })
    }

    // FETCH SUBSCRIBER INFO
    const getSubsInfo = async (subsData=[]) => {
        let allInfo = []
        for (let i of subsData) {
            let info = await getUserInfo(i.userID.toString())
            allInfo.push(info)
        }
        setsubsInfo(allInfo)
        return allInfo
    }

    const getUserInfo = async (id) => {
        const response = await fetch(`${host}/api/user/info/advanced/${id}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
        }
        })
        const json = await response.json()
        if (json.success){
            return json.res
        } else{
            //alert(json.error)
        }
    }


    return (
        <creatorContext.Provider value={{ paging,basicCdata,getUserInfo, allSubscribers, subscriberCount,getStatus,getcreatoridUsingSlug, getAllCreatorInfo, getBasicCreatorInfo, basicCreatorInfo, allCreatorInfo, getAllSubscribers, subsInfo, getSubsInfo, getSubCounts, setsubsInfo, setCreatorInfo }}>
            {props.children}
        </creatorContext.Provider>
    )
}
export default CreatorState;