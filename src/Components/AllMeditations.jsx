import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function AllMeditations() {
  const allMeds = JSON.parse(localStorage.getItem("allMeds"));
  console.log(allMeds);
  const nav = useNavigate();

  const handleNavigation = (meditationId) => {
    nav(`/meditation_details/${meditationId}`);
  };
  return (
    <div className="all-meditations">
      <h2 className="text-3xl text-center mt-4">All Meditations</h2>
      <div className="allMeds flex flex-col items-center justify-center relative mt-8">
        {allMeds.map((meds, index) => {
          return (
            <ul
              className="meds flex flex-col items-center mb-10 hover:opacity-100 cursor-pointer"
              onClick={() => handleNavigation(meds.id)}
              key={index}
            >
              <li>{meds.title}</li>
              <li>{meds.date}</li>
            </ul>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
