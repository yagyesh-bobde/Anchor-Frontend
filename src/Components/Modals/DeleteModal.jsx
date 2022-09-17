import React from 'react'
import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Modals.css'


const DeleteModal = ({ show , setshow }) => {

    const modalRef = useRef();
    const closeRef = useRef();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (show) {
            modalRef.current.click()
        }
    }, [])

    const handleClose = () => {
        closeRef.current.click()
        setshow(false)
    }
    const handleDelete = () => {
        closeRef.current.click()
        setshow(false)
    }

    return (
        <>
            <button ref={modalRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            {/* MODAL */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header d-none">
                            <button ref={closeRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="modal_heading text-center">
                                <h5>Are you sure you want to delete service?</h5>
                                <p>Your fans will not be able to access this service any more after that</p>
                            </div>
                            <div className="modal_buttons">
                                <button className="btn btn-outline-dark" onClick={() => {
                                   handleClose()
                                }}>
                                    Cancel
                                </button>
                                <button className="btn btn-outline-danger" onClick={handleDelete}  >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteModal;
