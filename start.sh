#!/usr/bin/env bash
# Run the Commnet concept builds locally.
#
# Usage: ./start.sh [target ...]
#   ./start.sh                 # all concepts: v3 :5173, v4 :5174, v5 :5175 (default)
#   ./start.sh all             # same, explicit
#   ./start.sh v4              # one concept only
#   ./start.sh v3 v5           # any subset
#   ./start.sh static [port]   # the legacy static multi-site build (vercel.json)
#   ./start.sh teleiostec [dev|preview]   # Teleiostec React site on :5176
#                                         # (TELEIOSTEC_PORT to override)
#
# Every React build carries a small fixed "V3 · V4 · V5" pill (dev only) that
# flips to the same path on another build, so a page can be compared in
# place. Ports can be overridden with V3_PORT / V4_PORT / V5_PORT; the pills
# read the resulting origins from VITE_VERSION_SWITCH_V*_URL.
set -euo pipefail
cd "$(dirname "$0")"

VERSIONS=(v3 v4 v5)
V3_PORT="${V3_PORT:-5173}"
V4_PORT="${V4_PORT:-5174}"
V5_PORT="${V5_PORT:-5175}"

if [ "${1:-}" = "teleiostec" ]; then
  # Teleiostec React build (teleiostec-react/), separate from the Commnet set.
  #   ./start.sh teleiostec           # dev server with hot reload
  #   ./start.sh teleiostec preview   # production build, served as it will ship
  DIR="teleiostec-react"
  MODE="${2:-dev}"
  PORT="${TELEIOSTEC_PORT:-5176}"
  case "$MODE" in dev|preview) ;; *) echo "Unknown mode '$MODE'. Use: teleiostec [dev|preview]" >&2; exit 1 ;; esac
  if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "Port $PORT is already in use:" >&2
    lsof -nP -iTCP:"$PORT" -sTCP:LISTEN | tail -n +2 | awk '{print "  pid " $2 "  " $1}' >&2
    echo "Stop it (kill <pid>) or set TELEIOSTEC_PORT to a free port." >&2
    exit 1
  fi
  cd "$DIR"
  if [ ! -d node_modules ]; then
    echo "Installing dependencies for $DIR (first run)..."
    npm install
  fi
  echo "  $DIR ($MODE)  ->  http://localhost:$PORT"
  if [ "$MODE" = "preview" ]; then
    npm run build
    exec npx vite preview --port "$PORT" --strictPort
  fi
  exec npm run dev -- --port "$PORT" --strictPort
fi

if [ "${1:-}" = "static" ]; then
  PORT="${2:-3000}"
  if command -v vercel >/dev/null 2>&1; then
    echo "Starting via 'vercel dev' on port $PORT (matches vercel.json routing)..."
    exec vercel dev --listen "$PORT"
  elif command -v npx >/dev/null 2>&1; then
    echo "Vercel CLI not found — falling back to a plain static server."
    echo "Open http://localhost:$PORT"
    exec npx --yes serve . -l "$PORT"
  else
    echo "Neither vercel nor npx found. Install Node.js (https://nodejs.org) and re-run." >&2
    exit 1
  fi
fi

# which builds to run
if [ $# -eq 0 ] || [ "${1:-}" = "all" ] || [ "${1:-}" = "both" ]; then
  TARGETS=("${VERSIONS[@]}")
else
  TARGETS=("$@")
fi
for t in "${TARGETS[@]}"; do
  case "$t" in
    v3|v4|v5) ;;
    *) echo "Unknown target '$t'. Use: all | v3 | v4 | v5 | static [port] | teleiostec [dev|preview]" >&2; exit 1 ;;
  esac
done

port_of() {
  case "$1" in
    v3) echo "$V3_PORT" ;;
    v4) echo "$V4_PORT" ;;
    v5) echo "$V5_PORT" ;;
  esac
}

ensure_deps() {
  if [ ! -d "$1/node_modules" ]; then
    echo "Installing dependencies for $1 (first run)..."
    (cd "$1" && npm install)
  fi
}

# Refuse to start on a port something else already holds, rather than let
# Vite fail after the fact and leave a half-started set.
check_port() {
  if lsof -nP -iTCP:"$1" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "Port $1 is already in use:" >&2
    lsof -nP -iTCP:"$1" -sTCP:LISTEN | tail -n +2 | awk '{print "  pid " $2 "  " $1}' >&2
    echo "Stop it (kill <pid>) or set ${2}_PORT to a free port." >&2
    exit 1
  fi
}

PIDS=()
cleanup() {
  for pid in "${PIDS[@]:-}"; do
    [ -n "$pid" ] && kill "$pid" 2>/dev/null || true
  done
}
trap cleanup EXIT INT TERM

# Starts one Vite dev server in the background and records its pid.
run_dev() {
  local v="$1" dir="commnetsysconsult-$1" port
  port="$(port_of "$v")"
  ensure_deps "$dir"
  (
    cd "$dir"
    VITE_VERSION_SWITCH_V3_URL="http://localhost:$V3_PORT" \
    VITE_VERSION_SWITCH_V4_URL="http://localhost:$V4_PORT" \
    VITE_VERSION_SWITCH_V5_URL="http://localhost:$V5_PORT" \
    exec npm run dev -- --port "$port" --strictPort
  ) &
  PIDS+=("$!")
  echo "  $dir  ->  http://localhost:$port"
}

for t in "${TARGETS[@]}"; do
  check_port "$(port_of "$t")" "$(echo "$t" | tr '[:lower:]' '[:upper:]')"
done
for t in "${TARGETS[@]}"; do
  run_dev "$t"
done

echo "Press Ctrl+C to stop."
wait
