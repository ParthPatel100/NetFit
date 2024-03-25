import {Link, NavLink} from 'react-router-dom'
import Logo from '../assets/logo.png';
import ProfilePic from "../assets/profilePic.png"
import {useEffect, useState} from "react";
import {Menu, X} from "lucide-react";

const NavLinks = ({ className, childClass, onClick}) => {
    return(
        <div className={className}>
            <NavLink
                to="/"
                onClick={onClick}
                className={({ isActive }) => {
                    return `${isActive ? "text-purple-500" : "text-neutral-200"} ${childClass}`;
                }}
            >
                Home
            </NavLink>
            <NavLink
                to="/track"
                onClick={onClick}
                className={({ isActive }) => {
                    return `${isActive ? "text-purple-500" : "text-neutral-200"} ${childClass}`;
                }}
            >
                Track
            </NavLink>
            <NavLink
                to="/progress"
                onClick={onClick}
                className={({ isActive }) => {
                    return `${isActive ? "text-purple-500" : "text-neutral-200"} ${childClass}`;
                }}
            >
                Progress
            </NavLink>
            <NavLink
                to="/account"
                onClick={onClick}
                className={({ isActive }) => {
                    return `${isActive ? "text-purple-500" : "text-neutral-200"} ${childClass}`;
                }}
            >
                <div className="flex gap-1 align-middle items-center content-center">
                    <img src={ProfilePic} alt={"Profile Pic"} className="h-12 w-auto"/>
                    <span> Morty Smith </span>
                </div>
            </NavLink>

        </div>
    )
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavBar = () => {
        setIsOpen(!isOpen)
    }

    // const [animation, setAnimation] = useState(false);
    // useEffect(() => {
    //     setAnimation(true)
    // }, []);

    return (
        <>
            <div
                className="fixed z-50 top-0 left-0 w-full bg-gray-900 p-2 flex justify-between align-middle items-center">
                <div className="flex">
                    <Link to="/">
                        <img src={Logo} alt="Logo-image" className="h-12 w-auto"/>
                    </Link>
                </div>

                <div className="hidden md:flex space-x-4 align-middle items-center content-center">
                    <NavLinks/>
                </div>
                <div className={"md:hidden"}>
                    <button onClick={toggleNavBar} className={"text-purple-500"}>{isOpen ? null : <Menu/>}</button>
                </div>
            </div>
            {isOpen && (
                <>
                    <div
                        className={"fixed z-50 w-full h-screen top-0 right-0 backdrop-blur-sm bg-gray-900 bg-opacity-65"}
                    onClick={toggleNavBar}>
                    </div>
                    <div className={"fixed z-[51] top-0 h-full right-0 bg-gray-900 p-5 w-1/2 flex flex-col items-end"}>
                        <div className={"flex"}>
                            <button onClick={toggleNavBar}
                                    className={"text-purple-500"}>{isOpen ? <X/> :
                                null}</button>
                        </div>
                        <NavLinks className={"flex flex-col justify-center content-center items-center"} childClass={"py-2"} onClick={toggleNavBar}/>

                    </div>

                </>


            )}
        </>


    )
}
