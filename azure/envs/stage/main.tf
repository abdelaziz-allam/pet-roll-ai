terraform {
  required_version = ">= 1.9.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 5.14"
    }
  }

  # storage_account_name and subscription_id (the prod subscription, which holds the state account)
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
# variable). Stage and prod share PetFolioo's subscription but never a resource group, identity,
# network or vault. Stage runs in North Europe because a subscription gets one Container Apps
# environment per region, and prod holds the Sweden Central one.
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

  # The other environment's VNet. Its ingress IP is appended once it exists
  # (output container_app_environment_static_ip).
  deny_egress_cidrs = ["10.60.0.0/16"]

  alert_emails       = ["abdelaziz.allam.sportex@gmail.com"]
  monthly_budget_usd = 15
  log_daily_quota_gb = 0.5

  deploy_oidc_subject = "environment:azure-stage"

  apps = {
    api     = { cpu = 0.5, memory = "1Gi", min_replicas = 0, max_replicas = 2 }
    landing = { cpu = 0.25, memory = "0.5Gi", min_replicas = 0, max_replicas = 1 }
    admin   = { cpu = 0.25, memory = "0.5Gi", min_replicas = 0, max_replicas = 1 }
  }

  api_url = "https://staging-api.petfolioo.com/api/v1"

  cors_origins = [
    "https://staging-admin.petfolioo.com",
    "https://staging.petfolioo.com",
  ]

  gcp = {
    project_id      = "petfolioo-stage"
    project_number  = "599180157887"
    service_account = "petfolioo-azure-stage@petfolioo-stage.iam.gserviceaccount.com"
  }

  api_settings = {
    SITE_URL = "https://staging.petfolioo.com"
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
