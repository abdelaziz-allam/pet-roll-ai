class AppConstants {
  AppConstants._();

  static const String appName = 'PET Roll';
  static const String apiBaseUrl = 'http://localhost:3001/api/v1';
  static const int paginationLimit = 20;
  static const int maxPhotoSize = 10 * 1024 * 1024;
  static const int maxPhotosPerPet = 50;
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
