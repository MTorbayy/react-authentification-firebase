import React, {useContext} from 'react'
import {UserContext} from "../context/userContext"

export default function SignUpModals() {

    const {modalState, toggleModals} = useContext(UserContext)

  return (
  <>
    {modalState.signUpModal && (
    <div className="position-fixed top-0 vw-100 vh-100">
        <div 
        onClick={() => toggleModals("close")}
        className="w-100 h-100 bg-dark bg-opacity-75">
        </div>

            <div className="position-absolute top-50 start-50 translate-middle"
            style={{minWidth: "400px"}}
            >
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Sign Up</h5>
                            <button 
                            onClick={() => toggleModals("close")}
                            className="btn-close"></button>
                        </div>

                        <div className="modal-body">
                            <form className="sign-up-form">
                                <div className="mb-3">
                                    <label htmlFor="signUpEmail"
                                    className='form-label'>Email address</label>
                                    <input 
                                    type="email" 
                                    name="email"
                                    required 
                                    id="signUpEmail" 
                                    className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="signUpPwd"
                                    className='form-label'>Password</label>
                                    <input 
                                    type="password" 
                                    name="pwd"
                                    required 
                                    id="signUpPwd" 
                                    className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="repeatPwd"
                                    className='form-label'>Confirm password</label>
                                    <input 
                                    type="password" 
                                    name="pwd"
                                    required 
                                    id="repeatPwd" 
                                    className="form-control" />
                                    <p className="text-danger mt-1"></p>
                                </div>

                                <button className="btn btn-primary">Submit</button>
                            </form>
                        </div> 
                        
                    </div>

                </div>
            </div>
    </div>
        ) }
  </>
  )
}
