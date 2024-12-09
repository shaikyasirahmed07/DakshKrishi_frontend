import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet styles for the map
import '../pages/css/NavBar.css'; // Assuming the CSS file is in the css folder

const Navbar = () => {
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [showMap, setShowMap] = useState(false); // To toggle map display

  // Clear user-related data on logout
  const handleLogout = () => {
    localStorage.clear();
  };

  // Fetch current location and display the map
  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setShowMap(true); // Show the map after fetching location
      },
      (error) => {
        alert('Unable to fetch location. Please enable location access.');
        console.error(error);
      }
    );
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-brand">DakshKrishi</h1>
      <div className="navbar-links">
        {userId && (
          <>
            <Link to={`/home/${userId}`} className="navbar-link">Home</Link>
            <Link to="/cart" className="navbar-link">Add to Cart</Link>
            <Link to={`/profile/${userId}`} className="navbar-link">Profile</Link>
            <button onClick={handleLocationClick} className="navbar-link">
              Location
            </button>
          </>
        )}
        <Link to="/user-login" className="navbar-link" onClick={handleLogout}>Logout</Link>
      </div>

      {/* Map Section */}
      {showMap && userLocation && (
        <div className="map-container" style={{ marginTop: '20px' }}>
          <h2>Your Location on the Map</h2>
          <MapContainer
            center={[userLocation.latitude, userLocation.longitude]}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            <Marker position={[userLocation.latitude, userLocation.longitude]}>
              <Popup>
                You are here: Latitude {userLocation.latitude}, Longitude {userLocation.longitude}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
