import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    CRIM: '',
    ZN: '',
    INDUS: '',
    CHAS: '0',
    NOX: '',
    RM: '',
    AGE: '',
    DIS: '',
    RAD: '',
    TAX: '',
    PTRATIO: '',
    B: '',
    LSTAT: ''
  })

  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setPrediction(null)

    try {
      // Convert form data to numbers
      const numericData = {}
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '') {
          numericData[key] = parseFloat(formData[key]) || parseInt(formData[key])
        } else {
          numericData[key] = 0
        }
      })

      const response = await axios.post('/api/predict', {
        features: numericData
      })

      setPrediction(response.data.prediction)
    } catch (err) {
      setError('Error making prediction. Please check your inputs and try again.')
      console.error('Prediction error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🏠 Boston Housing Price Predictor</h1>
        <p>Enter Boston suburb housing features to predict median home value</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="CRIM">CRIM - Per capita crime rate</label>
              <input
                type="number"
                id="CRIM"
                name="CRIM"
                value={formData.CRIM}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="ZN">ZN - Proportion of residential land (&gt;25,000 sq.ft.)</label>
              <input
                type="number"
                id="ZN"
                name="ZN"
                value={formData.ZN}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="INDUS">INDUS - Non-retail business acres</label>
              <input
                type="number"
                id="INDUS"
                name="INDUS"
                value={formData.INDUS}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="CHAS">CHAS - Charles River dummy (1 if bounds river)</label>
              <select
                id="CHAS"
                name="CHAS"
                value={formData.CHAS}
                onChange={handleChange}
                required
              >
                <option value="0">0 - Does not bound river</option>
                <option value="1">1 - Bounds river</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="NOX">NOX - Nitric oxides concentration (ppm)</label>
              <input
                type="number"
                id="NOX"
                name="NOX"
                value={formData.NOX}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="RM">RM - Average rooms per dwelling</label>
              <input
                type="number"
                id="RM"
                name="RM"
                value={formData.RM}
                onChange={handleChange}
                min="0"
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="AGE">AGE - Owner-occupied units built prior to 1940 (%)</label>
              <input
                type="number"
                id="AGE"
                name="AGE"
                value={formData.AGE}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="DIS">DIS - Weighted distances to employment centers</label>
              <input
                type="number"
                id="DIS"
                name="DIS"
                value={formData.DIS}
                onChange={handleChange}
                min="0"
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="RAD">RAD - Accessibility to radial highways</label>
              <input
                type="number"
                id="RAD"
                name="RAD"
                value={formData.RAD}
                onChange={handleChange}
                min="1"
                max="24"
                step="1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="TAX">TAX - Property-tax rate per $10,000</label>
              <input
                type="number"
                id="TAX"
                name="TAX"
                value={formData.TAX}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="PTRATIO">PTRATIO - Pupil-teacher ratio</label>
              <input
                type="number"
                id="PTRATIO"
                name="PTRATIO"
                value={formData.PTRATIO}
                onChange={handleChange}
                min="0"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="B">B - Proportion of blacks (1000(Bk - 0.63)^2)</label>
              <input
                type="number"
                id="B"
                name="B"
                value={formData.B}
                onChange={handleChange}
                min="0"
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="LSTAT">LSTAT - Lower status population (%)</label>
              <input
                type="number"
                id="LSTAT"
                name="LSTAT"
                value={formData.LSTAT}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="predict-btn"
            disabled={loading}
          >
            {loading ? 'Predicting...' : 'Predict Boston Housing Price'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {loading && (
          <div className="loading">
            <p>🤖 Analyzing Boston housing data...</p>
          </div>
        )}

        {prediction && (
          <div className="result-container show">
            <h2 className="result-title">💰 Predicted Median Home Value</h2>
            <div className="price-display">
              ${(prediction * 1000).toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}
            </div>
            <p>Median value of owner-occupied homes (in USD)<br/>Based on Boston suburb data</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App