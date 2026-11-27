# The petfolioo.com zone. The domain stays registered at GoDaddy; its nameservers point here.
# It lives with prod because the apex serves prod, but it also carries stage's records, so a
# stage hostname change is made in this file and applied through infra-prod.

locals {
  dns_tags = {
    project     = "petfolioo"
    environment = "prod"
    managed-by  = "terraform"
  }

  prod_fqdns        = module.environment.container_app_fqdns
  stage_fqdn_suffix = "livelymoss-32fc649b.northeurope.azurecontainerapps.io"

  cnames = {
    api         = local.prod_fqdns["api"]
    admin       = local.prod_fqdns["admin"]
    www         = "petfolioo.com"
    stage       = "ca-petfolioo-stage-neu-landing.${local.stage_fqdn_suffix}"
    stage-admin = "ca-petfolioo-stage-neu-admin.${local.stage_fqdn_suffix}"
    stage-api   = "ca-petfolioo-stage-neu-api.${local.stage_fqdn_suffix}"
  }

  prod_verification_id  = module.environment.custom_domain_verification_id
  stage_verification_id = "C9BA8B645F01337C219A9F76A051523E5D42821B1D6069BA8B669E4C766BEC50"

  # asuid.* proves domain ownership to Container Apps; _dnsauth.* holds the managed certificate
  # tokens. Azure renews the certificates against both, so they must stay.
  txt = {
    "@"                 = "google-site-verification=gdhx6DN7H1sHG0ZDD55T02onQCXPbGxeLDBsHWMyghQ"
    "_dmarc"            = "v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;"
    "asuid"             = local.prod_verification_id
    "asuid.www"         = local.prod_verification_id
    "asuid.api"         = local.prod_verification_id
    "asuid.admin"       = local.prod_verification_id
    "asuid.stage"       = local.stage_verification_id
    "asuid.stage-admin" = local.stage_verification_id
    "asuid.stage-api"   = local.stage_verification_id
    "_dnsauth"          = "_0ldfhtuax1522nirrwkoprpsw9sq9uz"
    "_dnsauth.www"      = "_3m4didn0v8bucz9zuqz1blau97u6j9o"
    "_dnsauth.api"      = "_gjr6rgwe1d82trhyct2ey4qs7fudzua"
    "_dnsauth.admin"    = "_ihuwcjiy9rb46iy28eiljnsnuioyhhi"
  }
}

resource "azurerm_dns_zone" "main" {
  name                = "petfolioo.com"
  resource_group_name = module.environment.resource_group_name
  tags                = local.dns_tags
}

resource "azurerm_dns_a_record" "apex" {
  name                = "@"
  zone_name           = azurerm_dns_zone.main.name
  resource_group_name = azurerm_dns_zone.main.resource_group_name
  ttl                 = 600
  records             = [module.environment.container_app_environment_static_ip]
  tags                = local.dns_tags
}

resource "azurerm_dns_cname_record" "this" {
  for_each = local.cnames

  name                = each.key
  zone_name           = azurerm_dns_zone.main.name
  resource_group_name = azurerm_dns_zone.main.resource_group_name
  ttl                 = 3600
  record              = each.value
  tags                = local.dns_tags
}

resource "azurerm_dns_txt_record" "this" {
  for_each = local.txt

  name                = each.key
  zone_name           = azurerm_dns_zone.main.name
  resource_group_name = azurerm_dns_zone.main.resource_group_name
  ttl                 = 3600
  tags                = local.dns_tags

  record {
    value = each.value
  }
}

output "dns_name_servers" {
  description = "Set these as the domain's nameservers at GoDaddy."
  value       = azurerm_dns_zone.main.name_servers
}
