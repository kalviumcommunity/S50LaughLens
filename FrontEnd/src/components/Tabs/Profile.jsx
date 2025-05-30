import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Logout = () => {
  // Clear cookie and redirect
  document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window.location.href = "/home"; // Consider using useNavigate instead
};

const MyComponent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [entities, setEntities] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const getCookie = (name) => {
    const cookieValue = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(name + "="))
      ?.split("=")[1];
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  };

  const usernameCookie = getCookie("username");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (usernameCookie) {
        try {
          const response = await axios.get(`http://localhost:3001/users?Username=${usernameCookie}`);
          setCurrentUser(response.data);
        } catch (error) {
          console.error("Error fetching currentUser:", error);
        }
      } else {
        setCurrentUser(null); // Explicitly set to null if no cookie
      }
    };

    fetchCurrentUser();
  }, [usernameCookie]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchEntities = async () => {
      if (selectedUser) {
        try {
          const response = await axios.get(`http://localhost:3001/posts?Username=${selectedUser}`);
          setEntities(response.data);
        } catch (error) {
          console.error("Error fetching entities:", error);
        }
      } else {
        setEntities([]);
      }
    };

    fetchEntities();
  }, [selectedUser]);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleLogin = () => {
    navigate("/login"); // Use navigate for routing
  };

  const renderUserDetails = () => {
    return (
      <div className="container mx-auto p-4 bg-gradient-to-r from-blue-950 to-green-800 bg-cover ">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <span className="flex justify-around w-80 mb-4">
          <p className="font-semibold">Username:</p>
          <p>{usernameCookie}</p>
          <button
            onClick={Logout}
            className="border border-red-500 text-red-500 px-2 rounded hover:bg-red-500 hover:text-black"
          >
            Logout
          </button>
        </span>

        {currentUser && (
          <>
            <span className="flex justify-around w-60 mb-4">
              <p className="font-semibold">Name:</p>
              <p>{currentUser.name}</p>
            </span>
            <span className="mb-4 flex justify-around w-60">
              <p className="font-semibold">Email:</p>
              <p>{currentUser.Email}</p>
            </span>
            <span className="mb-4 ">
              <p className="font-semibold">Password:</p>
              <input
                type="password"
                value="supersecret"
                readOnly
                className="px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 bg-gray-900"
              />
            </span>
          </>
        )}

        <hr className="mb-10" />

        <h2 className="text-xl font-semibold mb-2">
          Posts by{" "}
          <select
            id="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
            className="px-4 py-2 mb-4 rounded-md focus:outline-none focus:border-gray-500 bg-gray-900 text-white"
          >
            <option value="">select user</option> {/* Set default value */}
            {users.map((user) => (
              <option
                className="text-orange-800 font-semibold"
                key={user._id}
                value={user.Username}
              >
                {user.Username}
              </option>
            ))}
          </select>
        </h2>

        <div>
          {entities.map((post) => (
            <div key={post._id} className="video-container shadow-sm">
              <h1 className="text-center font-bold text-xl">{post.Caption}</h1>
              <iframe
                title="YouTube Video"
                width="560"
                height="315"
                src={post.File}
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const isLoggedIn = !!usernameCookie; // Fixed variable reference

  return (
    <div>
      {isLoggedIn ? (
        renderUserDetails()
      ) : (
        <>
          <button
            className="border border-green-600 bg-green-600 text-black px-4 py-2 rounded hover:bg-green-500 mx-16"
            onClick={handleLogin}
          >
            Login
          </button>
          <p className="text-blue-400 p-2">Login/SignUP to view user details.</p>
          <button
            className="border border-green-600 bg-green-600 text-black px-4 py-2 rounded hover:bg-green-500 mx-16"
            onClick={handleLogin}
          >
            Register
          </button>
        </>
      )}
    </div>
  );
};

export default MyComponent;
