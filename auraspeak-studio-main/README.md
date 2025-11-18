# AuraSpeak Studio - Text-to-Speech Application

A full-stack MERN application that converts text to speech using real TTS technology.

## Features

- 🎤 Real text-to-speech conversion using Google TTS (gTTS)
- 📱 Modern React frontend with Tailwind CSS and ShadCN UI
- 🎨 Beautiful animations with Framer Motion
- 📊 Conversion history with MongoDB storage
- 🔐 User authentication with JWT
- 🎵 Multiple voice options
- 📱 Responsive design

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- ShadCN UI Components
- Framer Motion
- React Router DOM

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Python gTTS for text-to-speech
- File upload handling

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v18 or higher)
2. **Python** (v3.7 or higher)
3. **MongoDB** (running locally or MongoDB Atlas)

## Quick Setup

1. **Run the setup script:**
   ```bash
   npm run setup
   ```

   This will:
   - Install Python dependencies (gTTS)
   - Install backend Node.js dependencies
   - Install frontend dependencies

## Manual Setup

If the automatic setup doesn't work, follow these steps:

### 1. Install Python Dependencies
```bash
python server/install_requirements.py
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

### 3. Install Frontend Dependencies
```bash
npm install
```

### 4. Configure Environment
Edit `server/.env` if needed:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auraspeak
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Running the Application

### 1. Start MongoDB
Make sure MongoDB is running on `localhost:27017`

### 2. Start the Backend Server
```bash
npm run dev:server
```
The server will run on http://localhost:5000

### 3. Start the Frontend (in a new terminal)
```bash
npm run dev
```
The frontend will run on http://localhost:5173

## Usage

1. **Convert Text to Speech:**
   - Navigate to the "Convert" page
   - Enter your text (up to 5000 characters)
   - Select a voice option
   - Click "Convert to Speech"
   - Listen to the generated audio

2. **View History:**
   - Navigate to the "History" page
   - View all your past conversions
   - Play audio files
   - Delete unwanted entries

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Text-to-Speech
- `POST /api/tts/convert` - Convert text to speech
- `GET /api/tts/history` - Get conversion history
- `DELETE /api/tts/history/:id` - Delete history item

## Project Structure

```
auraspeak-studio/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── lib/               # Utilities and API service
│   └── hooks/             # Custom React hooks
├── server/                # Backend Express application
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── uploads/          # Generated audio files
└── public/               # Static assets
```

## Troubleshooting

### Common Issues

1. **Python not found:**
   - Make sure Python is installed and in your PATH
   - Try `python3` instead of `python`

2. **MongoDB connection error:**
   - Ensure MongoDB is running
   - Check the connection string in `.env`

3. **gTTS installation fails:**
   - Try: `pip install gtts`
   - On Windows: `python -m pip install gtts`

4. **Audio not playing:**
   - Check if the backend server is running
   - Verify the audio file was created in `server/uploads/`

### Development Notes

- Audio files are stored in `server/uploads/`
- The application uses gTTS (Google Text-to-Speech) which requires an internet connection
- Authentication is optional - the app works without login
- History is stored per user when authenticated, globally when not

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.