import React from "react";
import "./Subscriber_detail.css";

function Subscriber_detail(props) {
  let email = (props.email.split("@")[0].length>6?"...."+props.email.split("@")[0].substr(-5,5)+"@" + props.email.split("@")[1]:"...."+props.email.split("@")[0].substr(-3,3) + "@" + props.email.split("@")[1])
  return (
    <div className="subs_details_body">
      <span>{props.sno}</span>
      <span>{props.name}</span>
      <span>{email}</span>
      <span>{props.loc}</span>
      <span className={`${props.type}_type_tag`}>{props.type}</span>
    </div>
  );
}

export default Subscriber_detail;
