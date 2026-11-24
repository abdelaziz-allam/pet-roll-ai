resource "azurerm_log_analytics_workspace" "env" {
  name                = "log-${local.name}"
  location            = var.location
  resource_group_name = local.rg
  sku                 = "PerGB2018"
  retention_in_days   = 30
  daily_quota_gb      = var.log_daily_quota_gb
  tags                = local.tags
}

# Azure wants a budget to start on the first of a month that is not in the past, so the start is
# pinned to the month of the first apply.
resource "time_static" "budget_start" {}

# Budgets only alert; they never stop a resource. Forecast alerts give a warning before the money
# is actually spent, which matters while the environment runs on a fixed credit grant.
resource "azurerm_consumption_budget_resource_group" "env" {
  name              = "budget-${local.name}"
  resource_group_id = data.azurerm_resource_group.env.id
  amount            = var.monthly_budget_usd
  time_grain        = "Monthly"

  time_period {
    start_date = formatdate("YYYY-MM-01'T'00:00:00Z", time_static.budget_start.rfc3339)
  }

  notification {
    enabled        = true
    threshold      = 50
    operator       = "GreaterThan"
    threshold_type = "Actual"
    contact_emails = var.alert_emails
  }

  notification {
    enabled        = true
    threshold      = 80
    operator       = "GreaterThan"
    threshold_type = "Actual"
    contact_emails = var.alert_emails
  }

  notification {
    enabled        = true
    threshold      = 100
    operator       = "GreaterThan"
    threshold_type = "Forecasted"
    contact_emails = var.alert_emails
  }

  lifecycle {
    # Azure rewrites the start date to the first of the current month on read.
    ignore_changes = [time_period]
  }
}
