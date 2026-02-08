# House Price Prediction Application

A machine learning web application that predicts house prices using the Boston Housing dataset. Built with Flask backend and React frontend.

## 🚀 Features

- **Machine Learning Model**: Linear regression model trained on Boston Housing dataset
- **RESTful API**: Flask backend with prediction endpoints
- **Modern UI**: React frontend with responsive design
- **Real-time Predictions**: Instant price predictions based on housing features

## 📁 Project Structure

```
house-price-prediction/
├── backend/
│   ├── app.py                 # Flask API server
│   └── create_sample_model.py # Script to generate sample model
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   └── main.jsx          # Entry point
│   └── package.json
├── requirements.txt           # Python dependencies
└── README.md
```

## 🛠️ Local Development Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm

### Backend Setup

1. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

2. **Create sample model (optional):**
```bash
cd backend
python create_sample_model.py
```

3. **Start the backend server:**
```bash
python backend/app.py
```
The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Install frontend dependencies:**
```bash
cd frontend
npm install
```

2. **Start the development server:**
```bash
npm run dev
```
The frontend will be available at `http://localhost:3000`

## 🌐 API Endpoints

### GET `/`
Health check endpoint
```json
{
  "message": "House Price Prediction API",
  "status": "running"
}
```

### GET `/api/health`
Service health status
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

### POST `/api/predict`
Make price prediction
```json
{
  "features": {
    "CRIM": 0.00632,
    "ZN": 18.0,
    "INDUS": 2.31,
    "CHAS": 0,
    "NOX": 0.538,
    "RM": 6.575,
    "AGE": 65.2,
    "DIS": 4.0900,
    "RAD": 1,
    "TAX": 296.0,
    "PTRATIO": 15.3,
    "B": 396.90,
    "LSTAT": 4.98
  }
}
```

Response:
```json
{
  "prediction": 24.25,
  "status": "success"
}
```

## 🚀 Deployment

### Backend Deployment (to Render)

1. **Fork this repository** to your GitHub account
2. **Sign up/Login** to [Render](https://render.com)
3. **Create a new Web Service** and connect your GitHub repository
4. **Configure the service:**
   - **Name**: house-price-prediction-api
   - **Environment**: Python
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT backend.app:app`
   - **Environment Variables**: Add `PORT=10000`

### Frontend Deployment (to Vercel)

1. **Deploy to Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Import your forked repository
   - Configure build settings:
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist` (or `build` depending on your setup)
     - **Install Command**: `npm install`

2. **Update API URL in frontend:**
   - After deploying your backend to Render, copy the Render URL
   - In `frontend/src/App.jsx`, replace the placeholder URL:
   ```javascript
   const API_BASE_URL = import.meta.env.PROD 
     ? 'https://your-render-app-name.onrender.com'  // ← Update with your actual Render URL
     : 'http://localhost:5000';
   ```
   - Re-deploy the frontend to Vercel

## 🔧 Environment Variables

For local development, create a `.env` file:
```env
PORT=5000
```

For Render deployment:
- `PORT=10000` (automatically set by Render)

## 📊 Boston Housing Dataset Features

The model uses 13 features from the Boston Housing dataset:

- **CRIM**: Per capita crime rate by town
- **ZN**: Proportion of residential land zoned for lots over 25,000 sq.ft.
- **INDUS**: Proportion of non-retail business acres per town
- **CHAS**: Charles River dummy variable (1 if tract bounds river; 0 otherwise)
- **NOX**: Nitric oxides concentration (parts per 10 million)
- **RM**: Average number of rooms per dwelling
- **AGE**: Proportion of owner-occupied units built prior to 1940
- **DIS**: Weighted distances to five Boston employment centres
- **RAD**: Index of accessibility to radial highways
- **TAX**: Full-value property-tax rate per $10,000
- **PTRATIO**: Pupil-teacher ratio by town
- **B**: 1000(Bk - 0.63)² where Bk is the proportion of Black people by town
- **LSTAT**: % lower status of the population

## 🧪 Testing

Test the API endpoints:

```bash
# Health check
curl http://localhost:5000/api/health

# Make prediction
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"features": {"CRIM": 0.00632, "ZN": 18.0, "INDUS": 2.31, "CHAS": 0, "NOX": 0.538, "RM": 6.575, "AGE": 65.2, "DIS": 4.0900, "RAD": 1, "TAX": 296.0, "PTRATIO": 15.3, "B": 396.90, "LSTAT": 4.98}}'
```

## 📦 Dependencies

### Backend (Python)
- Flask==2.3.3
- Flask-Cors==4.0.0
- numpy==1.25.2
- pandas==2.1.1
- scikit-learn==1.3.0
- joblib==1.3.2

### Frontend (Node.js)
- react==18.2.0
- react-dom==18.2.0
- axios==1.6.0
- vite==4.4.5

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Boston Housing Dataset from scikit-learn
- Flask for the web framework
- React for the frontend framework
- Render for deployment platform
- Vercel for frontend hosting