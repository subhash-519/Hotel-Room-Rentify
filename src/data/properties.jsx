import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import PropertyDetails from './pages/PropertyDetails';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ProfilePage from './pages/ProfilePage';
import AddPropertyPage from './pages/AddPropertyPage';
import LoginPage from './pages/LoginPage';
import BottomNav from './components/BottomNav';

const initialProperties = [
  {
    id: 1,
    title: "Modern City Loft",
    description: "Chic and stylish apartment in the heart of the city, offering breathtaking skyline views and contemporary design.",
    price: 120,
    location: "Lake Tahoe, California",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    bedrooms: 2,
    guests: 4,
    rating: 4.6,
    reviews: 246,
    amenities: ["WiFi", "Kitchen", "AC", "Parking"],
    ownerId: "user1"
  },
  {
    id: 2,
    title: "Cozy Lakeside Cabin",
    description: "Escape to nature in this charming cabin, perfect for a peaceful retreat by the lake.",
    price: 95,
    location: "Lake District, UK",
    image: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800",
    bedrooms: 3,
    guests: 6,
    rating: 4.8,
    reviews: 189,
    amenities: ["WiFi", "Kitchen", "Fireplace", "Lake View"],
    ownerId: "user2"
  },
  {
    id: 3,
    title: "Spacious Beach House",
    description: "Enjoy direct beach access and stunning ocean views from this expansive family-friendly beach home.",
    price: 250,
    location: "Malibu, California",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    bedrooms: 4,
    guests: 8,
    rating: 4.7,
    reviews: 313,
    amenities: ["WiFi", "Beach Access", "Pool", "Kitchen"],
    ownerId: "user1"
  },
  {
    id: 4,
    title: "Secluded Countryside Villa",
    description: "A tranquil villa amidst rolling hills, ideal for a quiet romantic getaway.",
    price: 180,
    location: "Tuscany, Italy",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    bedrooms: 3,
    guests: 6,
    rating: 4.9,
    reviews: 127,
    amenities: ["WiFi", "Kitchen", "Garden", "Wine Cellar"],
    ownerId: "user3"
  }
];

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [properties, setProperties] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setProperties(initialProperties);
  }, []);

  const handleLogin = (email, password) => {
    const user = {
      id: 'user1',
      name: 'Isabelle Chen',
      email,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'
    };
    setCurrentUser(user);
    setCurrentPage('listings');
  };

  const handleSignup = (name, email, password) => {
    const user = {
      id: `user${Date.now()}`,
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'
    };
    setCurrentUser(user);
    setCurrentPage('listings');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const addProperty = (propertyData) => {
    const newProperty = {
      ...propertyData,
      id: Date.now(),
      ownerId: currentUser.id,
      rating: 0,
      reviews: 0
    };
    setProperties([...properties, newProperty]);
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  const createBooking = (propertyId, checkIn, checkOut, guests, paymentMethod) => {
    const property = properties.find(p => p.id === propertyId);
    const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalPrice = days * property.price;

    const booking = {
      id: Date.now(),
      propertyId,
      userId: currentUser.id,
      property,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      paymentMethod,
      status: 'Confirmed',
      bookedDate: new Date().toISOString()
    };

    setBookings([...bookings, booking]);
    setCurrentPage('confirmation');
    setTimeout(() => setCurrentPage('profile'), 3000);
  };

  const cancelBooking = (id) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesCategory = selectedCategory === 'all' ||
      (selectedCategory === 'trending' && property.rating >= 4.7) ||
      (selectedCategory === 'beach' && property.amenities.includes('Beach Access')) ||
      (selectedCategory === 'mountain' && property.title.toLowerCase().includes('cabin'));
    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'home' && (
        <HomePage onGetStarted={() => setCurrentPage('listings')} />
      )}

      {currentPage === 'listings' && (
        <ListingsPage
          properties={filteredProperties}
          onPropertyClick={(property) => {
            setSelectedProperty(property);
            setCurrentPage('details');
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          currentUser={currentUser}
          onNavigate={setCurrentPage}
        />
      )}

      {currentPage === 'details' && selectedProperty && (
        <PropertyDetails
          property={selectedProperty}
          onBack={() => setCurrentPage('listings')}
          onBookNow={() => setCurrentPage('booking')}
          currentUser={currentUser}
        />
      )}

      {currentPage === 'booking' && selectedProperty && (
        <BookingPage
          property={selectedProperty}
          onConfirm={createBooking}
          onBack={() => setCurrentPage('details')}
          currentUser={currentUser}
        />
      )}

      {currentPage === 'confirmation' && (
        <ConfirmationPage onViewBookings={() => setCurrentPage('profile')} />
      )}

      {currentPage === 'add-property' && currentUser && (
        <AddPropertyPage
          onAdd={(data) => {
            addProperty(data);
            setCurrentPage('profile');
          }}
          onCancel={() => setCurrentPage('listings')}
        />
      )}

      {currentPage === 'profile' && currentUser && (
        <ProfilePage
          user={currentUser}
          bookings={bookings.filter(b => b.userId === currentUser.id)}
          properties={properties.filter(p => p.ownerId === currentUser.id)}
          onCancelBooking={cancelBooking}
          onDeleteProperty={deleteProperty}
          onViewProperty={(property) => {
            setSelectedProperty(property);
            setCurrentPage('details');
          }}
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
        />
      )}

      {currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} onSignup={handleSignup} />
      )}

      {/* Bottom Navigation */}
      {currentUser && !['login', 'home', 'confirmation'].includes(currentPage) && (
        <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
    </div>
  );
};

export default App;