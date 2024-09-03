import React from 'react';
import unauthorizedImage from '../../Assests/rafiki.png'; // Adjust the path as necessary

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <img
        src={unauthorizedImage}
        alt="Unauthorized Access"
        className="unauthorized-image"
      />
      <div className="content-overlay">
        <h1 className="unauthorized-title">Unauthorized Access</h1>
        <p className="unauthorized-message">
          You do not have permission to view this page. Please contact your administrator if you believe this is an error.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
