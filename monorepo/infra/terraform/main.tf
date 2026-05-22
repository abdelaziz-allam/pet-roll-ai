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

# ─── Variables ───────────────────────────────────────────────────────────────

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

# ─── Enable Required APIs (Free or minimal cost) ────────────────────────────

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

# ─── Artifact Registry (Store Docker images) ─────────────────────────────────

resource "google_artifact_registry_repository" "docker" {
  location      = var.region
  repository_id = "petroll-images"
  format        = "DOCKER"
  description   = "PET Roll Docker images"

  depends_on = [google_project_service.apis["artifactregistry.googleapis.com"]]
}

# ─── Firestore Database (Free tier: 1GB storage, 50K reads/day) ──────────────

resource "google_firestore_database" "main" {
  project     = var.project_id
  name        = "(default)"
  location_id = "eur3"
  type        = "FIRESTORE_NATIVE"

  depends_on = [google_project_service.apis["firestore.googleapis.com"]]
}

# ─── Secret Manager (6 active secrets free) ──────────────────────────────────

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

# ─── Cloud Run: Backend API (Free tier: 2M requests/month) ───────────────────

resource "google_cloud_run_v2_service" "backend" {
  name     = "petroll-api"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    service_account = google_service_account.cloud_run.email

    scaling {
      min_instance_count = 0
      max_instance_count = 2
    }

    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/petroll-images/backend:latest"

      ports {
        container_port = 3000
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
        cpu_idle          = true
        startup_cpu_boost = true
      }

      env {
        name  = "NODE_ENV"
        value = "production"
      }
      env {
        name  = "PORT"
        value = "3000"
      }
      env {
        name  = "GCP_PROJECT_ID"
        value = var.project_id
      }
      env {
        name = "JWT_SECRET"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.jwt_secret.secret_id
            version = "latest"
          }
        }
      }
      env {
        name  = "CORS_ORIGINS"
        value = "https://admin.${var.domain},https://${var.domain}"
      }
    }
  }

  depends_on = [
    google_project_service.apis["run.googleapis.com"],
    google_artifact_registry_repository.docker,
  ]
}

resource "google_cloud_run_v2_service_iam_member" "backend_public" {
  project  = var.project_id
  location = var.region
  name     = google_cloud_run_v2_service.backend.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# ─── Cloud Run: Admin Portal (Static site via Cloud Run) ─────────────────────

resource "google_cloud_run_v2_service" "admin" {
  name     = "petroll-admin"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    scaling {
      min_instance_count = 0
      max_instance_count = 1
    }

    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/petroll-images/admin:latest"

      ports {
        container_port = 80
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "256Mi"
        }
        cpu_idle = true
      }
    }
  }

  depends_on = [
    google_project_service.apis["run.googleapis.com"],
    google_artifact_registry_repository.docker,
  ]
}

resource "google_cloud_run_v2_service_iam_member" "admin_public" {
  project  = var.project_id
  location = var.region
  name     = google_cloud_run_v2_service.admin.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# ─── Cloud Run: Landing Page ─────────────────────────────────────────────────

resource "google_cloud_run_v2_service" "landing" {
  name     = "petroll-landing"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    scaling {
      min_instance_count = 0
      max_instance_count = 1
    }

    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/petroll-images/landing:latest"

      ports {
        container_port = 80
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "128Mi"
        }
        cpu_idle = true
      }
    }
  }

  depends_on = [
    google_project_service.apis["run.googleapis.com"],
    google_artifact_registry_repository.docker,
  ]
}

resource "google_cloud_run_v2_service_iam_member" "landing_public" {
  project  = var.project_id
  location = var.region
  name     = google_cloud_run_v2_service.landing.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# ─── Service Account for GitHub Actions CI/CD ────────────────────────────────

resource "google_service_account" "github_actions" {
  account_id   = "github-actions-deploy"
  display_name = "GitHub Actions Deployer"
}

resource "google_project_iam_member" "github_actions_roles" {
  for_each = toset([
    "roles/run.admin",
    "roles/artifactregistry.writer",
    "roles/iam.serviceAccountUser",
    "roles/cloudbuild.builds.editor",
    "roles/storage.admin",
  ])

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

resource "google_service_account_key" "github_actions_key" {
  service_account_id = google_service_account.github_actions.name
}

# ─── Outputs ─────────────────────────────────────────────────────────────────

output "backend_url" {
  value       = google_cloud_run_v2_service.backend.uri
  description = "Backend API URL"
}

output "admin_url" {
  value       = google_cloud_run_v2_service.admin.uri
  description = "Admin Portal URL"
}

output "github_actions_sa_key" {
  value       = google_service_account_key.github_actions_key.private_key
  description = "GitHub Actions Service Account Key (base64 encoded)"
  sensitive   = true
}

output "landing_url" {
  value       = google_cloud_run_v2_service.landing.uri
  description = "Landing Page URL"
}

output "artifact_registry" {
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/petroll-images"
  description = "Artifact Registry path"
}
