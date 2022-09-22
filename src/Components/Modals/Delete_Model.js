import React ,{useContext}from "react";
import "./Model.css";
import ServiceContext from "../../Context/services/serviceContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Delete_Model({ id, open, onClose,progress }) {
  const context = useContext(ServiceContext);
  const { deleteService } = context;

  const handleDelete = async () => {
    progress(0)
    const success = await deleteService(id, "63147d9f812fdbad1e6fc185");
    if(success){
      toast.success("Deletion Successfull",{
        position: "top-center",
          autoClose: 2000,
      })
    }
    else{
      toast.error("Service Not Deleted",{
        position: "top-center",
          autoClose: 2000,
      })

    }
    progress(100)
  };


  if (!open) {
    return null;
  }

  return (
    <>
    <div onClick={onClose} className="model">
      <div className="model_main_box">
        <span className="model_question">
          Are you sure you want to delete service?
        </span>
        <span className="model_gyan">
          Your fans will not able to access this service any more after that.
        </span>
        <div className="model_buttons">
          <button className="model_button" onClick={handleDelete}>
            Delete
          </button>
          <button className="model_button" onClick={onClose}>
            Don't Delete
          </button>
        </div>
      </div>
    </div>
    <ToastContainer/>
    </>
  );
}

export default Delete_Model;
