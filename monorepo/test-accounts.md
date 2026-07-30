# Petfolioo — Production & Test Accounts

## Admin Portal

**URL:** https://admin.petfolioo.com

| Email | Password | Role | Notes |
|-------|----------|------|-------|
| admin@petfolioo.com | P@TF0lioo@2612210106022312789 | super_admin | Primary admin account |

### Admin Roles Available

| Role | Access |
|------|--------|
| super_admin | Full platform access (all pages + admin user management) |
| admin | Manage app users, pets, verifications, analytics |
| moderator | Moderate content, view data |
| viewer | Read-only access |

**Seed endpoint:** `POST https://api.petfolioo.com/api/v1/admin-auth/seed`

---

## Mobile App (Firebase Auth)

**Package:** com.petroll.pet_roll
**Firebase Project:** petroll-production

### Test User Accounts

All use password: `Test1234!`

| Email | Role | Display Name | Notes |
|-------|------|--------------|-------|
| owner1@test.com | user | Test Owner 1 | Has 3 pets (Max, Whiskers, Tweety) |
| owner2@test.com | user | Test Owner 2 | Has 1 pet (Buddy) |
| breeder@test.com | breeder | Test Breeder | Has 2 pets (Luna, Rex - German Shepherds) |
| mod@test.com | moderator | Test Moderator | — |
| viewer@test.com | viewer | Test Viewer | — |

### Sample User Accounts (Seed Data)

| Email | Display Name | Phone | Timezone |
|-------|--------------|-------|----------|
| ahmed@example.com | Ahmed Hassan | +201001234567 | Africa/Cairo |
| sarah@example.com | Sarah Miller | +14155551234 | America/New_York |
| mohammed@example.com | Mohammed Ali | +966501234567 | Asia/Riyadh |
| emma@example.com | Emma Johnson | +447700900123 | Europe/London |
| fatma@example.com | Fatma El-Said | +201112345678 | Africa/Cairo |
| james@example.com | James Wilson | +12025551234 | America/Chicago |
| yuki@example.com | Yuki Tanaka | +81901234567 | Asia/Tokyo |
| hans@example.com | Hans Mueller | +491761234567 | Europe/Berlin |

---

## Google Play Console — Closed Testing Testers

**Opt-in link:** https://play.google.com/apps/testing/com.petroll.pet_roll

**Download link:** https://play.google.com/store/apps/details?id=com.petroll.pet_roll&hl=en-US&ah=55YpY4xKjSfF_XW_HKbqeDKtMQo

| Email | Status |
|-------|--------|
| petroll.site.contactus@gmail.com | Added (original) |
| abd.ibrahim.allam@gmail.com | Added |
| abdelaziz.ibrahim.allam@gmail.com | Added |
| zezo.allam2020@gmail.com | Added |
| abdelaziz.allam.nujb@gmail.com | Added |
| losuindaabdelmageed@gmail.com | Added |
| abdelaziz.allam.sportex@gmail.com | Added |
| abdelaziz.allam.maatera@gmail.com | Added |
| abdelaziz.allam.stc@gmail.com | Added |
| abdelaziz.allam.yallaesim@gmail.com | Added |
| hyla.family.2018@gmail.com | Added |
| hyla.family.2020@gmail.com | Added |
| hyla.family.2021@gmail.com | Added |
| yea.family.2013@gmail.com | Added |
| hamza.yazan.abdelaziz@gmail.com | Added |
| knowlegebase.forall@gmail.com | Added |
| mohammedhusseinit@gmail.com | Added |

**Total: 17 testers** (requirement: 12+ for production access)

---

## Infrastructure

| Service | Project | URL |
|---------|---------|-----|
| Backend API | petroll-production | https://api.petfolioo.com |
| Admin Portal | petroll-production | https://admin.petfolioo.com |
| Landing Page | petroll-production | https://petfolioo.com |
| Firebase Auth | petroll-production | petroll-production.firebaseapp.com |
| Storage Bucket | petroll-production | petroll-production-assets |

---

## Authentication Methods

| Platform | Method |
|----------|--------|
| Mobile App | Firebase Auth (Google Sign-In, Apple Sign-In, Email/Password) |
| Admin Portal | Custom JWT (PBKDF2 hashed passwords, 1h access token, 7d refresh) |
| Backend API | Firebase token verification + JWT exchange |
