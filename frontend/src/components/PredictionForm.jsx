import { useState } from "react";
function PredictionForm({ onPredict, isLoading }) {
  const [formData, setFormData] = useState({
    age: "",
    gender: "Male",
    weight: "",
    height: "",
    session_duration: "",
    workout_type: "Cardio",
    workout_frequency: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="glass-card" id="prediction-form">
      <h2 className="glass-card__title">Enter Your Workout Details</h2>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-group__label" htmlFor="input-age">
            Age
          </label>
          <input
            id="input-age"
            className="form-group__input"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="e.g. 25"
            min="10"
            max="80"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-group__label" htmlFor="input-gender">
            Gender
          </label>
          <select
            id="input-gender"
            className="form-group__select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-group__label" htmlFor="input-weight">
            Weight (kg)
          </label>
          <input
            id="input-weight"
            className="form-group__input"
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="e.g. 75"
            min="30"
            max="200"
            step="0.1"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-group__label" htmlFor="input-height">
            Height (m)
          </label>
          <input
            id="input-height"
            className="form-group__input"
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="e.g. 1.75"
            min="1.0"
            max="2.5"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-group__label" htmlFor="input-session-duration">
            Session Duration (hrs)
          </label>
          <input
            id="input-session-duration"
            className="form-group__input"
            type="number"
            name="session_duration"
            value={formData.session_duration}
            onChange={handleChange}
            placeholder="e.g. 1.5"
            min="0.1"
            max="4"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-group__label" htmlFor="input-workout-type">
            Workout Type
          </label>
          <select
            id="input-workout-type"
            className="form-group__select"
            name="workout_type"
            value={formData.workout_type}
            onChange={handleChange}
          >
            <option value="Cardio">Cardio</option>
            <option value="HIIT">HIIT</option>
            <option value="Strength">Strength</option>
            <option value="Yoga">Yoga</option>
          </select>
        </div>
        <div className="form-group">
          <label
            className="form-group__label"
            htmlFor="input-workout-frequency"
          >
            Workout Frequency
          </label>
          <select
            id="input-workout-frequency"
            className="form-group__select"
            name="workout_frequency"
            value={formData.workout_frequency}
            onChange={handleChange}
            required
          >
            <option value="">Select days/week</option>
            <option value="2">2 days/week</option>
            <option value="3">3 days/week</option>
            <option value="4">4 days/week</option>
            <option value="5">5 days/week</option>
          </select>
        </div>
        <button
          type="submit"
          className={`btn-predict ${isLoading ? "btn-predict--loading" : ""}`}
          disabled={isLoading}
          id="btn-predict"
        >
          {isLoading ? (
            <>
              <span className="spinner"></span> Predicting...
            </>
          ) : (
            "Predict Calories Burned"
          )}
        </button>
      </div>
    </form>
  );
}
export default PredictionForm;
