data "azurerm_client_config" "current" {}

data "azurerm_resource_group" "env" {
  name = var.resource_group_name
}

# Globally unique names (storage, registry, key vault) need a suffix nobody else holds. It is
# derived from the resource group id, so it is stable across applies and different per environment.
resource "random_string" "suffix" {
  length  = 5
  upper   = false
  special = false
  keepers = {
    resource_group = data.azurerm_resource_group.env.id
  }
}

locals {
  name   = "petfolioo-${var.environment}-${var.location_short}"
  flat   = "petfolioo${var.environment}${random_string.suffix.result}"
  rg     = data.azurerm_resource_group.env.name
  is_prd = var.environment == "prod"

  tags = merge({
    project     = "petfolioo"
    environment = var.environment
    managed-by  = "terraform"
  }, var.tags)
}
