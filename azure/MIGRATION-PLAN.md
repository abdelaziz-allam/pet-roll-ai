# PetFolioo: GCP to Azure migration plan

Hosting, files and secrets move from GCP (europe-north1) to Azure (Sweden Central). Firestore and
Firebase Auth stay on Google. The mobile app needs no release: it already calls
`https://api.petfolioo.com/api/v1`, and the cutover changes DNS only.

Status lives in the table in section 8. Everything in this folder is modelled on the iSportEx
migration (`sportex-code/infra/azure`); differences are called out where they matter.

## 1. Decisions

| Topic | Decision | Why |
|---|---|---|
| Database | **Keep Firestore** (`petroll-production`, eur3) | It holds all data (22 collections, ~1.6k docs) and costs nothing on the free tier. Moving it means rewriting the data layer. Azure reaches it through Workload Identity Federation with no stored Google key. |
| Sign-in | **Keep Firebase Auth** | Moving it forces every user to register again. Google and Apple sign-in are configured there. |
| Push (FCM) | Keep; nothing to move | The shipped app does not use FCM; only tokens are stored. |
| API, landing, admin | Azure Container Apps (Consumption), one per app | Same images in stage and prod; the API address is read at runtime, so prod runs the stage image unchanged. |
| Files | Azure Blob: `public` (blog/) and `private` (everything else) | On GCS the whole bucket was world-readable, health records included. Private files are served as SAS links (valid 1-2 hours, stable within each hour so the app's image cache works). Each link is issued only to someone allowed to open the file. |
| Stage data | Prod reference data (blog, locations, categories, tips, settings) + synthetic users and pets | Real customer data never leaves prod. |
| Region | Sweden Central | Same as iSportEx; every service needed is available there. |

The requirement that databases be reachable only privately does not apply: there is no database in
Azure. Firestore is protected by IAM, and only the two WIF service accounts plus the existing GCP
service accounts can use it.

## 2. Architecture

```
                GoDaddy DNS (petfolioo.com)
                      |
     +----------------+------------------+
     |                                   |
  sub 2 (563d2a19-...)                sub 4 (d9aee4d6-...)      sub 2
  STAGE  North Europe                 PROD  Sweden Central
  rg-petfolioo-stage-neu              rg-petfolioo-prod-swc     rg-petfolioo-tfstate-swc
  VNet 10.70.0.0/16                   VNet 10.60.0.0/16         (state account, infra ids)
   cae-petfolioo-stage-neu             cae-petfolioo-prod-swc
     ca-...-api      stage-api.          ca-...-api      api.petfolioo.com
     ca-...-landing  stage.              ca-...-landing  petfolioo.com, www
     ca-...-admin    stage-admin.        ca-...-admin    admin.petfolioo.com
   cr..., kv..., st..., log-...         cr..., kv..., st..., log-...
          |  WIF (no keys)                     |  WIF (no keys)
          v                                    v
   GCP petfolioo-stage                  GCP petroll-production
   Firestore + Firebase Auth            Firestore + Firebase Auth (unchanged)
```

### Isolation between stage and prod
- **Subscription:** one, used only by PetFolioo. Its name does not mention the product. Stage and prod never share a resource group, identity, network, registry or vault.
- **Regions:** a subscription gets one Container Apps environment per region. Prod takes Sweden Central and stage takes North Europe, so both fit without a quota increase.
- **Networks:** separate VNets with no peering. CIDRs `10.70/16` and `10.60/16` don't overlap each other or iSportEx (`10.40/16`, `10.50/16`).
- **NSG:** each apps subnet denies the other environment's VNet. Once both environments exist, add the other environment's ingress IP to `deny_egress_cidrs`.
- **Per-environment resources:** registry, Key Vault, storage account, Log Analytics, budget, identities, and Google project or service account.
- **Identities:**
  - Infra identities are Owner of their own resource group and their own state container only.
  - Deploy identities have AcrPush plus Contributor on their own apps.
  - App identities have AcrPull, Secrets User and Blob Data Contributor in their own environment.
- **GitHub OIDC:** each identity trusts one GitHub environment.
  - Infra (Owner) identities trust `azure-stage-infra` and `azure-prod-infra`.
  - Deploy identities trust `azure-stage` and `azure-prod`.
  - A deploy job can therefore never act as Owner. The repository is public, so both prod environments can require a reviewer.

### Who receives a link to a private file
The API decides this when it sends each response (`backend/src/storage/url-resolver.ts`):
- **`verifications/` and `reports/`:** the owner (the user id in the path) and admins only.
- **Other private files** (pet and pregnancy photos, health records): any signed-in user, because mating listings show other owners' pets.
- **Anonymous callers:** never get a signed link.
- **Anyone not allowed:** gets the unsigned link, which storage answers with 403.

Pet photo URLs are derived on the server from a path that must lie under the caller's own pet.

### Secrets (Key Vault, RBAC mode, read by the apps identity)

| Secret | Stage | Prod |
|---|---|---|
| `jwt-secret` | generated by Terraform | **copied from GCP** (`copy-secrets.sh prod`), so sessions survive the cutover |
| `cron-secret` | generated | generated |
| `admin-seed-password` | generated, used once to create the stage super admin | not present |

A placeholder value fails the API's validation (JWT_SECRET must be at least 16 characters), so prod never starts on a fake key. No placeholder is ever passed to a seeder.

## 3. Cost (USD per month, estimates)

| | Stage | Prod |
|---|---|---|
| API | ~0 (scales to zero) | 10-15 (1 replica warm) |
| Landing, admin | ~0 | 0-3 |
| Registry (Basic) | 5 | 5 |
| Storage, Key Vault, logs (daily cap) | ~2 | 3-4 |
| **Total** | **~7-9** | **~18-27** |
| Budget alert | 15 | 35 |

The billing account is shared with iSportEx (budgets of 150 for its prod and 40 for its stage). Together that's $240/month of budget against the credit.

Credit check on 2026-11-20:
- The only lot visible on the billing profile is the $200 sign-up credit, which expires 2026-12-17.
- The $1,000 Startups credit is not visible. Confirm it before 2026-12-17, or charges go to the card on file.

## 4. One-time setup

**1. Subscription.** Created 2026-11-24 by the billing account owner, after approval in chat:
```
az account alias create --name sub-02 --display-name "Azure subscription 2" --workload Production --billing-scope <invoice-section-id>
```
New subscriptions can be throttled (`TooManyRequests`) for a while after the last one was created; retry later.

**2. Bootstrap.** Run `azure/bootstrap/bootstrap.sh`. It is pinned to PetFolioo's two subscription ids (stage, and prod's own, because a new subscription allows only one Container Apps environment in total), and it:
- registers the resource providers;
- creates the three resource groups, the state account (Entra auth only, versioning on) and the infra identities.

