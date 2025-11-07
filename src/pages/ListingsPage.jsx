import React from 'react';
import { Search, Home, Star, Waves, Mountain, Heart, MapPin } from 'lucide-react';

const ListingsPage = ({
    properties,
    onPropertyClick,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    currentUser,
    onNavigate
}) => {
    const categories = [
        { id: 'all', label: 'Amazing Views', icon: Home },
        { id: 'trending', label: 'Trending', icon: Star },
        { id: 'beach', label: 'Beach Fronts', icon: Waves },
        { id: 'mountain', label: 'Cabins', icon: Mountain }
    ];

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold text-gray-900">Rentify</h1>
                        {currentUser ? (
                            <button
                                onClick={() => onNavigate('profile')}
                                className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500"
                            >
                                <img
                                    src={currentUser.avatar}
                                    alt={currentUser.name}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ) : (
                            <button
                                onClick={() => onNavigate('login')}
                                className="text-orange-600 font-semibold"
                            >
                                Login
                            </button>
                        )}
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search properties..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="overflow-x-auto hide-scrollbar">
                    <div className="flex space-x-2 px-4 pb-3">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition ${selectedCategory === cat.id
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <cat.icon size={16} />
                                <span className="text-sm font-medium">{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Property Grid */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {properties.map(property => (
                        <div
                            key={property.id}
                            onClick={() => onPropertyClick(property)}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition cursor-pointer"
                        >
                            <div className="relative">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="w-full h-56 object-cover"
                                />
                                <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                                    <Heart size={18} />
                                </button>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900 text-lg">{property.title}</h3>
                                    <div className="flex items-center space-x-1">
                                        <Star size={14} className="text-orange-500 fill-current" />
                                        <span className="text-sm font-semibold">{property.rating}</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-2 flex items-center">
                                    <MapPin size={14} className="mr-1" />
                                    {property.location}
                                </p>
                                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                                    {property.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-xl font-bold text-gray-900">${property.price}</span>
                                        <span className="text-gray-500 text-sm"> / night</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {properties.length === 0 && (
                    <div className="text-center py-20">
                        <Search size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No properties found</h3>
                        <p className="text-gray-500">Try adjusting your search filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListingsPage;