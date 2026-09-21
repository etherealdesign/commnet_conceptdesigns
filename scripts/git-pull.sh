#!/usr/bin/env bash
# Pull the latest commnet_conceptdesigns code from GitHub.
# Usage: ./scripts/git-pull.sh [branch]   (defaults to "main")
set -euo pipefail
cd "$(dirname "$0")/.."

BRANCH="${1:-main}"

echo "Fetching origin..."
git fetch origin

echo "Pulling origin/$BRANCH into local $BRANCH (fast-forward only)..."
git pull origin "$BRANCH" --ff-only

echo "Up to date with origin/$BRANCH."
