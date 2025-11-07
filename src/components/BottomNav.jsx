import React from "react";
import { Home, Search, Plus, User } from "lucide-react";

export default function BottomNav({ currentPage, onNavigate }) {
    const navItems = [
        { id: "listings", icon: <Home />, label: "Home" },
        { id: "search", icon: <Search />, label: "Search" },
        { id: "add-property", icon: <Plus />, label: "Add" },
        { id: "profile", icon: <User />, label: "Profile" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-teal-600 text-white shadow-lg flex justify-around py-2 rounded-t-2xl">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onNavigate(`/${item.id}`)}
                    className={`flex flex-col items-center text-sm transition-colors ${currentPage === item.id ? "text-yellow-300" : "text-white/90"
                        }`}
                >
                    {item.icon}
                    <span className="text-xs mt-1">{item.label}</span>
                </button>
            ))}
        </nav>
    );
}
