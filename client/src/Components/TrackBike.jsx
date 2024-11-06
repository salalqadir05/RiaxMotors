import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import { Table } from 'react-bootstrap';
const TrackBike = () => {
  const [bikeId, setBikeId] = useState('');
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await axios.get(`https://sheet.best/api/sheets/a25a5248-e1c5-451d-84c2-0291315f2347/search?bikeId=${bikeId}`);
      if (response.status === 200 && response.data.length > 0) {
        setBike(response.data[0]);
        setSuccess('Bike details fetched successfully.');
      } else {
        setError('Bike not found.');
      }
    } catch (error) {
      setError('Failed to fetch bike details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Track Bike</h2>
        <div className="row mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-4"
              placeholder="Enter Bike ID"
              value={bikeId}
              onChange={(e) => setBikeId(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        {bike && (
        <div className="container">
        <h2>Bike Details</h2>
        <Table bordered striped responsive>
          <tbody>
            <tr>
              <th>Bike ID</th>
              <td>{bike.bikeId}</td>
            </tr>
            <tr>
              <th>Owner Name</th>
              <td>{bike.ownerName}</td>
            </tr>
            <tr>
              <th>Father's Name</th>
              <td>{bike.fatherName}</td>
            </tr>
            <tr>
              <th>Registration Number</th>
              <td>{bike.registrationNumber}</td>
            </tr>
            <tr>
              <th>CNIC</th>
              <td>{bike.cnic}</td>
            </tr>
            <tr>
              <th>Date of Purchase</th>
              <td>{new Date(bike.dateOfPurchase).toLocaleDateString()}</td>
            </tr>
            <tr>
              <th>Engine Number</th>
              <td>{bike.engineNumber}</td>
            </tr>
            <tr>
              <th>Chassis Number</th>
              <td>{bike.chassisNumber}</td>
            </tr>
            <tr>
              <th>Sale Price</th>
              <td>{bike.salePrice}</td>
            </tr>
            <tr>
              <th>Buyer Name</th>
              <td>{bike.buyerName}</td>
            </tr>
            <tr>
              <th>Loan Detail</th>
              <td>{bike.loanDetail || 'N/A'}</td>
            </tr>
            <tr>
              <th>Phone Number</th>
              <td>{bike.phoneNumber}</td>
            </tr>
            <tr>
              <th>Key Number</th>
              <td>{bike.keyNumber}</td>
            </tr>
            <tr>
              <th>Other Details</th>
              <td>{bike.otherDetails || 'N/A'}</td>
            </tr>
            <tr>
              <th>Bike Status</th>
              <td>{bike.bikeStatus}</td>
            </tr>
          </tbody>
        </Table>
      </div>
        )}
      </div>
    </>
  );
};

export default TrackBike;
