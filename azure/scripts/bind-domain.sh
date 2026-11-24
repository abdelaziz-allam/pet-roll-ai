#!/usr/bin/env bash
# Binds a custom hostname to a container app with a free managed certificate.
#
#   azure/scripts/bind-domain.sh <stage|prod> <api|landing|admin> <hostname>
#
# Prints the DNS records GoDaddy needs, waits until they resolve, then binds. Switching the records
# is what moves traffic from GCP to Azure, so for prod run it only inside the cutover window.
set -euo pipefail
# shellcheck source=lib.sh
. "$(dirname "$0")/lib.sh"
petfolioo_env "${1:-}"

APP="${2:?usage: bind-domain.sh <stage|prod> <api|landing|admin> <hostname>}"
HOST="${3:?hostname required}"
NAME="ca-${PREFIX}-${APP}"
CAE="cae-${PREFIX}"

FQDN=$(az containerapp show -n "$NAME" -g "$RG" --query properties.configuration.ingress.fqdn -o tsv)
VERIFY=$(az containerapp env show -n "$CAE" -g "$RG" --query properties.customDomainConfiguration.customDomainVerificationId -o tsv)
IP=$(az containerapp env show -n "$CAE" -g "$RG" --query properties.staticIp -o tsv)

# An apex name (petfolioo.com) cannot be a CNAME, so it points at the environment IP and is
# validated over HTTP; subdomains CNAME to the app and validate via that CNAME.
if [ "$(echo "$HOST" | tr -cd '.' | wc -c | tr -d ' ')" -le 1 ]; then
  TARGET_TYPE=A; TARGET="$IP"; METHOD=HTTP
else
  TARGET_TYPE=CNAME; TARGET="$FQDN"; METHOD=CNAME
fi

cat <<MSG
==> DNS records required at GoDaddy (petfolioo.com zone)
    TXT    asuid.${HOST}   ${VERIFY}
    ${TARGET_TYPE}  ${HOST}   ${TARGET}
MSG

echo "==> Waiting for DNS"
until dig +short TXT "asuid.${HOST}" | grep -q "$VERIFY"; do sleep 20; done
until dig +short "$HOST" | grep -qi "${TARGET%.}"; do sleep 20; done

az containerapp hostname add -n "$NAME" -g "$RG" --hostname "$HOST" -o none 2>/dev/null || true
az containerapp hostname bind -n "$NAME" -g "$RG" --environment "$CAE" --hostname "$HOST" --validation-method "$METHOD" -o none
echo "==> https://${HOST} bound to ${NAME} (certificate issuance can take several minutes)"
