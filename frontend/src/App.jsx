import { useState, useEffect } from "react";
import PredictionForm from "./components/PredictionForm";
import ResultDisplay from "./components/ResultDisplay";
import "./index.css";
const API_URL = "https://calorie-burn-estimator.onrender.com";
function App() {
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handlePredict = async (data) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setFormData(data);
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status === "success") {
        setResult(result);
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch (err) {
      setError(
        "Could not connect to the prediction server. Make sure the Flask API is running on port 5001.",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <header className="app-header">
        <h1 className="app-header__title">Calorie Burn Predictor</h1>
        <p className="app-header__subtitle">
          Enter your workout details and our AI model will predict how many
          calories you'll burn.
        </p>
      </header>
      <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
      {error && (
        <div className="error-message" id="error-message">
          {error}
        </div>
      )}
      <ResultDisplay result={result} formData={formData} />
    </>
  );
}
export default App;
