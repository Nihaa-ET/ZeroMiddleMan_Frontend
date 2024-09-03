import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../../common/index'; // Adjust the path as needed

const ActiveAdmins = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        fetch(SummaryApi.getadmins.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON from the response
            })
            .then(data => setAdmins(data))
            .catch(error => {
                console.error('Error fetching admins:', error);
                toast.error('Failed to fetch admins.');
            });
    }, []);
    

    const handleDisable = (adminId) => {
        fetch(`${SummaryApi.disableadmin.url(adminId)}`, {
            method: SummaryApi.disableadmin.method,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Update the admins list to remove the disabled admin
            setAdmins(admins.filter(admin => admin.id !== adminId));
            toast.success('Admin disabled successfully.');
        })
        .catch(error => {
            console.error('Error disabling admin:', error);
            toast.error('Failed to disable the admin.');
        });
    };

    return (
        <div>
            <h2 className="settings2-active-admins-title">Active Admins</h2>
            <table className="settings2-active-admins-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th> {/* New column header */}
                    </tr>
                </thead>
                <tbody>
                    {admins.map(admin => (
                        <tr key={admin.id}>
                            <td>{admin.id}</td>
                            <td>{admin.username}</td>
                            <td>{admin.email}</td>
                            <td>{admin.role}</td>
                            <td>
                                <button 
                                    onClick={() => handleDisable(admin.id)}
                                    className="settings2-disable-button"
                                >
                                    Disable
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default ActiveAdmins;
