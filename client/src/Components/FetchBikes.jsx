import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from "../assets/Loading.gif";

const fetchAllBikesRoute = 'https://script.google.com/macros/s/AKfycbzkGCuichJCV5AFPuf2UnNYCdzg0Et7Afb6rNU9pMIPEzjvYz-5DzGukZcNJ6RMIe4S/exec';
const deleteBikeRoute = 'https://script.google.com/macros/s/AKfycbzkGCuichJCV5AFPuf2UnNYCdzg0Et7Afb6rNU9pMIPEzjvYz-5DzGukZcNJ6RMIe4S/exec';
const updateBikeRoute = 'https://script.google.com/macros/s/AKfycbzkGCuichJCV5AFPuf2UnNYCdzg0Et7Afb6rNU9pMIPEzjvYz-5DzGukZcNJ6RMIe4S/exec';

const FetchBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBike, setSelectedBike] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get(fetchAllBikesRoute);
        setBikes(response.data);
        setFilteredBikes(response.data);
      } catch (error) {
        setError('Failed to fetch bike details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = bikes.filter(bike =>
      bike[1].toLowerCase().includes(e.target.value.toLowerCase()) ||  // Assuming ownerName is at index 1
      bike[3].toLowerCase().includes(e.target.value.toLowerCase())   // Assuming registrationNumber is at index 3
    );
    setFilteredBikes(filtered);
  };

  const handleViewDetails = (bike) => {
    const bikeDetails = {
      bikeId: bike[0],
      ownerName: bike[1],
      fatherName: bike[2],
      registrationNumber: bike[3],
      cnic: bike[4],
      dateOfPurchase: bike[5],
      engineNumber: bike[6],
      chassisNumber: bike[7],
      salePrice: bike[8],
      buyerName: bike[9],
      loanDetail: bike[10],
      phoneNumber: bike[11],
      keyNumber: bike[12],
      otherDetails: bike[13],
      bikeStatus: bike[14]
    };
    setSelectedBike(bikeDetails);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleDelete = async (bikeId) => {
  setLoading(true); // Show loading indicator
  setError(''); // Clear previous error
  setSuccess(''); // Clear previous success message

  try {
    const response = await fetch(deleteBikeRoute, {
      method: 'POST', // Assuming POST method for delete action
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        action: 'delete',
        bikeId: bikeId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to delete bike details. Please try again.');
    }

    const data = await response.json();
    console.log(data); // Log the response data

    if (data.success) {
      setSuccess('Bike details deleted successfully!');
      const updatedBikes = bikes.filter(bike => bike[0] !== bikeId);
      setBikes(updatedBikes);
      setFilteredBikes(updatedBikes);
    } else {
      setError(data.message);
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false); // Hide loading indicator
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBike(prevState => ({ ...prevState, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true); // Show loading indicator
    try {
      const url = `${updateBikeRoute}?action=update`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bikeId: selectedBike.bikeId,
          ownerName: selectedBike.ownerName,
          fatherName: selectedBike.fatherName,
          registrationNumber: selectedBike.registrationNumber,
          cnic: selectedBike.cnic,
          dateOfPurchase: selectedBike.dateOfPurchase,
          engineNumber: selectedBike.engineNumber,
          chassisNumber: selectedBike.chassisNumber,
          salePrice: selectedBike.salePrice,
          buyerName: selectedBike.buyerName,
          loanDetail: selectedBike.loanDetail,
          phoneNumber: selectedBike.phoneNumber,
          keyNumber: selectedBike.keyNumber,
          otherDetails: selectedBike.otherDetails,
          bikeStatus: selectedBike.bikeStatus
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update bike details. Please try again.');
      }

      const data = await response.json();
      console.log(data); // Log the response data

      setSuccess('Bike details updated successfully!');
      const updatedBikes = bikes.map(bike =>
        bike[0] === selectedBike.bikeId ? selectedBike : bike
      );
      setBikes(updatedBikes);
      setFilteredBikes(updatedBikes);
      handleCloseModal();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
      
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by owner name or registration number"
          value={searchTerm}
          onChange={handleSearch}
        />

        <table className="table">
          <thead>
            <tr>
              <th>Bike ID</th>
              <th>Owner Name</th>
              <th>Registration Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}
  >
    <img
      src={Loading}
      alt="Loading"
      style={{
        width: '100px',  // Adjust the size as needed
        height: '100px'  // Adjust the size as needed
      }}
    />
  </div>
)}
          <tbody>
            {filteredBikes.map(bike => (
              <tr key={bike[0]}>
                <td>{bike[0]}</td>
                <td>{bike[1]}</td>
                <td>{bike[3]}</td>
                <td>
                  <Button variant="info" className='mr-1' onClick={() => handleViewDetails(bike)}>View</Button>
                  <Button variant="danger" onClick={() => handleDelete(bike[0])}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedBike && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Update Bike Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="ownerName">
                  <Form.Label>Owner Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="ownerName"
                    value={selectedBike.ownerName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="registrationNumber">
                  <Form.Label>Registration Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="registrationNumber"
                    value={selectedBike.registrationNumber}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                {/* Add more fields as needed */}
                <Form.Group>
                  <Button variant="primary" onClick={handleUpdate}>Update</Button>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default FetchBikes;
