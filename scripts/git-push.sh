#!/usr/bin/env bash
# Commit whatever has changed locally and push it to GitHub.
# Usage: ./scripts/git-push.sh [branch] ["commit message"]
#   ./scripts/git-push.sh
#   ./scripts/git-push.sh main "Update hero section"
set -euo pipefail
cd "$(dirname "$0")/.."

BRANCH="${1:-main}"
MSG="${2:-Update $(date '+%Y-%m-%d %H:%M')}"

git add -A

if git diff --cached --quiet; then
  echo "No local changes to commit."
else
  git commit -m "$MSG"
fi

echo "Pushing $BRANCH to origin..."
git push origin "$BRANCH"

echo "Pushed to origin/$BRANCH."
