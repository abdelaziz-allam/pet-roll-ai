terraform {
  required_version = ">= 1.9.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 5.14"
    }
  }

  # storage_account_name and subscription_id (the stage subscription, which holds the state account)
  # are passed at init time with -backend-config. The prod infra identity can read and write only
  # the prod container, so this state cannot be pointed at the other environment.
  backend "azurerm" {
    resource_group_name = "rg-petfolioo-tfstate-swc"
    container_name      = "prod"
    key                 = "petfolioo-prod.tfstate"
    use_azuread_auth    = true
  }
}

# The subscription comes from ARM_SUBSCRIPTION_ID (the AZURE_PROD_SUBSCRIPTION_ID repository
# variable): prod has a subscription of its own, because a new subscription allows only one
# Container Apps environment in total and stage holds the stage subscription's.
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

  environment         = "prod"
  resource_group_name = "rg-petfolioo-prod-swc"
  vnet_cidr           = "10.60.0.0/16"

  # The other environment's VNet and its ingress IP (output container_app_environment_static_ip).
  deny_egress_cidrs = ["10.70.0.0/16", "20.191.55.123/32"]

  alert_emails       = ["abdelaziz.allam.sportex@gmail.com"]
  monthly_budget_usd = 45
  log_daily_quota_gb = 1

  deploy_oidc_subject = "environment:azure-prod"

  apps = {
    # The mobile app talks to the API, so one replica stays warm; the websites can cold-start.
    api     = { cpu = 0.5, memory = "1Gi", min_replicas = 1, max_replicas = 3 }
    landing = { cpu = 0.25, memory = "0.5Gi", min_replicas = 0, max_replicas = 2 }
    admin   = { cpu = 0.25, memory = "0.5Gi", min_replicas = 0, max_replicas = 1 }
  }

  api_url = "https://api.petfolioo.com/api/v1"

  cors_origins = [
    "https://admin.petfolioo.com",
    "https://petfolioo.com",
    "https://www.petfolioo.com",
  ]

  gcp = {
    project_id      = "petroll-production"
    project_number  = "834040996278"
    service_account = "petfolioo-azure-prod@petroll-production.iam.gserviceaccount.com"
  }

  api_settings = {
    SITE_URL = "https://petfolioo.com"
    # OAuth audiences the API accepts for Google and Apple sign-in: the app's web and iOS Google
    # clients (petroll-production) and the iOS bundle id. Public values, not secrets.
    GOOGLE_CLIENT_IDS = "834040996278-0lmec5vdgu349d8fktcog17qmd2ae3tt.apps.googleusercontent.com,834040996278-ufif9vc0k72ogrlqkmet34glafhvupkb.apps.googleusercontent.com"
    APPLE_CLIENT_IDS  = "com.petroll.app"
  }

  api_generated_secrets = {
    CRON_SECRET = "cron-secret"
  }

  api_copied_secrets = {
    # Same key as GCP, so sessions issued before the cutover stay valid after it.
    JWT_SECRET = "jwt-secret"
    # Firebase Auth's scrypt hash config (petroll-production), to check imported passwords.
    FIREBASE_SCRYPT_PARAMS = "firebase-scrypt-params"
  }
}

output "environment" {
  value = module.environment
}
