import { useState } from "react";

const VerificationStep = ({ formData, setFormData, onBack }) => {
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(
    formData.profilePhotoPreview || null
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("profilePhoto", file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleIDChange = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      handleChange(`id${side}`, file);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.profilePhoto) errs.profilePhoto = "Profile photo required";
    if (!formData.idFront) errs.idFront = "Front of ID required";
    if (!formData.idBack) errs.idBack = "Back of ID required";
    if (!formData.backgroundConsent)
      errs.backgroundConsent = "Consent required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    // 1. FormData object banao
    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName || "");
    formDataToSend.append("email", formData.email || "");
    formDataToSend.append("phone", formData.phone || "");
    formDataToSend.append("password", formData.password || "");
    formDataToSend.append("trade", formData.trade || "");
    formDataToSend.append("experience", formData.experience || "");
    formDataToSend.append("bio", formData.bio || "");
    formDataToSend.append("radius", formData.radius || "");
    formDataToSend.append("zip", formData.zip || "");
    (formData.availability || []).forEach((a) =>
      formDataToSend.append("availability", a)
    );
    formDataToSend.append("hourlyRate", formData.hourlyRate || "");
    formDataToSend.append(
      "backgroundConsent",
      formData.backgroundConsent ? "yes" : ""
    );
    if (formData.profilePhoto)
      formDataToSend.append("profilePhoto", formData.profilePhoto);
    if (formData.idFront) formDataToSend.append("idFront", formData.idFront);
    if (formData.idBack) formDataToSend.append("idBack", formData.idBack);
    if (formData.certifications && formData.certifications.length > 0) {
      for (const file of formData.certifications) {
        formDataToSend.append("certifications", file);
      }
    }

    // 2. API call
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await res.json();
      console.log(data, "test data");
      if (data.success) {
        alert("Signup successful! " + data.message);
        // Optionally: reset form, show confirmation, etc.
      } else {
        alert("Signup failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      alert("Signup failed: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="space-y-6">
        {/* Profile Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Photo <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Profile Preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-400 shadow"
              />
            )}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Clear face, no sunglasses. Helps clients recognize you.
          </div>
          {touched.profilePhoto && errors.profilePhoto && (
            <div className="text-red-500 text-xs mt-1">
              {errors.profilePhoto}
            </div>
          )}
        </div>
        {/* ID Verification */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Verification <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">
                Front of ID
              </label>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => handleIDChange(e, "Front")}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {touched.idFront && errors.idFront && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.idFront}
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">
                Back of ID
              </label>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => handleIDChange(e, "Back")}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {touched.idBack && errors.idBack && (
                <div className="text-red-500 text-xs mt-1">{errors.idBack}</div>
              )}
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Driver's license, trade license, etc.{" "}
            <span className="inline-block align-middle ml-1 text-green-600">
              🔒
            </span>
          </div>
        </div>
        {/* Background Check Consent */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={!!formData.backgroundConsent}
              onChange={(e) =>
                handleChange("backgroundConsent", e.target.checked)
              }
              className="accent-indigo-600 w-5 h-5 rounded border-gray-300"
            />
            I consent to a basic background check (required)
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline text-xs ml-1"
            >
              Privacy Policy
            </a>
          </label>
          {touched.backgroundConsent && errors.backgroundConsent && (
            <div className="text-red-500 text-xs mt-1">
              {errors.backgroundConsent}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-8 gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
          disabled={submitting}
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold shadow flex items-center justify-center min-w-[120px]"
          disabled={submitting}
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default VerificationStep;
