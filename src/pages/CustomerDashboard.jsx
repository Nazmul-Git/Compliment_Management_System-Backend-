import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomerTicketCard from '../components/CustomerTicketCard';
import { FaSearch } from 'react-icons/fa';

const CustomerDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Protect route
    useEffect(() => {
        const user = localStorage.getItem('user');
        let parsedUser = null;

        if (user) {
            try {
                parsedUser = JSON.parse(user);
                if (parsedUser.role !== 'customer') {
                    navigate('/');
                    return;
                }
                setCustomerName(parsedUser.username);
            } catch (e) {
                console.error('Error parsing user from localStorage:', e);
                navigate('/');
                return;
            }
        } else {
            navigate('/');
            return;
        }

        fetchTickets();
    }, [navigate]);

    // Fetch tickets with optional search
    const fetchTickets = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/tickets', {
                headers: { Authorization: `Bearer ${token}` },
                params: { search }, // Pass search term as query parameter
            });
            setTickets(response.data);
        } catch (error) {
            setError(error.message || 'Failed to fetch tickets');
        } finally {
            setLoading(false);
        }
    };

    // Create a new ticket
    const handleCreateTicket = async () => {
        if (!subject || !description) {
            setError('❗ Subject and description are required');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:5000/api/tickets',
                { subject, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchTickets();
            setSubject('');
            setDescription('');
            setError('');
        } catch (error) {
            setError(error.message || '❗ Failed to create ticket');
        }
    };

    // Delete a ticket with confirmation
    const handleDeleteTicket = async (ticketId) => {
        if (window.confirm('Are you sure you want to delete this ticket?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                fetchTickets();
            } catch (error) {
                setError(error.message || '❗ Failed to delete ticket');
            }
        }
    };

    // Logout method
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/'); 
    };

    return (
        <div className="sticky top-0 min-h-screen p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
                    👋 Welcome, {customerName}!
                </h1>

                <div className="text-center mb-8">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300"
                    >
                        Logout
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-lg mb-8 text-center">
                        {error}
                    </div>
                )}

                {/* Grid Layout for Create Ticket Form and Ticket List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Create Ticket Form */}
                    <div className="p-8 rounded-xl transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                            ✏️ Create New Ticket
                        </h2>
                        <div className="space-y-6">
                            <input
                                type="text"
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                rows="5"
                            />
                            <button
                                onClick={handleCreateTicket}
                                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Create Ticket
                            </button>
                        </div>
                    </div>

                    <div className="p-8 rounded-xl transition-shadow duration-300 overflow-y-auto max-h-[calc(100vh-200px)] sticky top-0">
                        <div className="flex justify-between">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Tickets</h2>
                            {/* Search Bar */}
                            <div className="mb-10 flex items-center">
                                <FaSearch className="mr-2 text-xl" />
                                <input
                                    type="text"
                                    placeholder="Search tickets..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        fetchTickets();
                                    }}
                                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                />
                            </div>
                        </div>
                        {loading ? (
                            <p className="text-gray-600 text-center">Loading...</p>
                        ) : tickets.length === 0 ? (
                            <p className="text-gray-600 text-center">😞 No tickets found.</p>
                        ) : (
                            <div className="space-y-6">
                                {tickets.map((ticket) => (
                                    <CustomerTicketCard
                                        key={ticket.id}
                                        ticket={ticket}
                                        handleDeleteTicket={handleDeleteTicket}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
