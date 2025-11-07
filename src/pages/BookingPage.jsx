import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

const BookingPage = ({ property, onConfirm, onBack, currentUser }) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [fullName, setFullName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [phone, setPhone] = useState('+1 (555) 123-4567');
    const [address, setAddress] = useState('123 Main St, Anytown');
    const [paymentMethod, setPaymentMethod] = useState('credit');

    const calculateTotal = () => {
        if (checkIn && checkOut) {
            const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
            return days * property.price;
        }
        return 0;
    };

    const handleConfirm = () => {
        if (!checkIn || !checkOut) {
            alert('Please select check-in and check-out dates');
            return;
        }
        if (new Date(checkIn) >= new Date(checkOut)) {
            alert('Check-out date must be after check-in date');
            return;
        }
        onConfirm(property.id, checkIn, checkOut, guests, paymentMethod);
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header */}
            <div className="sticky top-0 bg-white shadow-sm z-40 px-4 py-3 flex items-center">
                <button onClick={onBack} className="mr-4">
                    <X size={24} />
                </button>
                <h2 className="text-lg font-semibold">Book Your Stay</h2>
            </div>

            <div className="px-6 py-6">
                {/* Select Dates */}
                <div className="mb-6">
                    <h3 className="font-bold text-gray-900 mb-4">Select Your Dates</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Calendar size={16} className="mr-2" />
                                Check-in Date
                            </label>
                            <input
                                type="date"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Calendar size={16} className="mr-2" />
                                Check-out Date
                            </label>
                            <input
                                type="date"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                min={checkIn || new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Your Details */}
                <div className="mb-6">
                    <h3 className="font-bold text-gray-900 mb-4">Your Details</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Payment Options */}
                <div className="mb-6">
                    <h3 className="font-bold text-gray-900 mb-4">Payment Options</h3>
                    <div className="space-y-3">
                        <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer">
                            <input
                                type="radio"
                                name="payment"
                                value="credit"
                                checked={paymentMethod === 'credit'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-5 h-5 text-orange-500"
                            />
                            <span className="ml-3 font-medium">Credit Card</span>
                        </label>
                        <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer">
                            <input
                                type="radio"
                                name="payment"
                                value="paypal"
                                checked={paymentMethod === 'paypal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-5 h-5 text-orange-500"
                            />
                            <span className="ml-3 font-medium">PayPal</span>
                        </label>
                    </div>
                </div>

                {/* Price Summary */}
                {checkIn && checkOut && (
                    <div className="bg-orange-50 rounded-2xl p-4 mb-6">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700">
                                ${property.price} × {Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} nights
                            </span>
                            <span className="font-semibold">${calculateTotal()}</span>
                        </div>
                        <div className="border-t border-orange-200 pt-2 mt-2 flex justify-between">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-2xl text-orange-600">${calculateTotal()}</span>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleConfirm}
                    className="w-full bg-orange-500 text-white py-4 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg"
                >
                    Confirm Booking
                </button>
            </div>
        </div>
    );
};

export default BookingPage;