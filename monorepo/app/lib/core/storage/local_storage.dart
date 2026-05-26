import 'package:hive_flutter/hive_flutter.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final localStorageProvider = Provider<LocalStorage>((ref) {
  return LocalStorage();
});

class LocalStorage {
  static late Box _settingsBox;
  static late Box _cacheBox;

  static Future<void> init() async {
    _settingsBox = await Hive.openBox('settings');
    _cacheBox = await Hive.openBox('cache');
  }

  // Settings
  T? getSetting<T>(String key) => _settingsBox.get(key) as T?;
  Future<void> setSetting<T>(String key, T value) => _settingsBox.put(key, value);
  Future<void> deleteSetting(String key) => _settingsBox.delete(key);

  // Cache
  T? getCache<T>(String key) => _cacheBox.get(key) as T?;
  Future<void> setCache<T>(String key, T value) => _cacheBox.put(key, value);
  Future<void> deleteCache(String key) => _cacheBox.delete(key);
  Future<void> clearCache() => _cacheBox.clear();

  // Specific helpers
  bool get onboardingComplete => getSetting<bool>('onboarding_complete') ?? false;
  Future<void> setOnboardingComplete() => setSetting('onboarding_complete', true);

  String? get selectedPetId => getSetting<String>('selected_pet_id');
  Future<void> setSelectedPetId(String id) => setSetting('selected_pet_id', id);
}
