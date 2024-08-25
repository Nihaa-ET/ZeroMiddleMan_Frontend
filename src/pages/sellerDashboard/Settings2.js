import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import ActiveUsers from './ActiveUser';
import DisabledUsers from './DisabledUsers';
import RegisterUser from '../sellerDashboard/RegisterUser';
import ActiveAdmins from '../admin/ActiveAdmins'; // Import the ActiveAdmins component


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
        <div>
            <nav className="settings2-nav">
                <button onClick={() => handleTabChange('active-users')} className={activeTab === 'active-users' ? 'active' : ''}>Active Users</button>
                <button onClick={() => handleTabChange('disabled-users')} className={activeTab === 'disabled-users' ? 'active' : ''}>Disabled Users</button>
                <button onClick={() => handleTabChange('register-user')} className={activeTab === 'register-user' ? 'active' : ''}>New User</button>
                <button onClick={() => handleTabChange('active-admins')} className={activeTab === 'active-admins' ? 'active' : ''}>Active Admins</button> {/* New tab for Active Admins */}
            </nav>
            <div className="settings2-content">
                <Routes>
                    <Route index element={<Navigate to="active-users" />} />
                    <Route path="active-users" element={<ActiveUsers />} />
                    <Route path="disabled-users" element={<DisabledUsers />} />
                    <Route path="register-user" element={<RegisterUser />} />
                    <Route path="active-admins" element={<ActiveAdmins />} /> {/* New route for Active Admins */}
                </Routes>
            </div>
        </div>
    );
};

export default Settings2;
