from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model and scaler
model = joblib.load("model/heart_disease_model.pkl")
scaler = joblib.load("model/scaler.pkl")

REQUIRED_FIELDS = [
    "age", "sex", "cp", "trestbps", "chol", "fbs",
    "restecg", "thalach", "exang", "oldpeak",
    "slope", "ca", "thal"
]

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

        # Validate required fields
        for field in REQUIRED_FIELDS:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        # Extract features in correct order
        features = [
            data["age"],
            data["sex"],
            data["cp"],
            data["trestbps"],
            data["chol"],
            data["fbs"],
            data["restecg"],
            data["thalach"],
            data["exang"],
            data["oldpeak"],
            data["slope"],
            data["ca"],
            data["thal"]
        ]

        # Convert to numpy & scale
        features = np.array(features).reshape(1, -1)
        features_scaled = scaler.transform(features)

        # Predict
        prediction = int(model.predict(features_scaled)[0])
        probability = float(model.predict_proba(features_scaled)[0][1])

        result = (
            "High risk of heart disease"
            if prediction == 1
            else "Low risk of heart disease"
        )

        return jsonify({
            "prediction": result,
            "confidence": round(probability * 100, 2)
        })

    except Exception as e:
        return jsonify({
            "error": "Prediction failed",
            "details": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)