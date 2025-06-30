import { useState } from "react";

const TRADES = [
  { label: "Electrician", icon: "⚡" },
  { label: "Plumber", icon: "🚿" },
  { label: "Bar Tap Specialist", icon: "🍺" },
  { label: "Carpenter", icon: "🪚" },
  { label: "Painter", icon: "🎨" },
  { label: "AC Technician", icon: "❄️" },
  { label: "Welder", icon: "🔧" },
  { label: "Gardener", icon: "🌱" },
  { label: "CCTV Technician", icon: "📹" },
  { label: "Cleaner", icon: "🧹" },
  { label: "Other", icon: "🛠️" },
];

const TradeDetailsStep = ({ formData, setFormData, onContinue, onBack }) => {
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [fileNames, setFileNames] = useState([]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, certifications: files }));
    setFileNames(files.map((f) => f.name));
  };

  const validate = () => {
    const errs = {};
    if (!formData.trade || formData.trade === "") errs.trade = "Select your trade";
    if (!formData.experience || formData.experience < 1) errs.experience = "Select years of experience";
    if (!formData.bio || formData.bio.length < 10) errs.bio = "Short bio required (min 10 chars)";
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
        {/* Trade Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Trade <span className="text-red-500">*</span></label>
          <div className="flex flex-wrap gap-3">
            {TRADES.map((trade) => (
              <button
                type="button"
                key={trade.label}
                className={`flex flex-col items-center px-4 py-2 rounded-lg border transition-all duration-150 shadow-sm text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300
                  ${formData.trade === trade.label ? "bg-indigo-100 border-indigo-500 text-indigo-700 scale-105" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"}
                `}
                onClick={() => handleChange("trade", trade.label)}
              >
                <span className="text-2xl mb-1">{trade.icon}</span>
                {trade.label}
              </button>
            ))}
          </div>
          {touched.trade && errors.trade && <div className="text-red-500 text-xs mt-1">{errors.trade}</div>}
          {formData.trade === "Other" && (
            <input
              type="text"
              className="mt-2 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Enter your trade"
              value={formData.otherTrade || ""}
              onChange={e => handleChange("otherTrade", e.target.value)}
            />
          )}
        </div>
        {/* Experience Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience <span className="text-indigo-500 font-semibold">{formData.experience || 1} years</span></label>
          <input
            type="range"
            min={1}
            max={30}
            value={formData.experience || 1}
            onChange={e => handleChange("experience", Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          {touched.experience && errors.experience && <div className="text-red-500 text-xs mt-1">{errors.experience}</div>}
        </div>
        {/* Certifications Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Certifications/Licenses <span className="text-gray-400">(optional)</span></label>
          <input
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {fileNames.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {fileNames.map((name, idx) => (
                <span key={idx} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs">{name}</span>
              ))}
            </div>
          )}
          <div className="text-xs text-gray-400 mt-1">Upload photos of your licenses (optional for now)</div>
        </div>
        {/* Short Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Short Bio <span className="text-red-500">*</span></label>
          <textarea
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.bio ? "border-red-400 focus:ring-red-200" : "focus:ring-indigo-200"}`}
            placeholder="Describe your expertise in 1-2 sentences"
            maxLength={150}
            value={formData.bio || ""}
            onChange={e => handleChange("bio", e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, bio: true }))}
          />
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-400">{formData.bio?.length || 0}/150</span>
            {touched.bio && errors.bio && <span className="text-red-500">{errors.bio}</span>}
          </div>
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

export default TradeDetailsStep; 