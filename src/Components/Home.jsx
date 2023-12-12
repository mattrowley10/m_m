import Footer from "./Footer";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchProfile } from "../API/script";
export default function Home() {
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchToken() {
      try {
        let accessToken = localStorage.getItem("access_token");
        setToken(accessToken);
      } catch (error) {
        console.error("Error Fetching Token", error);
      }
    }
    fetchToken();
  }, []);

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
    <div className="home">
      <div className="home-h">
        <h2 className="home-header">Mystic Meditation</h2>
      </div>
      <div className="welcome-home">
        {token ? (
          <div>Welcome, {profile.display_name}</div>
        ) : (
          <div>Welcome!</div>
        )}
      </div>
      <div className="home-desc">
        <p className="home-description">
          Meditation -- an ancient practice developed by our ancestors and their
          ancestors before them which teaches us how to stay present and mindful
          in our day to day.
          <br></br>
          In our society today, there are distractions galore, keeping us from
          focusing on what is going on in the moment. The practice of meditation
          can help us to calm some of those distractions, enhancing focus while
          relieving stress and anxiety.
          <br></br>
          This is an app for those beginning their meditation journey. Through
          the guided meditations here, you can begin to see some of the benefits
          of meditation in your waking and sleeping hours. Challenge yourself,
          embrace a new reality and delve into the world of meditation which
          awaits you here.
        </p>
      </div>
      <Footer profile={profile} />
    </div>
  );
}

Home.propTypes = {
  profile: PropTypes.object,
};
