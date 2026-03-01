import FEATURE_LABELS from "../lib/featureLabels.js";

export default function ExplanationChart({ explanation }) {
  if (!explanation || explanation.length === 0) {
    return null;
  }

  // Take top 5 most influential features
  const topFeatures = explanation.slice(0, 5);

  // Find max absolute value (for bar scaling)
  const maxImpact = Math.max(
    ...topFeatures.map(item => Math.abs(item.contribution))
  );

  return (
    <div className="space-y-3">
      {topFeatures.map((item, index) => {
        const isPositive = item.contribution > 0;
        const barWidth = Math.abs(item.contribution) / maxImpact * 100;

        return (
          <div key={index} className="space-y-1">
            {/* Label row */}
            <div className="flex justify-between text-sm">
              <span className="text-slate-700">
                {FEATURE_LABELS[item.feature] || item.feature}
              </span>
              <span
                className={`font-medium ${
                  isPositive ? "text-red-600" : "text-green-600"
                }`}
              >
                {isPositive ? "+" : ""}
                {item.contribution}
              </span>
            </div>

            {/* Bar */}
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  isPositive ? "bg-red-500" : "bg-green-500"
                }`}
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </div>
        );
      })}

      <p className="text-xs text-slate-400 mt-2">
        Red bars increase risk • Green bars reduce risk
      </p>
    </div>
  );
}