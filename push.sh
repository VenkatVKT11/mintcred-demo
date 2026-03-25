#!/usr/bin/env zsh

# Load nvm and node so npm works
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && source "$NVM_DIR/bash_completion"
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"

# Go to the project directory
SCRIPT_DIR="$(cd "$(dirname "${(%):-%x}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=========================================="
echo "🚀 Prepping MintCred for GitHub Deploy..."
echo "=========================================="

# Git initialization and safety checks
git init
git add .
git commit -m "🚀 Complete MintCred landing page built!"

# Set the remote URL (replaces it just in case you already added it wrong)
git remote remove origin 2>/dev/null
git remote add origin https://github.com/VenkatVKT11/mintcred.git

echo "\n📦 Uploading code to GitHub..."
git branch -M main
git push -u origin main --force

echo "\n🌐 Telling Vite to build the site and deploy to GitHub Pages..."
npm run deploy

echo "\n✅ DONE! Give GitHub ~2 minutes to build."
echo "Your site will be live at: https://VenkatVKT11.github.io/mintcred/"
