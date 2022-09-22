import React, { useState, useEffect} from "react";
import "./Service_detail.css";
import Moment from "moment";
import {host} from "../../config/config"

import Delete_Model from "../Modals/Delete_Model";
import { Link } from "react-router-dom";

function Service_detail(props) {
  const [openModel, setOpenModel] = useState(false);
  const date = Moment(props.service.date).format().split("T")[0];
  const time = Moment(props.service.date).format().split("T")[1].split("+")[0];



  const getDownload = async () =>{
  await fetch(`${host}/api/services/getDownloads/${props.service._id}`)
    
  }

  useEffect(() => {
    getDownload()
  
  
  }, [])
  


  return (
    <>
      <div className="serv_details">
        <span>{props.sno}</span>
        <span>{props.service.sname}</span>
        <span>{props.service.isPaid === true ? "Paid" : "Free"}</span>
        <span>{props.service.ssp}</span>
        <span>
          {date}
          <br />
          {time}
        </span>
        <span>
          <img className="serv_banner" src={props.service.simg} alt="..." />
        </span>
        <span className="text-center">{props.service.downloads}</span>
        <Link to={`/s/${props.service.slug}`}>Visit here</Link>
        <span>
          <i
            className="fa-solid fa-trash-can fa-lg delete_serv"
            onClick={() => {
              setOpenModel(true);
            }}
          ></i>
        </span>
      </div>
      <Delete_Model
      id={props.service._id}
        open={openModel}
        progress = {props.progress}
        onClose={() => {
          setOpenModel(false);
        }}
      />
    </>


  );
}

export default Service_detail;
