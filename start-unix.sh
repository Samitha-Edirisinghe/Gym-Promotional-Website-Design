#!/bin/bash

echo "================================"
echo "FITNESS SPORT CENTER"
echo "Starting Development Servers"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js is installed!"
echo ""

# Check if MySQL is running
if command -v mysql &> /dev/null; then
    echo "Checking MySQL connection..."
    mysql -u root -e "SELECT 1;" &> /dev/null
    if [ $? -eq 0 ]; then
        echo "✅ MySQL is running!"
    else
        echo "⚠️  MySQL might not be running or requires password"
        echo "   Please make sure MySQL is running before accessing the website"
    fi
else
    echo "⚠️  MySQL command not found"
    echo "   Please make sure MySQL is installed and running"
fi
echo ""

echo "Starting Backend Server..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

echo "Waiting for backend to start..."
sleep 3

echo ""
echo "Starting Frontend Server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "================================"
echo "Servers are running!"
echo "================================"
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Opening browser in 5 seconds..."
sleep 5

# Open browser based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open http://localhost:5173
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:5173
    fi
fi

echo ""
echo "Press Ctrl+C to stop all servers"
echo "================================"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
