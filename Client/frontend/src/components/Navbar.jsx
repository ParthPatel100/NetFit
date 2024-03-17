import {Link, NavLink} from 'react-router-dom'
import Logo from '../assets/logo.png';
import ProfilePic from "../assets/profilePic.png"

export default function Navbar() {
    return (
        <div className="fixed z-999 top-0 left-0 w-full bg-gray-900 p-2 flex justify-between align-middle items-center">
            <div className="flex">
                <Link to="/">
                    <img src={Logo} alt="Logo-image" className="h-12 w-auto"/>
                </Link>
            </div>

            <div className="flex space-x-4 align-middle items-center content-center">
                <NavLink
                    to="/"
                    className={({ isActive }) => {
                        return isActive ? "text-purple-500"  : "text-neutral-200";
                    }}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/track"
                    className={({ isActive }) => {
                        return isActive ? "text-purple-500"  : "text-neutral-200";
                    }}
                >
                    Track
                </NavLink>
                <NavLink
                    to="/progress"
                    className={({ isActive }) => {
                        return isActive ? "text-purple-500" : "text-neutral-200";
                    }}
                >
                    Progress
                </NavLink>
                <NavLink
                    to="/account"
                    className={({ isActive }) => {
                        return isActive ? "text-purple-500" : "text-neutral-200";
                    }}
                >
                    <div className="ml-8 flex gap-1 align-middle items-center content-center">
                        <img src={ProfilePic} alt={"Profile Pic"} className="h-12 w-auto"/>
                        <span> Morty Smith </span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}