#!/bin/bash
set -e

PROJECT_ID="petroll-production"
REGION="europe-north1"

echo "=== PET Roll GCP Bootstrap ==="
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo ""

# Set project
gcloud config set project $PROJECT_ID

# Enable required APIs
echo ">>> Enabling APIs..."
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  firestore.googleapis.com \
  secretmanager.googleapis.com \
  iam.googleapis.com \
  cloudresourcemanager.googleapis.com \
  storage.googleapis.com

# Create Terraform state bucket (free tier: 5GB)
echo ">>> Creating Terraform state bucket..."
gsutil mb -p $PROJECT_ID -l $REGION gs://petroll-terraform-state 2>/dev/null || echo "Bucket exists"
gsutil versioning set on gs://petroll-terraform-state

# Create Artifact Registry repository
echo ">>> Creating Artifact Registry..."
gcloud artifacts repositories create petroll-images \
  --repository-format=docker \
  --location=$REGION \
  --description="PET Roll Docker images" 2>/dev/null || echo "Repo exists"

# Create Firestore database
echo ">>> Creating Firestore database..."
gcloud firestore databases create \
  --location=eur3 \
  --type=firestore-native 2>/dev/null || echo "Firestore exists"

# Create service account for Cloud Run
echo ">>> Creating Cloud Run service account..."
gcloud iam service-accounts create petroll-cloudrun \
  --display-name="PET Roll Cloud Run" 2>/dev/null || echo "SA exists"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:petroll-cloudrun@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/datastore.user" --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:petroll-cloudrun@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor" --quiet

# Create service account for GitHub Actions
echo ">>> Creating GitHub Actions service account..."
gcloud iam service-accounts create github-actions-deploy \
  --display-name="GitHub Actions Deployer" 2>/dev/null || echo "SA exists"

for ROLE in roles/run.admin roles/artifactregistry.writer roles/iam.serviceAccountUser roles/cloudbuild.builds.editor roles/storage.admin; do
  gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="$ROLE" --quiet
done

# Generate key for GitHub Actions
echo ">>> Generating GitHub Actions SA key..."
gcloud iam service-accounts keys create /tmp/gcp-sa-key.json \
  --iam-account=github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com

echo ""
echo "=== DONE ==="
echo ""
echo "Next steps:"
echo "1. Create JWT secret:"
echo "   echo -n 'your-secure-jwt-secret-here' | gcloud secrets create jwt-secret --data-file=-"
echo ""
echo "2. Add GitHub Actions secret (GCP_SA_KEY):"
echo "   cat /tmp/gcp-sa-key.json | base64"
echo "   Then add the output as a secret in your GitHub repo settings."
echo ""
echo "3. Run Terraform:"
echo "   cd infra/terraform && terraform init && terraform plan"
echo ""
echo "4. Push to main branch to trigger CI/CD deployment"
