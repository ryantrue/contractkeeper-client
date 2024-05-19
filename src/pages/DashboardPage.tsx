import React from 'react';
import CreateContract from '../components/CreateContract';
import ContractList from '../components/ContractList';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        toast.success('Logout successful!');
        navigate('/login');
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <CreateContract />
            <ContractList />
        </div>
    );
};

export default DashboardPage;