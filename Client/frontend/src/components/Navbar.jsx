import {Link, NavLink} from 'react-router-dom'
import Logo from '../assets/logo.png';
import ProfilePic from "../assets/profilePic.png"
import {useEffect, useState} from "react";
import {Menu, X, Home, Dumbbell, LineChart} from "lucide-react";

const NavLinks = ({ className, childClass, onClick}) => {
    return(
        <div className={className}>
            <NavLink
                to="/"
                onClick={onClick}
                className={({ isActive }) => {
                    return `${isActive ? "text-purple-500" : "text-neutral-200"} ${childClass} flex flex-col justify-center content-center items-center`;
                }}
            >
                <Home/>
                <span className={"text-[0.9rem] hidden md:flex"}>Home</span>
            </NavLink>
            <NavLink
                to="/track"
                onClick={onClick}
                className={({isActive}) => {
                    return `${isActive ? "text-purple-500" : "text-neutral-200"} ${childClass} flex flex-col justify-center content-center items-center`;
                }}
            >
                <Dumbbell/>
                <span className={"text-[0.9rem]  hidden md:flex"}>Track</span>
            </NavLink>
            <NavLink
                to="/progress"
                onClick={onClick}
                className={({isActive}) => {
                    return `${isActive ? "text-purple-500" : "text-neutral-200"} ${childClass} flex flex-col justify-center content-center items-center`;
                }}
            >
                <LineChart/>
                <span className={"text-[0.9rem]  hidden md:flex"}>Progress</span>
            </NavLink>
            <NavLink
                to="/account"
                onClick={onClick}
                className={({isActive}) => {
                    return `${isActive ? "text-purple-500 border-purple-500 border-2 rounded-full" : "text-neutral-200"} ${childClass} flex flex-col justify-center content-center items-center self-end `;
                }}
            >
                <div className="flex gap-1 align-middle items-center content-center">
                    <img src={ProfilePic} alt={"Profile Pic"} className="h-8 w-auto"/>
                </div>
                <span className={"text-[0.9rem]  hidden md:flex"}>Me</span>
            </NavLink>

        </div>
    )
}

export default function Navbar() {

    return (
        <>
            <div
                className="hidden md:flex fixed z-50 top-0 left-0 w-full bg-gray-900 p-2 justify-between align-middle items-center">
                <div className="flex">
                    <Link to="/">
                        <img src={Logo} alt="Logo-image" className="h-12 w-auto"/>
                    </Link>
                </div>

                <NavLinks className={"hidden md:grid align-middle items-center content-center grid-cols-4 gap-10"}/>

            </div>

            <div className={"bg-gray-800 fixed bottom-0 w-full max-w-full z-10 flex flex-col text-black pt-0.5"}>
                <NavLinks className={"grid md:hidden align-middle items-center content-center grid-cols-4 gap-10 h-16"} childClass={"text-[0.9rem]"}/>
            </div>

        </>


    )
}
