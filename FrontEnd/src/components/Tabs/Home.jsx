import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Profile from "./Profile";
import Upload from "../assets/upload.png";
import Login from "../assets/Login.png";
import Homee from "../assets/home.png";
import ham from "../assets/ham.png";
import POST from "../CRUDpages/Post.jsx";
import Update from "../CRUDpages/Update";
import { Link } from "react-router-dom";
import navlogo from "../assets/navlogo.png";

function Home() {
  const [userdata, setData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showPostPopup, setShowPostPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRefs = useRef({});

  const tabs = [
    { label: "Home", image: Homee },
    { label: "Profile", image: Login },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/posts");
        console.log(res.data);
        const shuffledData = res.data.sort(() => Math.random() - 0.5);
        setData(shuffledData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      Object.keys(dropdownRefs.current).forEach((id) => {
        if (
          dropdownRefs.current[id] &&
          !dropdownRefs.current[id].contains(event.target)
        ) {
          setDropdownStates((prevState) => ({
            ...prevState,
            [id]: false,
          }));
        }
      });
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onClickFUn = (id) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
      setDropdownStates((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = userdata.filter((data) =>
    data.Caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  
  const usernameCookie = getCookie("username");
    return (
    <div className="relative bg-gradient-to-r from-blue-950 to-green-800 text-gray-300 pb-10">
      <div className="fixed bg-gradient-radial left-0 top-0 h-screen bg-blue-950 text-white flex flex-col w-32 text-sm pt-6">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`px-3 py-2 cursor-pointer ${
              selectedTab === index ? "bg-gray-1000 bg-blue-900 rounded " : ""
            }`}
            onClick={() => setSelectedTab(index)}
            style={{ marginBottom: "10px" }}
          >
            <img
              src={tab.image}
              alt={tab.label}
              className="w-6 h-6 mr-2 inline"
            />
            <span>{tab.label}</span>
          </div>
        ))}
      </div>
      <div className="ml-32">
        {selectedTab === 0 && (
          <div className="mx-auto">
            <nav className="h-12 flex items-center top-0">
              <a href="/" className="border-none">
                <img src={navlogo} alt="" className="w-32 pl-2" />
              </a>

              <input
                type="text"
                placeholder="Search"
                className="w-2/3  h-10 bg-transparent backdrop-filter backdrop-blur-md border border-gray-300 rounded-md px-4 py-2 focus:outline-none mx-auto pl-3"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button
                className="rounded button mr-20 h-9 w-16 fixed bottom-12 right-4 hover:opacity-80"
                onClick={() => setShowPostPopup(true)}
              >
                <img src={Upload} alt="" />
              </button>

              {usernameCookie ? (
                <div className="rounded mr-16 mt-5 w-10 justify-center align-middle">
                  <img
                    src={Login}
                    alt=""
                    className="cursor-pointer rounded-full"
                  />
                  <p className="text-xs font-bold text-gray-300">
                    {usernameCookie}
                  </p>
                </div>
              ) : (
                <Link
                  to="/SignUp"
                  className="rounded mr-16 mt-5 w-10 justify-center align-middle"
                >
                  <img
                    src={Login}
                    alt=""
                    className="cursor-pointer rounded-full"
                  />
                  <p className="text-xs font-bold text-gray-300">Register</p>
                </Link>
              )}
            </nav>
            <div className="mt-6 border-gray-800 w-1/2 rounded mx-auto">
              {filteredData.map((data) => (
                <div
                  key={data._id}
                  className="bg-gradient-to-r from-blue-950 to-yellow-900 border p-4 m-4 mx-auto rounded"
                >
                  <div className="flex justify-between">
                    <span>
                      <img src={Profile} alt="" />
                      <p>{data.Username}</p>
                    </span>
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => onClickFUn(data._id)}
                        className="inline-flex justify-center items-center p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                      >
                        <img src={ham} alt="" className="w-7" />
                      </button>
                      {dropdownStates[data._id] && (
                        <div
                          ref={(ref) => (dropdownRefs.current[data._id] = ref)}
                          className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <div
                            className=" bg-black text-white rounded "
                            role="none"
                          >
                            <a
                              className="block px-4 py-2 text-sm  hover:bg-gray-900"
                              onClick={() => {
                                setShowEditPopup(true);
                                setSelectedPostId(data._id);
                              }}
                            >
                              Edit
                            </a>
                            <a
                              className="block px-4 py-2 text-sm  hover:bg-gray-900"
                              onClick={() => handleDelete(data._id)}
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-xl font-bold mb-2">{data.Caption}</p>
                  <div className="video-container shadow-sm">
                    <iframe
                      title="YouTube Video"
                      width="560"
                      height="315"
                      src={
                        data.File.replace("watch?v=", "embed/") +
                        "?controls=0&showinfo=0"
                      }
                      allowFullScreen
                    ></iframe>
                  </div>
                  <span className="flex justify-between mt-3"></span>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedTab === 1 && <Profile tab />}
      </div>
      {showPostPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="list border border-gray-500 max-w-md mx-auto mt-10 shadow-md bg-gradient-to-r from-green-800 to-blue-950 p-4 rounded-md">
            <button
              onClick={() => setShowPostPopup(false)}
              className="flex items-center justify-center w-12 h-10 bg-red-500 hover:bg-red-600 rounded-full text-white focus:outline-none"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <POST />
          </div>
        </div>
      )}
      {showEditPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="list border border-gray-500 max-w-md mx-auto mt-10 shadow-md bg-gradient-to-r from-green-800 to-blue-950 p-4 rounded-md">
            <button
              onClick={() => setShowEditPopup(false)}
              className="flex items-center justify-center w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full text-white focus:outline-none"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <Update postId={selectedPostId} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
