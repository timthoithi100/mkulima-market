import { useEffect, useState } from "react";
import { getProfile } from "../api/auth";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not logged in");
      return;
    }

    getProfile(token)
      .then((res) => setProfile(res.data))
      .catch(() => setError("Failed to load profile"));
  }, []);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>Role:</strong> {profile.role}</p>
    </div>
  );
}

export default Profile;
