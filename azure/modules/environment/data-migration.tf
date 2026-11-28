# Runs src/scripts/migrate-firestore-to-cosmos.ts from the API image, on demand. It lives in the
# environment's VNet (the only place the Cosmos private endpoint answers) and runs as the apps
# identity, which Cosmos and Google already trust. The azure-data-migrate workflow sets the image to
# the API's current one, picks the mode through the arguments and starts an execution.
resource "azurerm_container_app_job" "data_migration" {
  name                         = "caj-${local.name}-data"
  location                     = var.location
  resource_group_name          = local.rg
  container_app_environment_id = azurerm_container_app_environment.env.id
  workload_profile_name        = "Consumption"
  replica_timeout_in_seconds   = 1800
  replica_retry_limit          = 0
  tags                         = merge(local.tags, { app = "data-migration" })

  manual_trigger_config {
    parallelism              = 1
    replica_completion_count = 1
  }

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.apps.id]
  }

  registry {
    server   = azurerm_container_registry.env.login_server
    identity = azurerm_user_assigned_identity.apps.id
  }

  template {
    container {
      name    = "migrate"
      image   = local.placeholder_image
      cpu     = 0.5
      memory  = "1Gi"
      command = ["node", "dist/scripts/migrate-firestore-to-cosmos.js"]
      args    = ["verify"]

      dynamic "env" {
        for_each = {
          for k, v in local.app_env.api : k => v
          if contains(["NODE_ENV", "GCP_PROJECT_ID", "FIREBASE_PROJECT_ID", "GCP_WIF_PROVIDER", "GCP_WIF_SERVICE_ACCOUNT", "AZURE_CLIENT_ID", "COSMOS_ENDPOINT", "COSMOS_DATABASE", "COSMOS_CONTAINER"], k)
        }
        content {
          name  = env.key
          value = env.value
        }
      }
    }
  }

  depends_on = [azurerm_role_assignment.apps_acr_pull]

  lifecycle {
    # Set per run by the workflow.
    ignore_changes = [template[0].container[0].image, template[0].container[0].args]
  }
}

# Lets the pipeline point the job at a release and start it; nothing else.
resource "azurerm_role_assignment" "deploy_data_migration" {
  scope                = azurerm_container_app_job.data_migration.id
  role_definition_name = "Contributor"
  principal_id         = azurerm_user_assigned_identity.deploy.principal_id
  principal_type       = "ServicePrincipal"
}
