import {Link, NavLink} from 'react-router-dom'
import Logo from '../assets/fullLogo.png';
import ProfilePic from "../assets/profilePic.png"
import React, {useContext, useEffect, useState} from "react";
import {Home, Dumbbell, LineChart, Goal, UtensilsCrossed, Flame, GlassWater, BedDouble} from "lucide-react";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import axios from "axios";
import {UserContext} from "../../context/userContext.jsx";
import {getTodayWorkout} from "../utils/ProgressData.js";
import {useCountUp} from "use-count-up";
import {GoalAndTrackContext} from "../../context/goalAndTrackContextProvider.jsx";
export const NavLinks = ({ className, childClassName, onClick}) => { 
    const { nav } = useContext(UserContext);
    const [profile,setProfile] =useState();
    const fetchProfile = async () =>{
        try {
            const { data } = await axios.post('/user/getProfile', {}, { withCredentials: true });
        
            if (data.error) {
                console.log(data.error);
            } 
            else {
                console.log(data.profilepic)
                if(data.profilepic==undefined){
                    setProfile(ProfilePic)
                }
                else{
                setProfile(data.profilepic);
                }
            }
        } catch (error) {
            console.error('Error Fetching Profile:', error);
        }
        }
        useEffect(()=> {
            fetchProfile();
        },[nav,profile])
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
                    return `${isActive ? "text-purple-500" : "md:text-neutral-800 text-neutral-100"} ${childClassName} flex`;
                }}
            >
                <div className="flex gap-1 align-middle items-center content-center">
                    <img src={profile} alt={"Profile Pic"} className={`h-6 w-6 }`}/>
                </div>
                <span className={"text-[0.9rem]  hidden md:flex ml-4"}>Me</span>
            </NavLink>

        </div>
    )
}

