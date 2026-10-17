@echo off
title SkillPulse Platform Launcher
echo ========================================================
echo        Starting SkillPulse AI Learning Platform
echo ========================================================
echo.

echo [1/2] Starting Backend API Server (Port 5000)...
start "SkillPulse Backend" cmd /k "cd /d %~dp0backend && node server.js"

echo [2/2] Starting Frontend Vite Server (Port 5173)...
start "SkillPulse Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Waiting 4 seconds for servers to initialize...
timeout /t 4 /nobreak >nul

echo Opening SkillPulse in your default browser...
start http://localhost:5173

echo.
echo ========================================================
echo  SkillPulse is now running at http://localhost:5173
echo  Keep the terminal windows open while using the app!
echo ========================================================
pause
