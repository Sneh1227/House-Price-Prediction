# House Price Prediction Web Application

A full-stack web application for predicting house prices based on property features.

## 🏠 Features

- Modern React frontend with responsive design
- Flask backend API
- Real-time price predictions
- User-friendly form with all essential property features
- Beautiful gradient UI with smooth animations

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### 1. Save Your Jupyter Model

First, save your trained model from Jupyter Notebook:

```python
# In your Jupyter notebook, after training your model:
import joblib

# Replace 'your_model_variable' with your actual model variable name
joblib.dump(your_model_variable, 'backend/house_price_model.pkl')
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

In a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 4. Access the Application

Open your browser and go to: `http://localhost:3000`

## 📊 Required Features (Boston Housing Dataset)

The application expects the following 13 features in this exact order:

1. `CRIM` - Per capita crime rate by town
2. `ZN` - Proportion of residential land zoned for lots over 25,000 sq.ft.
3. `INDUS` - Proportion of non-retail business acres per town
4. `CHAS` - Charles River dummy variable (1 if tract bounds river; 0 otherwise)
5. `NOX` - Nitric oxides concentration (parts per 10 million)
6. `RM` - Average number of rooms per dwelling
7. `AGE` - Proportion of owner-occupied units built prior to 1940
8. `DIS` - Weighted distances to five Boston employment centres
9. `RAD` - Index of accessibility to radial highways
10. `TAX` - Full-value property-tax rate per $10,000
11. `PTRATIO` - Pupil-teacher ratio by town
12. `B` - 1000(Bk - 0.63)^2 where Bk is the proportion of blacks by town
13. `LSTAT` - % lower status of the population

**Output**: `MEDV` - Median value of owner-occupied homes in $1000's

## 🛠️ Project Structure

```
House Price Prediction/
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main application component
│   │   ├── main.jsx         # Entry point
│   │   ├── index.css        # Global styles
│   │   └── App.css          # Component styles
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── app.py               # Flask API server
│   ├── requirements.txt     # Python dependencies
│   └── house_price_model.pkl # Your trained model (to be added)
├── save_model_from_jupyter.py # Helper script
└── README.md
```

## 🔧 API Endpoints

- `GET /` - API status
- `POST /api/predict` - Make price prediction
- `GET /api/health` - Health check

## 🎨 Customization

### Changing Features

To modify the input features:

1. Update the form fields in `frontend/src/App.jsx`
2. Update the `feature_names` array in `backend/app.py`
3. Make sure your model was trained with the same features

### Styling

Modify `frontend/src/index.css` to change the appearance:
- Colors
- Layout
- Animations
- Responsive breakpoints

## 📱 Mobile Responsive

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🐛 Troubleshooting

### Common Issues

1. **Model not found error**
   - Make sure your model file is saved as `backend/house_price_model.pkl`
   - Check that the model was trained with the same features

2. **CORS errors**
   - The Flask-CORS package is already configured
   - Make sure both frontend and backend are running

3. **Connection refused**
   - Ensure Flask is running on port 5000
   - Check if the port is already in use

4. **Prediction errors**
   - Verify all input fields are filled correctly
   - Check browser console for detailed error messages

### Testing the API

You can test the API directly using curl:

```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"features": {"CRIM": 0.00632, "ZN": 18.0, "INDUS": 2.31, "CHAS": 0, "NOX": 0.538, "RM": 6.575, "AGE": 65.2, "DIS": 4.0900, "RAD": 1, "TAX": 296.0, "PTRATIO": 15.3, "B": 396.90, "LSTAT": 4.98}}'
```

## 📦 Deployment

### Backend Deployment

For production, consider using:
- Gunicorn: `gunicorn -w 4 app:app`
- Docker
- Cloud platforms (Heroku, AWS, etc.)

### Frontend Deployment

Build for production:
```bash
cd frontend
npm run build
```

Deploy the `dist` folder to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- React for the frontend framework
- Flask for the backend
- Vite for fast development
- All the open-source libraries used

---

**Note**: Make sure your Jupyter model is saved in the correct format and location before starting the backend server!