import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../../common/index'; // Adjust the path as needed
import '../../Styles/ActiveUser.css';
import { FaEdit } from "react-icons/fa";

const ActiveUsers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); 
    const [showModal, setShowModal] = useState(false); 
    const [showPasswordChange, setShowPasswordChange] = useState(false); 
    const [newPassword, setNewPassword] = useState(''); // State for the new password
    const location = useLocation();

    useEffect(() => {
        fetch(SummaryApi.getActiveUsers.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setUsers(data))
            .catch(error => {
                console.error('Error fetching users:', error);
                toast.error('Failed to fetch users.');
            });
    }, []);

    useEffect(() => {
        if (location.state && location.state.registered) {
            toast.success('Registration successful!');
        }
    }, [location.state]);

    const handleDisable = (userId) => {
        fetch(SummaryApi.disableUser.url(userId), {
            method: SummaryApi.disableUser.method,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUsers(users.filter(user => user.id !== userId));
            toast.success('User disabled successfully.');
        })
        .catch(error => {
            console.error('Error disabling user:', error);
            toast.error('Failed to disable the user.');
        });
    };

    const handleEdit = (user) => {
        setSelectedUser(user); 
        setShowModal(true); 
        setShowPasswordChange(false); 
    };

    const handleSave = () => {
        const payload = { 
            userId: selectedUser.id, 
            username: selectedUser.username,
            email: selectedUser.email,
            role: selectedUser.role,
            ...(newPassword && { password: newPassword }) // Only include password if changed
        };
    
        fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            toast.success('User details updated successfully.');
            setShowModal(false); 
            setUsers(users.map(user => user.id === data.id ? data : user));
        })
        .catch(error => {
            console.error('Error updating user:', error);
            toast.error('Failed to update user details.');
        });
    };
    

    const togglePasswordChange = () => {
        setShowPasswordChange(!showPasswordChange);
    };

    return (
        <div>
            <h2 className="settings2-active-users-title">Active Users</h2>
            <table className="settings2-active-users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td></td> {/* Password field is not displayed for security reasons */}
                                <td>{user.role}</td>
                                <td className='action-btns'>
                                    
                                    <button 
                                        onClick={() => handleEdit(user)} 
                                        className="settings2-edit-button"
                                    >
                                       <FaEdit style={{fontSize:"15px"}} />
                                    </button>
                                    <button 
                                        onClick={() => handleDisable(user.id)}
                                        className="settings2-disable-button"
                                    >
                                        Deactivate
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No active users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit User</h3>
                        <form>
                            <div>
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    value={selectedUser.username} 
                                    onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })} 
                                />
                            </div>
                            <div>
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    value={selectedUser.email} 
                                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} 
                                />
                            </div>
                            <div>
                                <label>Role</label>
                                <select 
                                    value={selectedUser.role} 
                                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}>
                                    <option value="Admin">Admin</option>
                                    <option value="TL">TL</option>
                                    <option value="Editor">Editor</option>
                                    <option value="Viewer">Viewer</option>
                                </select>
                            </div>
                            <div>
                                <label>Change Password</label>
                                <button 
                                    type="button" 
                                    onClick={togglePasswordChange} 
                                    className="settings2-toggle-password-button"
                                >
                                    {showPasswordChange ? 'Cancel' : 'Change Password'}
                                </button>
                            </div>
                            {showPasswordChange && (
                                <div className={`password-change-container ${showPasswordChange ? 'show' : ''}`}>
                                    <input 
                                        type="password" 
                                        placeholder="New Password" 
                                        onChange={(e) => setNewPassword(e.target.value)} 
                                    />
                                </div>
                            )}
                            <div>
                                <button type="button" onClick={handleSave} className="settings2-save-button">Save</button>
                                <button type="button" onClick={() => setShowModal(false)} className="settings2-cancel-button">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default ActiveUsers;
