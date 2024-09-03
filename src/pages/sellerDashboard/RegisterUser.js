import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../../common/index'; // Adjust the path according to your project structure

const RegisterUser = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        role: ''
    });

    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(SummaryApi.registerUser.url, {
                method: SummaryApi.registerUser.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Navigate with a state indicating success
            navigate('/home/seller-dashboard/settings2/active-users', { state: { registered: true } });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-form-container">
            <ToastContainer />
            <form className="register-form" onSubmit={handleSubmit}>
                <input 
                    className="register-input"
                    type="text" 
                    name="username"
                    placeholder="Username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required
                />
                <input 
                    className="register-input"
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required
                />
                <input 
                    className="register-input"
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required
                />
                <select 
                    className="register-select"
                    name="role" 
                    value={formData.role} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="TL">TL</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                </select>
                <button className="register-button" type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterUser;
