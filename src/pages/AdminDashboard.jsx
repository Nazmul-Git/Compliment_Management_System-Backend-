import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminTicketCard from '../components/AdminTicketCard';

const AdminDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');
    const [replyMessage, setReplyMessage] = useState('');
    const [selectedTicketId, setSelectedTicketId] = useState(null); 
    const navigate = useNavigate();
    const VITE_REACT_APP_HTTP_URL = import.meta.env.VITE_REACT_APP_HTTP_URL;

    // Protect route
    useEffect(() => {
        const user = localStorage.getItem('user');
        let parsedUser = null;

        if (user) {
            try {
                parsedUser = typeof user === 'string' ? JSON.parse(user) : user;
            } catch (e) {
                console.error('Error parsing user from localStorage:', e);
            }
        }

        if (!parsedUser || parsedUser.role !== 'admin') {
            navigate('/customer');
            return;
        }

        fetchTickets();
    }, [navigate]);

    // Fetch tickets with optional filter
    const fetchTickets = async (filter = '') => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${VITE_REACT_APP_HTTP_URL}/api/tickets`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { status: filter },
            });
            setTickets(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message || 'Failed to fetch tickets');
            setLoading(false);
        }
    };

    // Handle ticket status update
    const handleUpdateStatus = async (ticketId, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${VITE_REACT_APP_HTTP_URL}/api/tickets/${ticketId}`, { status }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Update the tickets state 
            setTickets((prevTickets) =>
                prevTickets.map((ticket) =>
                    ticket.id === ticketId ? { ...ticket, status } : ticket
                )
            );
        } catch (error) {
            setError(error.message || 'Failed to update ticket status');
        }
    };

    // Handle ticket deletion
    const handleDeleteTicket = async (ticketId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${VITE_REACT_APP_HTTP_URL}/api/tickets/${ticketId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // remove the deleted ticket from the tickets state
            setTickets((prevTickets) =>
                prevTickets.filter((ticket) => ticket.id !== ticketId)
            );
        } catch (error) {
            setError(error.message || 'Failed to delete ticket');
        }
    };

    // Handle filter change
    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        fetchTickets(e.target.value);
    };

    // Handle reply 
    const handleAddReply = async (ticketId) => {
        if (!replyMessage.trim()) {
            setError('Reply message cannot be empty');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${VITE_REACT_APP_HTTP_URL}/api/replies`,
                { ticket_id: ticketId, message: replyMessage },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setReplyMessage('');
            setError('');

            // Update the tickets state 
            setTickets((prevTickets) =>
                prevTickets.map((ticket) =>
                    ticket.id === ticketId
                        ? { ...ticket, replies: [...(ticket.replies || []), response.data] }
                        : ticket
                )
            );
        } catch (error) {
            setError(error.message || 'Failed to add reply');
        }
    };

    // Logout 
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="px-4 py-8 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-r from-indigo-50 to-purple-100 min-h-screen shadow-[10px_10px_15px_0px_rgba(0,0,0,0.1)]">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800 text-center py-8">Admin Dashboard 🚀</h1>

            <div className="text-center mb-6">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300"
                >
                    Logout
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
                    {error} ❌
                </div>
            )}

            <div className="mb-6">
                <label htmlFor="statusFilter" className="mr-2 text-lg">Filter by Status:</label>
                <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                    <option value="">All</option>
                    <option value="open">Open</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center items-center space-x-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
                    <span className="text-lg font-semibold text-gray-600">Loading... 🔄</span>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <div className="hidden md:grid grid-cols-4 gap-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-4">
                        <div className="font-medium uppercase text-center">ID</div>
                        <div className="font-medium uppercase text-center">Subject</div>
                        <div className="font-medium uppercase text-center">Status</div>
                        <div className="font-medium uppercase text-center">Actions</div>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {tickets.map((ticket) => (
                            <React.Fragment key={ticket.id}>
                                <AdminTicketCard
                                    ticket={ticket}
                                    handleUpdateStatus={handleUpdateStatus}
                                    handleDeleteTicket={handleDeleteTicket}
                                    setSelectedTicketId={setSelectedTicketId}
                                />
                                {selectedTicketId === ticket.id && (
                                    <div className="p-4 bg-gray-50">
                                        <textarea
                                            value={replyMessage}
                                            onChange={(e) => setReplyMessage(e.target.value)}
                                            placeholder="Type your reply here..."
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            onClick={() => handleAddReply(ticket.id)}
                                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                        >
                                            Add Reply
                                        </button>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;