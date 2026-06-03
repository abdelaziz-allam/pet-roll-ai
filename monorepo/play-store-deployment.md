# Google Play Store Deployment Tracker

## Status: BUILD READY — APK & AAB Signed Successfully

---

## Google Play Console Access

- **Google Account**: petroll.site.contactus@gmail.com
- **Firebase Project**: petroll-production
- **App Package**: com.petroll.pet_roll
- **App Name**: Petfolioo

---

## Deployment Checklist

### CRITICAL (Blocking Deployment)

- [x] **1. Remove hardcoded production JWT secret from main.dart**
  - DONE: Replaced with proper Firebase Auth flow (email/password, Google, Apple sign-in).
  - Login screen at `lib/features/auth/login_screen.dart` uses Firebase Auth → backend token exchange.

- [ ] **2. Add iOS privacy descriptions to Info.plist**
  - File: `monorepo/app/ios/Runner/Info.plist`
  - Missing: `NSCameraUsageDescription`, `NSPhotoLibraryUsageDescription`, `NSPhotoLibraryAddUsageDescription`
  - Action: Add permission descriptions for camera and photo library access.

- [x] **3. Generate Android signing key and key.properties**
  - DONE: Keystore `petfolioo-release.jks` generated, `key.properties` configured.
  - Certificate: CN=Petfolioo, OU=Mobile, O=Petfolioo, L=Cairo, ST=Cairo, C=EG
  - Both excluded from git via `.gitignore`.

- [ ] **4. Add Privacy Policy & Terms of Service**
  - Action: Create privacy policy page (can use a hosted URL)
  - Display in: App settings screen + store listing
  - Required by both Google Play and Apple App Store.

---

### HIGH (Likely rejection or runtime issues)

- [x] **5. Create Android adaptive icons**
  - DONE: `ic_launcher.xml` with foreground/background layers created.
  - Foreground PNGs in all density buckets (mdpi through xxxhdpi).
  - Background color defined in `values/ic_launcher_background.xml`.

- [ ] **6. Fix iOS bundle ID mismatch with Firebase**
  - GoogleService-Info.plist has: `com.petroll.app`
  - Project.pbxproj uses: `com.petroll.petRoll`
  - Action: Regenerate GoogleService-Info.plist from Firebase Console with correct bundle ID.

- [ ] **7. Integrate Firebase Crashlytics**
  - Action: Add `firebase_crashlytics` to pubspec.yaml, initialize in main.dart.
  - Required for production error monitoring.

- [ ] **8. Fix iOS deployment target mismatch**
  - Podfile: iOS 14.0
  - project.pbxproj: iOS 13.0
  - Action: Align both to iOS 14.0.

- [ ] **9. Add PrivacyInfo.xcprivacy for iOS 17+**
  - Apple's new privacy manifest requirement.
  - Action: Create privacy manifest declaring data collection practices.

---

### MEDIUM (Should fix before release)

- [ ] **10. Implement build flavors (dev/staging/prod)**
  - Action: Separate environment configurations for different build targets.

- [ ] **11. Complete breeder rankings API integration**
  - File: `lib/features/mating/screens/breeder_rankings_screen.dart` (line 24)
  - Has `TODO: Wire to API` — complete or remove from navigation.

- [ ] **12. Configure Apple Developer Team**
  - Set DEVELOPMENT_TEAM in Xcode project build settings.

- [ ] **13. Replace silent catch blocks with proper logging**
  - Multiple files use `catch (_) {}` — replace with Crashlytics logging.

---

### STORE LISTING (Required for Google Play)

- [ ] **14. Prepare store listing assets**
  - App title (max 30 chars): "Petfolioo"
  - Short description (max 80 chars)
  - Full description (max 4000 chars)
  - Feature graphic (1024x500 px)
  - App icon (512x512 px)
  - Screenshots: min 2 per device type (phone, tablet)
  - Content rating questionnaire
  - Data safety form

- [ ] **15. Register Google Play Developer Account**
  - Account: petroll.site.contactus@gmail.com
  - One-time fee: $25 USD
  - URL: https://play.google.com/console/signup

- [ ] **16. Create app listing in Play Console**
  - Package name: com.petroll.pet_roll
  - Default language: English
  - App category: Lifestyle or Tools

- [ ] **17. Complete Data Safety form**
  - Declare: email collection, pet data, photos
  - Firebase Analytics data collection
  - Authentication data

- [x] **18. Build and upload signed AAB**
  - DONE: `flutter build appbundle --release` — SUCCESS (47.2MB)
  - APK also built for device testing: `app-release.apk` (58.3MB)
  - Both signed with petfolioo-release.jks certificate.
  - AAB location: `build/app/outputs/bundle/release/app-release.aab`
  - Next: Upload to Internal Testing track in Play Console.

---

### POST-SUBMISSION

- [ ] **19. Monitor review status** (typically 1-7 days for new apps)
- [ ] **20. Respond to any policy violations**
- [ ] **21. Set up staged rollout (10% → 50% → 100%)**

---

## What's Already GOOD

- Backend API is production-deployed and stable (api.petfolioo.com)
- Secure token storage (not plain SharedPreferences)
- ProGuard/R8 minification enabled for Android release
- HTTPS enforced (usesCleartextTraffic="false")
- All iOS app icon sizes present
- Firebase Auth integration working
- App version properly configured (1.0.0+1)
- Clean dependency tree (no deprecated packages)
- CI/CD pipelines passing (Backend, Flutter, Admin Portal)

---

## Estimated Timeline

| Phase | Items | Time |
|-------|-------|------|
| Critical fixes (1-4) | Security + compliance | ~2-3 hours |
| High fixes (5-9) | Platform config | ~4-6 hours |
| Store listing (14-18) | Assets + submission | ~2-3 hours |
| Review period | Google review | 1-7 days |
| **Total to submission** | | **~1-2 days of work** |

---

## Notes

- Always test release builds on physical device before submission
- Keep keystore file backed up securely (losing it = can never update the app)
- Version code must increment with each Play Store upload
- AAB (Android App Bundle) required — APK not accepted for new apps
