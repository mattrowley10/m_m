import Footer from "./Footer";
import { fetchPlaylistTracks } from "../API/script";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
export default function Meditations() {
  const [meditationTracks, setMeditationTracks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [meditationsPerPage] = useState(10);
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

  const indexOfLastMed = currentPage * meditationsPerPage;
  const indexOfFirstMed = indexOfLastMed - meditationsPerPage;
  const currentMeditation = meditationTracks.slice(
    indexOfFirstMed,
    indexOfLastMed
  );

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="meditations">
      <h2 className="meditations-header">Meditations</h2>
      <div className="meditations-div-1">
        <div className="meditations-div-2">
          {currentMeditation.map((trackData, index) => {
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
      <div className="page-buttons">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="page-button"
        >
          <MdArrowBackIosNew />
        </button>
        <button
          onClick={nextPage}
          disabled={currentMeditation.length < meditationsPerPage}
          className="page-button"
        >
          <MdArrowForwardIos />
        </button>
      </div>
      <Footer />
    </div>
  );
}
