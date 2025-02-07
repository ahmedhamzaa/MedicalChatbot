import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/login", { email, password });
      sessionStorage.setItem("token", response.data.access_token);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" style={{ background: '#2d333b' }}>
      <div className="row w-100">
        <div className="col-md-4 mx-auto">
          <div className="card" style={{ background: '#3E4451', color: 'white', border: 'none', borderRadius: '10px' }}>
            <div className="card-body p-5">
              <h2 className="text-center mb-4">
                <img
                  src="https://png.pngtree.com/png-vector/20230225/ourmid/pngtree-smart-chatbot-cartoon-clipart-png-image_6620453.png"
                  alt="Logo"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                Login to Your Medical Chatbot
              </h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter Your Email Address"
                    style={{ background: '#4B525F', color: 'white', border: '1px solid #4B525F', borderRadius: '5px' }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter Your Password"
                    style={{ background: '#4B525F', color: 'white', border: '1px solid #4B525F', borderRadius: '5px' }}
                  />
                </div>
                <div className="relative group">
                <button type="submit" className="btn" style={{ 
                  background: '#5865F2', 
                  border: 'none', 
                  borderRadius: '5px', 
                  padding: '10px 20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  fontWeight: '500', 
                  fontSize: '16px', 
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
                  transition: 'background-color 0.3s ease, transform 0.2s ease' 
                }}
                onMouseEnter={(e) => { 
                  e.target.style.backgroundColor = '#4C57E2'; 
                  e.target.style.transform = 'scale(1.02)'; 
                  e.target.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.15)'; 
                }}
                onMouseLeave={(e) => { 
                  e.target.style.backgroundColor = '#5865F2';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.1)';
                }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" style={{ color: 'white' }}> {/* Increased icon size, set color to white */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" fill="white" /> {/* Added fill="white" to the path */}
                  </svg>
                  <span style={{ color: 'white' }}>Unlock</span>
                </button>
              </div>
                <div className="mt-3 text-center">
                  <span>No account?</span> <a href="/register" style={{ color: '#7289DA' }}>Create one</a>
                </div>
                <div className="mt-3 text-center">
                  <span>Medical bot platform is NOT required login. </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
