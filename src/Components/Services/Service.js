import React, { useContext, useEffect } from "react";
import Service_detail from "../Service Detail/Service_detail";
import "./Service.css";
import ServiceContext from "../../Context/services/serviceContext";


function Service(props) {
  const context = useContext(ServiceContext);
  const { services, getallservices } = context;

  let count = 0;



  useEffect(() => {
    getallservices();
  }, [services]);

  return (
    <>
      <div className="service_list_page">
        <h2>Service details</h2>
        <div className="services_table_head">
          <span>S.No.</span>
          <span>Service Name</span>
          <span>Type</span>
          <span>Amount</span>
          <span>Uploaded on</span>
          <span>Image</span>
          <span>Downloads</span>
          <span>Link</span>
          <span>Action</span>
        </div>
      </div>
      <div className="service_details_body">
        {services.res?.map((e) => {
          if (e.status == 1) {
            count = count + 1;
            return (
              <Service_detail
                key={e._id}
                sno={count}
                service={e}
                progress={props.progress}
                downloads={500}
              />
            );
          } else {
            return "";
          }
        })}
        {count === 0 ? (
          <h1 className="no_services">No services to display</h1>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Service;
