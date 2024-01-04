import Footer from "./Footer";
import { fetchPlaylistTracks } from "../API/script";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";

export default function Meditations() {
  const [meditationTracks, setMeditationTracks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [meditationsPerPage] = useState(10);
  const [clickedPage, setClickedPage] = useState(1);
  const nav = useNavigate();
  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  useEffect(() => {
    async function loadMeditationTracks() {
      const accessToken = localStorage.getItem("access_token");
      try {
        const tracks = await fetchPlaylistTracks(accessToken);
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

  useEffect(() => {
    setClickedPage(currentPage);
  }, [currentPage]);

  const navToPages = (pageNumber) => {
    setCurrentPage(pageNumber);

    nav(`/meditations?page=${pageNumber}`);
  };
  return (
    <div className="meditations" ref={topRef}>
      <h2 className="meditations-header text-4xl">Meditations</h2>
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
                    nav("/single_meditation/:meditationId", {
                      state: trackData.track,
                    })
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
      <div className="page-buttons mb-20 lg:my-10  flex justify-center">
        <nav className="nav-med isolate inline-flex space-x-3 rounded-md shadow-md">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="page-button"
          >
            <MdArrowBackIosNew />
          </button>
          <a
            className={`pr-2 cursor-pointer text-2xl border-r-2   hover:opacity-100 ${
              clickedPage === 1 ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => navToPages(1)}
          >
            1
          </a>
          <a
            className={`pr-2 cursor-pointer text-2xl border-r-2 hover:opacity-100 ${
              clickedPage === 2 ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => navToPages(2)}
          >
            2
          </a>
          <a
            className={`pr-2 cursor-pointer text-2xl border-r-2 hover:opacity-100 ${
              clickedPage === 3 ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => navToPages(3)}
          >
            3
          </a>
          <a
            className={`pr-2 cursor-pointer text-2xl border-r-2 hover:opacity-100 ${
              clickedPage === 4 ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => navToPages(4)}
          >
            4
          </a>
          <a
            className={`pr-2 cursor-pointer text-2xl border-r-2 hover:opacity-100 ${
              clickedPage === 5 ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => navToPages(5)}
          >
            5
          </a>
          <a
            className={`pr-2 cursor-pointer text-2xl border-r-2 hover:opacity-100 ${
              clickedPage === 6 ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => navToPages(6)}
          >
            6
          </a>
          <a
            className={`pr-2 cursor-pointer text-2xl border-r-2 hover:opacity-100 ${
              clickedPage === 7 ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => navToPages(7)}
          >
            7
          </a>
          <a
            className={`cursor-pointer text-2xl hover:opacity-100 ${
              clickedPage === 8 ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => navToPages(8)}
          >
            8
          </a>
          <button
            onClick={nextPage}
            disabled={currentMeditation.length < meditationsPerPage}
            className="page-button"
          >
            <MdArrowForwardIos />
          </button>
        </nav>
      </div>
      <Footer />
    </div>
  );
}
