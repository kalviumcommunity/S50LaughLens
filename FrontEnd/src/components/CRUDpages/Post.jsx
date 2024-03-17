import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const Post = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Function to get cookie value by name
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Get the value of the "username" cookie
    const usernameCookie = getCookie('username');
    if (usernameCookie) {
      setUsername(usernameCookie);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset  
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await axios.post("http://localhost:3001/posts", {
        Username: data.username,
        File: data.fileUrl,
        Caption: data.caption,
        Likes: 0,
        Comments: 0,
        Shares: 0,
      });
      console.log("File posted successfully");
      reset(); 
      window.location.reload();
    } catch (error) {
      console.error("Error posting file:", error);
    }
  };

  return (
    <div className="text-black">
      <h2 className="text-2xl font-semibold mb-4">Enter File URL</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="fileUrl" className="block mb-1">
            File URL:
          </label>
          <input
            {...register("fileUrl", { required: true })}
            type="text"
            id="fileUrl"
            name="fileUrl"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.fileUrl && (
            <p className="text-red-500">File URL is required</p>
          )}
        </div>
        <div>
          <label htmlFor="caption" className="block mb-1">
            Caption:
          </label>
          <input
            {...register("caption", { required: true })}
            type="text"
            id="caption"
            name="caption"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          
        </div>
        <div>
          <label htmlFor="username" className="block mb-1">
            Username:
          </label>
          <input
            {...register("username", { required: true })}
            type="text"
            id="username"
            name="username"
            value={username} 
            readOnly 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Post;
