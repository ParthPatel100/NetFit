import React, {useContext, useEffect,useState} from "react";
import {UserContext} from "../../context/userContext.jsx";
import Popup from 'reactjs-popup';
import {Navigate} from "react-router-dom";
import axios from 'axios'
import ProfilePic from '../assets/profilePic.png'
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true;
export default function Account(){
    const { nav } = useContext(UserContext);
    const { logoutUser } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const { updateNav } = useContext(UserContext);
    const [profile,setProfile] =useState();
    const [password, setPassword] = useState();
    const [email,setEmail] = useState();
    const [username,setName]=useState();
    const [gender,setGender]=useState();
    const [age,setAge]=useState();
    const [experience,setExperience] = useState();
    const [confPassword, setCPassword] = useState();
    const [del,setDelete] = useState();
  
    const handleImageUpload = async (imageDataUrl) => {
    const selectedI = imageDataUrl.target.files[0];
      const reader = new FileReader();
      const formData = new FormData();
      formData.append('image', imageDataUrl.target.files[0]);
      reader.readAsDataURL(selectedI);
      const data = await axios.post('/user/pic', formData)
      
    if (data.error) {
        console.log(data.error);
    } 
    else {
        imageDataUrl.target.files[0]
        fetchProfile();
        updateNav();
    }
}
  
    if(!user)
    {
        return <Navigate to={"/"}/>;
    }
    const handleLogout = async () => {
        try {
            console.log("Logging out")
            logoutUser(); // Update user context to reflect logout
        } catch (error) {
            console.error('Error logging out:', error);
            // Handle error (e.g., show error message to user)
        }
    };
const fetchProfile = async () =>{
try {
    const { data } = await axios.post('/user/getProfile', {}, { withCredentials: true });

    if (data.error) {
        console.log(data.error);
    } 
    else {
        if(data.profilepic==undefined){
            setProfile(ProfilePic)
        }else{
        setProfile(data.profilepic);
        }
        setEmail(data.email);
        setName(data.username);
        setGender(data.gender);
        setExperience(data.experienceLevel)
        setAge(data.age);
    }
} catch (error) {
    console.error('Error Fetching Profile:', error);
}
}
const updateInfo = async () =>{
    try {
        const { data } = await axios.post('/user/update', {
            email: email,
            username: username,
            gender: gender,
            age: age,
            experience: experience,
            
        }, { withCredentials: true });
    
        if (data.error) {
            console.log(data.error);
        } 
        else {
            fetchProfile();
            alert("Profile Updated")
        }
    } catch (error) {
        console.error('Updating information:', error);
    }
    }
const updateEmail = (event) => {
    setEmail(event.target.value)
}
const updateUsername = (event) => {
    setName(event.target.value)
}
const updateGender= (event) => {
    setGender(event.target.value)
}
const updateExperience= (event) => {
    setExperience(event.target.value)
}
const updateAge= (event) => {
    setAge(event.target.value)
}
const updatePassword = (event) => {
    setPassword(event.target.value)
};
const updateCPassword = (event) => {
    setCPassword(event.target.value)
};
const updateDelete = (event) => {
    setDelete(event.target.value)
};
const onButtonClick = () => {
    document.getElementById("imageUpload").click()
  };
const updatePasswordDB = async() =>{
    if(password==undefined||password==""){
        alert("Please enter a password")
    }
    else if(password!=confPassword){
        alert("Passwords must match");
    }
    else{
        const { data } = await axios.post('/user/updateP', 
        {id: password}, { withCredentials: true });
        alert("Password has been updated")
    }
}
const deleteAccount = async() =>{
    if(del=="Delete"){
        
        const { data } = await axios.post('/user/delete', 
        {},{ withCredentials: true });
        handleLogout();
    }
    else{
        alert("Please confirm with delete message");
    }
}
const deleteAccountMob = async() =>{
        const { data } = await axios.post('/user/delete', 
        {},{ withCredentials: true });
        handleLogout();
}
    useEffect(()=> {
        fetchProfile();
    },[])
    return (
        <div className={"z-0 overflow-hidden flex h-screen w-screen"}>
            <div className={"hidden md:flex flex-col absolute top-32 left-1/4 "}>
            <div className={"flex flex-row space-x-32 lg:space-x-56 "}>
            <div className={"flex  flex-col"}>
            <img src={profile} alt="Logo-image" className={"w-48 h-48 rounded-full"}/>
            <button className={"bg-gradient-to-br from-purple-500 to-pink-500 w-40 text-white border-gray-500 rounded-[10px] p-2 mt-4"}
            onClick={onButtonClick}>
                    Change Photo
                </button>
                <input
                    id="imageUpload"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                />
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
                       value={email} onChange={updateEmail}></input>
            </div>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Username</label>
                <input type="text"
                       className={"flex-initial border-b-2 w-72 lg:w-96 bg-neutral-100 border-gray-500 pr-4 p-2 mt-3 focus:outline-none focus:border-purple-500 mr-3"}
                       value={username} onChange={updateUsername}></input>
            </div>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Gender</label>
                <select type="text"
                       className={"flex-initial border-b-2 w-72 lg:w-96 bg-neutral-100 border-gray-500 pr-4 p-2 mt-3 focus:outline-none focus:border-purple-500 mr-3"}
                       value={gender}onChange={updateGender}>
                       <option value ="male">Male</option>
                       <option value ="female">Female</option>
                       <option value ="other">Other</option>
                       </select>
            </div>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Age</label>
                <input type="text"
                       className={"flex-initial border-b-2 w-72 lg:w-96 bg-neutral-100 border-gray-500 pr-4 p-2 mt-3 focus:outline-none focus:border-purple-500 mr-3"}
                       value={age} onChange={updateAge}></input>
            </div>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Experience</label>
                <select type="text"
                       className={"border-b-2 w-72 lg:w-96 bg-neutral-100 border-gray-500 p-2 mt-3 pr-4 focus:outline-none focus:border-purple-500 mr-3"}
                       value={experience}onChange={updateExperience} >
                                <option value ="beginner">Beginner</option>
                                <option value ="intermediate">Intermediate</option>
                                <option value ="advanced">Advanced</option>
                        </select>
            
            </div>
            <button className={"mb-2 justify-center bg-gradient-to-br from-purple-500 to-pink-500 w-11/12 text-white border-gray-500 rounded-[10px] p-2 mt-4 ml-3 mr-3"} 
            onClick ={updateInfo}>
            Apply Changes
        </button>
        <Popup trigger= {<button className={"mb-2 bg-gradient-to-br flex-initial from-purple-500 to-pink-500 w-11/12 text-white border-gray-500 rounded-[10px] p-2 mb-5 mt-2 ml-3 mr-3"}>
            Update Password
        </button>} modal nested position="top center">
        {
                    close=> (
        <div className={"border-gray-200 bg-gray-200 drop-shadow-md border-[1px] flex flex-col items-left rounded-md"}>
                <label className={"w-36 font-bold p-2 mt-3 focus:outline-none focus:border-purple-500 pb-0 focus:ring-1 focus:ring-purple-500"}>
                    Password</label>
                <input type="text"
                       className={"flex-initial border-b-2 ml-2 w-72 lg:w-96 bg-neutral-100 border-gray-500 p-2 mt-0 pr-4 focus:outline-none focus:border-b-purple-500 mr-3"}
                       onChange={updatePassword}></input>  

                <label className={"w-40 font-bold p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 pb-0 focus:ring-purple-500"}>
                    Confirm Password</label>
                <input type="text"
                       className={"flex-initial border-b-2 w-72 ml-2 lg:w-96 bg-neutral-100 border-gray-500 p-2 mt-0 pl-2 focus:outline-none focus:border-b-purple-500 mr-3"}
                       onChange={updateCPassword}></input>  
                <button className={"mb-2 justify-center text-black font-bold border-black bg-white w-11/12 border-[1px] rounded-[10px] p-2 mt-4 ml-3 mr-3"}
                onClick={updatePasswordDB}>
            Update Password
        </button>
        <button className={"mb-2 justify-center text-black font-bold border-black bg-white w-11/12 border-[1px] rounded-[10px] p-2 mt-2 ml-3 mr-3"}
                onClick={()=> {close()}}>
            Close
        </button>
        </div>
                    )
                }
        </Popup>
        </div>
        </div>
        </div>
            <div className={"mt-10 flex flex-row space-x-4"}>
                <label className={"w-56 font-bold pt-4 flex-initial mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Delete Account</label>
                <input type="text"
                       className={"border-[1px] w-96 bg-neutral-100 border-gray-500 p-2 mt-4 rounded-md focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}
                       placeholder={"Type Delete to confirm"}
                       onChange={updateDelete}></input>
                <button className={"bg-gray-100 text-red-400 font-bold flex-initial w-full rounded-md border-gray-500 p-2 mt-4"}
                onClick ={deleteAccount}>
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
            <img src={profile} alt="Logo-image" className={"w-32 h-32 justify-center rounded-full"}/>
            <button className={"bg-gradient-to-br from-purple-500 to-pink-500 w-40 text-white border-gray-500 rounded-[10px] p-2 mt-4 mb-4 "}
            onClick={onButtonClick}>
                    Change Photo
                </button>
                <input
                    id="imageUpload"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                />
            <div className={"border-[1px] flex flex-col items-center border-gray-100 bg-gray-100 rounded-md drop-shadow-md"}>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold p-2 mt-3 h-3/6 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Email</label>
                <input type="text"
                       className={"border-b-2 w-2/3 lg:w-96 bg-neutral-100 border-gray-500 p-2 mt-3 focus:outline-none focus:border-purple-500 mr-3"}
                       value={email} onChange={updateEmail}></input>
            </div>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold h-3/6 p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Username</label>
                <input type="text"
                       className={"border-b-2 w-2/3 lg:w-96 bg-neutral-100 border-gray-500 p-2 mt-3 focus:outline-none focus:border-purple-500 mr-3"}
                       value={username} onChange={updateUsername}></input>
            </div>
            <div className={"flex flex-row w-full"}>
                <label className={"w-32 font-bold h-3/6 p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Gender</label>
                <select type="text"
                       className={"border-b-2 w-2/3 lg:w-96 bg-neutral-100 border-gray-500 p-2 mt-3 focus:outline-none focus:border-purple-500 mr-3"}
                       value={gender} onChange={updateGender}>
                       <option value ="male">Male</option>
                       <option value ="female">Female</option>
                       <option value ="other">Other</option>
                       </select>
            </div>
            <div className={"flex flex-row"}>
                <label className={"w-32 font-bold h-3/6 p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Age</label>
                <input type="text"
                       className={"border-b-2 w-2/3 lg:w-96 bg-neutral-100 border-gray-500 p-2 mt-3 focus:outline-none focus:border-purple-500 mr-3"}
                       value={age} onChange={updateAge}></input>
            </div>
            <div className={"flex flex-row w-full"}>
                <label className={"w-32 font-bold h-3/6 p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}>
                    Experience</label>
                    <select type="text"
                       className={"border-b-2 w-2/3 lg:w-96 bg-neutral-100 border-gray-500 p-2 mt-3 focus:outline-none focus:border-purple-500 mr-3"}
                       value={experience}onChange={updateExperience} >
                                <option value ="beginner">Beginner</option>
                                <option value ="intermediate">Intermediate</option>
                                <option value ="advanced">Advanced</option>
                        </select>
            </div>
            <button className={"mb-2 justify-center h-3/6 bg-gradient-to-br from-purple-500 to-pink-500 w-5/6 text-white border-gray-500 rounded-[10px] p-2 mt-4"}
            onClick ={updateInfo}>
            Apply Changes
        </button>
        <Popup trigger= {<button className={"mb-2 bg-gradient-to-br from-purple-500 to-pink-500 w-5/6 text-white border-gray-500 rounded-[10px] p-2 mt-2"}>
            Update Password
        </button>} modal nested position="top center">
        {
                    close=> (
        <div className={"border-gray-200 bg-gray-200 drop-shadow-md border-[1px] flex flex-col items-left rounded-md"}>
                <label className={"w-36 font-bold p-2 mt-3 focus:outline-none focus:border-purple-500 pb-0 focus:ring-1 focus:ring-purple-500"}>
                    Password</label>
                <input type="text"
                       className={"flex-initial border-b-2 ml-2 w-72 lg:w-96 bg-neutral-100 border-gray-500 p-2 mt-0 pr-4 focus:outline-none focus:border-b-purple-500 mr-3"}
                       onChange={updatePassword}></input>  

                <label className={"w-40 font-bold p-2 mt-3 focus:outline-none focus:border-purple-500 focus:ring-1 pb-0 focus:ring-purple-500"}>
                    Confirm Password</label>
                <input type="text"
                       className={"flex-initial border-b-2 w-72 ml-2 lg:w-96 bg-neutral-100 border-gray-500 p-2 mt-0 pl-2 focus:outline-none focus:border-b-purple-500 mr-3"}
                       onChange={updateCPassword}></input>  
                <button className={"mb-2 justify-center text-black font-bold border-black bg-white w-11/12 border-[1px] rounded-[10px] p-2 mt-4 ml-3 mr-3"}
                onClick={updatePasswordDB}>
            Update Password
        </button>
        <button className={"mb-2 justify-center text-black font-bold border-black bg-white w-11/12 border-[1px] rounded-[10px] p-2 mt-2 ml-3 mr-3"}
                onClick={()=> {close()}}>
            Close
        </button>
        </div>
                    )
                }
        </Popup>
        </div>
        <div className={"flex flex-row space-x-24"}>
        <button className={"mb-2 text-black font-bold border-gray-500 rounded-[10px] ml-auto p-2 mt-4 h-full w-full border-[1px]"} onClick={handleLogout}>
            Logout
        </button>
                <button className={"bg-gray-100 text-red-400 font-bold rounded-[10px] border-gray-500 h-full w-full p-2 mt-4"}
                onClick={deleteAccountMob}>
                    Delete Account
                </button>
            </div>
            </div>  
        </div>
    )
}