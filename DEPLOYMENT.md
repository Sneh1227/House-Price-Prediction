# 🚀 Render Deployment Guide

## Prerequisites
- GitHub account
- Render account (free tier available)

## Step-by-Step Deployment

### 1. Prepare Your Repository

First, make sure your local changes are committed:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Deploy Backend to Render

1. **Go to [Render Dashboard](https://dashboard.render.com)**
2. **Click "New Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**

   **Basic Settings:**
   - **Name**: `house-price-prediction-api`
   - **Region**: Oregon (or your preferred region)
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Environment**: `Python`

   **Build Settings:**
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT backend.app:app`

   **Environment Variables:**
   - Add: `PORT` = `10000`

5. **Click "Create Web Service"**

### 3. Get Your Backend URL

After deployment completes, Render will provide you with a URL like:
`https://house-price-prediction-api-xxxx.onrender.com`

### 4. Update Frontend Configuration

Edit `frontend/src/App.jsx` and replace the placeholder URL:

```javascript
// Change this line:
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://house-price-prediction-api-xxxx.onrender.com'  // ← Replace with your actual URL
  : 'http://localhost:5000';
```

### 5. Deploy Frontend (Separately)

**Deploy to Render as Static Site:**
1. Go to Render Dashboard
2. Click "New Static Site"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `house-price-prediction-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Environment Variables**: `NODE_VERSION` = `18`

### 6. Test Your Deployment

Visit your frontend URL and test the prediction functionality.

## 🛠️ Troubleshooting

### Common Issues:

1. **"Error connecting to server"**
   - Make sure you updated the API_BASE_URL with your actual Render backend URL
   - Check that your backend service is running on Render

2. **CORS Issues**
   - The Flask-Cors middleware is already configured
   - Make sure your frontend URL is allowed in the CORS settings

3. **Model Loading Failed**
   - Ensure `house_price_model.pkl` is in your repository
   - The model file is tracked by Git (not in .gitignore)

### Checking Logs:

1. **Backend Logs**: Go to your Render dashboard → Select your service → Logs
2. **Frontend Logs**: Check browser console (F12) for JavaScript errors

## 🔧 Environment Variables

For local development, create a `.env` file in the root directory:
```env
PORT=5000
```

For production, Render automatically sets the PORT environment variable.

## 🔄 Redeployment

After making changes:

```bash
git add .
git commit -m "Update application"
git push origin main
```

Render will automatically redeploy when you push to the main branch.

## 💡 Tips

1. **Free Tier Limitations**: Render's free tier has some limitations:
   - Services sleep after 15 minutes of inactivity
   - May take 10-30 seconds to wake up

2. **Custom Domain**: You can add a custom domain in Render dashboard

3. **Environment Variables**: Store sensitive data in Render's environment variables section

4. **Scaling**: For production use, consider upgrading to a paid plan for better performance

## 🎯 Success!

Once deployed, you'll have:
- ✅ Backend API running on Render
- ✅ Frontend accessible via web browser
- ✅ Real-time house price predictions
- ✅ Mobile-responsive design

Your users can now access your house price prediction app from anywhere!