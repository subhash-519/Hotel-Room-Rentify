import React, { useEffect } from 'react';

const ConfirmationPage = ({ onViewBookings }) => {
  useEffect(() => {
    const timer = setTimeout(onViewBookings, 3000);
    return () => clearTimeout(timer);
  }, [onViewBookings]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center px-4">
      <div className="text-center text-white">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 clasasName="text-4xl font-bold mb-4">Booking Confirmed!</h1>
        <p className="text-xl mb-8">Your reservation has been successfully made</p>
        <button
          onClick={onViewBookings}
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;