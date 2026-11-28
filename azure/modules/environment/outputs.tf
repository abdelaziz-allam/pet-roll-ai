output "resource_group_name" {
  value = local.rg
}

output "acr_login_server" {
  value = azurerm_container_registry.env.login_server
}

output "acr_name" {
  value = azurerm_container_registry.env.name
}

output "container_app_names" {
  value = { for k, v in azurerm_container_app.app : k => v.name }
}

output "container_app_fqdns" {
  description = "Default *.azurecontainerapps.io hostnames - usable before any DNS change."
  value       = { for k, v in azurerm_container_app.app : k => v.ingress[0].fqdn }
}

output "container_app_environment_name" {
  value = azurerm_container_app_environment.env.name
}

output "container_app_environment_static_ip" {
  description = "Ingress IP: the A record target for the apex domain, and the other environment's deny_egress_cidrs entry."
  value       = azurerm_container_app_environment.env.static_ip_address
}

output "custom_domain_verification_id" {
  description = "Value for the asuid.<host> TXT record that proves domain ownership."
  value       = azurerm_container_app_environment.env.custom_domain_verification_id
}

output "apps_identity_principal_id" {
  description = "Object id Google trusts through Workload Identity Federation (azure/scripts/gcp-wif.sh)."
  value       = azurerm_user_assigned_identity.apps.principal_id
}

output "deploy_identity_client_id" {
  description = "Client id for the azure-<env> GitHub environment's deploy login."
  value       = azurerm_user_assigned_identity.deploy.client_id
}

output "key_vault_name" {
  value = azurerm_key_vault.env.name
}

output "storage_account_name" {
  value = azurerm_storage_account.uploads.name
}

output "public_storage_base_url" {
  value = "${azurerm_storage_account.uploads.primary_blob_endpoint}${azurerm_storage_container.public.name}"
}

output "vnet_cidr" {
  value = var.vnet_cidr
}

output "cosmos_account_name" {
  value = azurerm_cosmosdb_account.data.name
}

output "data_migration_job_name" {
  value = azurerm_container_app_job.data_migration.name
}
