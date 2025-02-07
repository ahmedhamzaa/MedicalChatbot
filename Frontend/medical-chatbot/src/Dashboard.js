import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get("http://localhost:8000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        sessionStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" style={{ background: '#2d333b' }}>
      <div className="row w-100">
        <div className="col-md-4 mx-auto">
          <div className="card" style={{ background: '#3E4451', color: 'white', border: 'none', borderRadius: '10px' }}>
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Dashboard</h2>
              {user ? (
                <div>
                  <div className="mb-3">
                    <p><strong>Name:</strong> {user.fullname}</p>
                  </div>
                  <div className="mb-3">
                    <p><strong>Email:</strong> {user.email}</p>
                  </div>
                  <div className="mb-3">
                    <p><strong>Role:</strong> {user.role}</p>
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn btn-danger" style={{ border: 'none', borderRadius: '5px', background: '#E74C3C' }} onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
