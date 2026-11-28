terraform {
  required_version = ">= 1.9.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 5.14"
    }
  }

  # storage_account_name and subscription_id (the stage subscription, which holds the state account)
  # are passed at init time with -backend-config. The stage infra identity can read and write only
  # the stage container, so this state cannot be pointed at the other environment.
  backend "azurerm" {
    resource_group_name = "rg-petfolioo-tfstate-swc"
    container_name      = "stage"
    key                 = "petfolioo-stage.tfstate"
    use_azuread_auth    = true
  }
}

# The subscription comes from ARM_SUBSCRIPTION_ID (the AZURE_STAGE_SUBSCRIPTION_ID repository
# variable). Prod runs in a subscription of its own, so the two never share a resource group,
# identity, network or vault.
provider "azurerm" {
  features {
    key_vault {
      # Purging needs subscription-level rights the infra identity does not hold; a destroyed vault
      # simply expires after its soft-delete window.
      purge_soft_delete_on_destroy = false
    }
  }
  storage_use_azuread = true
}

module "environment" {
  source = "../../modules/environment"

  environment         = "stage"
  location            = "northeurope"
  location_short      = "neu"
  resource_group_name = "rg-petfolioo-stage-neu"
  vnet_cidr           = "10.70.0.0/16"

  # North Europe refuses new Cosmos DB accounts for this subscription (capacity), so the account
  # sits in Sweden Central and stage reaches it through its own private endpoint.
  cosmos_location       = "swedencentral"
  cosmos_location_short = "swc"

  # Copied and verified by the data-migration job (1,446 documents, every collection matching).
  data_store = "cosmos"

  # The other environment's VNet and its ingress IP (output container_app_environment_static_ip).
  deny_egress_cidrs = ["10.60.0.0/16", "172.135.116.76/32"]

  alert_emails       = ["abdelaziz.allam.sportex@gmail.com"]
  monthly_budget_usd = 20
  log_daily_quota_gb = 0.5

  deploy_oidc_subject = "environment:azure-stage"

  apps = {
    api     = { cpu = 0.5, memory = "1Gi", min_replicas = 0, max_replicas = 2 }
    landing = { cpu = 0.25, memory = "0.5Gi", min_replicas = 0, max_replicas = 1 }
    admin   = { cpu = 0.25, memory = "0.5Gi", min_replicas = 0, max_replicas = 1 }
  }

  api_url = "https://stage-api.petfolioo.com/api/v1"

  cors_origins = [
    "https://stage-admin.petfolioo.com",
    "https://stage.petfolioo.com",
  ]

  gcp = {
    project_id      = "petfolioo-stage"
    project_number  = "599180157887"
    service_account = "petfolioo-azure-stage@petfolioo-stage.iam.gserviceaccount.com"
  }

  api_settings = {
    SITE_URL = "https://stage.petfolioo.com"
    # Stage starts empty: fill it with demo pets and synthetic users, never real customer data.
    SEED_DEMO_DATA = "true"
  }

  api_generated_secrets = {
    JWT_SECRET     = "jwt-secret"
    CRON_SECRET    = "cron-secret"
    ADMIN_PASSWORD = "admin-seed-password"
  }

  api_copied_secrets = {}
}

output "environment" {
  value = module.environment
}
