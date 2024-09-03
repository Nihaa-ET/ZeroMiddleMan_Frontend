import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assests/ZMM logo.png';
import { CgProfile } from "react-icons/cg";
import { RiSettingsLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { useSelector } from 'react-redux';
import '../Styles/Header.css';

function Header() {
  const navigate = useNavigate();
  const username = useSelector(state => state.user.username); 
  const role = useSelector((state) => state.user.role);

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', () => {
      navigate('/');
    });
  };

  return (
    <header className='nav-bar'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-2'>
            <img src={logo} className='main-logo' alt="Logo"/>
          </div>
          <div className='col-lg-7 nav-search'>
            {/* <div className='home-search-bar'>
              <input
                className='search-input'
                type='text'
                placeholder='Search Sellers'
              />
              <button className='search-btn'>
                <IoSearch style={{ paddingRight: "5px", fontSize: "26px" }} />Search
              </button>
            </div> */}
          </div>
          <div className='col-lg-3 nav-items'>
            <div className='navbar-menu'>
              <ul>
                <Link to='/home/seller-dashboard/all-seller'>
                  <li className='navbar-link'>
                    <CgProfile className='nav-icon'/>
                    {username}
                  </li>
                </Link>
                {(role === 'Admin' || role === 'superadmin') && ( 
                <Link to='/home/seller-dashboard/settings2'>
                  <li className='navbar-link'>
                    <RiSettingsLine className='nav-icon'/>
                    Settings
                  </li>
                </Link>
                )}
                <li className='navbar-link' onClick={handleLogout}>
                  <IoIosLogOut className='nav-icon'/>
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
