import {useLocation } from "react-router-dom";
import {UserContext} from "../../context/userContext.jsx";
import {useContext} from "react";

export default function LandingPage(){
    const { user } = useContext(UserContext)
    console.log(user)
    return(
        <div>
            LandingPage
            <div className={"h-screen w-screen flex justify-center align-middle items-center"} >{user ? `Hello ${user.username}` : 'Loading...'} </div>
        </div>
    )
}