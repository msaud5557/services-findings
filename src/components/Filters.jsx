const Filters = ({
  selectedService,
  setSelectedService,
  showNearby,
  toggleNearby,
  userLocation,
}) => {
  // Extract all unique services from doctors
  const allServices = [
    "All Services",
    "Heart Checkup",
    "ECG",
    "Angioplasty",
    "Acne Treatment",
    "Skin Biopsy",
    "Laser Therapy",
    "Joint Replacement",
    "Arthroscopy",
    "Fracture Care",
    "Arthroscopy",
    "Fracture Care",
    "Brain MRI",
    "Stroke Care",
    "Epilepsy Treatment",
    "Sinus Surgery",
    "Hearing Loss",
    "Allergy Treatment",
    "Eye Checkup",
    "Cataract Surgery",
    "Glaucoma Treatment",
    "Teeth Cleaning",
    "Braces",
    "Root Canal",
    "Depression Treatment",
    "Anxiety Management",
    "Therapy",
    // Add more services as needed
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        className="p-2 border rounded"
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
      >
        {allServices.map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </select>

      <button
        onClick={toggleNearby}
        className={`px-4 py-2 rounded ${
          showNearby ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
        disabled={!userLocation}
      >
        {userLocation ? "Show Nearby" : "Enable Location"}
      </button>

      {userLocation && (
        <span className="p-2 text-sm text-gray-600">
          Your location: {userLocation.lat.toFixed(4)},{" "}
          {userLocation.lng.toFixed(4)}
        </span>
      )}
    </div>
  );
};

export default Filters;
