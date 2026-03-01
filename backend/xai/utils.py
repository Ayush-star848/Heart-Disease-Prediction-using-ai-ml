def format_shap_values(shap_values, feature_names):
    """
    Converts SHAP values into readable JSON
    """
    explanation = []

    for i, feature in enumerate(feature_names):
        explanation.append({
            "feature": feature,
            "contribution": round(float(shap_values[i]), 4)
        })

    # Sort by absolute impact
    explanation.sort(key=lambda x: abs(x["contribution"]), reverse=True)

    return explanation