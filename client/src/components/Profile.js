import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';

import { Link } from "react-router-dom";

<div className="mt-4">
  <Link to="/matches" className="text-purple-600 underline">
    View Potential Matches
  </Link>
</div>

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data);
      } catch (error) {
        console.error(error);
        alert('Failed to load profile');
      }
    };

    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/users/matches', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(data);
      } catch (error) {
        console.error(error);
        alert('Failed to load matches');
      }
    };

    fetchProfile();
    fetchMatches();
  }, []);

  if (!profile) {
    return (
      <div className="loading-page">
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container shadow">
        <h2 className="form-title text-center">Your Profile</h2>
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Skills Offered:</strong> {profile.skillsOffered.join(', ')}
          </p>
          <p>
            <strong>Skills Wanted:</strong> {profile.skillsWanted.join(', ')}
          </p>
        </div>
      </div>

      <div className="matches-container shadow">
        <h3 className="matches-title">Potential Matches</h3>
        {matches.length > 0 ? (
          matches.map((match) => (
            <div key={match._id} className="match-card">
              <p>
                <strong>Name:</strong> {match.name}
              </p>
              <p>
                <strong>Email:</strong> {match.email}
              </p>
              <p>
                <strong>Skills Offered:</strong> {match.skillsOffered.join(', ')}
              </p>
            </div>
          ))
        ) : (
          <p>No matches found yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
