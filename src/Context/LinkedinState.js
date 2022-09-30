import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../config/config";
import { toast } from "react-toastify";

export const linkedinContext = createContext();

const LinkedinState = (props) => {
  const navigate = useNavigate();
  const [loginInfo, setloginInfo] = useState({});
  const [openModelFB, setOpenModelFB] = useState(false);    // for feedback popup
  const [Status, setStatus] = useState();
  const [FBService, setFBService] = useState();

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
          toast.error("Login Failed! Please Try Again", {
            position: "top-center",
            autoClose: 1500,
          });
          navigate("/login/creators");
        }
      })
      .catch((error) => {
        toast.error("Login Failed! Please Try Again", {
          position: "top-center",
          autoClose: 1500,
        });
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
      console.log(res)
      const status = await getStatus(res.jwtToken);
      if (status === 1) {
        localStorage.setItem("jwtToken", res.jwtToken);
        localStorage.setItem("c_id", res.slug);
        navigate("/dashboard");
      } else {
        navigate("/waitlist");
      }
    } else {
      toast.error("Login Failed! Please Try Again", {
        position: "top-center",
        autoClose: 1500,
      });
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
  const getStatus = async (jwtToken) => {
    const response = await fetch(`${host}/api/creator/getstatus`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "jwt-token": jwtToken,
      },
    });
    const json = await response.json();
    if (json.success) {
      return json.res.status;
    } else {
      console.log(json.error);
    }
  };

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
          localStorage.setItem("user", login.name);
          setloginInfo(login);
          registerUserLogin(login.id, login.name, login.email, login.photo);
        } else {
          toast.error("Login Failed! Please Try Again", {
            position: "top-center",
            autoClose: 1500,
          });
        }
      })
      .catch((error) => {
        toast.error("Login Failed! Please Try Again", {
          position: "top-center",
          autoClose: 1500,
        });
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
          localStorage.setItem("user", login.name);
          setloginInfo(login);
          registerUserLogin(login.id, login.name, login.email, login.photo);
        } else {
          toast.error("Login Failed! Please Try Again", {
            position: "top-center",
            autoClose: 1500,
          });
        }
      })
      .catch((error) => {
        toast.error("Login Failed! Please Try Again", {
          position: "top-center",
          autoClose: 1500,
        });
      });
  };

  const registerUserLogin = async (id, name, email, photo) => {
    const userdata = await userIp();
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
        location: userdata,
      }),
    });
    localStorage.removeItem("from");
    const res = await response.json();
    if (res.success) {
      localStorage.setItem("isUser", true);
      localStorage.setItem("jwtToken", res.jwtToken);
      navigate(localStorage.getItem("url"));
      const fb = await checkFBlatest();
      if (fb.success) {
        getserviceusingid(fb.res.serviceID).then((service) => {
          setFBService(service);
          setOpenModelFB(true);
          //alert(`Send Feedback for "${service.sname}"`)
        });
      }
    } else {
      toast.error("Login Failed! Please Try Again", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  // Getting get service detail using id
  const getserviceusingid = async (id) => {
    const response = await fetch(`${host}/api/services/getserviceusingid/${id}`, {
      method: "GET",
    });
    const json = await response.json();
    if(json.success){
      return json.service
    }
    else{
      //console.log("Some error Occured")
    }
  };


  // searches for the feedback once the use login for its previous unfeedbacked services
  const checkFBlatest = async() =>{
    const response = await fetch(`${host}/api/feedback/checklatestFeedback` , {
        method: "GET",
        headers: {
            "jwt-token": localStorage.getItem('jwtToken') // USER LOGIN
        }
    })
    const json = await response.json()
    return json
}

  // Route : GET user IP ADDRESS and location
  const userIp = async () => {
    const response = await fetch(
      "https://api64.ipify.org/?format=json"
      //method:"GET",
      //mode:"no-cors",
      //headers: {
      //  Accept: "application/json",
      //  "Access-Control-Allow-Credentials": true
      //}
    );
    const json = await response.json();
    const loc = await userLocData(json.ip);

    const data = {
      ip: loc.ip,
      city: loc.city,
      country: loc.country_name,
      latitude: loc.latitude,
      longitude: loc.longitude,
    };
    return data;
  };

  const userLocData = async (ip) => {
    const response = await fetch(
      `https://ipapi.co/${ip}/json/`
      //method:"GET",
      //mode:"no-cors",
      //headers: {
      //  Accept: "application/json",
      //  "Access-Control-Allow-Credentials": true
    );
    const json = await response.json();
    return json;
  };

  return (
    <linkedinContext.Provider
      value={{
        usergooglelogin,
        loginlinkedinUser,
        loginCreator,
        getStatus,
        Status,
        FBService,
        openModelFB,
        setOpenModelFB,
        loginInfo,
        registerCreatorLogin
      }}
    >
      {props.children}
    </linkedinContext.Provider>
  );
};

export default LinkedinState;
