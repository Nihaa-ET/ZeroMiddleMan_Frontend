import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setRole, setAuthenticated, setUsername } from '../../store/UserSlice'; // Import setUsername
import SummaryApi from '../../common/index'; // Adjust the path as needed
import '../../Styles/loginform.css';
import logo from '../../Assests/ZMM logo.png'
import { MdOutlinePersonOutline } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";


const LoginForm = () => {
    const [username, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(SummaryApi.login.url, {
                method: SummaryApi.login.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials or login failed.');
            }

            const data = await response.json();
            const { role } = data;

            // Store the user data in localStorage
            localStorage.setItem('userdata', JSON.stringify(data));

            // Dispatch actions to set role, username, and authentication status
            dispatch(setRole(role));
            dispatch(setUsername(username));  // Dispatch the username
            dispatch(setAuthenticated(true));  // Set isAuthenticated to true
            console.log("Dispatching username:", username);
                
            toast.success('Login successful!');
            setSuccess('Login successful!');
            setError('');

            // Navigate to the dashboard or desired route
            navigate('/home/seller-dashboard/allseller-details');
        } catch (err) {
            toast.error('Login failed. Please check your credentials.');
            setError(err.message);
            setSuccess('');
        }
    };

    return (
        <div className="loginForm-container" >

            <div className="loginForm-login">
                <div className='login-logo'>
                <img src={logo} className='login-logo-1' alt="ZMM Logo"/>
                </div>
                <form className="loginForm-form" onSubmit={handleSubmit}>
                    <div className="loginForm-form-group">
                        <label className="loginForm-form-label" htmlFor="username"><MdOutlinePersonOutline className='login-icon' /> User Name</label>
                        <input
                            className="loginForm-form-input"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsernameInput(e.target.value)}
                            required
                        />
                    </div>
                    <div className="loginForm-form-group">
                        <label className="loginForm-form-label" htmlFor="password"><IoLockClosed  className='login-icon'/> Password</label>
                        <input
                            className="loginForm-form-input"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="loginForm-submit-button">
                        Login
                    </button>
                    {error && <p className="loginForm-error-message">{error}</p>}
                    {success && <p className="loginForm-success-message">{success}</p>}
                </form>
                {/* <div className="loginForm-register-link">
                    <p>Are you a Super Admin? <Link to="/registerSuperadmin">Register here</Link></p>
                </div> */}
            </div>
        </div>
    );
};

export default LoginForm;
