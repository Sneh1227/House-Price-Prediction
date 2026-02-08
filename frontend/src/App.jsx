import { useState, useEffect } from 'react'
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
  const [connectionStatus, setConnectionStatus] = useState('checking');

  // Use your actual Render backend URL here
  const API_BASE_URL = import.meta.env.PROD 
    ? 'https://house-price-prediction-kgtk.onrender.com'  // ← UPDATE THIS WITH YOUR ACTUAL RENDER URL
    : 'http://localhost:10000';

  // Test connection when component mounts
  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/health`, { 
        timeout: 5000,
        validateStatus: (status) => status < 500
      });
      if (response.data.status === 'healthy') {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('disconnected');
      }
    } catch (err) {
      console.error('Connection test failed:', err);
      setConnectionStatus('disconnected');
    }
  };

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
    
    // Clear previous prediction immediately when submitting new request
    setPrediction(null);

    try {
      console.log('Making request to:', `${API_BASE_URL}/api/predict`);
      console.log('Features:', features);
      
      const response = await axios.post(`${API_BASE_URL}/api/predict`, {
        features: features
      }, {
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Response received:', response.data);
      
      if (response.data.status === 'success') {
        // Force state update with callback to ensure it's processed
        setPrediction(prev => {
          console.log('Setting prediction to:', response.data.prediction);
          return response.data.prediction;
        });
      } else {
        setError(`Prediction failed: ${response.data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Detailed error:', err);
      
      if (err.code === 'ECONNABORTED') {
        setError('Request timeout - server took too long to respond. Please try again.');
      } else if (err.response) {
        setError(`Server error: ${err.response.status} - ${err.response.data.error || JSON.stringify(err.response.data)}`);
      } else if (err.request) {
        setError(`Network error - unable to reach the server. 
Make sure your backend is deployed and the URL is correct. 
Current URL: ${API_BASE_URL}`);
      } else {
        setError(`Error: ${err.message}`);
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

  // Debug: Log prediction state changes
  useEffect(() => {
    console.log('Prediction state changed to:', prediction);
  }, [prediction]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>🏠 House Price Prediction</h1>
        <p>Predict house prices using machine learning</p>
        <div style={{ 
          marginTop: '10px', 
          fontSize: '0.9rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{
            padding: '4px 10px',
            borderRadius: '15px',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            backgroundColor: connectionStatus === 'connected' ? '#4CAF50' : 
                           connectionStatus === 'disconnected' ? '#f44336' : '#FFC107',
            color: 'white'
          }}>
            {connectionStatus === 'connected' ? '🟢 Connected' : 
             connectionStatus === 'disconnected' ? '🔴 Disconnected' : '🟡 Checking...'}
          </span>
          <small style={{color: 'rgba(255,255,255,0.8)'}}>
            API: {API_BASE_URL.replace('https://', '').replace('http://', '')}
          </small>
        </div>
      </header>

      <main className="app-main">
        <div className="prediction-container">
          <form onSubmit={handleSubmit} className="prediction-form">
            <h2>Enter Housing Features</h2>
            
            <div className="features-grid">
              {Object.entries(features).map(([key, value]) => (
                <div key={key} className="feature-input">
                  <label title={featureDescriptions[key]}>
                    {key}
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    required
                    disabled={loading}
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
              {loading ? 'Calculating...' : '🔮 Predict Price'}
            </button>
          </form>

          {error && (
            <div className="error-message">
              <h3>Something went wrong</h3>
              <p>{error}</p>
              <details style={{marginTop: '15px', background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '8px'}}>
                <summary style={{cursor: 'pointer', fontWeight: 'bold'}}>Troubleshooting Tips</summary>
                <ul style={{textAlign: 'left', marginTop: '10px', paddingLeft: '20px'}}>
                  <li>Verify your backend URL is correct in App.jsx</li>
                  <li>Check that your backend service is running on Render</li>
                  <li>Confirm the model file is present in your backend deployment</li>
                  <li>Try accessing {`${API_BASE_URL}/api/health`} directly in your browser</li>
                </ul>
              </details>
            </div>
          )}

          {/* Debug: Show prediction state */}
          <div style={{textAlign: 'center', margin: '10px 0', fontSize: '0.9rem', color: '#666'}}>
            Debug: Prediction state = {prediction !== null ? `$${prediction.toFixed(2)}k` : 'null'}
          </div>

          {/* Main result display */}
          {prediction !== null && (
            <div className="result-container">
              <h3>🎉 Prediction Result</h3>
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