#!/usr/bin/env bash
# Lets the environment's Azure apps identity use Firestore and Firebase Auth in its Google project,
# without any Google key: Workload Identity Federation trusts tokens Entra ID issues to that one
# managed identity, and only it may impersonate the service account.
#
#   azure/scripts/gcp-wif.sh <stage|prod>
#
# Reads the identity's object id from Azure, so run it after the first terraform apply.
# Idempotent.
set -euo pipefail
# shellcheck source=lib.sh
. "$(dirname "$0")/lib.sh"
petfolioo_env "${1:-}"

GCP_ACCOUNT=petroll.site.contactus@gmail.com
if [ "$ENV" = stage ]; then PROJECT=petfolioo-stage; else PROJECT=petroll-production; fi
POOL=azure-petfolioo
PROVIDER="$ENV"
SA_NAME="petfolioo-azure-${ENV}"
SA="${SA_NAME}@${PROJECT}.iam.gserviceaccount.com"
TENANT=$(command az account show --subscription "$SUB" --query tenantId -o tsv)
OID=$(az identity show -n "id-${PREFIX}-apps" -g "$RG" --query principalId -o tsv)
# Container Apps request the token for this resource (GCP_WIF_TOKEN_RESOURCE in the API).
AUDIENCE="https://management.azure.com/"

g() { gcloud "$@" --project="$PROJECT" --account="$GCP_ACCOUNT" --quiet; }
NUMBER=$(g projects describe "$PROJECT" --format='value(projectNumber)')

g services enable iam.googleapis.com iamcredentials.googleapis.com sts.googleapis.com >/dev/null

g iam workload-identity-pools describe "$POOL" --location=global >/dev/null 2>&1 ||
  g iam workload-identity-pools create "$POOL" --location=global --display-name="PetFolioo on Azure"

# The condition admits exactly one Entra object - this environment's apps identity - even though
# every identity in the tenant can obtain a token for the same audience.
if g iam workload-identity-pools providers describe "$PROVIDER" --location=global --workload-identity-pool="$POOL" >/dev/null 2>&1; then
  g iam workload-identity-pools providers update-oidc "$PROVIDER" --location=global --workload-identity-pool="$POOL" \
    --attribute-condition="assertion.oid == '${OID}'"
else
  g iam workload-identity-pools providers create-oidc "$PROVIDER" --location=global --workload-identity-pool="$POOL" \
    --issuer-uri="https://sts.windows.net/${TENANT}/" \
    --allowed-audiences="$AUDIENCE" \
    --attribute-mapping="google.subject=assertion.oid" \
    --attribute-condition="assertion.oid == '${OID}'"
fi

g iam service-accounts describe "$SA" >/dev/null 2>&1 ||
  g iam service-accounts create "$SA_NAME" --display-name="PetFolioo API on Azure (${ENV})"

for role in roles/datastore.user roles/firebaseauth.admin; do
  g projects add-iam-policy-binding "$PROJECT" --member="serviceAccount:${SA}" --role="$role" --condition=None >/dev/null
done

g iam service-accounts add-iam-policy-binding "$SA" --role=roles/iam.workloadIdentityUser \
  --member="principal://iam.googleapis.com/projects/${NUMBER}/locations/global/workloadIdentityPools/${POOL}/subject/${OID}" >/dev/null

echo "==> ${ENV}: Azure identity ${OID} may act as ${SA} in ${PROJECT}"
