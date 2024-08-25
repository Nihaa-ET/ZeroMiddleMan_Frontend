import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../../common/index'; // Adjust the path as needed

const ActiveUsers = () => {
    const [users, setUsers] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // Fetch the list of active users from the backend
        fetch(SummaryApi.getActiveUsers.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON from the response
            })
            .then(data => setUsers(data))
            .catch(error => {
                console.error('Error fetching users:', error);
                toast.error('Failed to fetch users.');
            });
    }, []);

    useEffect(() => {
        // Show a success message if the user was registered successfully
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
            // Update the users list to remove the disabled user
            setUsers(users.filter(user => user.id !== userId));
            toast.success('User disabled successfully.');
        })
        .catch(error => {
            console.error('Error disabling user:', error);
            toast.error('Failed to disable the user.');
        });
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
                        <th>Action</th> {/* New column header */}
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
                                <td>
                                    <button 
                                        onClick={() => handleDisable(user.id)}
                                        className="settings2-disable-button"
                                    >
                                        Disable
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
            <ToastContainer />
        </div>
    );
};

export default ActiveUsers;
