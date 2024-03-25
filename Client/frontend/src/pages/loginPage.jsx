import '../cssfiles/login.css'
import Logo from '../assets/logo.png';
import React, { useEffect, useState } from "react";
import {Link } from "react-router-dom";
import bcrypt from 'bcryptjs'
import {useNavigate} from 'react-router-dom';
export default function LoginPage(){
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const updateUsername = (event) => {
        setUsername(event.target.value)
    };
    const updatePassword = (event) => {
        setPassword(event.target.value)
    };
    const checkValidLogin = async () => {
        if(password==undefined){
            alert("Please enter a password");
            return
        }
        try {
            const response = await fetch(
                `http://localhost:8000/verifyLogin?username=${username}`
            );
            const result = await response.json()
            if(result==""){
                alert("Please enter a valid username");
                return
            }
            const valid = await bcrypt.compare(password, result[0].password)
            if(valid==true){
                sessionStorage.setItem('UserName', username);
                navigate(`/landing`,
                {
                    state: username
                })
            }
            else{
                alert("Invalid Password")
            }
        }
        catch (error){
            console.error(error);
        }
    };
    return(
        <div class = "background h-[10000px]">
            <img src={Logo} alt="Logo-image" className="h-12 w-auto"/>
            <div class = "loginbox">
                <h1 class = "logTitle">
                    Login
                </h1>
                <div class = "prompts">
                    <label class = "field"> Username</label>
                    <input type="text" class="input" onChange ={updateUsername}></input>
                </div>
                <div class = "prompts">
                    <label class = "field"> Password</label>
                    <input type="password" class="input" onChange={updatePassword}></input>
                </div>
                <button class ="Button" onClick={checkValidLogin}>
                    Login
                </button>
                <Link to="/register">
                <button class ="Button" >
                    Need Account?
                </button>
                </Link>
            </div>
        </div>
    )
}