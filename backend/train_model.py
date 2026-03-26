import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_absolute_error
import pickle
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(
    script_dir,
    '..',
    'Calorie-Burn-Estimator',
    'gym_members_exercise_tracking.csv')



df = pd.read_csv(csv_path)



df['Gender'] = df['Gender'].map({'Male': 1, 'Female': 0})
df = pd.get_dummies(df, columns=['Workout_Type'],drop_first=False)
target_column = 'Calories_Burned'

X = df.drop(columns=[target_column])
y = df[target_column]
feature_names = list(X.columns)



X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)



model = RandomForestRegressor(
    n_estimators=100,
    max_depth=None,
    min_samples_split=2,
    random_state=42)
model.fit(X_train, y_train)


y_pred_train = model.predict(X_train)
y_pred_test = model.predict(X_test)

r2_train = r2_score(y_train, y_pred_train)
r2_test = r2_score(y_test, y_pred_test)

mae_test = mean_absolute_error(y_test, y_pred_test)



r2 = r2_test
mae = mae_test
importances = model.feature_importances_
feature_importance = sorted(
    zip(feature_names, importances), key=lambda x: x[1], reverse=True)


model_data = {
    'model': model,
    'feature_names': feature_names,
    'r2_score': r2,
    'mae': mae,
    'feature_importance': feature_importance}

model_path = os.path.join(script_dir, 'model.pkl')

with open(model_path, 'wb') as f:
    pickle.dump(model_data, f)


