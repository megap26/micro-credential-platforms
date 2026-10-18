@echo off
title Push Micro Credential Platform to GitHub
echo ========================================================
echo        Push Micro Credential Platform to GitHub
echo ========================================================
echo.
echo Step 1: Go to https://github.com/new in your browser
echo Step 2: Ensure your repository is named "micro-credential-platforms"
echo Step 3: Copy the HTTPS URL from GitHub
echo.
set /p REPO_URL="Enter your GitHub Repository URL: "
if "%REPO_URL%"=="" (
    echo Error: No URL entered. Exiting.
    pause
    exit /b
)

echo.
echo [1/3] Setting default branch to main...
git branch -M main

echo [2/3] Linking remote GitHub repository...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [3/3] Uploading code to GitHub...
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo  SUCCESS! Your project is now safely published on GitHub!
    echo ========================================================
) else (
    echo ========================================================
    echo  Push failed. Check your GitHub URL or sign-in in browser.
    echo ========================================================
)
pause
