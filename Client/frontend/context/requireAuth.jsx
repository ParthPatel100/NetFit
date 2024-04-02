import {UserContext} from "./userContext.jsx";
import {useContext} from "react";
import {Navigate} from "react-router-dom";

export const RequireAuth = ({children}) => {
    const auth = useContext(UserContext)

    if(!auth.user){
        console.log("No user")
        return <Navigate to={"/"}/>
    }

    console.log(auth.user)

    return children
}