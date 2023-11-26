import Footer from "./Footer";
import { fetchPlaylistTracks } from "../API/script";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Meditations() {
  const [meditationTracks, setMeditationTracks] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    async function loadMeditationTracks() {
      try {
        const tracks = await fetchPlaylistTracks();
        setMeditationTracks(tracks.items);
      } catch (error) {
        console.error("Error Fetching Meditation Tracks", error);
      }
    }
    loadMeditationTracks();
  }, []);

  function formatDuration(minutes) {
    const totalSeconds = Math.round((minutes % 1) * 60);
    return `${Math.floor(minutes)}:${
      totalSeconds < 10 ? "0" : ""
    }${totalSeconds}`;
  }

  return (
    <div className="meditations">
      <h2 className="meditations-header">Meditations</h2>
      <div className="meditations-div-1">
        <div className="meditations-div-2">
          {meditationTracks.map((trackData, index) => {
            const { artists, name, duration_ms } = trackData.track;
            const durationInMinutes = duration_ms / 60000;
            const formattedDuration = formatDuration(durationInMinutes);
            return (
              <div key={index}>
                <ul
                  className="meditation-list"
                  onClick={() =>
                    nav("/single_meditation", { state: trackData.track })
                  }
                >
                  <li>{name}</li>
                  <li>{formattedDuration}</li>

                  {artists.map((artist, artistIndex) => (
                    <li key={artistIndex}>{artist.name}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
