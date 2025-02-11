import React from 'react';
import { motion } from 'framer-motion';

// eslint-disable-next-line react/prop-types
export default function AdminTicketCard({ handleUpdateStatus, handleDeleteTicket, ticket }) {
    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 hover:bg-gray-100 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.01 }} 
            whileTap={{ scale: 0.98 }}   
        >
            <div className="text-sm text-gray-800 sm:col-span-1 md:col-span-1 text-center">
                ID: {ticket?.id}
            </div>

            <div className="text-sm text-gray-800 sm:col-span-1 md:col-span-1">
                {ticket?.subject}
            </div>

            <div className="text-sm text-center">
                <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${ticket?.status === 'Resolved' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                        }`}
                >
                    {ticket?.status} {ticket?.status === 'Resolved' ? '✅' : '⏳'}
                </span>
            </div>

            <div className="text-center sm:col-span-2 md:col-span-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.button
                        onClick={() => handleUpdateStatus(ticket?.id, 'Resolved')}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-300 transform"
                        disabled={ticket?.status === 'Resolved'}
                        whileHover={{ scale: 1.05 }}  
                        whileTap={{ scale: 0.95 }}    
                    >
                        {ticket?.status === 'Resolved' ? 'Resolved ✅' : 'Mark as Resolved ⏳'}
                    </motion.button>

                    <motion.button
                        onClick={() => handleDeleteTicket(ticket?.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 transform"
                        whileHover={{ scale: 1.05 }}  
                        whileTap={{ scale: 0.95 }}    
                    >
                        Delete 🗑️
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
