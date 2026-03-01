from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import shap
import os

app = Flask(__name__)
CORS(app)

# ======================
# Load model & scaler
# ======================

# model = joblib.load("model/heart_disease_model.pkl")
# scaler = joblib.load("model/scaler.pkl")
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "model", "heart_disease_model.pkl")
scaler_path = os.path.join(BASE_DIR, "model", "scaler.pkl")

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)

# SHAP explainer (loaded once, reused)
# explainer = joblib.load("model/explainer.pkl")
explainer = None

# ======================
# Feature configuration
# ======================
FEATURE_NAMES = [
    "age", "sex", "cp", "trestbps", "chol", "fbs",
    "restecg", "thalach", "exang", "oldpeak",
    "slope", "ca", "thal"
]

REQUIRED_FIELDS = FEATURE_NAMES


# ======================
# Routes
# ======================
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "Heart Disease Prediction API running"
    })


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Request body must be JSON"}), 400

        # Validate input
        for field in REQUIRED_FIELDS:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        # Extract features in correct order
        features = [data[field] for field in FEATURE_NAMES]

        # Convert to numpy & scale
        features = np.array(features).reshape(1, -1)
        features_scaled = scaler.transform(features)

        # ======================
        # Prediction
        # ======================
        prediction = int(model.predict(features_scaled)[0])
        probability = float(model.predict_proba(features_scaled)[0][1])

        result = (
            "High risk of heart disease"
            if prediction == 1
            else "Low risk of heart disease"
        )

        # ======================
        # SHAP Explainability
        # ======================
        global explainer

        if explainer is None:
            # explainer = joblib.load("model/explainer.pkl")
            explainer_path = os.path.join(BASE_DIR, "model", "explainer.pkl")
            explainer = joblib.load(explainer_path)

        shap_values = explainer.shap_values(features_scaled)
        # Handle different SHAP output formats safely
        if isinstance(shap_values, list):
            # Binary classification (older SHAP)
            shap_values_for_class = shap_values[1][0]
        else:
            # Newer SHAP versions return a single array
            shap_values_for_class = shap_values[0]

        explanation = []
        for i, feature in enumerate(FEATURE_NAMES):
            explanation.append({
                "feature": feature,
                "contribution": round(float(shap_values_for_class[i]), 4)
            })

        # Sort by absolute contribution (most important first)
        explanation.sort(
            key=lambda x: abs(x["contribution"]),
            reverse=True
        )

        # ======================
        # Final response
        # ======================
        return jsonify({
            "prediction": result,
            "confidence": round(probability * 100, 2),
            "explanation": explanation
        })

    except Exception as e:
        return jsonify({
            "error": "Prediction failed",
            "details": str(e)
        }), 500


# if __name__ == "__main__":
#     app.run(debug=True)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)