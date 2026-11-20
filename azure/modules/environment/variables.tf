variable "environment" {
  description = "Short environment name. Drives every resource name, so stage and prod can never collide or share."
  type        = string

  validation {
    condition     = contains(["stage", "prod"], var.environment)
    error_message = "environment must be stage or prod."
  }
}

variable "location" {
  description = "Azure region."
  type        = string
  default     = "swedencentral"
}

variable "location_short" {
  description = "Region abbreviation used in resource names."
  type        = string
  default     = "swc"
}

variable "resource_group_name" {
  description = "Resource group created by azure/bootstrap. Terraform does not create it: the infra identity is scoped to it and cannot create resource groups."
  type        = string
}

variable "vnet_cidr" {
  description = "Address space of this environment's VNet. Must not overlap the other environment or iSportEx (10.40.0.0/16, 10.50.0.0/16)."
  type        = string
}

variable "deny_egress_cidrs" {
  description = "Addresses this environment's apps must never reach: the other environment's VNet and its ingress IP. Enforced by NSG on the apps subnet."
  type        = list(string)
  default     = []
}

variable "alert_emails" {
  description = "Recipients of budget alerts."
  type        = list(string)
}

variable "monthly_budget_usd" {
  description = "Resource-group budget. Alerts only - Azure budgets never stop resources."
  type        = number
}

variable "log_daily_quota_gb" {
  description = "Log Analytics ingestion cap per day. Ingestion is the most common runaway cost in a small Azure estate."
  type        = number
}

variable "apps" {
  description = "Per-app sizing. Keys must be api, landing and admin; each image listens on 8080."
  type = map(object({
    cpu          = number
    memory       = string
    min_replicas = number
    max_replicas = number
  }))

  validation {
    condition     = length(setsubtract(keys(var.apps), ["api", "landing", "admin"])) == 0 && contains(keys(var.apps), "api")
    error_message = "apps keys must be api, landing and admin."
  }
}

variable "api_settings" {
  description = "Non-secret environment variables for the API, on top of the ones this module derives (storage, identity, URLs)."
  type        = map(string)
  default     = {}
}

variable "api_generated_secrets" {
  description = "API env var -> Key Vault secret name for values Terraform generates (random, 48 chars): signing keys that only this environment uses. Never a password a human types or a seeder turns into an account without being told."
  type        = map(string)
  default     = {}
}

variable "api_copied_secrets" {
  description = "API env var -> Key Vault secret name for values copied by hand from GCP. Terraform creates each with the value PLACEHOLDER (which fails the API's validation, so it never runs on a fake value); set the real one with az keyvault secret set."
  type        = map(string)
  default     = {}
}

variable "api_url" {
  description = "Public API base URL the landing site and admin portal call, e.g. https://staging-api.petfolioo.com/api/v1."
  type        = string
}

variable "cors_origins" {
  description = "Browser origins allowed to call the API and read public blobs."
  type        = list(string)
}

variable "gcp" {
  description = "Google side of Workload Identity Federation: the project holding Firestore/Auth, its number, and the service account the API impersonates. Created by azure/scripts/gcp-wif.sh."
  type = object({
    project_id      = string
    project_number  = string
    service_account = string
  })
}

variable "legacy_gcs_bucket" {
  description = "Bucket named in file URLs that Firestore stored on GCP. The API maps them onto the Azure containers on read."
  type        = string
  default     = "petroll-production-storage"
}

variable "github_repo" {
  description = "owner/repo whose deploy pipeline releases images to this environment."
  type        = string
  default     = "abdelaziz-allam/pet-roll-ai"
}

variable "deploy_oidc_subject" {
  description = "Part of the GitHub OIDC subject after repo:<owner>/<repo>: that may use the deploy identity, e.g. environment:azure-stage or environment:azure-prod."
  type        = string
}

variable "tags" {
  description = "Extra tags."
  type        = map(string)
  default     = {}
}
