#!/bin/bash
# Spa Car Wash Website - Mac/Linux Setup Script
# Run this file after extracting the ZIP: bash setup.sh

echo "========================================"
echo " Spa Car Wash Website Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo ""
    echo "Please download and install Node.js from:"
    echo "https://nodejs.org/"
    echo ""
    echo "After installation, restart this script."
    exit 1
fi

echo "[OK] Node.js is installed"
node --version
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm is not installed!"
    exit 1
fi

echo "[OK] npm is installed"
npm --version
echo ""

# Install dependencies
echo "========================================"
echo " Installing dependencies..."
echo " This may take 2-5 minutes..."
echo "========================================"
echo ""

npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "[ERROR] Installation failed!"
    echo ""
    echo "Try these solutions:"
    echo "1. Run with sudo: sudo bash setup.sh"
    echo "2. Delete node_modules folder and try again"
    echo "3. Run: npm cache clean --force"
    echo ""
    exit 1
fi

echo ""
echo "========================================"
echo " Installation Complete!"
echo "========================================"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open your browser to:"
echo "  http://localhost:5173/"
echo ""
echo "Admin Controls (Keyboard Shortcuts):"
echo "  Ctrl+Shift+S = Business Status"
echo "  Ctrl+Shift+P = Promotions"
echo "  Ctrl+Shift+X = Wait Times"
echo ""
echo "========================================"
echo ""

# Ask if user wants to start dev server now
read -p "Start development server now? (Y/N): " start
if [[ $start == "Y" || $start == "y" ]]; then
    echo ""
    echo "Starting server..."
    echo "Press Ctrl+C to stop the server"
    echo ""
    npm run dev
fi
