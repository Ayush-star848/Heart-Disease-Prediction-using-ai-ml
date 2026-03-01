import { useState } from "react";
import api from "../lib/api";

const mapFormToPayload = (formData) => {
  const SEX_MAP = { male: 1, female: 0 };
  const CP_MAP = {
    typical: 0,
    atypical: 1,
    "non-anginal": 2,
    asymptomatic: 3,
  };
  const ECG_MAP = { normal: 0, "st-t": 1, lvh: 2 };
  const EXANG_MAP = { no: 0, yes: 1 };

  return {
    age: Number(formData.age),
    sex: SEX_MAP[formData.sex],
    cp: CP_MAP[formData.chest_pain],
    trestbps: Number(formData.bp),
    chol: Number(formData.cholesterol),
    fbs: formData.fbs ? 1 : 0,
    restecg: ECG_MAP[formData.ecg],
    thalach: Number(formData.max_hr),
    exang: EXANG_MAP[formData.ex_angina],
    oldpeak: Number(formData.oldpeak),
    slope: 1,
    ca: 0,
    thal: 2,
  };
};

export default function PatientForm({ setResult, setLoading }) {
  const [formData, setFormData] = useState({
    age: 45,
    sex: "male",
    chest_pain: "asymptomatic",
    bp: 120,
    cholesterol: 200,
    fbs: false,
    ecg: "normal",
    max_hr: 150,
    ex_angina: "no",
    oldpeak: 1.0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = mapFormToPayload(formData);
      const response = await api.post("/predict", payload);
      setResult(response.data);
    } catch (err) {
      alert("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-6">
      <h2 className="text-xl font-semibold">Enter Patient Details</h2>

      {/* Age */}
      <div>
        <label className="label">Age (years): {formData.age}</label>
        <input type="range" min="18" max="90" name="age" value={formData.age} onChange={handleChange} className="slider" />
      </div>

      {/* Sex */}
      <div>
        <label className="label">Gender</label>
        <select className="input" name="sex" value={formData.sex} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Chest Pain */}
      <div>
        <label className="label">Chest Pain Type</label>
        <select className="input" name="chest_pain" value={formData.chest_pain} onChange={handleChange}>
          <option value="typical">Typical Angina</option>
          <option value="atypical">Atypical Angina</option>
          <option value="non-anginal">Non-anginal Pain</option>
          <option value="asymptomatic">Asymptomatic</option>
        </select>
      </div>

      {/* BP */}
      <div>
        <label className="label">Resting Blood Pressure (mmHg): {formData.bp}</label>
        <input type="range" min="90" max="200" name="bp" value={formData.bp} onChange={handleChange} className="slider" />
      </div>

      {/* Cholesterol */}
      <div>
        <label className="label">Cholesterol (mg/dl): {formData.cholesterol}</label>
        <input type="range" min="120" max="350" name="cholesterol" value={formData.cholesterol} onChange={handleChange} className="slider" />
      </div>

      {/* FBS */}
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="fbs" checked={formData.fbs} onChange={handleChange} />
        Fasting Blood Sugar &gt; 120 mg/dl
      </label>

      {/* ECG */}
      <div>
        <label className="label">Resting ECG</label>
        <select className="input" name="ecg" value={formData.ecg} onChange={handleChange}>
          <option value="normal">Normal</option>
          <option value="st-t">ST-T Wave Abnormality</option>
          <option value="lvh">Left Ventricular Hypertrophy</option>
        </select>
      </div>

      {/* Max HR */}
      <div>
        <label className="label">Max Heart Rate (bpm): {formData.max_hr}</label>
        <input type="range" min="70" max="210" name="max_hr" value={formData.max_hr} onChange={handleChange} className="slider" />
      </div>

      {/* Angina */}
      <div>
        <label className="label">Exercise Induced Angina</label>
        <select className="input" name="ex_angina" value={formData.ex_angina} onChange={handleChange}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      {/* Oldpeak */}
      <div>
        <label className="label">ST Depression (Oldpeak): {formData.oldpeak}</label>
        <input type="range" min="0" max="6" step="0.1" name="oldpeak" value={formData.oldpeak} onChange={handleChange} className="slider" />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer">
        Predict Risk
      </button>
    </form>
  );
}