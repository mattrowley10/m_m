import Footer from "./Footer";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Home({ profile }) {
  const [token, setToken] = useState("");

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

  const lastMed = JSON.parse(localStorage.getItem("lastMed"));

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
      <div className="lastMed">
        {lastMed ? (
          <ul className="lastMedList">
            <li>
              <h3 className="lastMedHeader">
                <strong>Last Meditation</strong>
              </h3>
            </li>
            <li>
              <p>{lastMed.date}</p>
            </li>
            <li>
              <p>{lastMed.title}</p>
            </li>
            <li>
              <p>{lastMed.duration}</p>
            </li>
          </ul>
        ) : (
          <p className="lastMedList">
            You Have Not Completed Any Meditations Yet!
          </p>
        )}
      </div>
      <Footer profile={profile} />
    </div>
  );
}

Home.propTypes = {
  profile: PropTypes.object,
};
