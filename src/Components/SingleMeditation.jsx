import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";

export default function SingleMeditation() {
  const location = useLocation();
  const meditation = location.state;
  const [token, setToken] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    async function getAccessToken() {
      const accessToken = localStorage.getItem("access_token");
      setToken(accessToken);
    }
    getAccessToken();
  }, []);

  function formatDuration(milliseconds) {
    const totalSeconds = Math.round((milliseconds % 60000) / 1000);
    return `${Math.floor(milliseconds / 60000)}:${
      totalSeconds < 10 ? "0" : ""
    }${totalSeconds}`;
  }

  const formattedDuration = formatDuration(meditation.duration_ms);

  const handleFinishMeditation = () => {
    const finishedMed = {
      date: new Date().toLocaleDateString(),
      title: meditation.name,
      duration: formattedDuration,
    };
    localStorage.setItem("lastMed", JSON.stringify(finishedMed));
    nav("/meditations");
  };
  return (
    <div className="meditation">
      <h2 className="meditation-header">{meditation.name}</h2>
      <ul className="med-list">
        <li className="med-item">{formattedDuration}</li>
        <br></br>
        {meditation.artists.map((artist, index) => (
          <li key={index} className="med-item">
            {artist.name}
          </li>
        ))}
        <br></br>
        <div className="spotify-player">
          <SpotifyWebPlayer
            className="spotify-player"
            token={token}
            uris={[meditation.uri]}
            styles={{
              bgColor: "#EEF4F4",
              color: "#385F71",
            }}
          ></SpotifyWebPlayer>
        </div>
        <button onClick={handleFinishMeditation} className="finish-button">
          Finish Meditation
        </button>
      </ul>
    </div>
  );
}
