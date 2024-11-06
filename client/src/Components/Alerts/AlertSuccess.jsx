import React from 'react';
import { Alert } from 'react-bootstrap'; // Import Alert from React Bootstrap

function AlertSuccess() {
  return (
    <Alert variant="success" className="d-flex align-items-center w-50 ml-auto fade show" dismissible>
      <i className="bi-check-circle-fill" style={{ marginRight: '10px' }} />
      <strong className="mr-2">Successfully!</strong> Bike is Registered Successfully
    </Alert>
  );
}

export default AlertSuccess;
