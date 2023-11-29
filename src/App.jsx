import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LaunchPage from "./Components/LaunchPage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Meditations from "./Components/Meditations";
import Profile from "./Components/Profile";
import Community from "./Components/Community";
import SingleMeditation from "./Components/SingleMeditation";
import { useEffect, useState } from "react";
import { fetchProfile } from "./API/script";

function App() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      let accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        const profile = await fetchProfile();
        setProfile(profile);
      }
    };
    fetchUserData();
  }, []);
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LaunchPage />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home profile={profile} />} />
        <Route path="/meditations" element={<Meditations />} />
        <Route path="/single_meditation" element={<SingleMeditation />} />
        <Route path="/profile" element={<Profile profile={profile} />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;
