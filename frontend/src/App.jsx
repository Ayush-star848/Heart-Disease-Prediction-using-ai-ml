import { useState } from "react";
import Header from "./components/Header";
import PatientForm from "./components/PatientForm";
import ResultCard from "./components/ResultCard";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          
          {/* Left: Patient Form (scrollable internally) */}
          <div className="bg-white rounded-xl shadow h-[calc(100vh-140px)] overflow-hidden">
            <div className="h-full overflow-y-auto p-6 pr-4">
              <PatientForm setResult={setResult} setLoading={setLoading} />
            </div>
          </div>

          {/* Right: Result Card (fixed height, no scroll) */}
          <div className="bg-white rounded-xl shadow h-[calc(100vh-140px)] p-6">
            <ResultCard result={result} loading={loading} />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;