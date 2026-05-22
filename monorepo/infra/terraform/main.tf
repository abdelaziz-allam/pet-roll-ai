terraform {
  required_version = ">= 1.5"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  backend "gcs" {
    bucket = "petroll-terraform-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

variable "project_id" {
  description = "GCP Project ID"
  default     = "petroll-production"
}

variable "project_number" {
  description = "GCP Project Number"
  default     = "834040996278"
}

variable "region" {
  description = "GCP Region (nearest to Sweden)"
  default     = "europe-north1"
}

variable "domain" {
  description = "Custom domain for the app"
  default     = "petroll.site"
}

# ─── Enable Required APIs ───────────────────────────────────────────────────

resource "google_project_service" "apis" {
  for_each = toset([
    "run.googleapis.com",
    "artifactregistry.googleapis.com",
    "cloudbuild.googleapis.com",
    "firestore.googleapis.com",
    "firebase.googleapis.com",
    "secretmanager.googleapis.com",
    "iam.googleapis.com",
    "cloudresourcemanager.googleapis.com",
  ])

  project            = var.project_id
  service            = each.value
  disable_on_destroy = false
}

# ─── Artifact Registry ──────────────────────────────────────────────────────

resource "google_artifact_registry_repository" "docker" {
  location      = var.region
  repository_id = "petroll-images"
  format        = "DOCKER"
  description   = "PET Roll Docker images"

  depends_on = [google_project_service.apis["artifactregistry.googleapis.com"]]
}

# ─── Firestore Database ─────────────────────────────────────────────────────

resource "google_firestore_database" "main" {
  project     = var.project_id
  name        = "(default)"
  location_id = "eur3"
  type        = "FIRESTORE_NATIVE"

  depends_on = [google_project_service.apis["firestore.googleapis.com"]]
}

# ─── Secret Manager ─────────────────────────────────────────────────────────

resource "google_secret_manager_secret" "jwt_secret" {
  secret_id = "jwt-secret"
  replication {
    auto {}
  }
  depends_on = [google_project_service.apis["secretmanager.googleapis.com"]]
}

resource "google_secret_manager_secret_version" "jwt_secret_value" {
  secret      = google_secret_manager_secret.jwt_secret.id
  secret_data = "petroll-prod-jwt-secret-${random_password.jwt.result}"
}

resource "random_password" "jwt" {
  length  = 32
  special = false
}

# ─── Service Account for Cloud Run ──────────────────────────────────────────

resource "google_service_account" "cloud_run" {
  account_id   = "petroll-cloudrun"
  display_name = "PET Roll Cloud Run Service Account"
}

resource "google_project_iam_member" "cloud_run_firestore" {
  project = var.project_id
  role    = "roles/datastore.user"
  member  = "serviceAccount:${google_service_account.cloud_run.email}"
}

resource "google_project_iam_member" "cloud_run_secrets" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${google_service_account.cloud_run.email}"
}

# ─── Outputs ────────────────────────────────────────────────────────────────

output "artifact_registry" {
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/petroll-images"
  description = "Artifact Registry path"
}

output "region" {
  value       = var.region
  description = "Deployment region"
}
