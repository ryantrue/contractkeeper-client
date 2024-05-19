import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EditContract from './components/EditContract';
import ContractDetails from './pages/ContractDetails';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <ToastContainer />
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
                    <Route path="/contracts/edit/:id" element={<PrivateRoute element={<EditContract />} />} />
                    <Route path="/contracts/:id" element={<PrivateRoute element={<ContractDetails />} />} />
                    <Route path="/" element={<LoginPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;