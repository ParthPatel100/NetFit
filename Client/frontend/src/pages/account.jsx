import React, {useContext} from "react";
import {UserContext} from "../../context/userContext.jsx";
import {Navigate} from "react-router-dom";
import ProfilePic from "../assets/profilePic.png"
export default function Account(){

    const { logoutUser } = useContext(UserContext);
    const { user } = useContext(UserContext)

    if(!user)
    {
        return <Navigate to={"/"}/>;
    }
    const handleLogout = async () => {
        try {
            console.log("Logging out")
            logoutUser(); // Update user context to reflect logout
            console.log()
        } catch (error) {
            console.error('Error logging out:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div className={"z-0 overflow-hidden flex h-screen w-screen"}>
            <div className={"hidden md:flex flex-col absolute top-32 left-1/4 "}>
            <div className={"flex flex-row space-x-32 lg:space-x-56 "}>
            <div className={"flex  flex-col"}>
            <img src={ProfilePic} alt="Logo-image" className={"w-48 h-48"}/>
            <button className={"bg-gradient-to-br from-purple-500 to-pink-500 w-40 text-white border-gray-500 rounded-[10px] p-2 mt-4"}>
                    Change Photo
                </button>
            </div>
            <div className={" flex flex-col items-center"}>
            <button className={"mb-2 w-5/12 text-black font-bold border-gray-500 rounded-[10px] ml-auto p-2 mt-4 border-[1px]"} onClick={handleLogout}>
            Logout
        </button>
            <div className={"border-gray-100 bg-gray-100 drop-shadow-md border-[1px] flex flex-col items-center rounded-md"}>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Email</label>
                <input type="text"
                       className={"flex-initial border-b-2 w-72 lg:w-96 bg-neutral-100 border-gray-500 p-2 mt-3 pr-4 focus:outline-none focus:border-b-purple-500 mr-3"}
                       value={user.email}></input>
            </div>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Username</label>
                <input type="text"
                       className={"flex-initial border-b-2 w-72 lg:w-96 bg-neutral-100 border-gray-500 pr-4 p-2 mt-3 focus:outline-none focus:border-purple-500 mr-3"}
                       value={user.name}></input>
            </div>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Gender</label>
                <input type="text"
                       className={"flex-initial border-b-2 w-72 lg:w-96 bg-neutral-100 border-gray-500 pr-4 p-2 mt-3 focus:outline-none focus:border-purple-500 mr-3"}
                       value={user.gender}></input>
            </div>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Age</label>
                <input type="text"
                       className={"flex-initial border-b-2 w-72 lg:w-96 bg-neutral-100 border-gray-500 pr-4 p-2 mt-3 focus:outline-none focus:border-purple-500 mr-3"}
                       value={user.age}></input>
            </div>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Experience</label>
                <input type="text"
                       className={"border-b-2 w-72 lg:w-96 bg-neutral-100 border-gray-500 p-2 mt-3 pr-4 focus:outline-none focus:border-purple-500 mr-3"}
                       value={user.level}></input>
            
            </div>
            <button className={"mb-2 justify-center bg-gradient-to-br from-purple-500 to-pink-500 w-11/12 text-white border-gray-500 rounded-[10px] p-2 mt-4 ml-3 mr-3"}>
            Apply Changes
        </button>
        <button className={"mb-2 bg-gradient-to-br flex-initial from-purple-500 to-pink-500 w-11/12 text-white border-gray-500 rounded-[10px] p-2 mb-5 mt-2 ml-3 mr-3"} onClick={handleLogout}>
            Update Password
        </button>
        </div>
        </div>
        </div>
            <div className={"mt-10 flex flex-row space-x-4"}>
                <label className={"w-56 font-bold pt-4 flex-initial mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Delete Account</label>
                <input type="text"
                       className={"border-[1px] w-96 bg-neutral-100 border-gray-500 p-2 mt-4 rounded-md focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}
                       placeholder={"Type Delete to confirm"}></input>
                <button className={"bg-gray-100 text-red-400 font-bold flex-initial w-full rounded-md border-gray-500 p-2 mt-4"}>
                    Delete Account
                </button>
            </div>
            </div>  
            {
                /*
                    Mobile Code starts here
                */
            }
            <div className={"flex md:hidden flex-col items-center justify-center w-screen"}>
            <img src={ProfilePic} alt="Logo-image" className={"w-32 justify-center"}/>
            <button className={"bg-gradient-to-br from-purple-500 to-pink-500 w-40 text-white border-gray-500 rounded-[10px] p-2 mt-4 mb-4 "}>
                    Change Photo
                </button>
            <div className={"border-[1px] flex flex-col items-center border-gray-100 bg-gray-100 rounded-md drop-shadow-md"}>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold p-2 mt-3 h-3/6 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Email</label>
                <input type="text"
                       className={"border-b-2 h-3/6 w-2/3 lg:w-96 bg-neutral-100 border-gray-500  p-2 mt-3 focus:outline-none focus:border-purple-500 mr-3"}
                       value={user.email}></input>
            </div>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold h-3/6 p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Username</label>
                <input type="text"
                       className={"border-b-2 h-3/6 w-2/3 lg:w-96 bg-neutral-100 border-gray-500  p-2 mt-3 focus:outline-none focus:border-purple-500 mr-3"}
                       value={user.name}></input>
            </div>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold h-3/6 p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Gender</label>
                <input type="text"
                       className={"border-b-2 h-3/6 w-2/3 lg:w-96 bg-neutral-100 border-gray-500 p-2 mt-3 focus:outline-none focus:border-purple-500 mr-3"}
                       value={user.gender}></input>
            </div>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold h-3/6 p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Age</label>
                <input type="text"
                       className={"border-b-2 h-3/6 w-2/3 lg:w-96 bg-neutral-100 border-gray-500 p-2 mt-3 focus:outline-none focus:border-purple-500 mr-3"}
                       value={user.age}></input>
            </div>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold h-3/6 p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Experience</label>
                <input type="text"
                       className={"border-b-2 h-3/6 w-2/3 lg:w-96 bg-neutral-100 border-gray-500 p-2 mt-3 focus:outline-none focus:border-purple-500 mr-3"}
                       value={user.level}></input>
            </div>
            <button className={"mb-2 justify-center h-3/6 w-44 bg-gradient-to-br from-purple-500 to-pink-500 w-5/6 text-white border-gray-500 rounded-[10px] p-2 mt-4"}>
            Apply Changes
        </button>
        <button className={"mb-2 bg-gradient-to-br from-purple-500 to-pink-500 w-5/6 text-white border-gray-500 rounded-[10px] p-2 mt-2"}>
            Update Password
        </button>
        </div>
        <div className={"flex flex-row space-x-24"}>
                <button className={"mb-2 text-black font-bold border-gray-500 rounded-[10px] ml-auto p-2 mt-4 h-full w-full border-[1px]"} onClick={handleLogout}>
            Logout
        </button>
                <button className={"bg-gray-100 text-red-400 font-bold rounded-[10px] border-gray-500 h-full w-full p-2 mt-4"}>
                    Delete Account
                </button>
            </div>
            </div>  
        </div>
    )
}