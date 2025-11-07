import React, { useState } from 'react';
import { User, Calendar, Home, MapPin, LogOut, Plus } from 'lucide-react';

const ProfilePage = ({
    user,
    bookings,
    properties,
    onCancelBooking,
    onDeleteProperty,
    onViewProperty,
    onLogout,
    onNavigate
}) => {
    const [activeTab, setActiveTab] = useState('bookings');

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white shadow-sm px-6 py-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>

                {/* User Info */}
                <div className="flex items-center mb-6">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-20 h-20 rounded-full mr-4"
                    />
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center space-x-2 bg-gray-100 py-3 rounded-xl hover:bg-gray-200 transition">
                        <User size={18} />
                        <span className="text-sm font-medium">Invite Friends</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 bg-gray-100 py-3 rounded-xl hover:bg-gray-200 transition">
                        <User size={18} />
                        <span className="text-sm font-medium">Edit Profile</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white mt-2 px-6 py-3 flex space-x-4 border-b">
                <button
                    onClick={() => setActiveTab('bookings')}
                    className={`pb-3 px-4 font-semibold transition ${activeTab === 'bookings'
                            ? 'text-orange-600 border-b-2 border-orange-600'
                            : 'text-gray-500'
                        }`}
                >
                    Booking History
                </button>
                <button
                    onClick={() => setActiveTab('properties')}
                    className={`pb-3 px-4 font-semibold transition ${activeTab === 'properties'
                            ? 'text-orange-600 border-b-2 border-orange-600'
                            : 'text-gray-500'
                        }`}
                >
                    My Properties
                </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
                {activeTab === 'bookings' && (
                    <div className="space-y-4">
                        {bookings.length === 0 ? (
                            <div className="text-center py-12">
                                <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 mb-2">No bookings yet</h3>
                                <p className="text-gray-500">Start exploring properties!</p>
                            </div>
                        ) : (
                            bookings.map(booking => (
                                <div key={booking.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                    <div className="flex">
                                        <img
                                            src={booking.property.image}
                                            alt={booking.property.title}
                                            className="w-28 h-28 object-cover"
                                        />
                                        <div className="flex-1 p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-gray-900">{booking.property.title}</h3>
                                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                                    {booking.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">
                                                {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-gray-600 mb-2">{booking.guests} guests</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold text-orange-600">${booking.totalPrice}</span>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm('Cancel this booking?')) {
                                                            onCancelBooking(booking.id);
                                                        }
                                                    }}
                                                    className="text-red-600 text-sm font-medium"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'properties' && (
                    <div className="space-y-4">
                        {properties.length === 0 ? (
                            <div className="text-center py-12">
                                <Home size={64} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 mb-2">No properties listed</h3>
                                <p className="text-gray-500 mb-4">Start earning by listing your property!</p>
                                <button
                                    onClick={() => onNavigate('add-property')}
                                    className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
                                >
                                    Add Property
                                </button>
                            </div>
                        ) : (
                            properties.map(property => (
                                <div key={property.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                    <div className="flex">
                                        <img
                                            src={property.image}
                                            alt={property.title}
                                            className="w-28 h-28 object-cover"
                                        />
                                        <div className="flex-1 p-4">
                                            <h3 className="font-bold text-gray-900 mb-1">{property.title}</h3>
                                            <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold text-orange-600">${property.price}/night</span>
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => onViewProperty(property)}
                                                        className="text-blue-600 text-sm font-medium"
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm('Delete this property?')) {
                                                                onDeleteProperty(property.id);
                                                            }
                                                        }}
                                                        className="text-red-600 text-sm font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Settings & Support */}
            <div className="bg-white mt-2 px-6 py-4">
                <h3 className="font-bold text-gray-900 mb-4">Settings & Support</h3>
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-between py-3 text-gray-700">
                        <span>Email Preferences</span>
                        <span className="text-gray-400">→</span>
                    </button>
                    <button className="w-full flex items-center justify-between py-3 text-gray-700">
                        <span>Change Password</span>
                        <span className="text-gray-400">→</span>
                    </button>
                    <button className="w-full flex items-center justify-between py-3 text-gray-700">
                        <span>Payment Methods</span>
                        <span className="text-gray-400">→</span>
                    </button>
                    <button className="w-full flex items-center justify-between py-3 text-gray-700">
                        <span>Activity Log</span>
                        <span className="text-gray-400">→</span>
                    </button>
                    <button className="w-full flex items-center justify-between py-3 text-gray-700">
                        <span>Support & Help</span>
                        <span className="text-gray-400">→</span>
                    </button>
                    <button className="w-full flex items-center justify-between py-3 text-gray-700">
                        <span>App Settings</span>
                        <span className="text-gray-400">→</span>
                    </button>
                </div>

                <button
                    onClick={onLogout}
                    className="w-full bg-pink-500 text-white py-4 rounded-full font-semibold hover:bg-pink-600 transition mt-6 flex items-center justify-center space-x-2"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;