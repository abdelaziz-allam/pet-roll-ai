#!/usr/bin/env bash
# One-time setup of everything Terraform needs before it can run, for both environments.
# Run by an Owner of both PetFolioo subscriptions from a workstation:
#
#   az login --tenant 48df7ad5-0c45-4bc0-8aa3-ee878024270e
#   ./bootstrap.sh <prod-subscription-id> <stage-subscription-id>
#
# Both subscriptions must exist first: the state account and both infra identities live in the
# prod subscription, so even stage cannot be planned without it.
#
# Idempotent: every step checks before it creates, so it is safe to re-run.
#
# Creates:
#   prod sub:  rg-petfolioo-tfstate-swc   state storage + the two infra identities
#              rg-petfolioo-prod-swc      empty; Terraform fills it
#   stage sub: rg-petfolioo-stage-swc     empty; Terraform fills it
#
# Each infra identity is Owner of its own environment's resource group and can write only its own
# state container. Neither has any right on the other environment, on the subscriptions, or on
# anything belonging to iSportEx in the same tenant.
set -euo pipefail

PROD_SUBSCRIPTION_ID="${1:?usage: bootstrap.sh <prod-subscription-id> <stage-subscription-id>}"
STAGE_SUBSCRIPTION_ID="${2:?stage subscription id required (a separate subscription: one Container Apps environment per subscription)}"
LOCATION="swedencentral"
GITHUB_REPO="abdelaziz-allam/pet-roll-ai"
STATE_RG="rg-petfolioo-tfstate-swc"
ENVIRONMENTS=(stage prod)
PROVIDERS=(Microsoft.App Microsoft.OperationalInsights Microsoft.ContainerRegistry Microsoft.KeyVault
           Microsoft.Network Microsoft.Storage Microsoft.ManagedIdentity Microsoft.Consumption
           Microsoft.CostManagement)

# Never touch the iSportEx subscriptions, even if someone passes their ids by mistake.
for sub in "$PROD_SUBSCRIPTION_ID" "$STAGE_SUBSCRIPTION_ID"; do
  case "$sub" in
    92eeb8e1-9f63-4763-932d-c9f38baca87c|941c81e3-4cc6-442a-b146-bbabb94803b5)
      echo "refusing: $sub is an iSportEx subscription" >&2; exit 1 ;;
  esac
  name=$(az account show --subscription "$sub" --query name -o tsv)
  case "$name" in
    PetFolioo*) ;;
    *) echo "refusing: subscription $sub is named '$name', expected PetFolioo ..." >&2; exit 1 ;;
  esac
done

TENANT_ID=$(az account show --subscription "$PROD_SUBSCRIPTION_ID" --query tenantId -o tsv)
env_sub() { if [ "$1" = stage ]; then echo "$STAGE_SUBSCRIPTION_ID"; else echo "$PROD_SUBSCRIPTION_ID"; fi; }

# Storage account names are global; derive a stable suffix from the subscription id.
SUFFIX=$(printf '%s' "$PROD_SUBSCRIPTION_ID" | shasum | cut -c1-6)
STATE_SA="stpetfoliootf${SUFFIX}"

echo "==> Registering resource providers (subscription-wide; the infra identities cannot)"
for sub in "$PROD_SUBSCRIPTION_ID" "$STAGE_SUBSCRIPTION_ID"; do
  for rp in "${PROVIDERS[@]}"; do
    az provider register --subscription "$sub" --namespace "$rp" --wait >/dev/null
  done
  echo "    $sub: ${#PROVIDERS[@]} providers registered"
done

echo "==> Resource groups"
az group create --subscription "$PROD_SUBSCRIPTION_ID" -n "$STATE_RG" -l "$LOCATION" \
  --tags project=petfolioo environment=shared purpose=terraform-state -o none
for env in "${ENVIRONMENTS[@]}"; do
  az group create --subscription "$(env_sub "$env")" -n "rg-petfolioo-${env}-swc" -l "$LOCATION" \
    --tags project=petfolioo environment="$env" -o none
done

echo "==> Terraform state account $STATE_SA"
if ! az storage account show --subscription "$PROD_SUBSCRIPTION_ID" -n "$STATE_SA" -g "$STATE_RG" -o none 2>/dev/null; then
  az storage account create --subscription "$PROD_SUBSCRIPTION_ID" -n "$STATE_SA" -g "$STATE_RG" -l "$LOCATION" \
    --sku Standard_ZRS --kind StorageV2 --min-tls-version TLS1_2 \
    --allow-blob-public-access false --allow-shared-key-access false \
    --tags project=petfolioo environment=shared -o none
