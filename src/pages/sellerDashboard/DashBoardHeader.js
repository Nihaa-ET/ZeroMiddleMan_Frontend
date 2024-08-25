import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const DashBoardHeader = () => {
  const location = useLocation();
  const [title, setTitle] = useState('Seller Dashboard');


  useEffect(() => {
    switch (location.pathname) {
      case '/home/seller-deshboard/all-seller':
        setTitle('All Seller Details');
        break;
      case '/home/seller-deshboard/add-seller':
        setTitle('Add Seller');
        break;
      case '/home/seller-deshboard/trash-seller-details':
        setTitle('Trash Seller Details');
        break;
      case '/home/seller-deshboard/bulkUpload':
        setTitle('Import & Export');
        break;
      case '/home/seller-deshboard/settings2':
        setTitle('Settings');
        break;
      case location.pathname.startsWith('/home/seller-deshboard/view-seller-details/') ? location.pathname : '':
        setTitle('View Seller Details');
        break;
      case location.pathname.startsWith('/home/seller-deshboard/edit-seller/') ? location.pathname : '':
        setTitle('Edit Seller Details');
        break;
      case '/home/seller-deshboard/settings2/active-users':
          setTitle('Settings');
          break;
      case '/home/seller-deshboard/settings2/disabled-users':
        setTitle('Settings');
        break;
      case '/home/seller-deshboard/settings2/register-user':
        setTitle('Settings');
        break;
        case '/home/seller-deshboard/settings2/active-admins':
          setTitle('Settings');
          break;
      default:
        setTitle('Seller Dashboard');
        break;
    }
  }, [location.pathname]);

  return (
    <div className="dashboard-header">
      <div>
        <h1 className="dashboard-title">{title}</h1>
      </div>
      {/* Uncomment and use the sections below as needed */}
      {/* <div className="search-container">
        <div className='ml-2'><IoSearch className="text-md cursor-pointer" /></div>
        <input type="text" placeholder="Search product here..." className="search-input" />
      </div> */}
      {/* <div className="add-seller-button" onClick={() => setOpenAddSeller(true)}>
        <button>Add Seller</button>
      </div> */}
      {/* <div className="icon-container">
        <AiFillSetting />
        <div>
          <IoIosNotifications />
        </div>
      </div> */}
      {/* Add Seller Details */}
  
    </div>
  );
}

export default DashBoardHeader;
