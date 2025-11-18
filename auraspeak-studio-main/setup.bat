@echo off
echo Setting up AuraSpeak TTS Application...

echo.
echo Installing Python dependencies...
python server\install_requirements.py

echo.
echo Installing backend dependencies...
cd server
npm install
cd ..

echo.
echo Installing frontend dependencies...
npm install

echo.
echo Setup complete!
echo.
echo To run the application:
echo 1. Start MongoDB (make sure it's running on localhost:27017)
echo 2. Run 'npm run dev:server' to start the backend
echo 3. Run 'npm run dev' to start the frontend
echo.
pause