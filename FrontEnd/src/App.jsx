import React from "react";
import LoginPage from "./components/landingPage/Start";
import Home from './components/Tabs/Home.jsx';
import Sign from './components/CRUDpages/SingUp';
import Login from  './components/CRUDpages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/SignUp" element={<Sign />} />
        <Route path="/Login" element={<Login />} />

      </Routes>
    </Router>
    
  );
}

export default App;
