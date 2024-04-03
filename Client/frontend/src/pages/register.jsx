
import Logo from '../assets/logoLogin.png';
import React, {useContext, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {UserContext} from "../../context/userContext.jsx";
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true;


export default function RegisterPage(){
    const navigate = useNavigate() 
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [confPassword,setConfPassword] = useState();
    const [age,setAge] = useState();
    const [gender,setGender] = useState();
    const [experianceLevel,setExperianceLevel] = useState();
    const [role,setRole] = useState();

    const updateUsername = (event) => {
        setUsername(event.target.value)
    };
    const updatePassword = (event) => {
        setPassword(event.target.value)
    };
    const updateConfirmPassword = (event) =>{
        setConfPassword(event.target.value)
    };
    const updateEmail = (event) => {
        setEmail(event.target.value)
    };
    const updateAge = (event) => {
        setAge(event.target.value)
    };
    const updateGender = (event) => {
        setGender(event.target.value)
    };
    const updateExperianceLevel = (event) => {
        setExperianceLevel(event.target.value)
    }
    const updateRole = (event) => {
        setRole(event.target.value)
    }
    const moveForward = function () {
        document.getElementById('initial').style.display = 'none'
        document.getElementById('second').style.display = 'inline'
    };
    const moveBackwards = function () {
        document.getElementById('initial').style.display = 'inline'
        document.getElementById('second').style.display = 'none'
    };
    //const {username, password,email,experienceLevel,gender,age,user_role}
    const register = async () => {
        if(username==undefined||username==""){
            alert("Please provide a username")
        }
        else if (email==undefined||email==""){
            alert("Please enter an email")
        }
        else if (password==undefined||password==""){
            alert("Please enter a password")
        }
        else if (confPassword!=password){
            alert("Passwords do not match")
        }
        else if (age==undefined||isNaN(Number(age))==true||age==""){
            alert("Please enter a valid age")
        }
        else if (gender==undefined||gender==""){
            alert("Please enter a gender")
        }
        else if (experianceLevel==undefined||experianceLevel==""){
            alert("Please choose an experiance level")
        }
        else if (role==undefined||role==""){
            alert("Please choose a user role")
        }
        else{
            try {
                const { data } = await axios.post('/Register', {
                    username,
                    password,
                    email,
                    experianceLevel,
                    gender,
                    age,
                    role
                }, { withCredentials: true });

                if (data.error) {
                    console.log(data.error);
                } 
                else if(data=="Please choose a unique username"){
                    alert("Username is already taken")
                }
                else if(data=="Please choose a unique email"){
                    alert("Email is already taken")
                }
                else {
                    console.log("User Creation Succeeded");
                    navigate('/') 
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        }
    };
    return(
        <div className={"h-screen w-screen flex justify-center items-center"}>
            <div className={"border-[1px] border-gray-500 w-2/3 md:w-1/3 h-3/5 md:h-96 shadow-2xl"} id ="initial">
                <div className={"flex flex-col justify-center align-middle items-center content-center"} >
                    <img src={Logo} alt="Logo-image" className="w-[10rem]"/>
                    <input type="text"
                           className={"w-10/12 border-[1px] bg-neutral-100 border-gray-500 rounded-[5px] p-2 mt-1.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}
                           onChange={updateEmail} placeholder={"E-Mail Address"}></input>
                    <input type="text"
                           className={"w-10/12 border-[1px] bg-neutral-100 border-gray-500 rounded-[5px] p-2 mt-1.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}
                           onChange={updateUsername} placeholder={"Username"}></input>
                    <input type="password"
                           className={"w-10/12 border-[1px] bg-neutral-100 border-gray-500 rounded-[5px] p-2 mt-1.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}
                               onChange={updatePassword} placeholder={"Password"}></input>
                    <input type="password"
                        className={"btn w-10/12 border-[1px] bg-neutral-100 border-gray-500 rounded-[5px] p-2 mt-1.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}
                               onChange={updateConfirmPassword} placeholder={"Confirm Password"}></input>
                    <button className={"w-10/12 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-gray-500 rounded-[10px] p-2 mt-1.5"} onClick={moveForward}>
                        Next
                    </button>
                    <Link className={"btn w-10/12 text-center bg-gradient-to-br from-purple-500 to-pink-500 text-white border-gray-500 rounded-[10px] p-2 mt-1.5"} to="/">
                        <button className={""}>
                            Back
                        </button>
                    </Link>
                </div>
            </div>
            <div className={"border-[1px] border-gray-500 w-2/3 md:w-1/3 h-3/5 md:h-96 shadow-2xl hidden"} id ="second">
                <div className={"flex flex-col justify-center align-middle items-center content-center"}>
                    <img src={Logo} alt="Logo-image" className="w-[10rem]"/>
                    <input type="text"
                           className={"w-10/12 border-[1px]  bg-neutral-100 border-gray-500 rounded-[5px] p-2 mt-1.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}
                           onChange={updateAge} placeholder={"Age"}></input>
                    <select
                           className={"w-10/12 border-[1px] bg-neutral-100 border-gray-500 rounded-[5px] p-2 mt-1.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}
                           onChange={updateGender} placeholder={"Gender"}>
                                <option value="" disabled selected hidden>Please Choose a Gender</option>
                                <option value ="male">Male</option>
                                <option value ="female">Female</option>
                                <option value ="other">Other</option>
                           </select>
                    <select
                        className={"w-10/12 border-[1px] bg-neutral-100 border-gray-500 rounded-[5px] p-2 mt-1.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}
                               onChange={updateExperianceLevel} placeholder={"Experiance Level"}>
                                <option value="" disabled selected hidden>Please Choose a Experiance Level</option>
                                <option value ="beginner">Beginner</option>
                                <option value ="intermediate">Intermediate</option>
                                <option value ="advanced">Advanced</option>
                               </select>
                    <select
                        className={"w-10/12 border-[1px] bg-neutral-100 border-gray-500 rounded-[5px] p-2 mt-1.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}
                               onChange={updateRole}>
                                <option value="" disabled selected hidden>Please Choose a Role</option>
                                <option value ="user">User</option>
                                <option value ="trainer">Trainer</option>
                               </select>
                    <button className={"btn w-10/12 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-gray-500 rounded-[10px] p-2 mt-1.5"} 
                    onClick={register}>
                        Finish
                    </button>
                    <button className={"btn text-center w-10/12 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-gray-500 rounded-[10px] p-2 mt-1.5"}
                    onClick={moveBackwards}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}