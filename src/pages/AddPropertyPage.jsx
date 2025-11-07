import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddPropertyPage = ({ onAdd, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        image: '',
        bedrooms: 1,
        guests: 1,
        amenities: []
    });

    const amenitiesList = ['WiFi', 'Kitchen', 'AC', 'Parking', 'Pool', 'Beach Access', 'Fireplace', 'Hiking'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.price || !formData.location || !formData.image) {
            alert('Please fill in all required fields');
            return;
        }
        onAdd({ ...formData, price: parseFloat(formData.price) });
        alert('Property added successfully!');
    };

    const toggleAmenity = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header */}
            <div className="sticky top-0 bg-white shadow-sm z-40 px-4 py-3 flex items-center">
                <button onClick={onCancel} className="mr-4">
                    <X size={24} />
                </button>
                <h2 className="text-lg font-semibold">List Your Property</h2>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Title *</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Cozy Downtown Apartment"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe your property..."
                        rows="4"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price per Night ($) *</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="120"
                            min="1"
                            className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="New York, NY"
                            className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
                    <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                        <input
                            type="number"
                            value={formData.bedrooms}
                            onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                            min="1"
                            className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Max Guests</label>
                        <input
                            type="number"
                            value={formData.guests}
                            onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                            min="1"
                            className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                    <div className="grid grid-cols-2 gap-3">
                        {amenitiesList.map(amenity => (
                            <button
                                key={amenity}
                                type="button"
                                onClick={() => toggleAmenity(amenity)}
                                className={`px-4 py-3 rounded-xl font-medium transition ${formData.amenities.includes(amenity)
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {amenity}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-4 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg"
                >
                    Add Property
                </button>
            </form>
        </div>
    );
};

export default AddPropertyPage;