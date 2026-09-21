#!/usr/bin/env bash
# Run the commnet_conceptdesigns sites locally.
# This repo is a static multi-site Vercel project (see vercel.json) —
# there's no build step yet, so this just serves the folder.
# Usage: ./start.sh [port]   (defaults to 3000)
set -euo pipefail
cd "$(dirname "$0")"

PORT="${1:-3000}"

if command -v vercel >/dev/null 2>&1; then
  echo "Starting via 'vercel dev' on port $PORT (matches vercel.json routing)..."
  exec vercel dev --listen "$PORT"
elif command -v npx >/dev/null 2>&1; then
  echo "Vercel CLI not found — falling back to a plain static server."
  echo "(Install with 'npm i -g vercel' to match production routing/headers exactly.)"
  echo "Open http://localhost:$PORT"
  exec npx --yes serve . -l "$PORT"
elif command -v python3 >/dev/null 2>&1; then
  echo "Neither vercel nor npx found — falling back to Python's http.server."
  echo "Open http://localhost:$PORT"
  exec python3 -m http.server "$PORT"
else
  echo "No vercel, npx, or python3 found. Install Node.js (https://nodejs.org) and re-run." >&2
  exit 1
fi
