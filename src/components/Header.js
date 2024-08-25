import React, { useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import logo from "../Assests/ZeroMiddleMan Logo 3.png";

const Header = () => {
  const username = useSelector(state => state.user.username); // Get the username from Redux
  const role = useSelector(state => state.user.role); // Get the role from Redux

  useEffect(() => {
    console.log("Username from Redux:", username); // Debugging: Check if username is correctly fetched
  }, [username]);

  return (
    <div className="header-container">
      <div className="header-content">
        <div>
          <img src={logo} className="header-logo" alt="Logo" />
        </div>

        <div className="header-menu">
          <div className="user-menu-container">
            <div className="user-icon" >
              <FaUserCircle />
              <div className="user-info">
                <span className='span-1'>{username}</span>  {/* Display username */}
                <span>{role}</span>       {/* Display role */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
