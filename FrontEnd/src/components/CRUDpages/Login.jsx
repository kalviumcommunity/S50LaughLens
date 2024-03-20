import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    Password: ''
  });
  const [usersData, setUsersData] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => {
        setUsersData(response.data);
      })
      .catch(error => {
        console.error('Error fetching users data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = usersData.find(user => user.Username === formData.Username);
    if (user) {
      if (user.Password === formData.Password) {
        document.cookie = `username=${formData.Username};`;
        alert('Logged in');
      } else {
        setErrors({ Password: 'Incorrect password' });
      }
    } else {
      setErrors({ Username: 'User not found' });
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-950 to-green-800'>
      <form onSubmit={handleSubmit} className='w-1/2 p-8 bg-gradient-to-r from-blue-950 to-green-800 rounded-lg shadow-lg'>
        <Link to="/home" >
          <button className="flex items-center justify-center w-12 h-10 bg-red-500 hover:bg-red-600 rounded-full text-white focus:outline-none">
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
        </Link>
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
        <Link to="/SignUp" className="flex justify-center mt-6 text-purple-600">
          <u> Create an Account! </u>
        </Link>
      </form>
    </div>
  );
}

export default Login;
