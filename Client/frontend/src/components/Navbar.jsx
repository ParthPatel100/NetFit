import {Link, NavLink} from 'react-router-dom'
import Logo from '../assets/fullLogo.png';
import ProfilePic from "../assets/profilePic.png"
import {useContext, useEffect, useState} from "react";
import {Menu, X, Home, Dumbbell, LineChart} from "lucide-react";
import {UserContext} from "../../context/userContext.jsx";

const NavLinks = ({ className, childClassName, onClick}) => {
    const [activeImg, setActiveImg] = useState(true)
    return(
        <div className={className}>
            <NavLink
                to="/landing"
                onClick={onClick}
                className={({ isActive }) => {
                    return `${isActive ? "text-purple-500" : "md:text-neutral-800 text-neutral-100"} ${childClassName} flex`;
                }}
            >
                <Home/>
                <span className={"text-[0.9rem] hidden md:flex ml-4"}>Home</span>
            </NavLink>
            <NavLink
                to="/track"
                onClick={onClick}
                className={({isActive}) => {
                    return `${isActive ? "text-purple-500" : "md:text-neutral-800 text-neutral-100"} ${childClassName} flex`;
                }}
            >
                <Dumbbell/>
                <span className={"text-[0.9rem]  hidden md:flex ml-4"}>Track</span>
            </NavLink>
            <NavLink
                to="/progress"
                onClick={onClick}
                className={({isActive}) => {
                    return `${isActive ? "text-purple-500" : "md:text-neutral-800 text-neutral-100"} ${childClassName} flex`;
                }}
            >
                <LineChart/>
                <span className={"text-[0.9rem]  hidden md:flex ml-4"}>Progress</span>
            </NavLink>
            <NavLink
                to="/account"
                onClick={onClick}
                className={({isActive}) => {
                    setActiveImg(isActive)
                    return `${isActive ? "text-purple-500" : "md:text-neutral-800 text-neutral-100"} ${childClassName} flex`;
                }}
            >
                <div className="flex gap-1 align-middle items-center content-center">
                    <img src={ProfilePic} alt={"Profile Pic"} className={`h-6 w-auto ${activeImg ? "outline outline-purple-500 rounded-full" : ""}`}/>
                </div>
                <span className={"text-[0.9rem]  hidden md:flex ml-4"}>Me</span>
            </NavLink>

        </div>
    )
}

export default function Navbar() {
    const { user } = useContext(UserContext)

    if(!user){
        return (<></>)
    }
    return (
        <>
            <div
                className="hidden md:flex">
                <div className="fixed z-20 flex w-full py-2 border-b-[1px] border-gray-400 bg-white">
                    <Link to="/">
                        <img src={Logo} alt="Logo-image" className="h-10"/>
                    </Link>
                </div>

                <div className={"fixed z-10 left-0 w-[12rem] bg-neutral-50 h-screen"}>
                    <NavLinks className={"mt-20 hidden md:grid grid-rows-4 gap-8 mx-1 max-w-full"}
                              childClassName={"flex-row justify-start items-center box-content hover:outline hover:outline-purple-500 rounded-2xl p-2 mx-2 py-2 transition-all ease-in-out duration-200git  hover:shadow-2xl hover:scale-110"}/>
                    <div className={"mt-12 font text-gray-500 text-[0.5rem] ml-4"}>
                        TRAINERS YOU FOLLOW
                    </div>
                </div>


            </div>

            <div className={"bg-gray-800 fixed bottom-0 w-full max-w-full z-10 flex flex-col text-black pt-0.5"}>
                <NavLinks className={"grid md:hidden align-middle items-center content-center grid-cols-4 gap-10 h-16"} childClassName={"flex-row justify-center items-center"}/>
            </div>

        </>


    )
}
