class AppConstants {
  AppConstants._();

  static const String appName = 'Petfolioo';
  static const String packageId = 'com.petroll';

  // API
  static const String apiBaseUrl = 'https://api.petfolioo.com/api/v1';

  // Storage Keys
  static const String accessTokenKey = 'access_token';
  static const String refreshTokenKey = 'refresh_token';
  static const String userIdKey = 'user_id';
  static const String onboardingCompleteKey = 'onboarding_complete';
  static const String selectedPetKey = 'selected_pet_id';

  // Timeouts
  static const Duration connectionTimeout = Duration(seconds: 30);
  static const Duration receiveTimeout = Duration(seconds: 30);

  // Pagination
  static const int paginationLimit = 20;
  static const int defaultPageSize = 20;

  // Image
  static const int maxPhotoSize = 10 * 1024 * 1024;
  static const int maxPhotosPerPet = 50;
  static const int maxImageWidth = 1024;
  static const int maxImageHeight = 1024;
  static const int maxImageSizeMB = 10;
  static const int maxPetPhotos = 50;
  static const List<String> allowedImageTypes = ['jpg', 'jpeg', 'png', 'webp'];

  // Validation
  static const int minPasswordLength = 8;
  static const int maxPetNameLength = 50;
  static const int maxDescriptionLength = 500;

  // Cache
  static const Duration tokenRefreshThreshold = Duration(minutes: 5);
  static const Duration cacheExpiry = Duration(hours: 1);

  static const List<String> supportedSpecies = ['dog', 'cat'];
  static const List<String> petGenders = ['male', 'female'];

  static const List<String> healthRecordTypes = [
    'checkup',
    'illness',
    'injury',
    'surgery',
    'dental',
    'other',
  ];

  static const List<String> scheduleTypes = [
    'feeding',
    'medication',
    'grooming',
    'exercise',
    'vet_visit',
    'other',
  ];

  static const List<String> scheduleFrequencies = [
    'daily',
    'weekly',
    'biweekly',
    'monthly',
    'custom',
  ];

  static const int dogGestationDays = 63;
  static const int catGestationDays = 65;
}
