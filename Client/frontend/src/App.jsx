import Navbar from "./components/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import Account from "./pages/account.jsx";
import Progress from "./pages/progress.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Track from "./pages/track.jsx";

export default function App() {
    return (
        <h1 >
            <Navbar/>
            <div className="container mx-auto py-20">
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/track" element={<Track/>}/>
                    <Route path="/progress" element={<Progress/>}/>
                    <Route path="/account" element={<Account/>}/>
                </Routes>
            </div>
        </h1>
    )
}