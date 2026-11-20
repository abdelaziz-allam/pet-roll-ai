# Each environment has its own VNet and nothing connects it to any other network: no peering, no
# VPN, no shared DNS zone. The address spaces do not overlap (each other or iSportEx), and the NSG
# below drops traffic towards the other environment anyway, so stage cannot reach prod even if
# someone peers them later.

resource "azurerm_virtual_network" "env" {
  name                = "vnet-${local.name}"
  location            = var.location
  resource_group_name = local.rg
  address_space       = [var.vnet_cidr]
  tags                = local.tags
}

resource "azurerm_subnet" "apps" {
  name                 = "snet-apps"
  resource_group_name  = local.rg
  virtual_network_name = azurerm_virtual_network.env.name
  address_prefixes     = [cidrsubnet(var.vnet_cidr, 7, 0)] # /23 in a /16

  delegation {
    name = "container-apps"
    service_delegation {
      name    = "Microsoft.App/environments"
      actions = ["Microsoft.Network/virtualNetworks/subnets/join/action"]
    }
  }
}

resource "azurerm_network_security_group" "apps" {
  name                = "nsg-${local.name}-apps"
  location            = var.location
  resource_group_name = local.rg
  tags                = local.tags

  dynamic "security_rule" {
    for_each = length(var.deny_egress_cidrs) > 0 ? [1] : []
    content {
      name                         = "deny-other-environment-out"
      priority                     = 100
      direction                    = "Outbound"
      access                       = "Deny"
      protocol                     = "*"
      source_port_range            = "*"
      destination_port_range       = "*"
      source_address_prefix        = "*"
      destination_address_prefixes = var.deny_egress_cidrs
    }
  }

  dynamic "security_rule" {
    for_each = length(var.deny_egress_cidrs) > 0 ? [1] : []
    content {
      name                       = "deny-other-environment-in"
      priority                   = 100
      direction                  = "Inbound"
      access                     = "Deny"
      protocol                   = "*"
      source_port_range          = "*"
      destination_port_range     = "*"
      source_address_prefixes    = var.deny_egress_cidrs
      destination_address_prefix = "*"
    }
  }
}

resource "azurerm_subnet_network_security_group_association" "apps" {
  subnet_id                 = azurerm_subnet.apps.id
  network_security_group_id = azurerm_network_security_group.apps.id
}
