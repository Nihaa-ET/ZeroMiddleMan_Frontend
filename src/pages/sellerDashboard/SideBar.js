import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUserFriends, FaTrashAlt, FaUpload, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.role); // Fetch user role from Redux

  // Define menu items based on roles
  const menuItems = [
    { path: '/home/seller-deshboard/all-seller', name: 'All Sellers', icon: <FaUserFriends /> },
    { path: '/home/seller-deshboard/add-seller', name: 'Add Seller', icon: <FaHome />, roles: ['superadmin', 'Admin', 'TL','Editor','Viewer'] },
    { path: '/home/seller-deshboard/trash-seller-details', name: 'Trash', icon: <FaTrashAlt />, roles: ['superadmin', 'Admin', 'TL'] },
    { path: '/home/seller-deshboard/bulk-upload', name: 'Import & Export', icon: <FaUpload />, roles: ['superadmin', 'Admin', 'TL', 'Editor','Viewer'] },
    { path: '/home/seller-deshboard/settings2', name: 'Settings', icon: <FaCog />, roles: ['superadmin', 'Admin'] },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', () => {
      navigate('/');
    });
  };

  return (
    <div className="sidebar">
      <ul className="menu-list">
        {menuItems.map((item, index) => {
          // Check if the role is allowed to see this menu item
          const isVisible = !item.roles || item.roles.includes(role);
          return isVisible ? (
            <li key={index} className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}>
              <Link to={item.path} className="menu-link">
                <span className="icon">{item.icon}</span>
                <span className="menu-text">{item.name}</span>
              </Link>
            </li>
          ) : null;
        })}
      </ul>
      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
