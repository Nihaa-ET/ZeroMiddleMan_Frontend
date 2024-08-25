import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, allowedRoles }) => {
    const role = useSelector((state) => state.user.role);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    console.log('Role:', role);
    console.log('Authenticated:', isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/Un-authorized" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/home" replace />;
    }

    return children;
};


export default PrivateRoute;
