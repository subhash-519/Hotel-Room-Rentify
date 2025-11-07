import React from "react";
import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition relative">
            <div className="h-48 w-full overflow-hidden">
                <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                        <p className="text-sm text-gray-500">{property.location}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-blue-600 font-bold">₹{property.price}</div>
                        <div className="text-xs text-gray-400">/month</div>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mt-3 line-clamp-2">{property.description}</p>

                <div className="mt-4 flex items-center justify-between">
                    <Link to={`/property/${property.id}`} className="text-sm font-medium text-blue-600 hover:underline">
                        View details
                    </Link>
                    <Link to={`/booking/${property.id}`} className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm shadow-sm hover:bg-blue-700">
                        Book
                    </Link>
                </div>
            </div>
        </div>
    );
}
