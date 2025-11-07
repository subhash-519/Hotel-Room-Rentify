import React from "react";
import { Home, Info, Compass, Mail } from "lucide-react";

const HomePage = ({ onGetStarted }) => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 scroll-smooth">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full bg-orange-600 text-white shadow-md z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                    <div className="flex items-center space-x-2">
                        <Home className="text-white" size={28} />
                        <h1 className="text-2xl font-bold tracking-wide">Rentify</h1>
                    </div>
                    <ul className="hidden md:flex space-x-8 font-medium">
                        <li>
                            <a href="#home" className="hover:text-yellow-300 transition">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#about" className="hover:text-yellow-300 transition">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#explore" className="hover:text-yellow-300 transition">
                                Explore
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:text-yellow-300 transition">
                                Contact
                            </a>
                        </li>
                    </ul>
                    <button
                        onClick={onGetStarted}
                        className="bg-white text-orange-600 px-5 py-2 rounded-full font-semibold hover:bg-orange-100 transition shadow-sm"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                id="home"
                className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20"
            >
                <Home size={90} className="mb-6 text-orange-600" />
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    Find Your Perfect Stay
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-600">
                    Discover unique homes and rental properties across the city.
                    Comfort, affordability, and style — all in one place.
                </p>
                <button
                    onClick={onGetStarted}
                    className="bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-700 transition shadow-md"
                >
                    Get Started
                </button>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-white text-center shadow-inner">
                <div className="max-w-4xl mx-auto px-6">
                    <Info size={50} className="mx-auto mb-6 text-orange-600" />
                    <h2 className="text-4xl font-bold mb-4">About Rentify</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Rentify is a modern property rental platform designed to simplify
                        the process of finding and managing rental properties. Whether you’re
                        looking for a cozy apartment, a beachside villa, or a mountain cabin,
                        Rentify helps you explore top-rated listings in minutes.
                    </p>
                </div>
            </section>

            {/* Explore Section */}
            <section id="explore" className="py-24 bg-gray-100 text-center">
                <div className="max-w-5xl mx-auto px-6">
                    <Compass size={50} className="mx-auto mb-6 text-orange-600" />
                    <h2 className="text-4xl font-bold mb-4">Explore Destinations</h2>
                    <p className="text-lg mb-10 text-gray-600">
                        Discover amazing stays across cities — from modern lofts to countryside escapes.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {["City Apartments", "Beach Villas", "Mountain Cabins"].map(
                            (place, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition"
                                >
                                    <h3 className="text-2xl font-semibold mb-2 text-orange-700">
                                        {place}
                                    </h3>
                                    <p className="text-gray-600">
                                        Find the best {place.toLowerCase()} with just a few clicks.
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 bg-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <Mail size={50} className="mx-auto mb-6 text-orange-600" />
                    <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-lg mb-8 text-gray-600">
                        Have questions or feedback? We’d love to hear from you.
                    </p>
                    <button className="bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-700 transition shadow-md">
                        Contact Us
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-6 text-center bg-gray-200 text-gray-600 text-sm">
                © {new Date().getFullYear()} Rentify. All rights reserved.
            </footer>
        </div>
    );
};

export default HomePage;
