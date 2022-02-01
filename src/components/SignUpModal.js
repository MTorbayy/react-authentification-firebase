import React, {useContext, useRef, useState} from 'react'
import {UserContext} from "../context/userContext"
import {useNavigate} from 'react-router-dom'

export default function SignUpModal() {

    const {modalState, toggleModals, signUp} = useContext(UserContext)

    const navigate = useNavigate()

    const [validation, setValidation] = useState('')

    const inputs = useRef([])
    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)
        }
    }

    const formRef = useRef()


    const handleForm = async (e) => {
        e.preventDefault()

        //Validation côté front :

        if((inputs.current[1].value.length || inputs.current[2].value.length) < 6) {
            setValidation("6 characters min")
            return //Pour sortir de la fonction
        }
        else if (inputs.current[1].value !== inputs.current[2].value) {
            setValidation("Passwords do not match")
            return
        }

        //inscription d'un nouvel utilisateur :

        try {
            const cred = await signUp(
                inputs.current[0].value,
                inputs.current[1].value
            )
            
            //Quand inscription réussie :
            formRef.current.reset()
            setValidation("")

            //cred est un objet avec un nouvel utilisateur :
            //console.log(cred)
            toggleModals("close")
            navigate("/private/private-home")


        } catch (err) {
            //Validation côté serveur : en cas d'erreur (ex deux fois le même user cherche à s'inscrire)

            //console.dir(err)

            if(err.code === "auth/invalid-email") {
                setValidation("Invalid email format ")
            }

            if(err.code === "auth/email-already-in-use") {
                setValidation("Email already used ")
            }
        }
    }

    const closeModal = () => {
        setValidation("")
        toggleModals("close")
    }

  return (
  <>
    {modalState.signUpModal && (
    <div className="position-fixed top-0 vw-100 vh-100">
        <div 
        onClick={closeModal}
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
                            onClick={closeModal}
                            className="btn-close"></button>
                        </div>

                        <div className="modal-body">
                            <form 
                            ref={formRef}
                            onSubmit={handleForm}
                            className="sign-up-form">
                                <div className="mb-3">
                                    <label htmlFor="signUpEmail"
                                    className='form-label'>Email address</label>
                                    <input 
                                    ref={addInputs}
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
                                    ref={addInputs}
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
                                    ref={addInputs}
                                    type="password" 
                                    name="pwd"
                                    required 
                                    id="repeatPwd" 
                                    className="form-control" />
                                    <p className="text-danger mt-1">{validation}</p>
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
