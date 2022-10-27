import React from "react";
import "./Subscriber_detail.css";

function Subscriber_detail(props) {
  let email = (props.info?.userID?.email?.split("@")[0].length>6?props.info?.userID?.email?.split("@")[0].substr(0,5)+"....@" + props.info?.userID?.email?.split("@")[1]:props.info?.userID?.email?.split("@")[0].substr(0,3) + "....@" + props.info?.userID?.email?.split("@")[1])
  return (
    <div className="subs_details_body">
      <span>{props?.sno}</span>
      <span>{props.info?.userID?.name}</span>
      <span>{email}</span>
      <span>{props.info?.userID?.location?.city+", "+props.info?.userID?.location?.country}</span>
      <span className={`${props?.type}_type_tag`}>{props?.type}</span>
    </div>
  );
}

export default Subscriber_detail;
