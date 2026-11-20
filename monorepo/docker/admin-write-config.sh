#!/bin/sh
# Run by the nginx image at start-up (/docker-entrypoint.d). Writes the API
# address for this environment so one admin build serves stage and prod.
set -eu
if [ -n "${API_URL:-}" ]; then
  # The value is written into JavaScript, so allow plain URL characters only.
  if ! printf '%s' "$API_URL" | grep -Eq '^https://[A-Za-z0-9.-]+(:[0-9]+)?(/[A-Za-z0-9._/-]*)?$'; then
    echo "API_URL must be a plain https:// URL" >&2
    exit 1
  fi
  printf 'window.__PETFOLIOO_CONFIG__ = { apiUrl: "%s" };\n' "$API_URL" > /usr/share/nginx/html/config.js
fi
