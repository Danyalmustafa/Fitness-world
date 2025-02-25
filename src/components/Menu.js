import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icons
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png", // User location icon
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const gymIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png", // Gym icon
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Component to center the map on user's location
function SetUserLocation({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 12, { animate: true });
    }
  }, [position, map]);
  return null;
}

function GymMap() {
  const [gyms, setGyms] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // Fetch gyms dynamically (replace with API in future)
  useEffect(() => {
    setGyms([
      { id: 1, name: "PureGym London", lat: 51.5074, lng: -0.1278 },
      { id: 2, name: "The Gym Group Manchester", lat: 53.483, lng: -2.244 },
      { id: 3, name: "David Lloyd Birmingham", lat: 52.4862, lng: -1.8904 },
      { id: 4, name: "Nuffield Health Bristol", lat: 51.4545, lng: -2.5879 },
      { id: 5, name: "JD Gyms Liverpool", lat: 53.4084, lng: -2.9916 },
      { id: 6, name: "Fitness First Leeds", lat: 53.8008, lng: -1.5491 },
      { id: 7, name: "Everlast Gym Glasgow", lat: 55.8642, lng: -4.2518 },
      { id: 8, name: "Snap Fitness Sheffield", lat: 53.3811, lng: -1.4701 },
      { id: 9, name: "Gymbox London", lat: 51.5155, lng: -0.1419 },
      { id: 10, name: "Virgin Active Nottingham", lat: 52.9548, lng: -1.1581 },
    ]);
  }, []);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  return (
    <div className="w-full h-screen">
      <h1 className="text-center text-4xl font-bold my-4">Gyms Near You</h1>
      <MapContainer
        center={[52.3555, -1.1743]} // Default center in England
        zoom={6}
        className="w-full h-[80vh]"
      >
        {/* Tile Layer (Map Style) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* User Location Marker */}
        {userLocation && (
          <>
            <Marker position={userLocation} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
            <SetUserLocation position={userLocation} />
          </>
        )}

        {/* Gym Markers */}
        {gyms.map((gym) => (
          <Marker key={gym.id} position={[gym.lat, gym.lng]} icon={gymIcon}>
            <Popup>{gym.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default GymMap;
