import React from 'react'

// eslint-disable-next-line react/prop-types
export default function CustomerTicketCard({ ticket, handleDeleteTicket }) {
    return (
        <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-800">{ticket?.subject}</h3>
            <p className="text-gray-600 mt-2">{ticket?.description}</p>
            <p className="text-sm text-gray-500 mt-2">
                Status: <span className="font-medium">
                    {ticket?.status === 'Resolved' ? (
                        <span role="img" aria-label="resolved">✅ Resolved</span>
                    ) : (
                        <span role="img" aria-label="in progress">🔄 In Progress</span>
                    )}
                </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                    onClick={() => handleDeleteTicket(ticket?.id)}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300 flex-1"
                >
                    <span role="img" aria-label="delete">🗑️</span> Delete Ticket
                </button>
            </div>
        </div>
    );
}
