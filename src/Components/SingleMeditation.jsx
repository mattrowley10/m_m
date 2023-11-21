import { useLocation } from "react-router-dom";

export default function SingleMeditation() {
  const location = useLocation();
  const meditation = location.state;

  return (
    <div className="meditation">
      <h2 className="meditation-header">{meditation.name}</h2>
      <ul className="med-list">
        <li>{meditation.duration_ms}</li>
        <li>{meditation.artist.name}</li>
        <li></li>
      </ul>
    </div>
  );
}
