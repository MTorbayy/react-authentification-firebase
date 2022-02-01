import { createContext, useState, useEffect } from "react"
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth"
import {auth} from "../firebase-config"

//onAuthStateChanged permet de surveiller l'état user et donc de savoir par ex qui est connecté pour afficher ce dont il y a besoin

export const UserContext = createContext()

export function UserContextProvider(props) {

    const [currentUser, setCurrentUser] = useState()
    const [loadingData, setLoadingData] = useState(true)

    const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd)


    //Modal :

    const [modalState, setModalState] = useState({
        signUpModal: false,
        signInModal: false
    })

    const toggleModals = modal => {
        if(modal === "signIn") {
            setModalState({
                signUpModal: false,
                signInModal: true
            })
        }
        if(modal === "signUp") {
            setModalState({
                signUpModal: true,
                signInModal: false
            })
        }
        if(modal === "close") {
            setModalState({
                signUpModal: false,
                signInModal: false
            })
        }
    }


    return (
        <UserContext.Provider value={{modalState, toggleModals, signUp}}>
            {props.children}
        </UserContext.Provider>
    )
}