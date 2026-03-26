from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import pickle
import os
app = Flask(__name__)
CORS(app, resources={'/*': {'origins': '*'}}, supports_credentials=False)


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS'
    return response


script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, 'model.pkl')
with open(model_path, 'rb') as f:
    model_data = pickle.load(f)
model = model_data['model']
feature_names = model_data['feature_names']
r2 = model_data['r2_score']
mae = model_data['mae']
feature_importance = model_data['feature_importance']



def prepare_input(data):
    input_dict = {name: 0 for name in feature_names}
    input_dict['Age'] = float(data['age'])
    input_dict['Gender'] = 1 if data['gender'] == 'Male' else 0
    input_dict['Weight (kg)'] = float(data['weight'])
    input_dict['Height (m)'] = float(data['height'])
    input_dict['Max_BPM'] = float(data.get('max_bpm', 160))
    input_dict['Avg_BPM'] = float(data.get('avg_bpm', 140))
    input_dict['Resting_BPM'] = float(data.get('resting_bpm', 65))
    input_dict['Session_Duration (hours)'] = float(data['session_duration'])
    input_dict['Fat_Percentage'] = float(data.get('fat_percentage', 20))
    input_dict['Water_Intake (liters)'] = float(data.get('water_intake', 2.0))
    input_dict['Workout_Frequency (days/week)'] = float(
        data['workout_frequency'])
    input_dict['Experience_Level'] = float(data.get('experience_level', 2))
    weight = float(data['weight'])
    height = float(data['height'])
    input_dict['BMI'] = float(data.get('bmi', weight / (height * height)))
    workout_type = data['workout_type']
    workout_col = f'Workout_Type_{workout_type}'
    if workout_col in input_dict:
        input_dict[workout_col] = 1
    input_df = pd.DataFrame([input_dict])
    return input_df


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return (
                jsonify({'error': 'No data provided', 'status': 'error'}), 400)
        required_fields = [
            'age',
            'gender',
            'weight',
            'height',
            'session_duration',
            'workout_type',
            'workout_frequency']
        missing = [f for f in required_fields if f not in data]
        if missing:
            return (jsonify(
                {'error': f'Missing fields: {', '.join(missing)}', 'status': 'error'}), 400)
        input_df = prepare_input(data)
        prediction = model.predict(input_df)[0]
        predicted_calories = round(float(prediction), 1)
        return jsonify({'calories': predicted_calories, 'status': 'success'})
    except Exception as e:
        return (jsonify({'error': str(e), 'status': 'error'}), 500)


@app.route('/model-info', methods=['GET'])
def model_info():
    return jsonify({'r2_score': round(r2, 4), 'mae': round(mae, 2), 'feature_importance': [
                   {'feature': name, 'importance': round(imp, 4)} for name, imp in feature_importance[:8]], 'status': 'success'})


if __name__ == '__main__':

    app.run(debug=True, port=5001)
