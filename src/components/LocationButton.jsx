"use client";
import { useState } from "react";

const LocationButton = ({ setUserLocation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  const getLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setHasPermission(true);
        setIsLoading(false);
      },
      (err) => {
        setIsLoading(false);
        setHasPermission(false);

        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError(
              "Location access was denied. Please enable it in your browser settings."
            );
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case err.TIMEOUT:
            setError("The request to get location timed out.");
            break;
          default:
            setError("Unable to retrieve your location");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // 10 seconds
        maximumAge: 0,
      }
    );
  };

  return (
    <div>
      <button
        onClick={getLocation}
        disabled={isLoading}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {isLoading ? "Detecting..." : "Detect My Location"}
      </button>

      {error && !hasPermission && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default LocationButton;
