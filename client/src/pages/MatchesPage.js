import React, { useEffect, useState } from "react";
import axios from "axios";

const MatchesPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const response = await axios.get("/api/users/matches", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setMatches(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch matches");
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p>Loading matches...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-purple-600">Your Matches</h2>
        {matches.length > 0 ? (
          <ul>
            {matches.map((match) => (
              <li
                key={match._id}
                className="p-3 mb-2 bg-gray-100 rounded shadow-sm"
              >
                <strong>{match.name}</strong>
                <p>Email: {match.email}</p>
                <p>
                  Skills Offered: {match.skillsOffered.join(", ")} | Skills
                  Wanted: {match.skillsWanted.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No matches found yet. Try updating your skills!</p>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
