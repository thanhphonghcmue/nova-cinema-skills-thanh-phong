@echo off
setlocal
cd /d "%~dp0"
echo [NOVA] Project folder: %CD%
if not exist "src\MainShowcase.jsx" (
  echo [NOVA] ERROR: Missing src\MainShowcase.jsx
  echo Download the complete GitHub repository instead of copying individual files.
  pause
  exit /b 1
)
if not exist "node_modules" (
  echo [NOVA] Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo [NOVA] npm install failed. Check Node.js and your network connection.
    pause
    exit /b 1
  )
)
call npm run dev
pause
