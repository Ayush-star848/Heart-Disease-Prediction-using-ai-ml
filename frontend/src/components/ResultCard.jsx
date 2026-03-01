import ExplanationChart from "./ExplanationChart";

export default function ResultCard({ result, loading }) {
  // ⏳ Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-5 w-40 bg-slate-200 rounded"></div>
          <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
        </div>

        <div className="h-6 w-3/4 bg-slate-200 rounded"></div>

        <div>
          <div className="flex justify-between mb-2">
            <div className="h-4 w-24 bg-slate-200 rounded"></div>
            <div className="h-4 w-12 bg-slate-200 rounded"></div>
          </div>
          <div className="h-3 bg-slate-200 rounded-full"></div>
        </div>

        <div className="h-16 bg-slate-200 rounded"></div>

        <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
      </div>
    );
  }

  // ⬜ Empty state
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow p-6 flex items-center justify-center text-slate-400">
        Prediction result will appear here
      </div>
    );
  }

  const isHighRisk = result.prediction.toLowerCase().includes("high");
  const confidence = Number(result.confidence);
  const explanation = result.explanation || [];

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Prediction Result</h2>
        <span
          className={`px-3 py-1 text-sm rounded-full font-medium ${
            isHighRisk
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {isHighRisk ? "High Risk" : "Low Risk"}
        </span>
      </div>

      {/* Result */}
      <p className="text-xl font-semibold text-slate-800">
        {result.prediction}
      </p>

      {/* Confidence */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-600">Confidence</span>
          <span className="font-medium">{confidence}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full ${
              isHighRisk ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      {/* Advice */}
      <div
        className={`p-4 rounded-lg text-sm ${
          isHighRisk
            ? "bg-red-50 text-red-700"
            : "bg-green-50 text-green-700"
        }`}
      >
        {isHighRisk
          ? "This prediction indicates a higher risk of heart disease. Please consult a medical professional for further evaluation."
          : "This prediction indicates a lower risk of heart disease. Maintain a healthy lifestyle and regular check-ups."}
      </div>

      {/* Explainable AI Section */}
      {explanation.length > 0 && (
        <div className="border-t pt-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">
            Why this result?
          </h3>

          <p className="text-xs text-slate-500 mb-3">
            These factors had the strongest influence on the prediction.
          </p>

          <ExplanationChart explanation={explanation} />
        </div>
      )}
    </div>
  );
}