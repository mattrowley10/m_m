import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function Footer({ profile }) {
  const nav = useNavigate();
  const location = useLocation();
  const navigateToProfile = () => {
    nav(`/profile`, { state: profile });
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
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  profile: PropTypes.object,
};
