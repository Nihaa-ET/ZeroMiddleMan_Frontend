import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        
        <div className="app-container">
            <ToastContainer />
            <Outlet />
        </div>
    );
};

export default App;
