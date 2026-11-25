#!/usr/bin/env bash
set -euo pipefail

# Render deployment helper for the calendar booking app.
# This script only creates/updates the service configuration;
# actual deployment is performed by the Render MCP server or the Render dashboard.

REPO_URL="${REPO_URL:-https://github.com/SadyrbayevAsset/ai-for-developers-project-386.git}"
SERVICE_NAME="${SERVICE_NAME:-calendar-booking-app}"
REGION="${REGION:-oregon}"

command -v render >/dev/null 2>&1 || {
  echo "Render CLI not found. Install it or use the Render dashboard/MCP server."
  exit 1
}

echo "Creating/updating Render service: $SERVICE_NAME"
render services create \
  --type web \
  --name "$SERVICE_NAME" \
  --runtime docker \
  --repo "$REPO_URL" \
  --branch main \
  --root-dir . \
  --dockerfile-path Dockerfile \
  --env PORT=3000 \
  --plan free \
  --region "$REGION"

echo "Service $SERVICE_NAME is configured. Deployment will start automatically."
