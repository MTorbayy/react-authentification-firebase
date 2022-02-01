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


    const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd)
    const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd)

    const [currentUser, setCurrentUser] = useState()
    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser)
            setLoadingData(false)
        })
        //Cette fonction joue le rôle d'un observateur
        //currentUser est retourné par la fonction, et peut être utilisé dans une callback. Il correspond à l'utilisateur connecté.

        //loadingData permet d'attendre que la fonction useEffect ait tourné avant de déclencher le context Provider et d'envoyer les state vers les autres composants

        return unsubscribe
        //Joue ici le rôle de cleanup function (déconnecte l'utilisateur currentUser). C'est une méthode retournée par la fonction onAuthStateChanged


    }, [])

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
        <UserContext.Provider value={{modalState, toggleModals, signUp, currentUser, signIn}}>
            {!loadingData && props.children}
        </UserContext.Provider>
    )
}