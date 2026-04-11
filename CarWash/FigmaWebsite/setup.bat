@echo off
REM Spa Car Wash Website - Windows Setup Script
REM Run this file after extracting the ZIP

echo ========================================
echo  Spa Car Wash Website Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please download and install Node.js from:
    echo https://nodejs.org/
    echo.
    echo After installation, restart this script.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed!
    pause
    exit /b 1
)

echo [OK] npm is installed
npm --version
echo.

REM Install dependencies
echo ========================================
echo  Installing dependencies...
echo  This may take 2-5 minutes...
echo ========================================
echo.

call npm install

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Installation failed!
    echo.
    echo Try these solutions:
    echo 1. Run as Administrator
    echo 2. Delete node_modules folder and try again
    echo 3. Run: npm cache clean --force
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Installation Complete!
echo ========================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo Then open your browser to:
echo   http://localhost:5173/
echo.
echo Admin Controls (Keyboard Shortcuts):
echo   Ctrl+Shift+S = Business Status
echo   Ctrl+Shift+P = Promotions
echo   Ctrl+Shift+X = Wait Times
echo.
echo ========================================
echo.

REM Ask if user wants to start dev server now
set /p start="Start development server now? (Y/N): "
if /i "%start%"=="Y" (
    echo.
    echo Starting server...
    echo Press Ctrl+C to stop the server
    echo.
    call npm run dev
)

pause
