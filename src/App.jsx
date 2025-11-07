import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import PropertyDetails from "./pages/PropertyDetails";
import BookingPage from "./pages/BookingPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import ProfilePage from "./pages/ProfilePage";
import AddPropertyPage from "./pages/AddPropertyPage";
import LoginPage from "./pages/LoginPage";
import BottomNav from "./components/BottomNav";

const initialProperties = [
  {
    id: 1,
    title: "Modern City Loft",
    description:
      "Chic and stylish apartment in the heart of the city, offering breathtaking skyline views and contemporary design.",
    price: 120,
    location: "Lake Tahoe, California",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    bedrooms: 2,
    guests: 4,
    rating: 4.6,
    reviews: 246,
    amenities: ["WiFi", "Kitchen", "AC", "Parking"],
    ownerId: "user1",
  },
  {
    id: 2,
    title: "Cozy Lakeside Cabin",
    description:
      "Escape to nature in this charming cabin, perfect for a peaceful retreat by the lake.",
    price: 95,
    location: "Lake District, UK",
    image:
      "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800",
    bedrooms: 3,
    guests: 6,
    rating: 4.8,
    reviews: 189,
    amenities: ["WiFi", "Kitchen", "Fireplace", "Lake View"],
    ownerId: "user2",
  },
  {
    id: 3,
    title: "Spacious Beach House",
    description:
      "Enjoy direct beach access and stunning ocean views from this expansive family-friendly beach home.",
    price: 250,
    location: "Malibu, California",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    bedrooms: 4,
    guests: 8,
    rating: 4.7,
    reviews: 313,
    amenities: ["WiFi", "Beach Access", "Pool", "Kitchen"],
    ownerId: "user1",
  },
  {
    id: 4,
    title: "Secluded Countryside Villa",
    description:
      "A tranquil villa amidst rolling hills, ideal for a quiet romantic getaway.",
    price: 180,
    location: "Tuscany, Italy",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    bedrooms: 3,
    guests: 6,
    rating: 4.9,
    reviews: 127,
    amenities: ["WiFi", "Kitchen", "Garden", "Wine Cellar"],
    ownerId: "user3",
  },
];

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [properties, setProperties] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ---------------- Load local data ----------------
  useEffect(() => {
    try {
      const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const storedProperties = JSON.parse(localStorage.getItem("properties") || "[]");
      setBookings(storedBookings);
      setProperties(storedProperties.length > 0 ? storedProperties : initialProperties);
    } catch (err) {
      console.error("Error loading from localStorage", err);
      setProperties(initialProperties);
    }
  }, []);

  useEffect(() => {
    if (properties.length > 0) {
      localStorage.setItem("properties", JSON.stringify(properties));
    }
    if (bookings) {
      localStorage.setItem("bookings", JSON.stringify(bookings));
    }
  }, [bookings, properties]);

  // ---------------- Firebase Auth ----------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/listings");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/listings");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    navigate("/");
  };

  // ---------------- Property ----------------
  const addProperty = (propertyData) => {
    const newProperty = {
      ...propertyData,
      id: Date.now(),
      ownerId: currentUser?.uid || "guest",
      rating: 0,
      reviews: 0,
    };
    setProperties([...properties, newProperty]);
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter((p) => p.id !== id));
  };

  // ---------------- Booking ----------------
  const createBooking = (propertyId, checkIn, checkOut, guests, paymentMethod) => {
    const property = properties.find((p) => p.id === propertyId);
    const days = Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = days * property.price;

    const booking = {
      id: Date.now(),
      propertyId,
      userId: currentUser?.uid || "guest",
      property,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      paymentMethod,
      status: "Confirmed",
      bookedDate: new Date().toISOString(),
    };

    setBookings([...bookings, booking]);
    navigate("/confirmation");

    setTimeout(() => navigate("/profile"), 3000);
  };

  const cancelBooking = (id) => {
    setBookings(bookings.filter((b) => b.id !== id));
  };

  // ---------------- Filters ----------------
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "trending" && property.rating >= 4.7) ||
      (selectedCategory === "beach" &&
        property.amenities.includes("Beach Access")) ||
      (selectedCategory === "mountain" &&
        property.title.toLowerCase().includes("cabin"));

    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage onGetStarted={() => navigate("/listings")} />} />
        <Route
          path="/listings"
          element={
            <ListingsPage
              properties={filteredProperties}
              onPropertyClick={(property) => {
                setSelectedProperty(property);
                navigate("/details");
              }}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              currentUser={currentUser}
              onNavigate={(path) => navigate(path)}
            />
          }
        />
        <Route
          path="/details"
          element={
            <PropertyDetails
              property={selectedProperty}
              onBack={() => navigate("/listings")}
              onBookNow={() => navigate("/booking")}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/booking"
          element={
            <BookingPage
              property={selectedProperty}
              onConfirm={createBooking}
              onBack={() => navigate("/details")}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/confirmation"
          element={<ConfirmationPage onViewBookings={() => navigate("/profile")} />}
        />
        <Route
          path="/add-property"
          element={
            <AddPropertyPage
              onAdd={(data) => {
                addProperty(data);
                navigate("/profile");
              }}
              onCancel={() => navigate("/listings")}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              user={currentUser}
              bookings={bookings.filter((b) => b.userId === currentUser?.uid)}
              properties={properties.filter((p) => p.ownerId === currentUser?.uid)}
              onCancelBooking={cancelBooking}
              onDeleteProperty={deleteProperty}
              onViewProperty={(property) => {
                setSelectedProperty(property);
                navigate("/details");
              }}
              onLogout={handleLogout}
              onNavigate={(path) => navigate(path)}
            />
          }
        />
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} onSignup={handleSignup} />}
        />
      </Routes>

      {/* Bottom Navigation */}
      {currentUser &&
        !["/", "/login", "/confirmation"].includes(location.pathname) && (
          <BottomNav
            currentPage={location.pathname.replace("/", "")}
            onNavigate={(path) => navigate(path)}
          />
        )}
    </div>
  );
};

export default App;
