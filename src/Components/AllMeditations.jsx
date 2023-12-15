import Footer from "./Footer";

export default function AllMeditations() {
  const allMeds = JSON.parse(localStorage.getItem("allMeds"));

  return (
    <div className="all-meditations">
      <h2 className="text-3xl text-center mt-4">All Meditations</h2>
      <div className="allMeds flex flex-col items-center justify-center relative mt-8">
        {allMeds.map((meds, index) => {
          return (
            <ul
              className="meds flex flex-col items-center mb-10 hover:opacity-100"
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
