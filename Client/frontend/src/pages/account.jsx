import React, {useContext} from "react";
import {UserContext} from "../../context/userContext.jsx";
import {Navigate} from "react-router-dom";

export default function Account(){

    const { logoutUser } = useContext(UserContext);
    const { user } = useContext(UserContext)

    if(!user)
    {
        return <Navigate to={"/"}/>;
    }
    const handleLogout = async () => {
        try {
            console.log("Logging out")
            logoutUser(); // Update user context to reflect logout
            console.log()
        } catch (error) {
            console.error('Error logging out:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div className={"flex h-screen justify-center align-middle items-center"}>
            Account page
            <button className="Button" onClick={handleLogout}>
                Logout
            </button>
        </div>


    )
}