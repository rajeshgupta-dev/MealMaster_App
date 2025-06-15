import React, { useState } from "react";
import { UseAuth } from "../firebase/AuthContext";
import Logout from "../firebase/Logout";
import "../styles/userProfile.css";

const UserProfile = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { user, userData } = UseAuth();

  return (
    <>
      {user && (
        <div className="user-profile-toggel">
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="user-profile-btn"
          >
            👤 {user.displayName || "Guest"}
          </div>

          {showProfile && (
            <div className="user-profile-container">
              <div className="profile-header">
                <span>User Info</span>
              </div>

              <div className="profile-details">
                <p>
                  <strong>Name:</strong> {user.displayName || "Not set"}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Age:</strong> {userData?.age || "-"}
                </p>
                <p>
                  <strong>Height:</strong> {userData?.height} cm
                </p>
                <p>
                  <strong>Weight:</strong> {userData?.weight} kg
                </p>
                <p>
                  <strong>Gender:</strong> {userData?.gender}
                </p>
                <p>
                  <strong>Diet:</strong> {userData?.diet}
                </p>
                <p>
                  <strong>Goal:</strong> {userData?.goal}
                </p>
                <p>
                  <strong>Condition:</strong> {userData?.condition}
                </p>
                <p>
                  <strong>Activity:</strong> {userData?.activity}
                </p>
              </div>

              <div className="logout-sec">
                <Logout />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
