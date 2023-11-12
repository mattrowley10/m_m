import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function Meditations() {
  const nav = useNavigate();

  return (
    <div className="meditations">
      <h2 className="meditations-header">Meditations</h2>
      <div className="meditations-div">
        return (
        {/* <ul key={meditation.meditation_id} className="meditation-list">
              <a>
                <li>{meditation.title}</li>
                <li>{meditation.description}</li>
                <li>{meditation.duration} </li>
              </a>
              <button
                onClick={() => nav("/single_meditation", { state: meditation })}
              >
                Start
              </button>
            </ul> */}
        );
      </div>
      <Footer />
    </div>
  );
}
