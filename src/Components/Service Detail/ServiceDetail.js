import React, { useState, useEffect} from "react";
import "./ServiceDetail.css";
import Moment from "moment";
import {host} from "../../config/config"

import Delete_Model from "../Modals/DeleteModel";
import { Link } from "react-router-dom";
import Email_Model from "../Modals/Email_Modal";

function ServiceDetail(props) {
  const [openModel, setOpenModel] = useState(false);
  const [openModel2, setOpenModel2] = useState(false);
  const date = Moment(props.service.date).format().split("T")[0];
  const time = Moment(props.service.date).format().split("T")[1].split("+")[0];



  const getDownload = async () =>{
  await fetch(`${host}/api/services/getDownloads/${props.service._id}`)
    
  }

  useEffect(() => {
    getDownload()
  // eslint-disable-next-line
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
          {/* <i class="fa-solid fa-envelope fa-lg delete_serv" onClick={() => {
              setOpenModel2(true);
            }}></i> */}
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
      <Email_Model open={openModel2}
        progress = {props.progress}
        onClose={() => {
          setOpenModel2(false);
        }}/>
    </>


  );
}

export default ServiceDetail;
