import '../cssfiles/register.css'
import Logo from '../assets/fullLogo.png';
import React, { useEffect, useState } from "react";
export default function Register(){
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [passwordConf, setPasswordConf] = useState();
    return(
            <div class = "background">
                <img src={Logo} alt="Logo-image" className="h-12 w-auto"/>
                <div class = "registerbox">
                    <h1 class = "regTitle">
                        Sign Up
                    </h1>
                    <div class = "prompts">
                        <label class = "field"> E-mail Address</label>
                        <input type="text" class="input" ></input>
                    </div>
                    <div class = "prompts">
                        <label class = "field"> Username</label>
                        <input type="text" class="input" ></input>
                    </div>
                    <div class = "prompts">
                    <label class = "field"> Password</label>
                        <input type="text" class="input" ></input>
                    </div>
                    <div class = "prompts">
                    <label class = "field"> Confirm Password</label>
                        <input type="text" class="input" ></input>
                    </div>
                    <button class ="Button" >
                        Next
                    </button>
                </div>
            </div>
    )
} 