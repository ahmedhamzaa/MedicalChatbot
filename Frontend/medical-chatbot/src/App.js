import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Register from "./Register"; 
import Chat from "./Chat";
import Navbar  from "./Navbar";
import { useState } from "react";


const PrivateRoute = ({ element }) => {
  const token = sessionStorage.getItem("token");
  return token ? element : <Navigate to="/login" />; 
};


const RedirectRoute = ({ element }) => {
  const token = sessionStorage.getItem("token");
  return token ? <Navigate to="/dashboard" /> : element; 
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('token'));
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/login" element={<RedirectRoute element={<Login setIsLoggedIn={setIsLoggedIn} />} />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/register" element={<RedirectRoute element={<Register />} />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route path="/" element={<Navigate to="/login" />} /> {/* Default to login */}
      </Routes>
    </Router>
  );
};

export default App;
