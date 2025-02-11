import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminTicketCard from '../components/AdminTicketCard';

const AdminDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/tickets', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTickets(response.data); // Set the state with the new ticket list
            setLoading(false);
        } catch (error) {
            setError(error.message || 'Failed to fetch tickets');
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (ticketId, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/tickets/${ticketId}`, { status }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Update the tickets state immediately without refetching all tickets
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
            await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Remove the deleted ticket from the tickets state
            setTickets((prevTickets) =>
                prevTickets.filter((ticket) => ticket.id !== ticketId)
            );
        } catch (error) {
            setError(error.message || 'Failed to delete ticket');
        }
    };

    return (
        <div className="px-4 py-6 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-r from-indigo-50 to-purple-100 min-h-screen">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800 text-center">Admin Dashboard 🚀</h1>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
                    {error} ❌
                </div>
            )}

            {/* Loading Spinner */}
            {loading ? (
                <div className="flex justify-center items-center space-x-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
                    <span className="text-lg font-semibold text-gray-600">Loading... 🔄</span>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-4 gap-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-4">
                        <div className="font-medium uppercase text-center">ID</div>
                        <div className="font-medium uppercase text-center">Subject</div>
                        <div className="font-medium uppercase text-center">Status</div>
                        <div className="font-medium uppercase text-center">Actions</div>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {tickets.map((ticket) => (
                            <AdminTicketCard key={ticket.id} handleUpdateStatus={handleUpdateStatus} handleDeleteTicket={handleDeleteTicket} ticket={ticket} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
