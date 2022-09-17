import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../config/config";
import { toast } from 'react-toastify';

export const linkedinContext = createContext();

const LinkedinState = (props) => {
  const navigate = useNavigate();
  const [loginInfo, setloginInfo] = useState({});
  const [Status, setStatus] = useState();

  const loginCreator = async () => {
    fetch(`${host}/login/creator/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((resJSON) => {
        if (resJSON.success) {
          const login = resJSON.res;
          setloginInfo(login);
          registerCreatorLogin(login.id, login.name, login.email, login.photo);
        } else {
          toast.error("Login Failed! Please Try Again",{
            position:"top-center",
            autoClose:1500
          })
          navigate("/login/creators");
        }
      })
      .catch((error) => {
        toast.error("Login Failed! Please Try Again",{
          position:"top-center",
          autoClose:1500
        })
        navigate("/login/creators");
      });
  };

  const registerCreatorLogin = async (linkedinID, name, email, photo, slug) => {
    let slugurl = name.split(" ").join("-");
    const count = await getslugcountcreator(slugurl.toLowerCase());
    let slugurl2 =
      count === 0
        ? slugurl.toLowerCase()
        : slugurl.toLowerCase().concat("--", `${count}`);

    const response = await fetch(`${host}/api/creator/newCreator`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        linkedinID,
        name,
        email,
        photo,
        slug: slugurl2,
      }),
    });
    const res = await response.json();
    if (res.success) {
      const status = await getStatus(res.jwtToken)
      if(status === 1){
        localStorage.setItem("jwtToken", res.jwtToken);
        localStorage.setItem("c_id",res.slug)
        navigate("/dashboard")
      }
      else{
        navigate("/waitlist")
      }
      
    } else {
      toast.error("Login Failed! Please Try Again",{
        position:"top-center",
        autoClose:1500
      })
      navigate("/login/creators");
    }
  };



  // get slug count for creator
  const getslugcountcreator = async (slug) => {
    const response = await fetch(`${host}/api/creator/getslugcount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: slug }),
    });
    const json = await response.json();

    if (json.success) {
      return json.count;
    } else {
      console.log("Some error Occured");
    }
  };

  // get status of a creator 
  const getStatus = async(jwtToken)=>{
    const response = await fetch(`${host}/api/creator/getstatus`,{
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            'jwt-token': jwtToken
        }
    })
    const json = await response.json()
    if(json.success){
        return json.res.status
    }else{
        console.log(json.error)
    }
}

  const usergooglelogin = async () => {
    fetch(`${host}/google/login/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((resJson) => {
        if (resJson.success) {
          const login = resJson.res;
          localStorage.setItem("user",login.name)
          setloginInfo(login);
          registerUserLogin(login.id, login.name, login.email, login.photo);
        } else {
          toast.error("Login Failed! Please Try Again",{
            position:"top-center",
            autoClose:1500
          })
        }
      })
      .catch((error) => {
        toast.error("Login Failed! Please Try Again",{
          position:"top-center",
          autoClose:1500
        })
      });
  };

  const loginlinkedinUser = async () => {
    fetch(`${host}/login/user/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((resJson) => {
        if (resJson.success) {
          const login = resJson.res;
          localStorage.setItem("user",login.name)
          setloginInfo(login);
          registerUserLogin(login.id, login.name, login.email, login.photo);
        } else {
          toast.error("Login Failed! Please Try Again",{
            position:"top-center",
            autoClose:1500
          })
        }
      })
      .catch((error) => {
        toast.error("Login Failed! Please Try Again",{
          position:"top-center",
          autoClose:1500
        })
      });
  };

  const registerUserLogin = async (id, name, email, photo) => {
    const response = await fetch(`${host}/api/user/newUser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        linkedinID: `${localStorage.getItem("from") === "google" ? "" : id}`,
        googleID: `${localStorage.getItem("from") !== "google" ? "" : id}`,
        name,
        email,
        photo,
      }),
    });
    localStorage.removeItem("from");
    const res = await response.json();
    if (res.success) {
      localStorage.setItem("isUser", true);
      localStorage.setItem("jwtToken", res.jwtToken);
      // navigate(url)
    } else {
      toast.error("Login Failed! Please Try Again",{
        position:"top-center",
        autoClose:1500
      })
    }
  };

  return (
    <linkedinContext.Provider
      value={{ usergooglelogin, loginlinkedinUser, loginCreator,getStatus,Status, loginInfo }}
    >
      {props.children}
    </linkedinContext.Provider>
  );
};

export default LinkedinState;
