import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import Login from './pages/login';
import Register from './pages/Register';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/customer" element={<CustomerDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;