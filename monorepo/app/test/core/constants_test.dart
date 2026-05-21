import 'package:flutter_test/flutter_test.dart';
import 'package:pet_roll/core/constants/app_constants.dart';

void main() {
  group('AppConstants', () {
    test('supported species contains dog and cat', () {
      expect(AppConstants.supportedSpecies, contains('dog'));
      expect(AppConstants.supportedSpecies, contains('cat'));
      expect(AppConstants.supportedSpecies.length, 2);
    });

    test('pet genders contains male and female', () {
      expect(AppConstants.petGenders, contains('male'));
      expect(AppConstants.petGenders, contains('female'));
      expect(AppConstants.petGenders.length, 2);
    });

    test('health record types are complete', () {
      expect(AppConstants.healthRecordTypes, contains('checkup'));
      expect(AppConstants.healthRecordTypes, contains('illness'));
      expect(AppConstants.healthRecordTypes, contains('injury'));
      expect(AppConstants.healthRecordTypes, contains('surgery'));
      expect(AppConstants.healthRecordTypes, contains('dental'));
      expect(AppConstants.healthRecordTypes, contains('other'));
      expect(AppConstants.healthRecordTypes.length, 6);
    });

    test('schedule types are complete', () {
      expect(AppConstants.scheduleTypes, contains('feeding'));
      expect(AppConstants.scheduleTypes, contains('medication'));
      expect(AppConstants.scheduleTypes, contains('grooming'));
      expect(AppConstants.scheduleTypes, contains('exercise'));
      expect(AppConstants.scheduleTypes, contains('vet_visit'));
      expect(AppConstants.scheduleTypes, contains('other'));
      expect(AppConstants.scheduleTypes.length, 6);
    });

    test('schedule frequencies are complete', () {
      expect(AppConstants.scheduleFrequencies, contains('daily'));
      expect(AppConstants.scheduleFrequencies, contains('weekly'));
      expect(AppConstants.scheduleFrequencies, contains('biweekly'));
      expect(AppConstants.scheduleFrequencies, contains('monthly'));
      expect(AppConstants.scheduleFrequencies, contains('custom'));
      expect(AppConstants.scheduleFrequencies.length, 5);
    });

    test('gestation days are correct', () {
      expect(AppConstants.dogGestationDays, 63);
      expect(AppConstants.catGestationDays, 65);
    });

    test('pagination limit is reasonable', () {
      expect(AppConstants.paginationLimit, 20);
    });

    test('max photo size is 10MB', () {
      expect(AppConstants.maxPhotoSize, 10 * 1024 * 1024);
    });

    test('max photos per pet is 10', () {
      expect(AppConstants.maxPhotosPerPet, 10);
    });
  });
}
