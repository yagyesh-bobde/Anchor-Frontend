import React, { useContext, useEffect } from 'react'
import SubscriberDetail from "../Subscriber Details/Subscriber_detail";
import { creatorContext } from '../../Context/CreatorState'
import './Subscribers.css'
import googleAnalyticsAction from "../../utils/google_analyticsiinit.js";

function Subscribers() {
  const { allSubscribers, getAllSubscribers, getSubCounts, subscriberCount, getSubsInfo, subsInfo, setsubsInfo } = useContext(creatorContext)

  useEffect(() => {
    googleAnalyticsAction().then(() => {});
  });

  useEffect(() => {
    getAllSubscribers()
    if (allSubscribers.length !== 0) {
      getSubsInfo()

      getSubCounts()
    }
  }, [])

  useEffect(() => {
    if (allSubscribers.length !== 0) {
      getSubsInfo()

      getSubCounts()
    }
  }, [allSubscribers])

 

  return (
    <>
    <div className="subscriber_list_page">
      <h2>Subscriber List ( an user who used your services )</h2>
      <div className="subs_count_box">
        <div className="subs_box">
          <span>{subscriberCount.total}</span>
          <span>Total Subscriber</span>
        </div>
        <div className="subs_box">
          <span>{subscriberCount.paid}</span>
          <span>Paid Subscriber</span>
        </div>
        <div className="subs_box">
          <span>{subscriberCount.free}</span>
          <span>Free Subscriber</span>
        </div>
      </div>

        <div className="sub_table_head">
            <span>S.No.</span>
            <span>Name</span>
            <span>Email ID</span>
            <span>Location</span>
            <span>Type</span>
        </div>
        </div>

        <div className="subs_details">
          {
            (subsInfo.length !==0) &&
            subsInfo.map( (info,id) => {
              return (
                <SubscriberDetail
                key = {id}
                  sno={id+1}
                  name={info?.name}
                  email={info?.email}
                  loc={info?.location}
                  type={allSubscribers[id]?.isPaid ? "Paid" : "Free"}
                />
              )
            })
}
                
          </div>
    </>
  );
}

export default Subscribers;
