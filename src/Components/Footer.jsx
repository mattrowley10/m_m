import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const nav = useNavigate();
  const location = useLocation();
  const navigateToProfile = () => {
    nav(`/profile`);
  };

  const renderHome = () => {
    if (location.pathname !== "/home") {
      return (
        <li className="footer-item">
          <a onClick={() => nav("/home")}>Home</a>
        </li>
      );
    }
    return null;
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("access_token");
      nav("/");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-div">
        <ul className="footer-list">
          {renderHome()}
          <li className="footer-item">
            <a onClick={() => nav("/meditations")}>Meditations</a>
          </li>
          <li className="footer-item">
            <a onClick={navigateToProfile}>Profile</a>
          </li>
          {/* <li className="footer-item">
            <a onClick={() => nav("/community")}>Community</a>
          </li> */}
          <li className="footer-item">
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
