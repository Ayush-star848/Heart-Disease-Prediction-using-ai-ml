import shap
import pickle
import numpy as np

MODEL_PATH = "model/heart_disease_model.pkl"

def load_explainer():
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)

    explainer = shap.TreeExplainer(model)
    return explainer