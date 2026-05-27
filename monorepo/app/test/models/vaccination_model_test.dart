import 'package:flutter_test/flutter_test.dart';
import 'package:pet_roll/features/vaccination/models/vaccination_model.dart';

void main() {
  group('VaccinationModel', () {
    final sampleJson = {
      'id': 'vac-1',
      'petId': 'pet-1',
      'ownerId': 'user-1',
      'vaccineName': 'Rabies',
      'dateAdministered': '2024-01-15T00:00:00.000Z',
      'nextDueDate': '2025-01-15T00:00:00.000Z',
      'batchNumber': 'BATCH-001',
      'veterinarian': 'Dr. Johnson',
      'clinic': 'VetClinic',
      'notes': 'No side effects',
      'sideEffects': null,
      'createdAt': '2024-01-15T00:00:00.000Z',
    };

    test('fromJson creates valid model', () {
      final vac = VaccinationModel.fromJson(sampleJson);
      expect(vac.id, 'vac-1');
      expect(vac.vaccineName, 'Rabies');
      expect(vac.dateAdministered.year, 2024);
      expect(vac.nextDueDate?.year, 2025);
      expect(vac.batchNumber, 'BATCH-001');
    });

    test('fromJson handles null nextDueDate', () {
      final json = {...sampleJson, 'nextDueDate': null};
      final vac = VaccinationModel.fromJson(json);
      expect(vac.nextDueDate, isNull);
    });

    test('isOverdue returns true for past due date', () {
      final json = {
        ...sampleJson,
        'nextDueDate': '2020-01-01T00:00:00.000Z',
      };
      final vac = VaccinationModel.fromJson(json);
      expect(vac.isOverdue, true);
    });

    test('isOverdue returns false for future due date', () {
      final json = {
        ...sampleJson,
        'nextDueDate': '2030-01-01T00:00:00.000Z',
      };
      final vac = VaccinationModel.fromJson(json);
      expect(vac.isOverdue, false);
    });

    test('isOverdue returns false when no due date', () {
      final json = {...sampleJson, 'nextDueDate': null};
      final vac = VaccinationModel.fromJson(json);
      expect(vac.isOverdue, false);
    });

    test('daysUntilDue calculates correctly for future date', () {
      final futureDate = DateTime.now().add(const Duration(days: 30));
      final json = {
        ...sampleJson,
        'nextDueDate': futureDate.toIso8601String(),
      };
      final vac = VaccinationModel.fromJson(json);
      expect(vac.daysUntilDue, closeTo(30, 1));
    });

    test('daysUntilDue returns null when no due date', () {
      final json = {...sampleJson, 'nextDueDate': null};
      final vac = VaccinationModel.fromJson(json);
      expect(vac.daysUntilDue, isNull);
    });

    test('toJson produces valid output', () {
      final vac = VaccinationModel.fromJson(sampleJson);
      final json = vac.toJson();
      expect(json['vaccineName'], 'Rabies');
      expect(json['batchNumber'], 'BATCH-001');
      expect(json['dateAdministered'], isNotNull);
    });
  });
}
