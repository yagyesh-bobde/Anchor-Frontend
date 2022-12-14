import React, { useContext, useEffect,useState } from "react";
import ServiceDetail from "../Service Detail/ServiceDetail";
import "./Service.css";
import ServiceContext from "../../Context/services/serviceContext";
import { LoadTwo } from "../Modals/Loading";


function Service(props) {
  const [openLoading, setOpenLoading] = useState(true)
  const context = useContext(ServiceContext);
  const { services, getallservices } = context;

  let count = 0;



  useEffect(() => {
    getallservices().then(()=>{
    })
    setOpenLoading(false)
    // eslint-disable-next-line
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

      {openLoading && <LoadTwo open={openLoading}/>}
      <div className="service_details_body">
        {services.res?.map((e) => {
          if (e.status === 1) {
            count = count + 1;
            return (
              <ServiceDetail
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
