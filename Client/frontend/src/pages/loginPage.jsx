import Logo from '../assets/logoLogin.png';
import React, {useContext, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {UserContext} from "../../context/userContext.jsx";

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true;


export default function LoginPage(){
    const { user } = useContext(UserContext)
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const { loginUser } = useContext(UserContext);

    const updateUsername = (event) => {
        setUsername(event.target.value)
    };
    const updatePassword = (event) => {
        setPassword(event.target.value)
    };

    if(user){
        return <Navigate to={"/landing"}/>;
    }

    const handleLogin = async () => {
        try {
            await loginUser(username, password);
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return(
        <div className={"h-screen w-screen flex justify-center items-center"}>
            <div className={"border-[1px] border-gray-500 px-8 py-4 shadow-2xl"}>
                <div className={"flex flex-col justify-center align-middle items-center content-center"}>
                    <img src={Logo} alt="Logo-image" className="w-[10rem]"/>
                    <input type="text"
                           className={"w-full border-[1px] bg-neutral-100 border-gray-500 rounded-[5px] p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}
                           onChange={updateUsername} placeholder={"Username"}></input>
                    <input type="password"
                           className={"w-full border-[1px] bg-neutral-100 border-gray-500 rounded-[5px] p-2 mt-1.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}
                               onChange={updatePassword} placeholder={"Password"}></input>
                    <button className={"bg-gradient-to-br from-purple-500 to-pink-500 w-full text-white border-gray-500 rounded-[10px] p-2 mt-4"} onClick={handleLogin}>
                        Login
                    </button>

                    <Link to="/register">
                        <div className={"mt-8 flex flex-row items-center"}>
                            <span>Don't have an account?</span>
                            <button className={"ml-1 text-purple-500"}>
                                Sign up
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}