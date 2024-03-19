import React, { useState } from 'react';
import axios from 'axios';

function Update({ postId }) {
  const [formData, setFormData] = useState({
    Caption: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form Data:', formData); 
      const res = await axios.put(`http://localhost:3001/posts/${postId}`, formData);
      console.log('Post updated successfully:', res.data);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };
  

  return (
    <div>
      <h2>Update Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="caption" className="block mb-1">
            Caption:
          </label>
          <input
  type="text"
  id="caption"
  name="Caption" 
  className="w-full px-4 py-2 border rounded-md focus:outline-none text-black focus:border-blue-500"
  value={formData.Caption}
  onChange={handleChange}
/>

        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default Update;
