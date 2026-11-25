#!/usr/bin/env bash
# Shared by the azure/scripts/*.sh helpers. Source it; do not run it.
#
# Pins every script to the environment's own subscription by id. Display names are not unique
# across the tenants this account can reach, and pinning the id means no script can touch another
# subscription in this tenant.

petfolioo_env() {
  case "${1:-}" in
    stage) REGION_SHORT=neu; SUB="563d2a19-5605-431f-97b4-546b2eb6ed3c" ;;
    prod) REGION_SHORT=swc; SUB="d9aee4d6-484e-4a06-b58e-6de407a5d117" ;;
    *) echo "environment must be stage or prod" >&2; exit 2 ;;
  esac
  ENV="$1"
  if ! command az account show --subscription "$SUB" -o none 2>/dev/null; then
    echo "subscription $SUB not visible; az login --tenant 48df7ad5-0c45-4bc0-8aa3-ee878024270e" >&2
    exit 1
  fi
  # Read by the scripts that source this file.
  # shellcheck disable=SC2034
  RG="rg-petfolioo-${ENV}-${REGION_SHORT}"
  # shellcheck disable=SC2034
  PREFIX="petfolioo-${ENV}-${REGION_SHORT}"
}

# Every az call in a script that sourced this file goes to the environment's subscription.
az() { command az "$@" --subscription "$SUB"; }
