import Navbar from "./components/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import Account from "./pages/account.jsx";
import Progress from "./pages/progress.jsx";
import LandingPage from "./pages/landingPage.jsx";
import Track from "./pages/track.jsx";
import Register from"./pages/register.jsx"
import LoginPage from "./pages/loginPage.jsx";
import axios from 'axios';
import {UserContextProvider} from "../context/userContext.jsx";
import GoalPage from "./pages/goal.jsx";
import {RequireAuth} from "../context/requireAuth.jsx";
import PostPage from "./pages/post.jsx";
import {GoalAndTrackContextProvider} from "../context/goalAndTrackContextProvider.jsx";

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true

export default function App() {
    return (
        <UserContextProvider>
            <Navbar/>
            <GoalAndTrackContextProvider>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/landing" element={<RequireAuth><LandingPage/></RequireAuth>}/>
                    <Route path="/goals" element={<RequireAuth><GoalPage/></RequireAuth>}/>
                    <Route path="/track" element={<RequireAuth><Track/></RequireAuth>}/>
                    <Route path="/progress" element={<RequireAuth><Progress/></RequireAuth>}/>
                    <Route path="/account" element={<RequireAuth><Account/></RequireAuth>}/>
                    <Route path="/register" element={<RequireAuth><Register/></RequireAuth>}/>
                    <Route path="/post" element={<RequireAuth><PostPage/></RequireAuth>}/>
                </Routes>
            </GoalAndTrackContextProvider>
        </UserContextProvider>
    )
}