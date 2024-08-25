import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import DashBoardHeader from './DashBoardHeader';
import SideBar from './SideBar';
 // Import your custom CSS

const SellerDashBoard = () => {
  const seller = useSelector(state => state?.seller?.seller);
  console.log("seller_name", seller);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <SideBar />
      </aside>
      <main className="main-content">
        <DashBoardHeader />
        <div className="outlet-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SellerDashBoard;
