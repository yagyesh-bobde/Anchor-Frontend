import { useState } from "react";
import ServiceContext from "./serviceContext";
import { host } from "../../config/config";


const ServiceState = (props) => {

  const servicesInitial = []; // this state is being passed as value to the notestate

  const [services, setServices] = useState(servicesInitial);
  const [serviceInfo, setServiceInfo] = useState(servicesInitial);
  const [slugCount, setSlugCount] = useState(0);


  // 1. Getting all the services for the respective creator 
  const getallservices = async (c_id) => {
    const response = await fetch(`${host}/api/services/getallservices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "jwt-token":localStorage.getItem("jwtToken")
      }
    });
    const json = await response.json();
    if(json.success){
      setServices(json);
    }
    else{
      console.log("Some error Occured")
    }
  };
//  2. Getting all the services for the respective creator
  const getallservicesusingid = async (c_id) => {
    const response = await fetch(`${host}/api/services/getallservicesusingid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id:c_id })
    });
    const json = await response.json();
    if(json.success){
      setServices(json);
    }
    else{
      console.log("Some error Occured")
    }
  };

  // 4. Adding services from the respective data from /createservice endpoint 
  const addservice = async (sname,sdesc,ldesc,slug,simg,surl,stype,isPaid,smrp,ssp) => {
      const response = await fetch(`${host}/api/services/createservice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "jwt-token":localStorage.getItem("jwtToken")
        },
  
        //body: JSON.stringify({ sname:sname,sdesc:sdesc,ldesc:ldesc,slug:slug,simg:simg,surl:surl,stype:stype,isPaid:isPaid,smrp:smrp,ssp:ssp }),
        body: JSON.stringify({
         sname:sname,sdesc:sdesc,ldesc:ldesc,slug:slug,simg:simg,surl:surl,stype:stype,isPaid:isPaid,smrp:smrp,ssp:ssp
        })
      });
      const json = await response.json();
      return json
      
    
  };

  // 5. Deleting services from the respective data from /deleteservice endpoint
  const deleteService = async (id) => {
    const response = await fetch(`${host}/api/services/deleteservice/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "jwt-token":localStorage.getItem("jwtToken")
      }
    });
    const json = await response.json();
    return json.success
  };

  // 6. Getting a service detail for the respective creator from /getserviceinfo endpoint
  const getserviceinfo = async (slug) => {
    const response = await fetch(`${host}/api/services/getserviceinfo/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const json = await response.json();
    if(json.success){
      setServiceInfo(json.service[0]);
      return [json.service[0]?.c_id,json.service[0]?._id]
    }else{
      console.log("Some error Occured")
    }
  };
    

  //5. Upload files to url form
  const Uploadfile = async (data) => {
    try {
      const response = await fetch(`${host}/api/file/upload`,{
        method: "POST",
        body: data,
      });
      const json =  await response.json()
      return json
      
    } catch (error) {
      console.error(error)
      
    }
  }

  //6. get slug count
  const getslugcount = async (slug) => {
      const response = await fetch(`${host}/api/services/getslugcount`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug:slug}),
      });
      const json =  await response.json()

      if(json.success){
        setSlugCount(json.count)
       }else{
      console.log("Some error Occured")
    }
      
  
}

  return (
    <ServiceContext.Provider
      value={{ serviceInfo,services,slugCount,getallservicesusingid,getallservices,addservice,deleteService,Uploadfile,getserviceinfo,getslugcount}}
    >
      {" "}
      {/* here we use the context created and the router whch are wrapped inside the notestate can access the state passed here ith the help of use context hook */}
      {props.children}
    </ServiceContext.Provider>
  );
};

export default ServiceState;