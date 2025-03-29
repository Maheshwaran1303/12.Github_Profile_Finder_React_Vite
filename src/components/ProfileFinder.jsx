import { useState, useEffect } from "react";
import axios from "axios";
import { FaGithub } from "react-icons/fa";

const ProfileFinder = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (username.trim()) {
        fetchGitHubProfile();
      }
    }, 500); // Delay API call by 500ms to prevent excessive requests

    return () => clearTimeout(delaySearch);
  }, [username]);

  const fetchGitHubProfile = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
      setError("");
    } catch (err) {
      setUserData(null);
      setError("User not found! Please enter a valid GitHub username.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 flex items-center justify-center">
          <FaGithub className="mr-2 text-black" /> GitHub Profile Finder
        </h2>

        {/* Search Input (Auto Search on Typing) */}
        <div className="mt-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="w-full p-2 border rounded outline-none"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {/* Profile Details */}
        {userData && (
          <div className="mt-6 text-center">
            <img
              src={userData.avatar_url}
              alt="GitHub Avatar"
              className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500 shadow-lg"
            />
            <h3 className="text-xl font-semibold mt-2">{userData.name || "No Name"}</h3>
            <p className="text-gray-600">@{userData.login}</p>
            <p className="text-gray-700">{userData.bio || "No bio available"}</p>

            <div className="mt-4 flex justify-center space-x-4">
              <p className="bg-gray-200 px-3 py-1 rounded">Followers: {userData.followers}</p>
              <p className="bg-gray-200 px-3 py-1 rounded">Following: {userData.following}</p>
            </div>

            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
            >
              View Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileFinder;
