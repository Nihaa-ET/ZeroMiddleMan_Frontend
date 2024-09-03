import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../Styles/sidebar.css'; // Ensure the correct path to the CSS file
import { BsPersonFillCheck } from "react-icons/bs";
import { BsPersonFillSlash } from "react-icons/bs";
import { BsPersonFillGear } from "react-icons/bs";

const Sidebar = ({ activeTab, onTabChange }) => {
    return (
        <div className="sidebar">
            <NavLink
                to="register-user"
                className={`sidebar-link ${activeTab === 'register-user' ? 'active' : ''} new-acunt`} // Add your additional class here
                onClick={() => onTabChange('register-user')}
            >
                + New Account
            </NavLink>
            <NavLink
                to="active-users"
                className={`sidebar-link ${activeTab === 'active-users' ? 'active' : ''} nav-link`}
                onClick={() => onTabChange('active-users')}
            >
              <BsPersonFillCheck style={{fontSize:"24px"}} />
               <span> Active Accounts</span>
            </NavLink>
            <NavLink
                to="disabled-users"
                className={`sidebar-link ${activeTab === 'disabled-users' ? 'active' : ''} nav-link`}
                onClick={() => onTabChange('disabled-users')}
            >
              <BsPersonFillSlash style={{fontSize:"24px"}}  />
                <span>Disabled Accounts</span>
            </NavLink>
            <NavLink
                to="active-admins"
                className={`sidebar-link ${activeTab === 'active-admins' ? 'active' : ''} nav-link`}
                onClick={() => onTabChange('active-admins')}
            >
              <BsPersonFillGear style={{fontSize:"24px"}}  />
               <span> Active Admins</span>
            </NavLink>
        </div>
    );
};

export default Sidebar;
