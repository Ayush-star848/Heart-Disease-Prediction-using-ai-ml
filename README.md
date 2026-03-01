# ❤️ Heart Disease Risk Prediction with Explainable AI

A full-stack machine learning web application that predicts the **risk of heart disease** based on patient health parameters and explains **why** the prediction was made using **Explainable AI (SHAP)**.

This project focuses on **model interpretability, user trust, and healthcare-friendly UX**, not just prediction accuracy.

---

## 🚀 Features

- 🧠 **Machine Learning Prediction**
  - XGBoost model trained on heart disease clinical data
  - Predicts risk level with probability score

- 🔍 **Explainable AI (XAI)**
  - SHAP (SHapley Additive exPlanations) used to explain individual predictions
  - Shows feature-wise contribution (what increased or reduced risk)

- 🧑‍⚕️ **Healthcare-Friendly UI**
  - Technical feature names converted into medical terms
  - Clear risk indication (High / Low)
  - Visual explanation with color-coded impact bars

- 🌐 **Full-Stack Architecture**
  - Backend: Flask + Python
  - Frontend: React + Tailwind CSS
  - REST API based communication

---

## 🧩 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- Python
- Flask
- XGBoost
- SHAP
- NumPy, Scikit-learn

---

## 🏗️ Project Structure

```text
Heart-Disease-Prediction/
├── backend/
│   ├── model/
│   │   ├── heart_disease_model.pkl
│   │   ├── scaler.pkl
│   │   └── explainer.pkl
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   └── heart.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── PatientForm.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   └── ExplanationChart.jsx
│   │   ├── lib/
│   │   │   ├── api.js
│   │   │   └── featureLabels.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── training/
│   ├── heart_disease_dataset.csv
│   └── train_model.py
│
├── .gitignore
└── README.md
```

---

## ⚙️ How It Works

1. User enters patient health details (age, BP, cholesterol, ECG, etc.)
2. Frontend sends data to Flask API
3. Backend:
   - Scales inputs
   - Predicts heart disease risk using XGBoost
   - Generates SHAP values for explainability
4. Frontend displays:
   - Risk result
   - Probability score
   - Feature-wise explanation (why this result)

---

## 📊 Explainable AI (SHAP)

This project uses **SHAP (SHapley Additive exPlanations)** to explain individual predictions.

- 🔴 **Red bars** → Increase heart disease risk
- 🟢 **Green bars** → Reduce heart disease risk
- Bar length represents **strength of influence**

This helps users and clinicians understand:
> *Which health factors mattered most for this prediction*

---

## 🧪 Testing

### Backend
- Tested using Postman / curl
- Validated prediction and explanation output

### Frontend
- UI tested with mock and real API responses
- Scrollable dashboard layout tested for usability

---

## ⚠️ Disclaimer

This application is **not a medical diagnostic tool**.  
Predictions are based on a machine learning model and should **not replace professional medical advice**.

---

## 📌 Future Improvements

- Probability calibration
- Global model explainability dashboard
- Feature-level tooltips with medical definitions
- PDF report generation
- Mobile-responsive optimization

---
