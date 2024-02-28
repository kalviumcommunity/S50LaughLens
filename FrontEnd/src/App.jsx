import React from "react";
import LoginPage from "./components/Start";
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Post from "./components/Post";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path='/post' element={<Post/>}/>
      </Routes>
    </Router>
  );
}

export default App;