**3. GitHub.**
- Repository variables:
  - from bootstrap: `AZURE_TENANT_ID`, `AZURE_PROD_SUBSCRIPTION_ID`, `AZURE_STAGE_SUBSCRIPTION_ID`, `TFSTATE_SUBSCRIPTION_ID` (the stage subscription, which holds the state account), `TFSTATE_STORAGE_ACCOUNT`, `AZURE_STAGE_INFRA_CLIENT_ID`, `AZURE_PROD_INFRA_CLIENT_ID`;
  - `AZURE_INFRA_ENABLED=true`;
  - after each environment's apply: `AZURE_<ENV>_DEPLOY_CLIENT_ID` and `AZURE_<ENV>_ACR_NAME`;
  - after stage exists: `AZURE_DEPLOY_ENABLED=true`.
- Environments:
  - `azure-stage-infra` and `azure-stage`: no rules.
  - `azure-prod-infra` and `azure-prod`: a required reviewer, main branch only.

**4. Stage Google project.** `petfolioo-stage` (number 599180157887) exists, with Firestore eur3 and Firebase added.
- Open the Firebase console, go to Authentication and press **Get started**, then enable Email/Password. The API can't do this without billing on the project.
- Load reference data with `python3 -I azure/scripts/copy-reference-data.py`. This was done on 2026-11-20 and the counts matched.

## 5. Bringing up an environment

1. **Infrastructure.**
   - Stage: merge to main and `azure-infra-stage` applies.
   - Prod: run `azure-infra-prod` with `apply`; it needs a reviewer.
2. **Google access.** Run `azure/scripts/gcp-wif.sh <env>`. It creates the WIF pool and provider, and a service account with `datastore.user` and `firebaseauth.admin`. The provider admits only that environment's apps identity.
3. **Prod secrets.** Run `azure/scripts/copy-secrets.sh prod`.
4. **Deploy.**
   - Stage: `azure-deploy-stage` runs on every push to main that touches the apps.
   - Prod: run `azure-promote-prod`.
5. **Files.** Run `azure/scripts/migrate-files.sh <env>`. Stage receives `blog/` only. The script prints GCS and Azure object counts, which must match.
6. **Domains.** Run `azure/scripts/bind-domain.sh <env> <app> <host>`. It prints the GoDaddy records, waits for them to resolve, then binds a free managed certificate.

Stage hostnames are `stage-api`, `stage` and `stage-admin` under petfolioo.com. For every new hostname:
- add it to Firebase Auth authorized domains in that environment's project;
- confirm `cors_origins` in the env file includes it.

## 6. Testing stage end to end (Phase 3)

- **API:** `/health` returns 200, and `/docs` loads.
- **Seeding:** the first start seeds synthetic users and pets, and a super admin whose password is the stage Key Vault secret `admin-seed-password`.
- **Admin portal:** log in, open users, pets and verifications; upload a blog cover and confirm it is in the `public` container.
- **Files:** upload a pet photo and a verification document. Both must land in `private` and come back as links containing `sig=`. The same link with the query string removed must not return the file (Azure answers 404 for anonymous reads of a private container).
- **Landing:** the blog list and a blog post render from the stage API.
- **Mobile:**
  - Register an Android app in `petfolioo-stage` with the package and SHA-1 of the release keystore.
  - Build with that project's `google-services.json` and `--dart-define=API_BASE_URL=https://stage-api.petfolioo.com/api/v1`.
  - Then test sign-in, adding a pet with a photo, a health record, and a verification upload.
