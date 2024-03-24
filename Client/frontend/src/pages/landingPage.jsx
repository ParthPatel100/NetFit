import {useLocation } from "react-router-dom";
export default function LandingPage(){
    const { state } = useLocation();
    console.log(state)
    return(
        <div>
            LandingPage
        </div>
    )
}