export default function Navbar() {
    const {caloriesGoals, carbsGoals,fatsGoals,proteinGoals,sugarGoals,
        sleepGoals,waterGoals,caloriesBurnGoals,workoutDurationGoals} = useContext(GoalAndTrackContext)
    const { user } = useContext(UserContext)

    const [isFoodHovered, setIsFoodHovered] = useState(false);
    const [isCaloriesHovered, setIsCaloriesHovered] = useState(false);
    const [isWaterHovered, setIsWaterHovered] = useState(false);
    const [isSleepHovered, setIsSleepHovered] = useState(false);
    const [followingList, setFollowingList] = useState([]);

    const [calGainedProgress, setCalGainedProgress] = useState(0)
    const [calBurntProgress, setCalBurntProgress] = useState(0)
    const [sleepProgress, setSleepProgress] = useState(0)
    const [waterProgress, setWaterProgress] = useState(0)

    const duration=2

    const { value: caloriesGained_value } = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: (()=>{
            if(caloriesGoals > 0){
                return parseFloat(((calGainedProgress / caloriesGoals) * 100).toFixed(1));
            }
            return 0;
        })(),
    });

    const { value: caloriesBurntToday_value } = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: (()=>{
            if(caloriesBurnGoals > 0){
                return parseFloat(((calBurntProgress / caloriesBurnGoals) * 100).toFixed(1));
            }
            return 0;
        })(),
    });

    const { value: sleep_value} = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: (()=>{
            if(sleepGoals > 0){
                return parseFloat(((sleepProgress / sleepGoals) * 100).toFixed(1));
            }
            return 0;
        })(),
    });
    const { value: water_value} = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: (()=>{
            if(waterGoals > 0){
                return parseFloat(((waterProgress / waterGoals) * 100).toFixed(1));
            }
            return 0;
        })(),
    });

    useEffect(() => {
        getTodayWorkout().then((data) => {
            console.log("data recive: ", data)
            setCalGainedProgress(
                () => {
                    if(data.foodData.length > 0){
                        return data.foodData[0].totalCalGained
                    }
                    else{
                        return 0
                    }
                }
            )
            setCalBurntProgress(
                () => {
                    if(data.workoutData.length > 0){
                        return data.workoutData[0].totalCalBurnt
                    }
                    else{
                        return 0
                    }
                })
            setSleepProgress(() => {
                if(data.sleepData.length > 0){
                    return data.sleepData[0].totalDuration
                }
                else{
                    return 0
                }
            })
            setWaterProgress(() => {
                if(data.waterData.length > 0){
                    return data.waterData[0].totalAmount
                }
                else{
                    return 0
                }
            })
        })
    }, [])


    useEffect(() => {
        axios.get('/navbar/getFollowingData').then((data) => {
            console.log("DataL: ", data.data)
            const list = []
            data.data.map((trainer) => {
                const obj ={}
                obj["trainer"]=trainer.username
                if(trainer.profilepic==undefined){
                obj["pic"]=ProfilePic
            }
            else{
            obj["pic"] =trainer.profilepic
            }
                list.push(obj)
            })
            console.log(list)
            setFollowingList(list)
        })
    }, [])


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
                                        stroke: `${caloriesGained_value > 100 ? '#c135ee' : '#a1a0a0'}`,
                                        strokeWidth: 5
                                    }
                                }}
                                className={"nav-bar-var mainElem"}
                                determinate={true}
                                value={caloriesGained_value}>
                                <Typography textColor={"#414040"}><UtensilsCrossed/></Typography>
                            </CircularProgress>

                            <div
                                className={`${isFoodHovered ? 'flex flex-col transition-all ease-in-out text-[10px]' : 'hidden'}`}>
                                <div className={"font-bold"}>
                                    Calories Consumed
                                </div>
                                <div>
                                    {calGainedProgress}Cal
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
                                        stroke: `${caloriesBurntToday_value > 100 ? '#c135ee' : '#a1a0a0'}`,
                                        strokeWidth: 5
                                    }
                                }}
                                className={"nav-bar-var mainElem"}
                                determinate={true}
                                value={caloriesBurntToday_value}>
                                <Typography textColor={"#414040"}><Flame/></Typography>
                            </CircularProgress>

                            <div
                                className={`${isCaloriesHovered ? 'flex flex-col transition-all ease-in-out text-[10px]' : 'hidden'}`}>
                                <div className={"font-bold"}>
                                    Calories Burnt
                                </div>
                                <div>
                                    {calBurntProgress}Cal
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
                                        stroke: `${water_value > 100 ? '#c135ee' : '#a1a0a0'}`,
                                        strokeWidth: 5
                                    }
                                }}
                                className={"nav-bar-var"}
                                determinate={true}
                                value={parseInt(water_value)}>
                                <Typography textColor={"#414040"}><GlassWater/></Typography>
                            </CircularProgress>

                            <div
                                className={`${isWaterHovered ? 'flex flex-col transition-all ease-in-out text-[10px]' : 'hidden'}`}>
                                <div className={"font-bold"}>
                                    Water Consumed
                                </div>
                                <div>
                                    {waterProgress} mL
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
                                        stroke: `${sleep_value > 100 ? '#c135ee' : '#a1a0a0'}`,
                                        strokeWidth: 5
                                    }
                                }}
                                className={"nav-bar-var"}
                                determinate={true}
                                value={parseInt(sleep_value)}>
                                <Typography textColor={"#414040"}><BedDouble/></Typography>
                            </CircularProgress>

                            <div
                                className={`${isSleepHovered ? 'flex flex-col transition-all ease-in-out text-[10px]' : 'hidden'}`}>
                                <div className={"font-bold"}>
                                    Sleep
                                </div>
                                <div>
                                    {sleepProgress} Hrs
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

                    {followingList.length > 0 ?

                        followingList.map((following) => {
                            return (<div key={following}
                                className={"mx-3 flex-row justify-start items-center box-content hover:underline hover:cursor-pointer hover:text-purple-600 rounded-2xl p-2 py-2 transition-all ease-in-out hover:shadow-2xl hover:scale-110"}>
                                <div className="flex gap-1 align-middle items-center content-center">
                                    <img src={following.pic} alt={"Profile Pic"}
                                         className={`h-6 w-6 rounded-full`}/>
                                    <span className={"text-[0.9rem]  hidden md:flex ml-2"}>{following.trainer}</span>

                                </div>
                            </div>)
                        })
                        : <></>}

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
