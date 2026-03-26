function ModelInfo({ modelInfo }) {
  if (!modelInfo) return null;

  return (

    <div className="model-info">
      <div className="glass-card">
        <h2 className="glass-card__title">
          <span></span> Model Performance
        </h2>
        <div className="model-stats">
          <div className="model-stat">
            <div className="model-stat__value">
              {(modelInfo.r2_score * 100).toFixed(1)}%
            </div>
            <div className="model-stat__label">Accuracy (R² Score)</div>
          </div>
          <div className="model-stat">
            <div className="model-stat__value">±{modelInfo.mae} cal</div>
            <div className="model-stat__label">Avg Error (MAE)</div>
          </div>
        </div>
        <h3
          className="glass-card__title"
          style={{ fontSize: "0.95rem", marginTop: "0.5rem" }}
        >
          <span></span> What Matters Most
        </h3>
        {modelInfo.feature_importance?.map((item, index) => {
          const maxImportance = modelInfo.feature_importance[0].importance;
          const widthPercent = (item.importance / maxImportance) * 100;
          const readableName = item.feature
            .replace("Session_Duration (hours)", "Session Duration")
            .replace("Workout_Frequency (days/week)", "Workout Freq.")
            .replace("Water_Intake (liters)", "Water Intake")
            .replace("Weight (kg)", "Weight")
            .replace("Height (m)", "Height")
            .replace("Fat_Percentage", "Fat %")
            .replace("Resting_BPM", "Resting BPM")
            .replace("Max_BPM", "Max BPM")
            .replace("Avg_BPM", "Avg BPM")
            .replace("Experience_Level", "Experience")
            .replace("Workout_Type_", "");

          return (

            <div className="feature-bar" key={index}>
              <span className="feature-bar__name">{readableName}</span>
              <div className="feature-bar__track">
                <div
                  className="feature-bar__fill"
                  style={{ width: `${widthPercent}%` }}
                ></div>
              </div>
              <span className="feature-bar__value">
                {(item.importance * 100).toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>

  );
}

export default ModelInfo;
