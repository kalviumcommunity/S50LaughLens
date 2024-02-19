import React from "react";
import logo from "../assets/ASAPlogo.jpeg";
import bg from "../assets/bgEmoji.jpeg"

function ProjectIdea() {
  return (
    <>
    
      <div className="h-screen pt-14" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="shadow-2xl mx-auto bg-yellow-400 w-1/2 rounded-3xl p-10 " >
          <img
            src={logo}
            className="animate-spin w-48 mx-auto rounded-full border-2 border-green-700"
          />
          <h1 className="font-bold text-center"> LaughlenS</h1>
          <p className="text-center text-xl pt-10 pb-6 text-red-900 font-medium">
            Share laughter, inspiration, and share your thoughts!!
          </p>
          <p className="text-center pb-6 text-gray-700">Welcome to LaughlenS, The ultimate destination for weird laughs! Dive into a world of 
            quirky giggles and contagious chuckles. Join our community, share your unique laughs, and spread joy 
            worldwide. Get ready to LOL like never before!</p>
          <div className="flex items-center h-full mx-auto justify-between px-20">
            <button className="block bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-12 rounded">
              Join
            </button>
            <button className="block bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-10 rounded">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectIdea;
