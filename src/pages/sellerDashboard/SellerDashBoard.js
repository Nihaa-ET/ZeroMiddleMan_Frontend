import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
// Import your custom CSS

const SellerDashBoard = () => {
  const seller = useSelector(state => state?.seller?.seller);
  console.log("seller_name", seller);

  return (
    <div className="dashboard-container">
      <main className="main-content">
        <div className="outlet-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SellerDashBoard;
