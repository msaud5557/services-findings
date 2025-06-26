import React from "react";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow p-4 bg-white">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-indigo-900">
          {doctor.name}
        </h3>
        <p className="text-blue-600 text-lg">{doctor.specialty}</p>

        <div className="my-2">
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
            ★ {doctor.rating} ({doctor.experience} years)
          </span>
        </div>

        <div className="mt-3">
          <h4 className="font-medium text-gray-800">Services:</h4>
          <div className="flex flex-wrap gap-1 mt-1">
            {doctor.services.map((service, index) => (
              <span
                key={index}
                className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <a
            href={`tel:${doctor.phone}`}
            className="text-blue-600 hover:underline text-lg"
          >
            {doctor.phone}
          </a>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
