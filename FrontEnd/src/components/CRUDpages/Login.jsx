import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    Password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-950 to-green-800'>
      <form onSubmit={handleSubmit} className='w-1/2 p-8 bg-gradient-to-r from-blue-950 to-green-800 rounded-lg shadow-lg'>
        <h2 className='text-3xl font-semibold text-gray-300 mb-8 text-center'>Login</h2>
        <div className='space-y-4'>
          <input
            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
            type='text'
            name='Username'
            value={formData.Username}
            onChange={handleChange}
            placeholder='Username'
            required
          />
          {errors.Username && <p className='text-red-500'>{errors.Username}</p>}
          <input
            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
            type='email'
            name='Email'
            value={formData.Email}
            onChange={handleChange}
            placeholder='Email'
            required
          />
          {errors.Email && <p className='text-red-500'>{errors.Email}</p>}
          <input
            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
            type='password'
            name='Password'
            value={formData.Password}
            onChange={handleChange}
            placeholder='Password'
            required
          />
          {errors.Password && <p className='text-red-500'>{errors.Password}</p>}
        </div>
        <button
          type='submit'
          className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded mt-4'>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
