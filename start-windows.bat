@echo off
echo ================================
echo FITNESS SPORT CENTER
echo Starting Development Servers
echo ================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js is installed!
echo.

echo Starting Backend Server...
echo Opening new terminal for backend...
start cmd /k "cd backend && echo Backend Server Starting... && npm start"

timeout /t 3 /nobreak >nul

echo.
echo Starting Frontend Server...
echo Opening new terminal for frontend...
start cmd /k "echo Frontend Server Starting... && npm run dev"

echo.
echo ================================
echo Servers are starting!
echo ================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Two new terminal windows have opened.
echo Keep them running while using the website.
echo.
echo To stop the servers:
echo - Press Ctrl+C in each terminal window
echo - Or close the terminal windows
echo.
echo Opening browser in 5 seconds...
timeout /t 5 /nobreak >nul
start http://localhost:5173
echo.
echo ================================
pause
