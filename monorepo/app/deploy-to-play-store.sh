#!/bin/bash
set -e

# PET Roll - Google Play Store Deployment Script
# This script builds and uploads the app to Google Play Store
#
# Prerequisites:
# 1. App must be created in Google Play Console (https://play.google.com/console)
# 2. Service account must be linked in Play Console > Settings > API access
#    Email: play-publisher@petroll-play-publish.iam.gserviceaccount.com
# 3. Fastlane must be installed (brew install fastlane)

export PATH="/Users/abdelaziz.allam/SporteX/flutter/bin:/opt/homebrew/bin:$PATH"
export ANDROID_HOME="$HOME/Library/Android/sdk"
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$APP_DIR"

echo "========================================="
echo "  PET Roll - Google Play Deployment"
echo "========================================="
echo ""

# Step 1: Clean and build
echo "[1/4] Cleaning previous build..."
flutter clean
flutter pub get

echo ""
echo "[2/4] Building release App Bundle..."
flutter build appbundle \
  --release \
  --no-tree-shake-icons \
  --dart-define=API_BASE_URL=https://api.petfolioo.com/api/v1

AAB_PATH="build/app/outputs/bundle/release/app-release.aab"
if [ ! -f "$AAB_PATH" ]; then
  echo "ERROR: AAB file not found at $AAB_PATH"
  exit 1
fi

echo ""
echo "[3/4] AAB built successfully!"
echo "  File: $AAB_PATH"
echo "  Size: $(du -h "$AAB_PATH" | cut -f1)"

echo ""
echo "[4/4] Uploading to Google Play Store (internal track)..."
cd android
fastlane deploy_internal

echo ""
echo "========================================="
echo "  SUCCESS! App uploaded to Google Play"
echo "========================================="
echo ""
echo "Next steps:"
echo "  1. Go to https://play.google.com/console"
echo "  2. Navigate to your app > Testing > Internal testing"
echo "  3. Review and publish the release"
echo ""
