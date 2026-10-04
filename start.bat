@echo off
title FitFriend - Simple Exercise & Food App
echo ============================================================
echo   Starting FitFriend App for your friend...
echo ============================================================
echo.
echo Opening index.html in your default web browser...
start "" "%~dp0index.html"
echo.
echo If you would like to run a local web server instead,
echo you can run: python server.py
echo.
echo App is ready! You can close this window at any time.
timeout /t 4 >nul
