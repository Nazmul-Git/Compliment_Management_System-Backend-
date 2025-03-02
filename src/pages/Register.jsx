import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const VITE_REACT_APP_HTTP_URL = import.meta.env.VITE_REACT_APP_HTTP_URL;

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${VITE_REACT_APP_HTTP_URL}/api/auth/signup`, {
                username,
                password,
                role,
            });
            if (response.data.message === 'User registered successfully') {
                navigate('/');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed 🚨');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-96 transform transition-all duration-500 hover:scale-105">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Create an Account ✨
                </h1>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        onClick={handleRegister}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 transform hover:scale-105"
                    >
                        Register 📝
                    </button>
                </div>
                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/')}
                        className="text-blue-600 hover:text-blue-800 hover:underline transition duration-300"
                    >
                        Login here 👈
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
