#!/usr/bin/env bash
# Run the Commnet / Teleiostec review builds locally.
#
#   ./start.sh                     Serve the hub and every build in sites/ (default)
#   ./start.sh hub [port]          Same, on a chosen port (default 8080)
#   ./start.sh dev <target...>     Vite dev server(s) with hot reload, from source/
#   ./start.sh dev all             Every dev server at once
#   ./start.sh build <target...>   Rebuild the review copies in sites/ from source/
#   ./start.sh build all           Rebuild all of them
#   ./start.sh stop                Stop anything this script started (hub + dev ports)
#   ./start.sh status              Show which of those ports are in use
#   ./start.sh help
#
# Dev targets and their ports (override with <TARGET>_PORT, e.g. V3_PORT=6003):
#   v1-react    5177   source/commnetsysconsult-v1-react   → sites/commnetsysconsult/v1-react
#   v3          5173   source/commnetsysconsult-v3         → sites/commnetsysconsult/v3
#   v4          5174   source/commnetsysconsult-v4         → sites/commnetsysconsult/v4
#   v5          5175   source/commnetsysconsult-v5         → sites/commnetsysconsult/v5
#   teleiostec  5176   source/teleiostec-react             → sites/teleiostec/react
#
# The static builds (commnetsysconsult v1/v2, commnetsys, commnettech,
# teleiostec v2) have no source project; they are edited in place in sites/.
#
# Every server binds to 127.0.0.1 explicitly. Vite's default "localhost"
# resolves to IPv6 ::1 only on this Mac, and a browser that tries IPv4 first
# gets "connection refused" — the page just never loads.
set -euo pipefail
cd "$(dirname "$0")"
ROOT="$(pwd)"
HOST="127.0.0.1"

HUB_PORT="${HUB_PORT:-8080}"
TARGETS=(v1-react v3 v4 v5 teleiostec)

if [ -t 1 ]; then B=$'\033[1m'; D=$'\033[2m'; R=$'\033[31m'; G=$'\033[32m'; N=$'\033[0m'; else B= D= R= G= N=; fi
die() { echo "${R}$*${N}" >&2; exit 1; }

dir_of() {
  case "$1" in
    v1-react)   echo "source/commnetsysconsult-v1-react" ;;
    v3|v4|v5)   echo "source/commnetsysconsult-$1" ;;
    teleiostec) echo "source/teleiostec-react" ;;
    *) return 1 ;;
  esac
}
port_of() {
  case "$1" in
    v1-react)   echo "${V1_REACT_PORT:-5177}" ;;
    v3)         echo "${V3_PORT:-5173}" ;;
    v4)         echo "${V4_PORT:-5174}" ;;
    v5)         echo "${V5_PORT:-5175}" ;;
    teleiostec) echo "${TELEIOSTEC_PORT:-5176}" ;;
  esac
}
valid_target() { dir_of "$1" >/dev/null 2>&1; }

need_node() {
  command -v node >/dev/null 2>&1 || die "Node.js is required. Install it from https://nodejs.org and re-run."
}

# Refuse to start on a port something already holds, and say what holds it.
port_free() {
  local port="$1"
  if lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "${R}Port $port is already in use:${N}" >&2
    lsof -nP -iTCP:"$port" -sTCP:LISTEN | tail -n +2 | awk '{print "  pid " $2 "  " $1}' >&2
    echo "Run ${B}./start.sh stop${N}, or pick another port." >&2
    return 1
  fi
}

ensure_deps() {
  local dir="$1"
  [ -d "$dir" ] || die "Missing $dir"
  if [ ! -d "$dir/node_modules" ]; then
    echo "${D}Installing dependencies for $dir (first run)...${N}"
    (cd "$dir" && npm install --no-audit --no-fund)
  fi
}

open_url() {
  [ "${NO_OPEN:-}" = "1" ] && return 0
  if command -v open >/dev/null 2>&1; then open "$1" >/dev/null 2>&1 || true
  elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$1" >/dev/null 2>&1 || true
  fi
}