fi
az storage account blob-service-properties update --subscription "$PROD_SUBSCRIPTION_ID" --account-name "$STATE_SA" -g "$STATE_RG" \
  --enable-versioning true --enable-delete-retention true --delete-retention-days 30 -o none
STATE_SA_ID=$(az storage account show --subscription "$PROD_SUBSCRIPTION_ID" -n "$STATE_SA" -g "$STATE_RG" --query id -o tsv)

# Containers are created through ARM, so no data-plane access is needed for this step.
for env in "${ENVIRONMENTS[@]}"; do
  az storage container-rm create --subscription "$PROD_SUBSCRIPTION_ID" --storage-account "$STATE_SA" -g "$STATE_RG" -n "$env" -o none 2>/dev/null || true
done

echo "==> Infra identities"
for env in "${ENVIRONMENTS[@]}"; do
  id_name="id-petfolioo-${env}-infra"
  az identity create --subscription "$PROD_SUBSCRIPTION_ID" -n "$id_name" -g "$STATE_RG" -l "$LOCATION" \
    --tags project=petfolioo environment="$env" -o none
  principal_id=$(az identity show --subscription "$PROD_SUBSCRIPTION_ID" -n "$id_name" -g "$STATE_RG" --query principalId -o tsv)
  # Plain variables, not an associative array: macOS still ships bash 3.2.
  printf -v "CLIENT_ID_${env}" '%s' "$(az identity show --subscription "$PROD_SUBSCRIPTION_ID" -n "$id_name" -g "$STATE_RG" --query clientId -o tsv)"

  # Only Terraform jobs in the azure-<env>-infra GitHub environment may use it - not the deploy
  # jobs, which run in azure-<env> with their own, much narrower identity. The repo is public, so
  # azure-prod-infra can require a reviewer.
  fc_name="github-azure-${env}-infra"
  if ! az identity federated-credential show --subscription "$PROD_SUBSCRIPTION_ID" -g "$STATE_RG" --identity-name "$id_name" -n "$fc_name" -o none 2>/dev/null; then
    az identity federated-credential create --subscription "$PROD_SUBSCRIPTION_ID" -g "$STATE_RG" --identity-name "$id_name" \
      -n "$fc_name" \
      --issuer "https://token.actions.githubusercontent.com" \
      --subject "repo:${GITHUB_REPO}:environment:azure-${env}-infra" \
      --audiences "api://AzureADTokenExchange" -o none
  fi

  assign() { # role scope
    az role assignment create --assignee-object-id "$principal_id" --assignee-principal-type ServicePrincipal \
      --role "$1" --scope "$2" -o none 2>/dev/null || true
  }
  assign "Owner" "/subscriptions/$(env_sub "$env")/resourceGroups/rg-petfolioo-${env}-swc"
  assign "Storage Blob Data Contributor" "${STATE_SA_ID}/blobServices/default/containers/${env}"
  # Lets terraform init find the account; grants no data access.
  assign "Reader" "$STATE_SA_ID"
  echo "    $id_name ready"
done

# CLIENT_ID_stage / CLIENT_ID_prod are assigned through printf -v above, which shellcheck cannot follow.
# shellcheck disable=SC2154
cat <<SUMMARY

==> Done. GitHub repository variables for ${GITHUB_REPO} (none are secrets: OIDC means there is no
    password or key anywhere):

    AZURE_TENANT_ID              = ${TENANT_ID}
    AZURE_PROD_SUBSCRIPTION_ID   = ${PROD_SUBSCRIPTION_ID}
    AZURE_STAGE_SUBSCRIPTION_ID  = ${STAGE_SUBSCRIPTION_ID}
    TFSTATE_STORAGE_ACCOUNT      = ${STATE_SA}
    AZURE_STAGE_INFRA_CLIENT_ID  = ${CLIENT_ID_stage}
    AZURE_PROD_INFRA_CLIENT_ID   = ${CLIENT_ID_prod}

    GitHub environments:
      azure-stage-infra, azure-stage   no rules
      azure-prod-infra, azure-prod     required reviewer, main branch only
SUMMARY
