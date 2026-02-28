from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model and scaler
model = joblib.load("model/heart_disease_model.pkl")
scaler = joblib.load("model/scaler.pkl")

@app.route("/", methods=["GET"])
def home():
    return {"status": "Heart Disease Prediction API running"}

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

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

        features = np.array(features).reshape(1, -1)
        features_scaled = scaler.transform(features)

        prediction = model.predict(features_scaled)[0]
        probability = model.predict_proba(features_scaled)[0][1]

        result = "High risk of heart disease" if prediction == 1 else "Low risk of heart disease"

        return jsonify({
            "prediction": result,
            "confidence": round(probability * 100, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)