import Footer from "./Footer";
import PropTypes from "prop-types";

export default function Profile({ profile }) {
  return (
    <div className="profile">
      <h2 className="profile-header">Profile</h2>
      <div className="user-info">
        <ul className="user-info-list">
          <li>
            <h3 className="info">Your Information</h3>
          </li>
          <br></br>
          <li>
            <p className="info">Username: {profile.display_name}</p>
          </li>
          <li>
            <p className="info">Email: {profile.email} </p>
          </li>
          <li>
            <p className="info">Id: {profile.id} </p>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  profile: PropTypes.object,
};
