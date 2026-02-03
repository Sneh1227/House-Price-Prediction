@echo off
echo House Price Prediction Application
echo =================================

echo.
echo Starting backend server...
cd backend
start "Backend Server" cmd /k "python app.py"

timeout /t 3 /nobreak >nul

echo.
echo Starting frontend server...
cd ..\frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Both servers are starting up...
echo Frontend will be available at: http://localhost:3000
echo Backend API will be available at: http://localhost:5000
echo.
echo Press any key to exit this window...
pause >nul