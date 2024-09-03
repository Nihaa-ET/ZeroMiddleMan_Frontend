import React from 'react';
import "../Styles/Subheader.css";
import { useSelector } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { BiHomeAlt2 } from "react-icons/bi";
import { ImProfile } from "react-icons/im";

const Subheader = () => {

  const role = useSelector((state) => state.user.role);
  return (
    <div className='sub-header'>
      <div className='sub-header-title'>
        <NavLink to={"/home/seller-dashboard/allseller-details"} className='link' activeClassName='active-link'>
          <BiHomeAlt2 className='icon' />
          <h3>Seller Dashboard</h3>
        </NavLink>
      </div>
      <div className='sub-header-col-2'>
        <ul className='sub-header-list'>
          <li>
            <NavLink to={"/home/seller-dashboard/add-seller"} className='sub-link' activeClassName='active-sub-link'>
              <ImProfile className='sub-link-icon' />
              <span>Seller</span>
            </NavLink>
          </li>
          {(role === 'Admin' || role === 'superadmin' || role==='TL') && ( // Conditionally render the Trash link
            <li>
              <NavLink to="/home/seller-dashboard/trash-seller-details" className='sub-link' activeClassName='active-sub-link'>
                <FaTrashAlt className='sub-link-icon' />
                <span>Trash</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Subheader;
