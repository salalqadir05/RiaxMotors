import React, { useState } from 'react';
import axios from 'axios';
import { Alert, AlertTitle } from '@mui/material'; // Updated import
import {getSheetsClient} from '../comnjs/crud';
import Navbar from './Navbar';

const RegisterBike = () => {
  // console.log('hello world');
  // getSheetsClient();
  const [bikeDetails, setBikeDetails] = useState({
    bikeId: '',
    ownerName: '',
    fatherName: '',
    registrationNumber: '',
    cnic: '',
    dateOfPurchase: '',
    engineNumber: '',
    chassisNumber: '',
    salePrice: '',
    buyerName: '',
    loanDetail: '',
    phoneNumber: '',
    keyNumber: '',
    otherDetails: '',
    bikeStatus: 'new'
  });

  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

  const handleChange = (e) => {
    setBikeDetails({ ...bikeDetails, [e.target.name]: e.target.value });
  };

  const checkBikeIdExists = async () => {
    try {
      const response = await axios.get('https://sheet.best/api/sheets/a25a5248-e1c5-451d-84c2-0291315f2347/');
      const rows = response.data || [];
      return rows.some(row => row.Id === bikeDetails.bikeId); // Line 22

    } catch (error) {
      console.error('Error checking bike ID:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const bikeExists = await checkBikeIdExists();
  
      if (bikeExists) {
        setAlert({ show: true, variant: 'error', message: 'Bike ID already exists. Please use a different ID.' });
        return;
      }
  
      const response = await axios.post(
        'https://sheet.best/api/sheets/cf969697-682a-40e3-bad4-d54803eeeacf/',
        {
          Id: bikeDetails.bikeId, // Ensure these field names match the column headers in your sheet
          Name: bikeDetails.ownerName,
          FatherName: bikeDetails.fatherName,
          RegistrationNumber: bikeDetails.registrationNumber,
          CNIC: bikeDetails.cnic,
          DateOfPurchase: bikeDetails.dateOfPurchase,
          EngineNumber: bikeDetails.engineNumber,
          ChassisNumber: bikeDetails.chassisNumber,
          SalePrice: bikeDetails.salePrice,
          BuyerName: bikeDetails.buyerName,
          LoanDetail: bikeDetails.loanDetail,
          PhoneNumber: bikeDetails.phoneNumber,
          KeyNumber: bikeDetails.keyNumber,
          OtherDetails: bikeDetails.otherDetails,
          BikeStatus: bikeDetails.bikeStatus
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.status === 200) { // Line 81
        setAlert({ show: true, variant: 'success', message: 'Bike registered successfully!' });
        setBikeDetails({ // Reset the form fields after successful submission
          bikeId: '',
          ownerName: '',
          fatherName: '',
          registrationNumber: '',
          cnic: '',
          dateOfPurchase: '',
          engineNumber: '',
          chassisNumber: '',
          salePrice: '',
          buyerName: '',
          loanDetail: '',
          phoneNumber: '',
          keyNumber: '',
          otherDetails: '',
          bikeStatus: 'new'
        });
     }
     
    } catch (error) {
      setAlert({ show: true, variant: 'error', message: 'Failed to register bike. Please try again.' });
      console.error('Error submitting data:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {alert.show && (
          <Alert severity={alert.variant} onClose={() => setAlert({ ...alert, show: false })}>
            <AlertTitle>{alert.variant === 'success' ? 'Success' : 'Error'}</AlertTitle>
            {alert.message}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          {/* Form fields for bike details */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Bike ID</label>
              <input
                type="text"
                className="form-control"
                name="bikeId"
                value={bikeDetails.bikeId}
                onChange={handleChange}
                placeholder='0000'
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label>Owner Name</label>
              <input
                type="text"
                className="form-control"
                name="ownerName"
                value={bikeDetails.ownerName}
                onChange={handleChange}
                placeholder='xxxxx'
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Father Name</label>
              <input
                type="text"
                className="form-control"
                name="fatherName"
                value={bikeDetails.fatherName}
                onChange={handleChange}
                placeholder='xxxxx'
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label>Registration Number</label>
              <input
                type="text"
                className="form-control"
                name="registrationNumber"
                value={bikeDetails.registrationNumber}
                onChange={handleChange}
                placeholder='123456789'
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>CNIC</label>
              <input
                type="text"
                className="form-control"
                name="cnic"
                value={bikeDetails.cnic}
                onChange={handleChange}
                placeholder='1234512341231'
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label>Date of Purchase</label>
              <input
                type="date"
                className="form-control"
                name="dateOfPurchase"
                value={bikeDetails.dateOfPurchase}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Engine Number</label>
              <input
                type="text"
                className="form-control"
                name="engineNumber"
                value={bikeDetails.engineNumber}
                onChange={handleChange}
                required
                placeholder='12345678'
              />
            </div>
            <div className="form-group col-md-6">
              <label>Chassis Number</label>
              <input
                type="text"
                className="form-control"
                name="chassisNumber"
                value={bikeDetails.chassisNumber}
                onChange={handleChange}
                required
                placeholder='12345678'
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Sale Price</label>
              <input
                type="number"
                className="form-control"
                name="salePrice"
                value={bikeDetails.salePrice}
                onChange={handleChange}
                required
                placeholder='123456'
              />
            </div>
            <div className="form-group col-md-6">
              <label>Buyer Name</label>
              <input
                type="text"
                className="form-control"
                name="buyerName"
                value={bikeDetails.buyerName}
                onChange={handleChange}
                placeholder='xxxx'
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Loan Detail</label>
              <input
                type="text"
                className="form-control"
                name="loanDetail"
                value={bikeDetails.loanDetail}
                onChange={handleChange}
                placeholder='abcd'
              />
            </div>
            <div className="form-group col-md-6">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                value={bikeDetails.phoneNumber}
                onChange={handleChange}
                placeholder='1234567890'
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Key Number</label>
              <input
                type="text"
                className="form-control"
                name="keyNumber"
                value={bikeDetails.keyNumber}
                onChange={handleChange}
                placeholder='1234'
              />
            </div>
            <div className="form-group col-md-6">
              <label>Other Details</label>
              <input
                type="text"
                className="form-control"
                name="otherDetails"
                value={bikeDetails.otherDetails}
                onChange={handleChange}
                placeholder='Additional details'
              />
            </div>
          </div>

          <div className="form-group">
            <label>Bike Status</label>
            <select
              className="form-control"
              name="bikeStatus"
              value={bikeDetails.bikeStatus}
              onChange={handleChange}
              required
            >
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary mb-5">Register Bike</button>
        </form>
      </div>
    </>
  );
};

export default RegisterBike;
