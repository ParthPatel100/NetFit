import {UserContext} from "./userContext.jsx";
import {useContext} from "react";
import {Navigate,useLocation} from "react-router-dom";

export const RequireAuth = ({children}) => {
    const auth = useContext(UserContext)

    if(!auth.user){
        console.log(useLocation())
        console.log("No user")
        if(useLocation().pathname!='/register')
        return <Navigate to={"/"}/>
    }

    console.log(auth.user)

    return children
}