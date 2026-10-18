@echo off
title Micro Credential Platform - First Time Setup
echo ========================================================
echo     Setting up Micro Credential Platform on your PC
echo ========================================================
echo.
echo Make sure you have Node.js installed (https://nodejs.org).
echo.
echo [1/3] Installing Backend Packages...
cd /d "%~dp0backend"
call npm install
echo.
echo [2/3] Installing Frontend Packages...
cd /d "%~dp0frontend"
call npm install
echo.
echo ========================================================
echo [3/3] Installation Complete! Launching App...
echo ========================================================
cd /d "%~dp0"
call start-project.bat
