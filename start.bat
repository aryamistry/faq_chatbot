@echo off
title FAQ Chatbot Launcher
color 0A

echo ========================================
echo   FAQ Chatbot with AI - Starting...
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [1/4] Checking Node.js version...
node --version
npm --version
echo.

REM Check if backend dependencies are installed
if not exist "backend\node_modules\" (
    echo [2/4] Installing backend dependencies...
    cd backend
    call npm install
    cd ..
    echo.
) else (
    echo [2/4] Backend dependencies already installed
    echo.
)

REM Check if frontend dependencies are installed
if not exist "node_modules\" (
    echo [3/4] Installing frontend dependencies...
    call npm install
    echo.
) else (
    echo [3/4] Frontend dependencies already installed
    echo.
)

echo [4/4] Starting servers...
echo.

REM Start backend in new window
echo Starting backend server...
start "FAQ Chatbot - Backend" cmd /k "cd backend && npm run dev"

REM Wait 3 seconds for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
echo Starting frontend server...
start "FAQ Chatbot - Frontend" cmd /k "npm start"

REM Wait 2 seconds for frontend to start
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo   Servers Started Successfully!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Two terminal windows have been opened:
echo - "FAQ Chatbot - Backend"
echo - "FAQ Chatbot - Frontend"
echo.
echo Press any key to open chatbot in browser...
pause >nul

REM Open browser
start http://localhost:3000

echo.
echo ========================================
echo   Chatbot is running!
echo ========================================
echo.
echo To stop the servers:
echo - Close the "Backend" and "Frontend" terminal windows
echo.
echo This window can be closed safely.
echo.
pause
