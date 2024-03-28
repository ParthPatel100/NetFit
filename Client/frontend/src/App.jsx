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

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true

export default function App() {
    return (
        <UserContextProvider>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/landing" element={<LandingPage/>}/>
                    <Route path="/track" element={<Track/>}/>
                    <Route path="/progress" element={<Progress/>}/>
                    <Route path="/account" element={<Account/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
        </UserContextProvider>
    )
}