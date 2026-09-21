#!/usr/bin/env bash
# Run Commnet's sites locally.
#
# This repo holds two kinds of things:
#  1. The legacy static multi-site Vercel project (root index.html,
#     commnetsysconsult-com/, commnettech-com/, teleiostec-com/, etc.) — no
#     build step, served as-is.
#  2. commnetsysconsult-v3/ — the new React 19 + Vite + Tailwind 4 rebuild
#     (the Awwwards-brief revamp). This is where active work happens now.
#
# Usage:
#   ./start.sh            -> runs the new React app (commnetsysconsult-v3)
#   ./start.sh legacy      -> serves the old static multi-site repo instead
#   ./start.sh [port]      -> either mode, on a specific port
set -euo pipefail
cd "$(dirname "$0")"

MODE="${1:-app}"
PORT="${2:-3000}"
if [[ "$MODE" =~ ^[0-9]+$ ]]; then
  PORT="$MODE"
  MODE="app"
fi

if [[ "$MODE" == "legacy" ]]; then
  echo "Serving the legacy static multi-site repo on port $PORT..."
  if command -v vercel >/dev/null 2>&1; then
    exec vercel dev --listen "$PORT"
  elif command -v npx >/dev/null 2>&1; then
    echo "Open http://localhost:$PORT"
    exec npx --yes serve . -l "$PORT"
  else
    echo "Open http://localhost:$PORT"
    exec python3 -m http.server "$PORT"
  fi
fi

APP_DIR="commnetsysconsult-v3"
if [[ ! -d "$APP_DIR" ]]; then
  echo "Expected $APP_DIR to exist. Run ./start.sh legacy to serve the old static sites instead." >&2
  exit 1
fi

cd "$APP_DIR"
if [[ ! -d node_modules ]]; then
  echo "Installing dependencies (first run)..."
  npm install
fi
echo "Starting the React app on port $PORT..."
exec npm run dev -- --port "$PORT"
