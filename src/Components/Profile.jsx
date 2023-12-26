import Footer from "./Footer";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { fetchProfile } from "../API/script";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const lastMed = JSON.parse(localStorage.getItem("lastMed"));
  const nav = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("access_token");
      try {
        if (accessToken !== null) {
          const profile = await fetchProfile(accessToken);
          setProfile(profile);
        }
      } catch (error) {
        console.error("Error displaying profile information");
      }
    };
    fetchUserData();
  }, []);
  return (
    <div className="profile">
      <h2 className="profile-header text-4xl">Profile</h2>
      <div className="user-info">
        <ul className="user-info-list">
          <li>
            <h3 className="info underline">Your Information</h3>
          </li>
          <br></br>
          <li>
            <p className="info">Username: {profile.display_name}</p>
          </li>
          <li>
            <p className="info">Email: {profile.email} </p>
          </li>
        </ul>
      </div>
      <div className="lastMed">
        {lastMed ? (
          <ul className="lastMedList">
            <li>
              <h3 className="lastMedHeader underline">
                <p>Last Meditation</p>
              </h3>
            </li>
            <li>
              <p>{lastMed.date}</p>
            </li>
            <li>
              <p>{lastMed.title}</p>
            </li>
            <br></br>
            <li>
              <p>Click On the Meditations Tab to Explore New Meditations!</p>
            </li>
            <li>
              <p>
                See All Of Your Completed Meditations{" "}
                <a
                  className="underline cursor-pointer"
                  onClick={() => nav("/allmeditations")}
                >
                  Here
                </a>
              </p>
            </li>
          </ul>
        ) : (
          <p className="lastMedList">
            You Have Not Completed Any Meditations Yet!
            <br></br>
            Click On the Meditations Tab to Explore New Meditations!
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  profile: PropTypes.object,
};
