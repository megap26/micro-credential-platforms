@echo off
title Micro Credential Platform Launcher
echo ========================================================
echo        Starting Micro Credential Platform
echo ========================================================
echo.

echo [1/2] Starting Backend API Server (Port 5000)...
start "Micro Credential Backend" cmd /k "cd /d %~dp0backend && node server.js"

echo [2/2] Starting Frontend Vite Server (Port 5173)...
start "Micro Credential Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Waiting 4 seconds for servers to initialize...
timeout /t 4 /nobreak >nul

echo Opening Micro Credential Platform in your default browser...
start http://localhost:5173

echo.
echo ========================================================
echo  Micro Credential Platform is now running at http://localhost:5173
echo  Keep the terminal windows open while using the app!
echo ========================================================
pause
