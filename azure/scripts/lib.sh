#!/usr/bin/env bash
# Shared by the azure/scripts/*.sh helpers. Source it; do not run it.
#
# Maps stage|prod to its subscription by display name, so no script hardcodes an id and none can
# reach the iSportEx subscriptions that share this tenant.

petfolioo_env() {
  case "${1:-}" in
    stage|prod) ;;
    *) echo "environment must be stage or prod" >&2; exit 2 ;;
  esac
  ENV="$1"
  local display
  if [ "$ENV" = stage ]; then display="PetFolioo Stage"; else display="PetFolioo Prod"; fi
  SUB=$(command az account list --query "[?name=='${display}'].id | [0]" -o tsv)
  if [ -z "$SUB" ]; then
    echo "subscription '${display}' not found; az login --tenant 48df7ad5-0c45-4bc0-8aa3-ee878024270e" >&2
    exit 1
  fi
  # Read by the scripts that source this file.
  # shellcheck disable=SC2034
  RG="rg-petfolioo-${ENV}-swc"
  # shellcheck disable=SC2034
  PREFIX="petfolioo-${ENV}-swc"
}

# Every az call in a script that sourced this file goes to the selected environment's subscription.
az() { command az "$@" --subscription "$SUB"; }
