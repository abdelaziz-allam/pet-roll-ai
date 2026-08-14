#!/usr/bin/env bash
# Rewrites the build number in monorepo/app/pubspec.yaml to the value passed in,
# keeping the semantic version untouched (1.3.0+14 -> 1.3.0+<n>).
#
# Why this exists: Apple rejects re-uploading an existing build number and Play
# rejects a versionCode that does not increase, so every push that reached either
# store used to need a manual pubspec bump. Missing one failed the run, and an
# Android-only fix still burned an iOS build number. Deriving the number from
# github.run_number — unique and monotonically increasing per run — removes the
# manual step for both platforms.
#
# Must run BEFORE `flutter pub get`: that is what writes ios/Flutter/Generated.xcconfig,
# which is where CFBundleVersion picks up $(FLUTTER_BUILD_NUMBER). Stamping after it
# would build the IPA with a stale number.
set -euo pipefail

BUILD_NUMBER="${1:?usage: set-build-number.sh <build-number>}"
PUBSPEC="$(dirname "$0")/../monorepo/app/pubspec.yaml"

case "$BUILD_NUMBER" in
  ''|*[!0-9]*) echo "build number must be a positive integer, got '$BUILD_NUMBER'" >&2; exit 1 ;;
esac

CURRENT="$(sed -n 's/^version: *//p' "$PUBSPEC")"
if [ -z "$CURRENT" ]; then
  echo "no 'version:' line found in $PUBSPEC" >&2
  exit 1
fi

SEMVER="${CURRENT%%+*}"
sed -i.bak "s/^version:.*/version: ${SEMVER}+${BUILD_NUMBER}/" "$PUBSPEC"
rm -f "$PUBSPEC.bak"

echo "build number: $CURRENT -> ${SEMVER}+${BUILD_NUMBER}"
