import React, { useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';

function SignUpForm() {
  const [formData, setFormData] = useState({
    Username: '',
    name: '',
    Password: '',
    Email: '', // Added Email field
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({}); // State to hold validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.Password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/users', formData);
      console.log(formData);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { error: validationError } = error.response.data;
        // Set validation errors based on the field names
        setErrors({ ...validationError });
      } else {
        console.error('Error:', error);
        alert('An error occurred. Please try again.'); // Display generic error message
      }
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-950 to-green-800'>
      <form onSubmit={handleSubmit} className='w-1/2 p-8 bg-gradient-to-r from-blue-950 to-green-800 rounded-lg shadow-lg'>
        <h2 className='text-3xl font-semibold text-gray-300 mb-8 text-center'>Sign Up</h2>
        <div className='space-y-4'>
          <input className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500' type="text" name="Username" value={formData.Username} onChange={handleChange} placeholder="Username" required />
          {errors.Username && <p className="text-red-500">{errors.Username}</p>}
          <input className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500' type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
          <input className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500' type="email" name="Email" value={formData.Email} onChange={handleChange} placeholder="Email" required />
          {errors.Email && <p className="text-red-500">{errors.Email}</p>}
          <input className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500' type="password" name="Password" value={formData.Password} onChange={handleChange} placeholder="Password" required />
          {errors.Password && <p className="text-red-500">{errors.Password}</p>}
          <input className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500' type="password" name="ConfirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm Password" required />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded mt-4">
          Sign Up
        </button>
        <Link to="/Login" className="flex justify-center mt-6 text-purple-600" ><u>Already have an account?</u></Link>
      </form>
    </div>
  );
}

export default SignUpForm;