expand_targets() {
  if [ $# -eq 0 ]; then die "Name a target: ${TARGETS[*]} | all"; fi
  if [ "$1" = "all" ]; then printf '%s\n' "${TARGETS[@]}"; return; fi
  for t in "$@"; do valid_target "$t" || die "Unknown target '$t'. Use: ${TARGETS[*]} | all"; echo "$t"; done
}

cmd_hub() {
  need_node
  local port="${1:-$HUB_PORT}"
  port_free "$port" || exit 1
  echo "${B}Review hub${N}"
  echo "  ${G}http://$HOST:$port/${N}"
  echo "${D}  Ctrl+C to stop.${N}"
  ( sleep 0.6; open_url "http://$HOST:$port/" ) &
  exec node scripts/serve.mjs "$port" "$HOST"
}

PIDS=()
cleanup() {
  for pid in "${PIDS[@]:-}"; do [ -n "$pid" ] && kill "$pid" 2>/dev/null || true; done
}

cmd_dev() {
  need_node
  local list; list=$(expand_targets "$@")
  for t in $list; do port_free "$(port_of "$t")" || exit 1; done
  for t in $list; do ensure_deps "$(dir_of "$t")"; done

  trap cleanup EXIT INT TERM
  echo "${B}Dev servers${N} (hot reload)"
  for t in $list; do
    local dir port; dir="$(dir_of "$t")"; port="$(port_of "$t")"
    (
      cd "$dir"
      # v3–v5 carry a small "V3 · V4 · V5" pill that jumps between these origins.
      VITE_VERSION_SWITCH_V3_URL="http://$HOST:$(port_of v3)" \
      VITE_VERSION_SWITCH_V4_URL="http://$HOST:$(port_of v4)" \
      VITE_VERSION_SWITCH_V5_URL="http://$HOST:$(port_of v5)" \
      exec npx vite --host "$HOST" --port "$port" --strictPort --clearScreen false --logLevel warn
    ) &
    PIDS+=("$!")
    printf "  %-11s ${G}http://%s:%s/${N}  ${D}%s${N}\n" "$t" "$HOST" "$port" "$dir"
  done
  echo "${D}  Ctrl+C to stop.${N}"
  local first; first=$(echo "$list" | head -1)
  ( sleep 1.5; open_url "http://$HOST:$(port_of "$first")/" ) &
  wait
}

cmd_build() {
  need_node
  local list; list=$(expand_targets "$@")
  local reviews=()
  for t in $list; do
    case "$t" in
      v3|v4|v5) ensure_deps "$(dir_of "$t")"; reviews+=("$t") ;;
      *)
        ensure_deps "$(dir_of "$t")"
        echo "${B}=== $t${N}"
        (cd "$(dir_of "$t")" && npm run build:review)
        ;;
    esac
  done
  # scripts/build-reviews.mjs always rebuilds v3, v4 and v5 together.
  if [ ${#reviews[@]} -gt 0 ]; then
    echo "${B}=== v3 v4 v5${N}"
    node scripts/build-reviews.mjs
  fi
  echo "${G}Done.${N} Run ${B}./start.sh${N} to view them in the hub."
}

all_ports() { echo "$HUB_PORT"; for t in "${TARGETS[@]}"; do port_of "$t"; done; }

cmd_stop() {
  local any=0
  for port in $(all_ports); do
    for pid in $(lsof -nP -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null); do
      # Only stop processes running from this project.
      local cwd; cwd=$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p')
      case "$cwd" in
        "$ROOT"*) kill "$pid" 2>/dev/null && echo "  stopped pid $pid on :$port" && any=1 ;;
        *) echo "  :$port is held by pid $pid outside this project — left alone" ;;
      esac
    done
  done
  [ $any -eq 1 ] || echo "  nothing of ours was running"
}

cmd_status() {
  printf "  %-11s %-6s %s\n" hub "$HUB_PORT" "$(lsof -nP -tiTCP:"$HUB_PORT" -sTCP:LISTEN >/dev/null 2>&1 && echo "${G}running${N}" || echo "${D}stopped${N}")"
  for t in "${TARGETS[@]}"; do
    local p; p=$(port_of "$t")
    printf "  %-11s %-6s %s\n" "$t" "$p" "$(lsof -nP -tiTCP:"$p" -sTCP:LISTEN >/dev/null 2>&1 && echo "${G}running${N}" || echo "${D}stopped${N}")"
  done
}

cmd_help() { sed -n '2,24p' "$0" | sed 's/^# \{0,1\}//'; }

case "${1:-hub}" in
  hub)            shift || true; cmd_hub "$@" ;;
  dev)            shift; cmd_dev "$@" ;;
  build)          shift; cmd_build "$@" ;;
  stop)           cmd_stop ;;
  status)         cmd_status ;;
  help|-h|--help) cmd_help ;;
  *)
    # Shorthand: ./start.sh v3  →  ./start.sh dev v3
    if valid_target "$1" || [ "$1" = "all" ]; then cmd_dev "$@"
    else echo "Unknown command '$1'." >&2; cmd_help; exit 1; fi
    ;;
esac
