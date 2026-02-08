import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [features, setFeatures] = useState({
    CRIM: 0.00632,
    ZN: 18.0,
    INDUS: 2.31,
    CHAS: 0,
    NOX: 0.538,
    RM: 6.575,
    AGE: 65.2,
    DIS: 4.0900,
    RAD: 1,
    TAX: 296.0,
    PTRATIO: 15.3,
    B: 396.90,
    LSTAT: 4.98
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Use Render backend URL in production, localhost in development
  const API_BASE_URL = import.meta.env.PROD 
    ? 'https://house-price-prediction-kgtk.onrender.com'  // Replace with your actual Render URL
    : 'http://localhost:5000';

  const handleInputChange = (feature, value) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/predict`, {
        features: features
      }, {
        timeout: 10000 // 10 second timeout
      });
      
      if (response.data.status === 'success') {
        setPrediction(response.data.prediction);
      } else {
        setError('Prediction failed: ' + response.data.error);
      }
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError('Request timeout - server might be slow to respond');
      } else if (err.response) {
        setError(`Server error: ${err.response.status} - ${err.response.data.error || 'Unknown error'}`);
      } else if (err.request) {
        setError('Network error - make sure the backend server is running');
      } else {
        setError('Error: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const featureDescriptions = {
    CRIM: "Per capita crime rate by town",
    ZN: "Proportion of residential land zoned for lots over 25,000 sq.ft.",
    INDUS: "Proportion of non-retail business acres per town",
    CHAS: "Charles River dummy variable (1 if tract bounds river; 0 otherwise)",
    NOX: "Nitric oxides concentration (parts per 10 million)",
    RM: "Average number of rooms per dwelling",
    AGE: "Proportion of owner-occupied units built prior to 1940",
    DIS: "Weighted distances to five Boston employment centres",
    RAD: "Index of accessibility to radial highways",
    TAX: "Full-value property-tax rate per $10,000",
    PTRATIO: "Pupil-teacher ratio by town",
    B: "1000(Bk - 0.63)² where Bk is the proportion of Black people by town",
    LSTAT: "% lower status of the population"
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🏠 House Price Prediction</h1>
        <p>Predict house prices using machine learning</p>
      </header>

      <main className="app-main">
        <div className="prediction-container">
          <form onSubmit={handleSubmit} className="prediction-form">
            <h2>Enter Housing Features</h2>
            
            <div className="features-grid">
              {Object.entries(features).map(([key, value]) => (
                <div key={key} className="feature-input">
                  <label title={featureDescriptions[key]}>
                    {key}:
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    required
                  />
                  <small>{featureDescriptions[key]}</small>
                </div>
              ))}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="predict-button"
            >
              {loading ? 'Predicting...' : 'Predict Price'}
            </button>
          </form>

          {error && (
            <div className="error-message">
              <h3>Error</h3>
              <p>{error}</p>
            </div>
          )}

          {prediction !== null && (
            <div className="result-container">
              <h3>Predicted House Price</h3>
              <div className="prediction-result">
                ${prediction.toFixed(2)}k
              </div>
              <p className="prediction-note">
                This is the predicted median value of owner-occupied homes in $1000s
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with React, Flask, and scikit-learn</p>
      </footer>
    </div>
  );
}

export default App