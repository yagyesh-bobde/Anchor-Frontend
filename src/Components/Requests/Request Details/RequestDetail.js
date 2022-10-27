import React, { useState, useEffect } from "react";
import "./RequestDetail.css";
import Moment from "moment";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Delete_Model from "../../Modals/DeleteModel";

function RequestDetail(props) {

  return (
    <>
      <div className="request_details">
        <span>{props.sno}</span>
        <span>{props.name ? props.name : "--"}</span>
        <span>{props.desc}</span>
        <span>{props.willPay ? "Yes" : "No"}</span>
        <span>
          {props.date}
        </span>
      
      </div>
      {/* <Delete_Model
        id={props.service._id}
        status={changeStatus}
        open={openModel}
        progress={props.progress}
        onClose={() => {
          setOpenModel(false);
        }}
      /> */}
    </>
  );
}

export default RequestDetail;
