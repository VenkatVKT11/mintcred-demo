#!/usr/bin/env zsh
# Load nvm if available (resolves npm not found)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && source "$NVM_DIR/bash_completion"

# Also try Homebrew node
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"

SCRIPT_DIR="$(cd "$(dirname "${(%):-%x}")" && pwd)"
cd "$SCRIPT_DIR"

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🚀 Starting dev server at http://localhost:5173"
npm run dev
