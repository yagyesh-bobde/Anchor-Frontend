import React, { useState,useEffect } from "react";
import { host } from "../../config/config";
import "./Usercount.css"

function UserCount() {
  const [userCount, setuserCount] = useState(0);
  const [creatorCount, setcreatorCount] = useState(0);
  const [orderCount, setorderCount] = useState(0);
  const [serviceCount, setserviceCount] = useState(0);

  useEffect(() => {
    const usercount = async () => {
      const response = await fetch(`${host}/api/developer/totalusercount`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      const json = await response.json();
      if (json.success) {
        setuserCount(json.count);
      }
    };
    const servicecount = async () => {
      const response = await fetch(`${host}/api/developer/totalservicecount`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      const json = await response.json();
      if (json.success) {
        setserviceCount(json.count);
      }
    };
    const ordercount = async () => {
      const response = await fetch(`${host}/api/developer/totaluserordercount`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      const json = await response.json();
      if (json.success) {
        setorderCount(json.count);
      }
    };
    const creatorcount = async () => {
      const response = await fetch(`${host}/api/developer/totalcreatorcount`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      const json = await response.json();
      if (json.success) {
        setcreatorCount(json.count);
      }
    };

    usercount();
    ordercount();
    creatorcount();
    servicecount();
  }, []);

  return (
    <div className="usercount">
      <div className="countbox">
        <h1>Users</h1>
        <h2>{userCount}</h2>
      </div>
      <div className="countbox">
        <h1>User Orders</h1>
        <h2>{orderCount}</h2>
      </div>
      <div className="countbox">
        <h1>Creator</h1>
        <h2>{creatorCount}</h2>
      </div>
      <div className="countbox">
        <h1>Service</h1>
        <h2>{serviceCount}</h2>
      </div>
    </div>
  );
}

export default UserCount;
