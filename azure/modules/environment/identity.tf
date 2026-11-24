# Two identities per environment, neither of which holds any role outside its own resource group:
#
#   apps   - what the running containers authenticate as: pull images, read secrets, write blobs,
#            and (through Google Workload Identity Federation) read and write Firestore.
#   deploy - what the deploy pipeline authenticates as (GitHub OIDC, no secrets): push images and
#            roll the container apps. It cannot read secrets or touch data.
#
# The infra identity that runs this Terraform is created by azure/bootstrap, because it has to
# exist before Terraform can run.

resource "azurerm_user_assigned_identity" "apps" {
  name                = "id-${local.name}-apps"
  location            = var.location
  resource_group_name = local.rg
  tags                = local.tags
}

resource "azurerm_user_assigned_identity" "deploy" {
  name                = "id-${local.name}-deploy"
  location            = var.location
  resource_group_name = local.rg
  tags                = local.tags
}

# Only workflow runs matching deploy_oidc_subject can exchange their GitHub token for this identity.
# Stage and prod trust different GitHub environments, so the stage pipeline cannot obtain prod
# credentials.
resource "azurerm_federated_identity_credential" "deploy_github" {
  name                      = "github-deploy-${var.environment}"
  user_assigned_identity_id = azurerm_user_assigned_identity.deploy.id
  audience                  = ["api://AzureADTokenExchange"]
  issuer                    = "https://token.actions.githubusercontent.com"
  subject                   = "repo:${var.github_repo}:${var.deploy_oidc_subject}"
}

resource "azurerm_role_assignment" "apps_acr_pull" {
  scope                = azurerm_container_registry.env.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_user_assigned_identity.apps.principal_id
  principal_type       = "ServicePrincipal"
}

resource "azurerm_role_assignment" "apps_kv_secrets" {
  scope                = azurerm_key_vault.env.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azurerm_user_assigned_identity.apps.principal_id
  principal_type       = "ServicePrincipal"
}

# Includes generateUserDelegationKey, which signs the private-file SAS links.
resource "azurerm_role_assignment" "apps_blob" {
  scope                = azurerm_storage_account.uploads.id
  role_definition_name = "Storage Blob Data Contributor"
  principal_id         = azurerm_user_assigned_identity.apps.principal_id
  principal_type       = "ServicePrincipal"
}

resource "azurerm_role_assignment" "deploy_acr_push" {
  scope                = azurerm_container_registry.env.id
  role_definition_name = "AcrPush"
  principal_id         = azurerm_user_assigned_identity.deploy.principal_id
  principal_type       = "ServicePrincipal"
}

# Rolling a revision needs write on the app and join on its environment - nothing else in the group.
resource "azurerm_role_assignment" "deploy_apps" {
  for_each = azurerm_container_app.app

  scope                = each.value.id
  role_definition_name = "Contributor"
  principal_id         = azurerm_user_assigned_identity.deploy.principal_id
  principal_type       = "ServicePrincipal"
}

resource "azurerm_role_assignment" "deploy_environment" {
  scope                = azurerm_container_app_environment.env.id
  role_definition_name = "Contributor"
  principal_id         = azurerm_user_assigned_identity.deploy.principal_id
  principal_type       = "ServicePrincipal"
}

# Updating an app that carries the apps identity can require permission to assign that identity.
# Managed Identity Operator grants exactly that, on this one identity.
resource "azurerm_role_assignment" "deploy_assign_apps_identity" {
  scope                = azurerm_user_assigned_identity.apps.id
  role_definition_name = "Managed Identity Operator"
  principal_id         = azurerm_user_assigned_identity.deploy.principal_id
  principal_type       = "ServicePrincipal"
}
