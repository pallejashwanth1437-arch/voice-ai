import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 Verifying AuraSpeak setup...\n');

// Check Node.js version
console.log('✅ Node.js version:', process.version);

// Check if Python is available
const checkPython = () => {
  return new Promise((resolve) => {
    const python = spawn('python', ['--version']);
    python.stdout.on('data', (data) => {
      console.log('✅ Python version:', data.toString().trim());
      resolve(true);
    });
    python.stderr.on('data', (data) => {
      console.log('✅ Python version:', data.toString().trim());
      resolve(true);
    });
    python.on('error', () => {
      console.log('❌ Python not found in PATH');
      resolve(false);
    });
  });
};

// Check if gTTS is installed
const checkGTTS = () => {
  return new Promise((resolve) => {
    const python = spawn('python', ['-c', 'import gtts; print("gTTS installed successfully")']);
    python.stdout.on('data', (data) => {
      console.log('✅', data.toString().trim());
      resolve(true);
    });
    python.on('error', () => {
      console.log('❌ gTTS not installed');
      resolve(false);
    });
    python.stderr.on('data', () => {
      console.log('❌ gTTS not installed or import error');
      resolve(false);
    });
  });
};

// Check if server dependencies are installed
const checkServerDeps = () => {
  const serverPackageJson = path.join(process.cwd(), 'server', 'package.json');
  const nodeModules = path.join(process.cwd(), 'server', 'node_modules');
  
  if (fs.existsSync(serverPackageJson) && fs.existsSync(nodeModules)) {
    console.log('✅ Server dependencies installed');
    return true;
  } else {
    console.log('❌ Server dependencies not installed');
    return false;
  }
};

// Check if frontend dependencies are installed
const checkFrontendDeps = () => {
  const nodeModules = path.join(process.cwd(), 'node_modules');
  
  if (fs.existsSync(nodeModules)) {
    console.log('✅ Frontend dependencies installed');
    return true;
  } else {
    console.log('❌ Frontend dependencies not installed');
    return false;
  }
};

// Check if uploads directory exists
const checkUploadsDir = () => {
  const uploadsDir = path.join(process.cwd(), 'server', 'uploads');
  
  if (fs.existsSync(uploadsDir)) {
    console.log('✅ Uploads directory exists');
    return true;
  } else {
    console.log('❌ Uploads directory not found');
    return false;
  }
};

// Run all checks
const runChecks = async () => {
  const pythonOk = await checkPython();
  const gttsOk = await checkGTTS();
  const serverDepsOk = checkServerDeps();
  const frontendDepsOk = checkFrontendDeps();
  const uploadsDirOk = checkUploadsDir();
  
  console.log('\n📋 Setup Summary:');
  console.log('==================');
  
  if (pythonOk && gttsOk && serverDepsOk && frontendDepsOk && uploadsDirOk) {
    console.log('🎉 All checks passed! Your setup is ready.');
    console.log('\n🚀 To start the application:');
    console.log('1. Start MongoDB (make sure it\'s running)');
    console.log('2. Run: npm run dev:server');
    console.log('3. Run: npm run dev (in a new terminal)');
  } else {
    console.log('⚠️  Some issues found. Please run the setup script:');
    console.log('   npm run setup');
  }
};

runChecks();