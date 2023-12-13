import Footer from "./Footer";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Home() {
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

  console.log(token);
  return (
    <div className="home">
      <div className="home-h">
        <h2 className="home-header text-3xl">Mystic Meditation</h2>
      </div>
      <div className="welcome-home">
        <div>Welcome to this Moment</div>
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
      <Footer />
    </div>
  );
}

Home.propTypes = {
  profile: PropTypes.object,
};
