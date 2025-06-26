"use client";

import { useState, useEffect } from "react";
import { doctors } from "@/data/Doctors";
import DoctorCard from "@/components/DoctorCard";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import LocationButton from "@/components/LocationButton";
import {
  FaClinicMedical,
  FaMapMarkerAlt,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("All Services");
  const [showNearby, setShowNearby] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [isLoading, setIsLoading] = useState(false);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  useEffect(() => {
    setIsLoading(true);
    let results = doctors;

    if (searchTerm) {
      results = results.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedService !== "All Services") {
      results = results.filter((doctor) =>
        doctor.services.includes(selectedService)
      );
    }

    if (showNearby && userLocation) {
      results = results
        .map((doctor) => ({
          ...doctor,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            doctor.location.lat,
            doctor.location.lng
          ),
        }))
        .filter((doctor) => doctor.distance < 10)
        .sort((a, b) => a.distance - b.distance);
    }

    const timer = setTimeout(() => {
      setFilteredDoctors(results);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedService, showNearby, userLocation]);

  const toggleNearby = () => {
    if (!userLocation) {
      alert("Please enable location first");
      return;
    }
    setShowNearby(!showNearby);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
            Find the <span className="text-indigo-600">Best Doctors</span> Near
            You
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book appointments with top-rated specialists in your area. Quality
            healthcare at your fingertips.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <LocationButton
                setUserLocation={setUserLocation}
                className="flex items-center gap-2"
              />
              <Filters
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                showNearby={showNearby}
                toggleNearby={toggleNearby}
                userLocation={userLocation}
              />
            </div>
          </div>

          {/* Active filters display */}
          <div className="mt-4 flex flex-wrap gap-2">
            {searchTerm && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                <FaSearch className="mr-1" /> {searchTerm}
              </span>
            )}
            {selectedService !== "All Services" && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center">
                <FaFilter className="mr-1" /> {selectedService}
              </span>
            )}
            {showNearby && userLocation && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                <FaMapMarkerAlt className="mr-1" /> Nearby (10km)
              </span>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaClinicMedical className="text-indigo-600 mr-2" />
            {filteredDoctors.length}{" "}
            {filteredDoctors.length === 1 ? "Doctor" : "Doctors"} Found
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse h-80"
                ></div>
              ))}
            </div>
          ) : (
            <>
              {filteredDoctors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="transition-transform hover:scale-[1.02]"
                    >
                      <DoctorCard doctor={doctor} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center animate-fade-in">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    No doctors found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedService("All Services");
                      setShowNearby(false);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* CTA Section */}
        {!isLoading && filteredDoctors.length > 0 && (
          <div className="bg-indigo-600 rounded-xl p-8 text-center text-white animate-fade-in">
            <h3 className="text-2xl font-bold mb-2">Need Help Choosing?</h3>
            <p className="mb-6 max-w-2xl mx-auto text-indigo-100">
              Our team is available 24/7 to help you find the right specialist
              for your needs.
            </p>
          </div>
        )}
      </div>

      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </main>
  );
}
