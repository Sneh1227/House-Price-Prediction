from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {"origins": "*"},
    r"/": {"origins": "*"}
})  # This will allow requests from the frontend

# Load your trained model
# You'll need to save your model from Jupyter notebook using joblib or pickle
model = None
model_path = os.path.join(os.path.dirname(__file__), 'house_price_model.pkl')

def load_model():
    global model
    try:
        if os.path.exists(model_path):
            model = joblib.load(model_path)
            print("Model loaded successfully!")
        else:
            print(f"Model file {model_path} not found. Please save your trained model.")
            # Create a simple dummy model for testing
            from sklearn.linear_model import LinearRegression
            model = LinearRegression()
            print("Using dummy model for testing purposes.")
    except Exception as e:
        print(f"Error loading model: {e}")
        # Create a dummy model if loading fails
        from sklearn.linear_model import LinearRegression
        model = LinearRegression()

# Load model when app starts
load_model()

@app.route('/')
def home():
    return jsonify({
        "message": "House Price Prediction API",
        "status": "running"
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.get_json()
        features = data.get('features', {})
        
        # Define feature order (Boston Housing dataset)
        feature_names = [
            'CRIM', 'ZN', 'INDUS', 'CHAS', 'NOX',
            'RM', 'AGE', 'DIS', 'RAD', 'TAX',
            'PTRATIO', 'B', 'LSTAT'
        ]
        
        # Extract features in correct order
        feature_values = []
        for feature in feature_names:
            value = features.get(feature, 0)
            feature_values.append(float(value))
        
        # Convert to numpy array
        X = np.array([feature_values])
        
        # Make prediction
        prediction = model.predict(X)[0]
        
        # Return prediction
        return jsonify({
            'prediction': float(prediction),
            'status': 'success'
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 400

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })

if __name__ == '__main__':
    # Use PORT environment variable for Render deployment, default to 5000 for local
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)