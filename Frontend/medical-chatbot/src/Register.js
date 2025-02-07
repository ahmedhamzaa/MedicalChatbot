import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Patient"); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        fullname,
        email,
        password,
        role, 
      });
      
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
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
                Register for Your Medical Chatbot
              </h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                    placeholder="Enter Your Full Name"
                    style={{ background: '#4B525F', color: 'white', border: '1px solid #4B525F', borderRadius: '5px' }}
                  />
                </div>
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
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <input
                    type="text"
                    className="form-control"
                    value={role}
                    readOnly 
                    style={{ background: '#4B525F', color: 'white', border: '1px solid #4B525F', borderRadius: '5px' }}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary" style={{ background: '#7289DA', border: 'none', borderRadius: '5px' }}>
                    Register
                  </button>
                </div>
              </form>
              <div className="mt-3 text-center">
                <p>Already have an account? <a href="/login" style={{ color: '#7289DA' }}>Login here</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
