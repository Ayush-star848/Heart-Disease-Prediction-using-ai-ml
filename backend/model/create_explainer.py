import joblib
import shap

# Load trained model
model = joblib.load("heart_disease_model.pkl")

# Create SHAP explainer
explainer = shap.TreeExplainer(model)

# Save explainer
joblib.dump(explainer, "explainer.pkl")

print("SHAP explainer saved as explainer.pkl")