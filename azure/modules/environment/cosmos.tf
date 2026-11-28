# App data, replacing Firestore. One container holds every collection: each item carries its
# collection path in `c`, which is also the partition key, so a collection is one logical partition.
# That keeps every query single-partition and lets a batch within one collection commit atomically,
# as a Firestore batch does. A logical partition caps at 20 GB; prod holds a few MB.
#
# Reachable only through the private endpoint in this environment's VNet, and only with Entra ID:
# there are no account keys to leak and no public address to reach.
resource "azurerm_cosmosdb_account" "data" {
  name                = "cosmos-${local.name}"
  location            = var.location
  resource_group_name = local.rg
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"

  # One free-tier account per subscription: 1000 RU/s and 25 GB at no charge, which covers the
  # container below. Each environment has its own subscription, so both get it.
  free_tier_enabled = true

  public_network_access_enabled = false
  local_authentication_enabled  = false
  minimal_tls_version           = "Tls12"

  consistency_policy {
    consistency_level = "Session"
  }

  geo_location {
    location          = var.location
    failover_priority = 0
    zone_redundant    = false
  }

  # Continuous backup restores to any second in the last 7 days; the 7-day tier has no storage charge.
  backup {
    type = "Continuous"
    tier = "Continuous7Days"
  }

  tags = local.tags
}

resource "azurerm_cosmosdb_sql_database" "data" {
  name                = "petfolioo"
  resource_group_name = local.rg
  account_name        = azurerm_cosmosdb_account.data.name
}

resource "azurerm_cosmosdb_sql_container" "documents" {
  name                = "documents"
  resource_group_name = local.rg
  account_name        = azurerm_cosmosdb_account.data.name
  database_name       = azurerm_cosmosdb_sql_database.data.name

  partition_key_paths   = ["/c"]
  partition_key_version = 2

  # The free tier's whole allowance. Manual rather than autoscale: autoscale is not free.
  throughput = 1000

  indexing_policy {
    indexing_mode = "consistent"

    included_path {
      path = "/*"
    }

    # The original document body is returned as-is and never filtered on; queries use `o`.
    excluded_path {
      path = "/d/*"
    }

    excluded_path {
      path = "/\"_etag\"/?"
    }
  }
}

# Built-in "Cosmos DB Built-in Data Contributor": read and write items, nothing on the account itself.
resource "azurerm_cosmosdb_sql_role_assignment" "apps_data" {
  resource_group_name = local.rg
  account_name        = azurerm_cosmosdb_account.data.name
  role_definition_id  = "${azurerm_cosmosdb_account.data.id}/sqlRoleDefinitions/00000000-0000-0000-0000-000000000002"
  principal_id        = azurerm_user_assigned_identity.apps.principal_id
  scope               = azurerm_cosmosdb_account.data.id
}

resource "azurerm_subnet" "private_endpoints" {
  name                 = "snet-private-endpoints"
  resource_group_name  = local.rg
  virtual_network_name = azurerm_virtual_network.env.name
  address_prefixes     = [cidrsubnet(var.vnet_cidr, 8, 2)] # /24 after the apps /23
}

resource "azurerm_private_dns_zone" "cosmos" {
  name                = "privatelink.documents.azure.com"
  resource_group_name = local.rg
  tags                = local.tags
}

# Linked to this VNet only, so the other environment cannot resolve this account privately.
resource "azurerm_private_dns_zone_virtual_network_link" "cosmos" {
  name                 = "link-${local.name}"
  private_dns_zone_id  = azurerm_private_dns_zone.cosmos.id
  virtual_network_id   = azurerm_virtual_network.env.id
  registration_enabled = false
  tags                 = local.tags
}

resource "azurerm_private_endpoint" "cosmos" {
  name                = "pe-${local.name}-cosmos"
  location            = var.location
  resource_group_name = local.rg
  subnet_id           = azurerm_subnet.private_endpoints.id
  tags                = local.tags

  private_service_connection {
    name                           = "cosmos"
    private_connection_resource_id = azurerm_cosmosdb_account.data.id
    subresource_names              = ["Sql"]
    is_manual_connection           = false
  }

  private_dns_zone_group {
    name                 = "cosmos"
    private_dns_zone_ids = [azurerm_private_dns_zone.cosmos.id]
  }
}
