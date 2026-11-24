# Container Apps on the Consumption workload profile: billed per second of use, scales to zero where
# min_replicas is 0, and runs inside this environment's VNet.
#
# Terraform owns everything about the apps except the image. The deploy pipeline sets the image on
# each release; Terraform creates the app with a placeholder and then ignores the image. Settings
# and secret references live here, so a release cannot silently drop a variable.

resource "azurerm_container_app_environment" "env" {
  name                           = "cae-${local.name}"
  location                       = var.location
  resource_group_name            = local.rg
  infrastructure_subnet_id       = azurerm_subnet.apps.id
  internal_load_balancer_enabled = false
  logs_destination               = "log-analytics"
  log_analytics_workspace_id     = azurerm_log_analytics_workspace.env.id
  tags                           = local.tags

  workload_profile {
    name                  = "Consumption"
    workload_profile_type = "Consumption"
  }

  lifecycle {
    # Azure names the managed infrastructure group itself on create.
    ignore_changes = [infrastructure_resource_group_name]
  }
}

locals {
  # Listens on 8080 like the real images, so the placeholder revision is healthy.
  placeholder_image = "mcr.microsoft.com/dotnet/samples:aspnetapp"

  wif_provider = "projects/${var.gcp.project_number}/locations/global/workloadIdentityPools/azure-petfolioo/providers/${var.environment}"

  app_env = {
    api = merge(
      {
        NODE_ENV                  = "production"
        PORT                      = "8080"
        GCP_PROJECT_ID            = var.gcp.project_id
        FIREBASE_PROJECT_ID       = var.gcp.project_id
        GCP_WIF_PROVIDER          = local.wif_provider
        GCP_WIF_SERVICE_ACCOUNT   = var.gcp.service_account
        STORAGE_PROVIDER          = "azure"
        AZURE_STORAGE_ACCOUNT_URL = trimsuffix(azurerm_storage_account.uploads.primary_blob_endpoint, "/")
        AZURE_PUBLIC_CONTAINER    = azurerm_storage_container.public.name
        AZURE_PRIVATE_CONTAINER   = azurerm_storage_container.private.name
        AZURE_CLIENT_ID           = azurerm_user_assigned_identity.apps.client_id
        LEGACY_GCS_BUCKET         = var.legacy_gcs_bucket
        CORS_ORIGINS              = join(",", var.cors_origins)
      },
      var.api_settings,
    )
    # Next.js standalone binds to HOSTNAME; Container Apps sets it to the replica name.
    landing = { API_URL = var.api_url, HOSTNAME = "0.0.0.0", PORT = "8080" }
    admin   = { API_URL = var.api_url }
  }

  # env var -> Key Vault secret name. Only the API holds secrets.
  app_secret_refs = {
    api     = merge(var.api_generated_secrets, var.api_copied_secrets)
    landing = {}
    admin   = {}
  }
}

resource "azurerm_container_app" "app" {
  for_each = var.apps

  name                         = "ca-${local.name}-${each.key}"
  resource_group_name          = local.rg
  container_app_environment_id = azurerm_container_app_environment.env.id
  revision_mode                = "Single"
  workload_profile_name        = "Consumption"
  tags                         = merge(local.tags, { app = each.key })

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.apps.id]
  }

  registry {
    server   = azurerm_container_registry.env.login_server
    identity = azurerm_user_assigned_identity.apps.id
  }

  dynamic "secret" {
    for_each = toset(values(local.app_secret_refs[each.key]))
    content {
      name                = secret.value
      key_vault_secret_id = "${azurerm_key_vault.env.vault_uri}secrets/${secret.value}"
      identity            = azurerm_user_assigned_identity.apps.id
    }
  }

  ingress {
    external_enabled           = true
    target_port                = 8080
    transport                  = "auto"
    allow_insecure_connections = false

    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  template {
    min_replicas = each.value.min_replicas
    max_replicas = each.value.max_replicas

    container {
      name   = each.key
      image  = local.placeholder_image
      cpu    = each.value.cpu
      memory = each.value.memory

      dynamic "env" {
        for_each = local.app_env[each.key]
        content {
          name  = env.key
          value = env.value
        }
      }

      dynamic "env" {
        for_each = local.app_secret_refs[each.key]
        content {
          name        = env.key
          secret_name = env.value
        }
      }
    }

    http_scale_rule {
      name                = "http"
      concurrent_requests = "50"
    }
  }

  depends_on = [
    azurerm_role_assignment.apps_acr_pull,
    azurerm_role_assignment.apps_kv_secrets,
    azurerm_key_vault_secret.generated,
    azurerm_key_vault_secret.copied,
  ]

  lifecycle {
    ignore_changes = [
      template[0].container[0].image,
      # A custom suffix would be resent by Terraform and rejected as a duplicate.
      template[0].revision_suffix,
    ]
  }
}
