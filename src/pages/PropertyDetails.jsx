import React from 'react';
import { X, MapPin, Star, Home, Wifi, Utensils, Wind, Car, Waves, Flame } from 'lucide-react';

const PropertyDetails = ({ property, onBack, onBookNow, currentUser }) => {
    const amenityIcons = {
        'WiFi': Wifi,
        'Kitchen': Utensils,
        'AC': Wind,
        'Parking': Car,
        'Beach Access': Waves,
        'Fireplace': Flame,
        'Pool': Waves,
        'Lake View': Waves,
        'Garden': Home,
        'Wine Cellar': Home
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header */}
            <div className="sticky top-0 bg-white shadow-sm z-40 px-4 py-3 flex items-center">
                <button onClick={onBack} className="mr-4">
                    <X size={24} />
                </button>
                <h2 className="text-lg font-semibold">Property Details</h2>
            </div>

            {/* Property Image */}
            <div className="relative">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-72 object-cover"
                />
            </div>

            {/* Property Info */}
            <div className="px-6 py-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600">
                        <MapPin size={18} className="mr-1" />
                        <span>{property.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-orange-50 px-3 py-1 rounded-full">
                        <Star size={16} className="text-orange-500 fill-current" />
                        <span className="font-semibold text-gray-900">{property.rating}</span>
                        <span className="text-gray-600 text-sm">({property.reviews} reviews)</span>
                    </div>
                </div>

                <div className="bg-orange-50 rounded-2xl p-4 mb-6">
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-orange-600">USD ${property.price}</span>
                        <span className="text-gray-600 ml-2">/ night</span>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-bold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>

                <div className="mb-6">
                    <h3 className="font-bold text-gray-900 mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {property.amenities.map((amenity, index) => {
                            const Icon = amenityIcons[amenity] || Home;
                            return (
                                <div
                                    key={index}
                                    className="flex items-center space-x-2 bg-gray-50 px-4 py-3 rounded-xl"
                                >
                                    <Icon size={18} className="text-orange-500" />
                                    <span className="text-sm font-medium text-gray-700">{amenity}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                        <div className="text-sm text-gray-600">Bedrooms</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-2xl font-bold text-gray-900">{property.guests}</div>
                        <div className="text-sm text-gray-600">Max Guests</div>
                    </div>
                </div>

                <button
                    onClick={() => currentUser ? onBookNow() : alert('Please login to book')}
                    className="w-full bg-orange-500 text-white py-4 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default PropertyDetails;