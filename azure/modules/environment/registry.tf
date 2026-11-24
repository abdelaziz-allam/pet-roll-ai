# One registry per environment. Prod only ever runs images that were pushed to the prod registry,
# so nothing built for stage can be started in prod, and the stage apps' identity holds no pull
# right on it.
resource "azurerm_container_registry" "env" {
  name                = "cr${local.flat}"
  location            = var.location
  resource_group_name = local.rg
  sku                 = "Basic"
  admin_enabled       = false
  tags                = local.tags
}
