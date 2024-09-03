import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRole } from '../../store/UserSlice';  // Import the setRole action
import SummaryApi from '../../common/index'; // Adjust the path as needed

const RegisterSuperAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();  // Use dispatch

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(SummaryApi.registerUser.url, {
                method: SummaryApi.registerUser.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    email,
                    role: 'superadmin',  // Role is set to 'superadmin' and is not editable
                    authCode
                }),
            });

            if (!response.ok) {
                throw new Error('Registration failed.');
            }

            // Set role in Redux store
            dispatch(setRole('superadmin'));

            setSuccess('Registration successful!');
            setError('');
            navigate('/home/seller-deshboard/all-seller');  // Navigate to seller-dashboard on success

        } catch (err) {
            setError('Registration failed. Please check your inputs.');
            setSuccess('');
        }
    };

    return (
        <div className="registration-form-2-container">
            <h2 className="registration-form-2-title">Register</h2>
            <form className="registration-form-2" onSubmit={handleSubmit}>
                <div className="registration-form-2-input-group">
                    <label className="registration-form-2-input-label" htmlFor="username">Username</label>
                    <input
                        className="registration-form-2-input-field"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="registration-form-2-input-group">
                    <label className="registration-form-2-input-label" htmlFor="password">Password</label>
                    <input
                        className="registration-form-2-input-field"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="registration-form-2-input-group">
                    <label className="registration-form-2-input-label" htmlFor="email">Email</label>
                    <input
                        className="registration-form-2-input-field"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="registration-form-2-input-group">
                    <label className="registration-form-2-input-label" htmlFor="authCode">Authentication Code</label>
                    <input
                        className="registration-form-2-input-field"
                        type="text"
                        id="authCode"
                        value={authCode}
                        onChange={(e) => setAuthCode(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="registration-form-2-input-group">
                    <label className="registration-form-2-input-label" htmlFor="role">Role</label>
                    <input
                        className="registration-form-2-input-field"
                        type="text"
                        id="role"
                        value="superadmin"
                        readOnly
                    />
                </div>
                <button className="registration-form-2-submit-button" type="submit">Register</button>
                {error && <p className="registration-form-2-error-message">{error}</p>}
                {success && <p className="registration-form-2-success-message">{success}</p>}
            </form>
            <div className="registration-form-2-footer">
                <p>Not a Super Admin? <Link to="/">Back to Login</Link></p>
            </div>
        </div>
    );
};

export default RegisterSuperAdmin;
