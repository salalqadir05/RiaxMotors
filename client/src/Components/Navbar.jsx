import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session token from localStorage
    // Redirect to login page
    localStorage.clear();
    navigate('/');
  };



  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/registerbike">RiazMotor</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/registerbike">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/fetchallbikes">All bikes Details</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/fetchonebike">Bike Search</Link>
              </li>
            </ul>
            <div className="d-flex">
              <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
