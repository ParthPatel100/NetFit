import {Link, NavLink} from 'react-router-dom'
import Logo from '../assets/fullLogo.png';
import ProfilePic from "../assets/profilePic.png"
import React, {useContext, useEffect, useState} from "react";
import {Home, Dumbbell, LineChart, Goal, UtensilsCrossed, Flame, GlassWater, BedDouble} from "lucide-react";
import {UserContext} from "../../context/userContext.jsx";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";

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
                to="/goals"
                onClick={onClick}
                className={({isActive}) => {
                    return `${isActive ? "text-purple-500" : "md:text-neutral-800 text-neutral-100"} ${childClassName} flex`;
                }}
            >
                <Goal/>
                <span className={"text-[0.9rem]  hidden md:flex ml-4"}>Goals</span>
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

    const [isFoodHovered, setIsFoodHovered] = useState(false);
    const [isCaloriesHovered, setIsCaloriesHovered] = useState(false);
    const [isWaterHovered, setIsWaterHovered] = useState(false);
    const [isSleepHovered, setIsSleepHovered] = useState(false);


    if(!user){
        return (<></>)
    }
    return (
        <>
            {/*Desktop view*/}
            <div
                className="hidden md:flex">
                <div className="fixed z-20 flex w-full border-b-[1px] border-gray-400 bg-white justify-center items-center">
                    <Link to="/">
                        <img src={Logo} alt="Logo-image" className="h-10 my-2"/>
                    </Link>

                    <div className={"ml-auto h-full flex mr-4 gap-3"}>
                        <div
                            className={`flex flex-row items-center transition-all duration-200 ease-in-out ${isFoodHovered ? 'outline outline-purple-500 rounded-lg pr-2 pl-1' : ''}`}
                            onMouseLeave={() => setIsFoodHovered(false)}
                            onMouseEnter={() => setIsFoodHovered(true)}>
                            <CircularProgress
                                sx={{
                                    '.MuiCircularProgress-progress': {
                                        stroke: '#c135ee',
                                        strokeWidth: 5,

                                    },
                                    '.MuiCircularProgress-track': {
                                        stroke: '#a1a0a0',
                                        strokeWidth: 5
                                    }
                                }}
                                className={"nav-bar-var mainElem"}
                                determinate={true}
                                value={parseInt(20)}>
                                <Typography textColor={"#414040"}><UtensilsCrossed/></Typography>
                            </CircularProgress>

                            <div
                                className={`${isFoodHovered ? 'flex flex-col transition-all ease-in-out text-[10px]' : 'hidden'}`}>
                                <div className={"font-bold"}>
                                    Calories Consumed
                                </div>
                                <div>
                                    600Cal
                                </div>
                            </div>
                        </div>

                        <div
                            className={`flex flex-row items-center transition-all duration-200 ease-in-out ${isCaloriesHovered ? 'outline outline-purple-500 rounded-lg pr-2 pl-1' : ''}`}
                            onMouseLeave={() => setIsCaloriesHovered(false)}
                            onMouseEnter={() => setIsCaloriesHovered(true)}>
                            <CircularProgress
                                sx={{
                                    '.MuiCircularProgress-progress': {
                                        stroke: '#c135ee',
                                        strokeWidth: 5,

                                    },
                                    '.MuiCircularProgress-track': {
                                        stroke: '#a1a0a0',
                                        strokeWidth: 5
                                    }
                                }}
                                className={"nav-bar-var mainElem"}
                                determinate={true}
                                value={parseInt(76)}>
                                <Typography textColor={"#414040"}><Flame/></Typography>
                            </CircularProgress>

                            <div
                                className={`${isCaloriesHovered ? 'flex flex-col transition-all ease-in-out text-[10px]' : 'hidden'}`}>
                                <div className={"font-bold"}>
                                    Calories Burnt
                                </div>
                                <div>
                                    300Cal
                                </div>
                            </div>
                        </div>


                        <div
                            className={`flex flex-row items-center transition-all duration-200 ease-in-out ${isWaterHovered ? 'outline outline-purple-500 rounded-lg pr-2 pl-1' : ''}`}
                            onMouseLeave={() => setIsWaterHovered(false)}
                            onMouseEnter={() => setIsWaterHovered(true)}>
                            <CircularProgress
                                sx={{
                                    '.MuiCircularProgress-progress': {
                                        stroke: '#c135ee',
                                        strokeWidth: 5,

                                    },
                                    '.MuiCircularProgress-track': {
                                        stroke: '#a1a0a0',
                                        strokeWidth: 5
                                    }
                                }}
                                className={"nav-bar-var"}
                                determinate={true}
                                value={parseInt(78)}>
                                <Typography textColor={"#414040"}><GlassWater/></Typography>
                            </CircularProgress>

                            <div
                                className={`${isWaterHovered ? 'flex flex-col transition-all ease-in-out text-[10px]' : 'hidden'}`}>
                                <div className={"font-bold"}>
                                    Water Consumed
                                </div>
                                <div>
                                    1450 mL
                                </div>
                            </div>
                        </div>


                        <div
                            className={`flex flex-row items-center transition-all duration-200 ease-in-out ${isSleepHovered ? 'outline outline-purple-500 rounded-lg pr-2 pl-1' : ''}`}
                            onMouseLeave={() => setIsSleepHovered(false)}
                            onMouseEnter={() => setIsSleepHovered(true)}>
                            <CircularProgress
                                sx={{
                                    '.MuiCircularProgress-progress': {
                                        stroke: '#c135ee',
                                        strokeWidth: 5,

                                    },
                                    '.MuiCircularProgress-track': {
                                        stroke: '#a1a0a0',
                                        strokeWidth: 5
                                    }
                                }}
                                className={"nav-bar-var"}
                                determinate={true}
                                value={parseInt(90)}>
                                <Typography textColor={"#414040"}><BedDouble/></Typography>
                            </CircularProgress>

                            <div
                                className={`${isSleepHovered ? 'flex flex-col transition-all ease-in-out text-[10px]' : 'hidden'}`}>
                                <div className={"font-bold"}>
                                    Sleep
                                </div>
                                <div>
                                    7.5 Hrs
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"fixed z-10 left-0 w-[12rem] bg-neutral-50 h-screen"}>
                    <NavLinks className={"mt-20 hidden md:grid grid-rows-4 gap-8 mx-1 max-w-full"}
                              childClassName={"flex-row justify-start items-center box-content hover:outline hover:outline-purple-500 rounded-2xl p-2 mx-2 py-2 transition-all ease-in-out hover:shadow-2xl hover:scale-110"}/>
                    <div className={"mt-12 font text-gray-500 text-[0.5rem] ml-4"}>
                        TRAINERS YOU FOLLOW
                    </div>
                </div>


            </div>

            {/*Mobile view*/}
            <div className={"bg-gray-800 fixed bottom-0 w-full max-w-full z-10 flex flex-col text-black pt-0.5"}>
                <NavLinks
                    className={"flex md:hidden align-middle items-center justify-around content-center flex-row gap-10 h-16"}
                    childClassName={"flex-row justify-center items-center"}/>
            </div>

        </>


    )
}
