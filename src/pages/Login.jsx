import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });
            const role = response.data.role;
            // console.log('Full response data:', response.data);
            localStorage.setItem('token', response.data.token);
            let user = {
                username,
                password,
                role
            }
            localStorage.setItem('user', JSON.stringify(user));
            console.log('Login successful, role:', role);
            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/customer');
            }
        } catch (error) {
            console.error('Login failed 🚨:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Login 🔑</h1>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 transform hover:scale-105"
                    >
                        Login
                    </button>
                </div>
                <p className="mt-4 text-center">
                    Don't have an account?{' '}
                    <button
                        onClick={() => navigate('/signup')}
                        className="text-blue-500 hover:underline"
                    >
                        Register here ✨
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
