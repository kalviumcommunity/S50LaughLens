import React, { useState, useEffect } from "react";
import axios from "axios";

const Logout = () => {
  document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window.location.href = "/home";
};

const MyComponent = () => {
  const [selectedUser, setSelectedUser] = useState("");

  const getCookie = (name) => {
    const cookieValue = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(name + "="))
      ?.split("=")[1];
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  };

  const usernameCookie = getCookie("username");

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
