import { useState } from "react";

const AVAILABILITY = [
  { label: "Weekdays", value: "weekdays" },
  { label: "Weekends", value: "weekends" },
  { label: "Emergencies", value: "emergencies" },
  { label: "Flexible", value: "flexible" },
];

const ServiceAreaStep = ({ formData, setFormData, onContinue, onBack }) => {
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleAvailability = (value) => {
    let arr = formData.availability || [];
    if (arr.includes(value)) {
      arr = arr.filter((v) => v !== value);
    } else {
      arr = [...arr, value];
    }
    handleChange("availability", arr);
  };

  const validate = () => {
    const errs = {};
    if (!formData.radius && !formData.zip) errs.radius = "Select a service area or enter ZIP code";
    if (!formData.availability || formData.availability.length === 0) errs.availability = "Select at least one availability option";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (validate()) onContinue();
  };

  return (
    <form onSubmit={handleContinue} autoComplete="off">
      <div className="space-y-6">
        {/* Service Area Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Area <span className="text-gray-400">(choose one)</span></label>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Radius from your location</label>
              <input
                type="range"
                min={1}
                max={50}
                value={formData.radius || 10}
                onChange={e => handleChange("radius", Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="text-sm text-indigo-700 font-semibold mt-1">{formData.radius || 10} miles</div>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Or enter ZIP/Postcode</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="ZIP or Postcode"
                value={formData.zip || ""}
                onChange={e => handleChange("zip", e.target.value)}
              />
            </div>
          </div>
          {touched.radius && errors.radius && <div className="text-red-500 text-xs mt-1">{errors.radius}</div>}
        </div>
        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Availability <span className="text-red-500">*</span></label>
          <div className="flex flex-wrap gap-3">
            {AVAILABILITY.map((opt) => (
              <button
                type="button"
                key={opt.value}
                className={`px-4 py-2 rounded-lg border font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-300
                  ${formData.availability?.includes(opt.value) ? "bg-indigo-100 border-indigo-500 text-indigo-700" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"}
                `}
                onClick={() => handleAvailability(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {touched.availability && errors.availability && <div className="text-red-500 text-xs mt-1">{errors.availability}</div>}
        </div>
        {/* Hourly Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate <span className="text-gray-400">(optional)</span></label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={20}
              max={150}
              step={1}
              value={formData.hourlyRate || 20}
              onChange={e => handleChange("hourlyRate", Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <span className="text-indigo-700 font-semibold">${formData.hourlyRate || 20}/hr</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">You can adjust this later</div>
        </div>
      </div>
      <div className="flex justify-between mt-8 gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold shadow"
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default ServiceAreaStep; 