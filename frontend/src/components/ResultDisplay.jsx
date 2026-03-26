function ResultDisplay({ result, formData }) {
  if (!result) return null;

  const calories = result.calories;
  const getIntensity = (cal) => {
    if (cal < 400) return { label: "Light", color: "#4ade80" };
    if (cal < 700) return { label: "Moderate", color: "#fbbf24" };
    if (cal < 1000) return { label: "Intense", color: "#fb923c" };
    return { label: "Extreme", color: "#ef4444" };
  };

  const intensity = getIntensity(calories);
  return (

    <div className="result-section">
      <div className="glass-card result-card">
        <h2 className="glass-card__title">Prediction Result</h2>
        <div className="result-main">
          <p className="result-main__label">Estimated Calories Burned</p>
          <p className="result-main__value">{calories}</p>
          <p className="result-main__unit">calories</p>
        </div>
        <div className="result-details" style={{ justifyContent: "center" }}>
          <div className="result-detail" style={{ minWidth: "200px" }}>
            <div
              className="result-detail__value"
              style={{
                color: intensity.color,
                fontSize: "2rem",
                padding: "1rem 0",
              }}
            >
              {intensity.label}
            </div>
            <div className="result-detail__label">Intensity Limit</div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ResultDisplay;
