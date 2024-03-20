import React, { useState, useEffect } from "react";
import axios from "axios";

const Logout = () => {
  document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window.location.href = "/home";
};

const MyComponent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [entities, setEntities] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

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
      try {
        const response = await axios.get(
          `http://localhost:3001/users?Username=${usernameCookie}`
        );
        setCurrentUser(response.data[0]); // Since it's expected to return a single user
      } catch (error) {
        console.error("Error fetching currentUser:", error);
      }
    };

    if (usernameCookie) {
      fetchCurrentUser();
    } else {
      setCurrentUser(null); // Set current user to null if no username cookie found
    }
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
      try {
        const response = await axios.get(
          `http://localhost:3001/posts?Username=${selectedUser}`
        );
        setEntities(response.data);
      } catch (error) {
        console.error("Error fetching entities:", error);
      }
    };

    if (selectedUser) {
      fetchEntities();
    } else {
      setEntities([]);
    }
  }, [selectedUser]);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const renderUserDetails = () => {
    return (
      <div className="container mx-auto p-4 bg-gradient-to-r from-blue-950 to-green-800 bg-cover">
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
      </div>
    );
  };

  return renderUserDetails();
};

export default MyComponent;
