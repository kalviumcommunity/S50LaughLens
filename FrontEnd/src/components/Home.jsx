import React, { useEffect, useState } from "react";
// import dummyData from "./data.json";
const tabs = ["Home","Trending","Messages", "Profile"];
import Profile from "./Profile";
import Messages from "./Message";
import Trendingz from "./Trendingz";
import axios from "axios";

function Home() {
  const [userdata, setData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  // useEffect(() => {
  //   setData(dummyData);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const res = await axios.get("http://localhost:3002/users");
        console.log(res);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="bg-blue-100">
      <div className="fixed left-0 top-0 h-screen  bg-gray-800 text-white flex flex-col w-32">
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
      <div className="ml-32 ">
        {selectedTab === 0 && (
          <div className="container mx-auto ">
            <nav className="h-12 border  flex items-center sticky top-0 bg-yellow-400">
              <div className=" h-14 mt-5 ml-5"></div>
              <input
                type="text"
                placeholder="Search"
                className="rounded h-7 mx-auto pl-3"
              />

              <button className="rounded mr-12 h-8 pr-2 pl-2 text-white	bg-green-600">
                SignUp
              </button>
            </nav>
            <div className="bgimg border  flex items-center justify-center pl-8 ">
              <h1 className="text-4xl mt-2 font-bold">Users Data</h1> 
            </div>
            <div className="mt-6 w-1/2 bg-blue-300 rounded mx-auto ">
              {userdata.map((data) => (
                <div
                  key={data._id}
                  className="bg-white border p-4 rounded-md m-4 mx-auto">
                  <div className="flex justify-between">
                    <p>Id-{data._id}</p>
                    <p>{data.Username}</p>
                  </div>
                  <p className=" text-xl font-bold mb-2">{data.name}</p>
                  <p className="text-center">{data.File}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedTab === 1 && <Trendingz />}
        {selectedTab === 2 && <Messages tab />}
        {selectedTab === 3 && <Profile tab/>}
      </div>
    </div>
  );
}

export default Home;