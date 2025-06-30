"use client";
import { useState } from "react";

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePhone = (phone) => phone.replace(/\D/g, "").length >= 10;
const validateName = (name) => name.trim().split(" ").length >= 2;
const validatePassword = (pw) =>
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(pw);

function getPasswordStrength(pw) {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[!@#$%^&*]/.test(pw)) score++;
  if (/[A-Z]/.test(pw)) score++;
  return score;
}

const AccountBasicsStep = ({ formData, setFormData, onContinue }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validate = () => {
    const errs = {};
    if (!validateName(formData.fullName || ""))
      errs.fullName = "Enter your full legal name (at least 2 words)";
    if (!validateEmail(formData.email || ""))
      errs.email = "Enter a valid email address";
    if (!validatePhone(formData.phone || ""))
      errs.phone = "Enter a valid mobile number (10+ digits)";
    if (!validatePassword(formData.password || ""))
      errs.password = "Password must be 8+ chars, 1 number, 1 special char";
    if ((formData.password || "") !== (formData.confirmPassword || ""))
      errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (validate()) onContinue();
  };

  const pwStrength = getPasswordStrength(formData.password || "");
  const pwStrengthText = [
    "Very Weak",
    "Weak",
    "Medium",
    "Strong",
    "Very Strong",
  ][pwStrength];
  const pwStrengthColor = [
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-green-600",
  ][pwStrength];

  return (
    <form onSubmit={handleContinue} autoComplete="off">
      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <span role="img" aria-label="user">
              👤
            </span>{" "}
            Full Name
          </label>
          <input
            type="text"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.fullName
                ? "border-red-400 focus:ring-red-200"
                : "focus:ring-indigo-200"
            }`}
            placeholder="Your full legal name"
            value={formData.fullName || ""}
            onChange={(e) => handleChange("fullName", e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, fullName: true }))}
          />
          {touched.fullName && errors.fullName && (
            <div className="text-red-500 text-xs mt-1">{errors.fullName}</div>
          )}
        </div>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <span role="img" aria-label="email">
              ✉️
            </span>{" "}
            Email Address
          </label>
          <input
            type="email"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-400 focus:ring-red-200"
                : "focus:ring-indigo-200"
            }`}
            placeholder="your@email.com"
            value={formData.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          />
          {touched.email && errors.email && (
            <div className="text-red-500 text-xs mt-1">{errors.email}</div>
          )}
        </div>
        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <span role="img" aria-label="phone">
              📱
            </span>{" "}
            Mobile Number
          </label>
          <input
            type="tel"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.phone
                ? "border-red-400 focus:ring-red-200"
                : "focus:ring-indigo-200"
            }`}
            placeholder="+1 234 567 8900"
            value={formData.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
          />
          {touched.phone && errors.phone && (
            <div className="text-red-500 text-xs mt-1">{errors.phone}</div>
          )}
        </div>
        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <span role="img" aria-label="lock">
              🔒
            </span>{" "}
            Create Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-400 focus:ring-red-200"
                  : "focus:ring-indigo-200"
              }`}
              placeholder="Create a strong password"
              value={formData.password || ""}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {/* Password strength meter */}
          <div className="mt-1 flex items-center gap-2">
            <div
              className={`h-2 rounded transition-all duration-200 ${pwStrengthColor}`}
              style={{ width: `${(pwStrength / 4) * 100}%`, minWidth: 24 }}
            ></div>
            <span className="text-xs text-gray-500">{pwStrengthText}</span>
          </div>
          {touched.password && errors.password && (
            <div className="text-red-500 text-xs mt-1">{errors.password}</div>
          )}
        </div>
        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <span role="img" aria-label="lock">
              🔒
            </span>{" "}
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-400 focus:ring-red-200"
                  : "focus:ring-indigo-200"
              }`}
              placeholder="Re-enter your password"
              value={formData.confirmPassword || ""}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, confirmPassword: true }))
              }
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
              onClick={() => setShowConfirm((v) => !v)}
              tabIndex={-1}
            >
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>
          {touched.confirmPassword && errors.confirmPassword && (
            <div className="text-red-500 text-xs mt-1">
              {errors.confirmPassword}
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="mt-8 w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-colors text-lg disabled:opacity-60"
      >
        Continue
      </button>
    </form>
  );
};

export default AccountBasicsStep;
