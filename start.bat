@echo off
echo Starting backend server...
start "Backend" cmd /k "cd /d C:\Users\mayur\OneDrive\Desktop\newsnex\News-app\server && npm start"
timeout /t 2 /nobreak > nul
echo Starting frontend...
start "Frontend" cmd /k "cd /d C:\Users\mayur\OneDrive\Desktop\newsnex\News-app\client && npm run dev"
echo Both servers started!
