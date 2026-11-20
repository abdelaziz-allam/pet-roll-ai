#!/usr/bin/env bash
# Copies uploaded files from the GCP bucket into the environment's Azure storage account:
#   blog/      -> public container (anonymous read, as on GCP)
#   all else   -> private container (pet photos, health records, verification documents, reports)
#
#   azure/scripts/migrate-files.sh <stage|prod>
#
# Stage receives blog/ only: real customers' files never leave prod.
# Safe to re-run: azcopy sync only transfers new or changed files, so run it once early (bulk
# copy) and again during the cutover window (delta).
#
# Needs: gcloud signed in as the PetFolioo account, az login as an Owner, azcopy.
set -euo pipefail
# shellcheck source=lib.sh
. "$(dirname "$0")/lib.sh"
petfolioo_env "${1:-}"

BUCKET=petroll-production-storage
GCP_ACCOUNT=petroll.site.contactus@gmail.com
PUBLIC_FOLDERS="blog"
SA=$(az storage account list -g "$RG" --query "[?starts_with(name, 'stpetfolioo')].name | [0]" -o tsv)
SA_ID=$(az storage account show -n "$SA" -g "$RG" --query id -o tsv)
WORK="${TMPDIR:-/tmp}/petfolioo-files-${ENV}"

# Account keys are disabled on the account, so azcopy authenticates as the signed-in user, who
# needs a data-plane role even as subscription Owner.
ME=$(command az ad signed-in-user show --query id -o tsv 2>/dev/null || true)
if [ -n "$ME" ]; then
  az role assignment create --assignee-object-id "$ME" --assignee-principal-type User \
    --role "Storage Blob Data Contributor" --scope "$SA_ID" -o none 2>/dev/null || true
fi

echo "==> Downloading gs://${BUCKET} to ${WORK}"
mkdir -p "$WORK"
if [ "$ENV" = stage ]; then
  gcloud storage rsync -r "gs://${BUCKET}/blog" "$WORK/blog" --account="$GCP_ACCOUNT" 2>/dev/null || true
else
  gcloud storage rsync -r "gs://${BUCKET}" "$WORK" --account="$GCP_ACCOUNT"
fi

export AZCOPY_AUTO_LOGIN_TYPE=AZCLI
for dir in "$WORK"/*/; do
  [ -d "$dir" ] || continue
  folder=$(basename "$dir")
  container=private
  for p in $PUBLIC_FOLDERS; do [ "$folder" = "$p" ] && container=public; done
  echo "==> ${folder} -> ${container}"
  azcopy sync "$dir" "https://${SA}.blob.core.windows.net/${container}/${folder}" --recursive --delete-destination=false
done

echo "==> Object counts: gcs=$(find "$WORK" -type f | wc -l | tr -d ' ') azure=$(
  for c in public private; do
    az storage blob list --auth-mode login --account-name "$SA" -c "$c" --num-results "*" --query "length(@)" -o tsv
  done | paste -sd+ - | bc)"
echo "==> Local copy left in ${WORK}. For prod it holds health records; delete it once counts match:"
echo "    rm -rf '${WORK}'"
