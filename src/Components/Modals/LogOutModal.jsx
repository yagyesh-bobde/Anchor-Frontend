import React from 'react'
import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Modals.css'


const LogOutModal = ( { show=true }) => {

    const modalRef = useRef();
    const closeRef = useRef();
    const navigate = useNavigate();
    useEffect(() => {
      if (show){
        modalRef.current.click()
      }
    }, [])
    
   
    const handleLogout = () => {
        if(localStorage.getItem('jwtToken')){
            localStorage.removeItem('jwtToken')
        }
        closeRef.current.click()
        navigate('/')
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
                            <h5>Are you sure you want to Log out?</h5>
                            <p>Your will be redirected to the home page after logging out.</p>
                        </div>   
                        <div className="modal_buttons">
                            <button className="btn btn-outline-dark" onClick={() => {
                                  closeRef.current.click()
                            }} >
                                Cancel
                            </button>
                            <button className="btn btn-outline-danger" onClick={handleLogout}  >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
  )
}

export default LogOutModal
