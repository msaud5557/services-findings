const ProgressIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, idx) => (
        <div key={step.label} className="flex-1 flex flex-col items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-lg font-bold transition-all duration-200
              ${
                idx === currentStep
                  ? "bg-indigo-600 text-white border-indigo-600 scale-110 shadow-lg"
                  : idx < currentStep
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-gray-400 border-gray-300"
              }
            `}
          >
            {idx + 1}
          </div>
          <span
            className={`mt-2 text-xs font-medium ${
              idx === currentStep ? "text-indigo-700" : "text-gray-400"
            }`}
          >
            {step.label}
          </span>
          {idx < steps.length - 1 && (
            <div className="w-full h-1 bg-gray-200 mt-2 mb-2">
              <div
                className={`h-1 transition-all duration-200 ${
                  idx < currentStep ? "bg-green-500" : "bg-gray-200"
                }`}
                style={{ width: "100%" }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