- **Cron:** `POST /api/v1/cron/compute-stats` returns 401 without the `x-cron-secret` header and 200 with it.

## 7. Prod cutover

**Rehearsal (Phase 5).**
- Bring prod up against `petroll-production`, using the same Firestore, so no data copy is needed.
- Run `migrate-files.sh prod` and test on the `*.azurecontainerapps.io` hostnames while GCP still serves users.
- Azure prod writes to the real prod Firestore, so rehearsal tests are read-only or use the `owner1@test.com` test account. Delete anything that account creates afterwards.
- Time each step.

**Window (Phase 6), about 30 minutes:**
1. A day before, lower the TTL to 600 s on `api`, `admin` and `www`; the apex is already at 600 s.
2. Stop file writes on GCP: scale `petroll-api` to 0 or serve a maintenance page. Firestore needs no copy, because both clouds use the same database.
3. Run `migrate-files.sh prod` for the delta and compare counts.
4. Run `bind-domain.sh prod` in this order: `api`, `admin`, `www`, then the apex `petfolioo.com` last. The apex certificate needs its A record to point at Azure first.
5. Verify app sign-in, viewing an existing pet photo (a legacy GCS URL re-signed from Azure), a new upload, admin login, and the landing blog.
6. Keep GCP Cloud Run deployed with max instances 0 as the rollback.

**Rollback:**
- Point the DNS back:
  - `api` and `admin`: CNAME `ghs.googlehosted.com`;
  - apex: the four Google A records (216.239.32/34/36/38.21);
  - `www`: CNAME to the apex.
- Scale GCP back up.
- Firestore is shared, so no records are lost. Records created on Azure after the cutover point at Azure blob links, which the GCP API does not re-sign:
  - copy those files back to GCS with azcopy;
  - rewrite their URLs to the GCS form;
  - or keep Azure storage running until a fix-forward.

**Decommission (Phase 7, only with the owner's explicit OK):** after two weeks of monitoring, delete the GCP Cloud Run services and the uploads bucket. Keep the project, Firestore and Firebase.

## 8. Status

| Phase | State |
|---|---|
| 0 Discovery | Done 2026-11-20 |
| Security fixes on GCP | Done 2026-11-20: unauthenticated admin seed endpoint removed (PR #1), cron needs a secret, admin passwords rotated into Secret Manager, public listing of the bucket stopped (PR #2) |
| 1 Plan, Terraform, workflows | Done 2026-11-24 (PR #3) |
| 2 Stage up | Done 2026-11-24: infrastructure applied, Google federation set, apps deployed; prod has no `blog/` files, so stage storage starts empty. Bound to stage.petfolioo.com, stage-admin.petfolioo.com and stage-api.petfolioo.com with managed certificates |
| 3 Stage tests | API health, docs, admin login, public blog upload, private document upload with signed links, and cron secret pass. Firebase Auth on `petfolioo-stage` mirrors prod (email/password, Google, Apple), and a Firebase sign-up registers and logs in through the stage API. Stage Firestore carries prod's composite indexes plus `notifications (userId, createdAt desc)`, which prod is missing |
| 4 Prod up | Moved to its own subscription (subscription 4), because a new subscription allows only one Container Apps environment in total and stage holds subscription 2's |
| 5-7 | Not started |

## 9. Risks and notes

- **Credit:** see section 3. Budgets alert but never stop resources.
- **First visit after a landing deploy:** the pre-rendered blog list is empty until its first 5-minute refresh. The build never calls a real API, so it stays isolated.
- **Google Analytics:** stage landing pages report to the prod GA property (`G-P1BLB43EGZ`). Filter by hostname.
- **Health-records files:** `health-records/` objects in GCS come from an older app version with no current upload route. They are copied to `private` and served through the same link re-signing.
- **`image-upload.ts`:** this backend helper still writes to GCS directly. It is not imported anywhere; route it through `objectStore()` before using it.
- **Federation audience:**
  - Today the Container App asks Entra for a token with audience `https://management.azure.com/` and hands it to Google STS.
  - That token is also a valid Azure Resource Manager token for the apps identity until it expires.
  - Better: an Entra app registration with its own App ID URI (no Azure API accepts it). Then set `GCP_WIF_TOKEN_RESOURCE` (Terraform `api_settings`) and `--allowed-audiences` in `gcp-wif.sh` to it.
  - Check in Phase 2 whether the guest Owner account may create app registrations.
- **Integration tests:** `npm run test:integration` fails 19 tests on main, independent of this migration. CI runs only the unit suite.
