import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './SideBar'; // Import the Sidebar component
import ActiveUsers from './ActiveUser';
import DisabledUsers from './DisabledUsers';
import RegisterUser from '../sellerDashboard/RegisterUser';
import ActiveAdmins from '../admin/ActiveAdmins'; // Import the ActiveAdmins component
import '../../Styles/settings-2.css';
const Settings2 = () => {
    const [activeTab, setActiveTab] = useState('active-users');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/settings2') {
            setActiveTab('active-users');
        } else {
            setActiveTab(location.pathname.split('/').pop());
        }
    }, [location]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        navigate(tab);
    };

    return (
        <div className="settings2-container">
            <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
            <div className="settings2-content">
                <Routes>
                    <Route index element={<Navigate to="active-users" />} />
                    <Route path="active-users" element={<ActiveUsers />} />
                    <Route path="disabled-users" element={<DisabledUsers />} />
                    <Route path="register-user" element={<RegisterUser />} />
                    <Route path="active-admins" element={<ActiveAdmins />} />
                </Routes>
            </div>
        </div>
    );
};

export default Settings2;
