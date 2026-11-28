import { CosmosClient, type Container } from '@azure/cosmos';
import { DefaultAzureCredential } from '@azure/identity';

export interface CosmosSettings {
  endpoint: string;
  database: string;
  container: string;
}

/** Entra ID only: the account has key authentication disabled. AZURE_CLIENT_ID picks the managed identity. */
export function openContainer(s: CosmosSettings): Container {
  const client = new CosmosClient({ endpoint: s.endpoint, aadCredentials: new DefaultAzureCredential() });
  return client.database(s.database).container(s.container);
}
