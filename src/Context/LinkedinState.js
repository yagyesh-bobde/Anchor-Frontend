import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../config/config";

export const linkedinContext = createContext();

const LinkedinState = (props) => {
  const navigate = useNavigate();
  const [loginInfo, setloginInfo] = useState({});

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
          navigate("/login/creators");
        }
      })
      .catch((error) => {
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
      localStorage.setItem("jwtToken", res.jwtToken);
    } else {
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

  const usergooglelogin = async () => {
    console.log("login google");
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
          setloginInfo(login);
          registerUserLogin(login.id, login.name, login.email, login.photo);
        } else {
          throw Error("400 Bad Request");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginlinkedinUser = async () => {
    console.log("login user");
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
        console.log(resJson);
        if (resJson.success) {
          const login = resJson.res;
          setloginInfo(login);
          registerUserLogin(login.id, login.name, login.email, login.photo);
        } else {
          throw Error("400 Bad Request");
        }
      })
      .catch((error) => {
        console.log(error);
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
      navigate(`${localStorage.getItem("url")}`);
    }
  };

  return (
    <linkedinContext.Provider
      value={{ usergooglelogin, loginlinkedinUser, loginCreator, loginInfo }}
    >
      {props.children}
    </linkedinContext.Provider>
  );
};

export default LinkedinState;
