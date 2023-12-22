import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";
import { fetchMeditationById } from "../API/script";

export default function MeditationDetails() {
  const [token, setToken] = useState("");
  const [finishedMeditations, setFinishedMeditations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meditation, setMeditation] = useState({});
  const { meditationId } = useParams();

  const nav = useNavigate();

  useEffect(() => {
    const storedMeds = JSON.parse(localStorage.getItem("allMeds")) || [];
    setFinishedMeditations(storedMeds);
  }, []);

  useEffect(() => {
    async function getMeditationById() {
      const accessToken = localStorage.getItem("access_token");
      try {
        const fetchedMeditation = await fetchMeditationById(
          meditationId,
          accessToken
        );
        setMeditation(fetchedMeditation);
        setLoading(false);
      } catch (error) {
        console.error("Error getting meditation by ID", error);
        throw error;
      }
    }
    getMeditationById();
  }, [meditationId]);

  function formatDuration(milliseconds) {
    const totalSeconds = Math.round((milliseconds % 60000) / 1000);
    return `${Math.floor(milliseconds / 60000)}:${
      totalSeconds < 10 ? "0" : ""
    }${totalSeconds}`;
  }

  const formattedDuration = formatDuration(meditation.duration_ms);

  useEffect(() => {
    async function getAccessToken() {
      const accessToken = localStorage.getItem("access_token");
      setToken(accessToken);
    }
    getAccessToken();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleFinishMeditation = () => {
    const finishedMed = {
      date: new Date().toLocaleDateString(),
      title: meditation.name,
      id: meditation.id,
    };
    setFinishedMeditations((prevMeds) => [...prevMeds, finishedMed]);

    localStorage.setItem(
      "allMeds",
      JSON.stringify([...finishedMeditations, finishedMed])
    );

    localStorage.setItem("lastMed", JSON.stringify(finishedMed));
    nav("/meditations");
  };

  return (
    <div className="meditation">
      {meditation && (
        <>
          <h2 className="meditation-header text-2xl"> {meditation.name}</h2>
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
        </>
      )}
    </div>
  );
}
