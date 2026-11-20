# Uploads. Two containers instead of one public bucket:
#
#   public  - blog images, read anonymously by browsers.
#   private - pet photos, health records, verification documents, reports. Never anonymous; the API
#             hands out SAS links signed with a user delegation key, only in responses to callers
#             already allowed to see the record.
resource "azurerm_storage_account" "uploads" {
  name                     = "st${local.flat}"
  location                 = var.location
  resource_group_name      = local.rg
  account_tier             = "Standard"
  account_replication_type = local.is_prd ? "ZRS" : "LRS"
  account_kind             = "StorageV2"
  min_tls_version          = "TLS1_2"

  # Required for the public container. Individual containers still default to private.
  allow_nested_items_to_be_public = true

  # No account keys: every writer authenticates with Entra ID, so a leaked key cannot exist. SAS
  # links are user-delegation SAS, which work with keys disabled.
  shared_access_key_enabled       = false
  default_to_oauth_authentication = true

  blob_properties {
    versioning_enabled = local.is_prd

    delete_retention_policy {
      days = local.is_prd ? 30 : 7
    }

    container_delete_retention_policy {
      days = local.is_prd ? 30 : 7
    }

    cors_rule {
      allowed_origins    = var.cors_origins
      allowed_methods    = ["GET", "HEAD"]
      allowed_headers    = ["*"]
      exposed_headers    = ["Content-Type", "Content-Length"]
      max_age_in_seconds = 3600
    }
  }

  tags = local.tags
}

resource "azurerm_storage_container" "public" {
  name                  = "public"
  storage_account_id    = azurerm_storage_account.uploads.id
  container_access_type = "blob"
}

resource "azurerm_storage_container" "private" {
  name                  = "private"
  storage_account_id    = azurerm_storage_account.uploads.id
  container_access_type = "private"
}
