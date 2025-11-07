import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 text-white mt-16 shadow-inner">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-white/20 pb-8">

                    {/* Brand Section */}
                    <div>
                        <h3 className="text-2xl font-extrabold mb-3 tracking-wide">StayEase</h3>
                        <p className="text-gray-200 leading-relaxed">
                            Your trusted property rental platform for comfort and convenience.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-300 hover:text-white transition-colors cursor-pointer">About</li>
                            <li className="text-gray-300 hover:text-white transition-colors cursor-pointer">Contact</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3">Contact</h3>
                        <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                            support@stayease.com
                        </p>
                    </div>

                </div>

                <div className="mt-8 text-center text-gray-300 text-sm tracking-wide">
                    © {new Date().getFullYear()} <span className="font-semibold">StayEase</span> — All rights reserved.
                </div>
            </div>
        </footer>
    )
}
