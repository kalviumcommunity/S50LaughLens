import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const tabs = ["Home", "Trending", "Notifications", "Profile"];

function Home() {
  const [userdata, setData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

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

  return (
    <div className="bg-blue-100">
      <div className="fixed left-0 top-0 h-screen bg-gray-800 text-white flex flex-col w-32">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`px-3 py-2 cursor-pointer ${
              selectedTab === index ? "bg-gray-1000" : ""
            }`}
            onClick={() => setSelectedTab(index)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="ml-32">
        {selectedTab === 0 && (
          <div className="container mx-auto">
            <nav className="h-12 border flex items-center  top-0 ">
              <div className="h-14 mt-5 ml-5"></div>

              <input
                type="text"
                placeholder="Search"
                className="rounded h-7 mx-auto pl-3"
              />
              <Link to="/Post">
                <button className="rounded button mr-20 h-9 w-24">Post</button>
              </Link>

              <button className="rounded mr-12 h-8 pr-2 pl-2 text-white bg-green-600">
                SignUp
              </button>
            </nav>
            <div className="bgimg border flex items-center justify-center pl-8">
              <h1 className="text-4xl mt-2 font-bold">Posts</h1>
            </div>
            <div className="mt-6 w-1/2 bg-blue-300 rounded mx-auto">
              {userdata.map((data) => (
                <div
                  key={data._id}
                  className="bg-white border p-4 rounded-md m-4 mx-auto"
                >
                  <div className="flex justify-between">
                    <p>{data.Username}</p>
                    <p>{data.Likes}</p>
                  </div>
                  <p className="text-xl font-bold mb-2">{data.Caption}</p>
                  <div className="video-container">
                    <iframe
                      title="YouTube Video"
                      width="560"
                      height="315"
                      src={data.File.replace("watch?v=", "embed/")+ "?controls=0&showinfo=0"}
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedTab === 1 && <Trendingz />}
        {selectedTab === 2 && <Messages tab />}
        {selectedTab === 3 && <Profile tab />}
      </div>
    </div>
  );
}

export default Home;
