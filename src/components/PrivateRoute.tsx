import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
    const token = getCookie('token');
    return token ? element : <Navigate to="/login" />;
};

function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return "";
}

export default PrivateRoute;