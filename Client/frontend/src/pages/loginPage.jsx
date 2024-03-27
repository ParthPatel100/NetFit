import '../cssfiles/login.css'
import Logo from '../assets/logo.png';
import React, {useContext, useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import bcrypt from 'bcryptjs'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {UserContext} from "../../context/userContext.jsx";

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true;


export default function LoginPage(){
    const { user } = useContext(UserContext)
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const { loginUser } = useContext(UserContext);

    const[data, setData] = useState({
        email: '',
        password: ''
    })
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
        <div class = "background">
            <img src={Logo} alt="Logo-image" className="h-12 w-auto"/>
            <div class="loginbox">
                <h1 class="logTitle">
                    Login
                </h1>
                <div class="prompts">
                    <label class="field"> Username</label>
                    <input type="text" class="input" onChange={updateUsername}></input>
                </div>
                <div class="prompts">
                    <label class="field"> Password</label>
                    <input type="password" class="input" onChange={updatePassword}></input>
                </div>
                <button class="Button" onClick={handleLogin}>
                    Login
                </button>
                <Link to="/register">
                    <button class="Button">
                        Need Account?
                    </button>
                </Link>
            </div>
        </div>
    )
}