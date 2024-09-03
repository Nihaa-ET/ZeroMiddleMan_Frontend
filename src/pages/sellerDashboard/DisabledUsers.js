import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../../common/index'; // Adjust the path according to your file structure
import { FaRegTrashAlt } from "react-icons/fa";
const DisabledUsers = () => {
    const [users, setUsers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        fetch(SummaryApi.getDisabledUsers.url, {
            method: SummaryApi.getDisabledUsers.method,
        })
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error('Error fetching disabled users:', error));
    }, []);

    const handleActivate = (userId) => {
        fetch(SummaryApi.activateUser.url(userId), {
            method: SummaryApi.activateUser.method,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(() => {
            setUsers(users.filter(user => user.id !== userId));
            toast.success('User activated successfully!');
        })
        .catch(error => {
            console.error('Error activating user:', error);
            toast.error('Failed to activate user.');
        });
    };

    const handleDelete = (userId) => {
        fetch(SummaryApi.deleteUser.url(userId), {
            method: SummaryApi.deleteUser.method,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(() => {
            setUsers(users.filter(user => user.id !== userId));
            setShowPopup(false);
            toast.success('User deleted successfully!');
        })
        .catch(error => {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user.');
        });
    };

    const openPopup = (userId) => {
        setUserToDelete(userId);
        setShowPopup(true);
    };

    const closePopup = () => {
        setUserToDelete(null);
        setShowPopup(false);
    };

    return (
        <div>
            <h2 className="settings2-disabled-users-title">Disabled Users</h2>
            <table className="settings2-disabled-users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td></td>
                            <td>{user.role}</td>
                            <td>
                                <button 
                                    onClick={() => handleActivate(user.id)}
                                    className="settings2-activate-button"
                                >
                                    Activate
                                </button>
                                <button 
                                    onClick={() => openPopup(user.id)}
                                    className="settings2-delete-button"
                                >
                                    <FaRegTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Are you sure you want to delete this user?</h3>
                        <button 
                            onClick={() => handleDelete(userToDelete)}
                            className="popup-confirm-button"
                        >
                            OK
                        </button>
                        <button 
                            onClick={closePopup}
                            className="popup-cancel-button"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Add the ToastContainer */}
            <ToastContainer />
        </div>
    );
};

export default DisabledUsers;
