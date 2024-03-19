import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Profile from "./Profile";
import Upload from "../assets/upload.png";
import Login from "../assets/Login.png";
import Homee from "../assets/home.png";
import ham from "../assets/ham.png";
import POST from "./Post";
import Update from "./Update"

function Home() {
  const [userdata, setData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showPostPopup, setShowPostPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(null); // State to store the selected post ID
  const dropdownRefs = useRef({});

  const tabs = [
    { label: "Home", image: Homee },
    { label: "Profile", image: Login },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/posts");
        setData(res.data);
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

  return (
    <div className="relative bg-gradient-to-r from-blue-950 to-green-800 text-gray-300">
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
              <div className="h-14 mt-5 ml-5"></div>
              <input
                type="text"
                placeholder="Search"
                className="w-1/2  h-10 bg-transparent backdrop-filter backdrop-blur-md border border-gray-300 rounded-md px-4 py-2 focus:outline-none mx-auto pl-3"
              />
              <button
                className="rounded button mr-20 h-9 w-16 fixed bottom-12 right-4 hover:opacity-80"
                onClick={() => setShowPostPopup(true)}
              >
                <img src={Upload} alt="" />
              </button>

              <button className="rounded mr-12 mt-5 w-10">
                <img src={Login} alt="" className="cursor-pointer" />
                <p className="text-sm font-bold text-gray-300">Login</p>
              </button>
            </nav>
            <div className="mt-6 border-gray-800 w-1/2 bg-gradient-to-r from-green-950 to-blue-800 rounded mx-auto">
              {userdata.map((data) => (
                <div
                  key={data._id}
                  className="bg-gradient-to-r from-blue-950 to-yellow-800 border p-4 m-4 mx-auto rounded"
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
                                console.log(data.Caption)
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
                  <span className="flex justify-between mt-3">
                    <p>{data.Likes}</p>
                    <p>{data.Comments}</p>
                    <p>{data.Shares}</p>
                  </span>
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
            <POST />
            <button className="block mx-auto mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => setShowPostPopup(false)}>Close</button>
          </div>
        </div>
      )}
      {showEditPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="list border border-gray-500 max-w-md mx-auto mt-10 shadow-md bg-gradient-to-r from-green-800 to-blue-950 p-4 rounded-md">
            <Update postId={selectedPostId} /> 
            <button className="block mx-auto mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => setShowEditPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
