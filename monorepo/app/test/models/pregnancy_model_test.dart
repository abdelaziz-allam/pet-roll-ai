import 'package:flutter_test/flutter_test.dart';
import 'package:pet_roll/features/pregnancy/models/pregnancy_model.dart';

void main() {
  group('PregnancyModel', () {
    final sampleJson = {
      'id': 'preg-1',
      'petId': 'pet-1',
      'ownerId': 'user-1',
      'matingDate': '2024-01-15T00:00:00.000Z',
      'expectedDueDate': '2024-03-18T00:00:00.000Z',
      'status': 'active',
      'mateInfo': {'name': 'Rex', 'breed': 'German Shepherd', 'ownerId': 'user-2'},
      'weightLog': [
        {'weight': 30.0, 'date': '2024-02-01T00:00:00.000Z'},
        {'weight': 32.0, 'date': '2024-02-15T00:00:00.000Z'},
      ],
      'notes': 'First pregnancy',
      'createdAt': '2024-01-15T00:00:00.000Z',
    };

    test('fromJson creates valid model', () {
      final preg = PregnancyModel.fromJson(sampleJson);
      expect(preg.id, 'preg-1');
      expect(preg.petId, 'pet-1');
      expect(preg.status, 'active');
      expect(preg.mateInfo?.name, 'Rex');
      expect(preg.weightLog.length, 2);
    });

    test('fromJson handles null mateInfo', () {
      final json = {...sampleJson, 'mateInfo': null};
      final preg = PregnancyModel.fromJson(json);
      expect(preg.mateInfo, isNull);
    });

    test('fromJson handles empty weightLog', () {
      final json = {...sampleJson, 'weightLog': null};
      final preg = PregnancyModel.fromJson(json);
      expect(preg.weightLog, isEmpty);
    });

    test('isActive returns true for active status', () {
      final preg = PregnancyModel.fromJson(sampleJson);
      expect(preg.isActive, true);
    });

    test('isActive returns false for completed status', () {
      final json = {...sampleJson, 'status': 'completed'};
      final preg = PregnancyModel.fromJson(json);
      expect(preg.isActive, false);
    });

    test('currentWeek calculates based on mating date', () {
      final recentMating = DateTime.now().subtract(const Duration(days: 21));
      final json = {
        ...sampleJson,
        'matingDate': recentMating.toIso8601String(),
      };
      final preg = PregnancyModel.fromJson(json);
      expect(preg.currentWeek, 3);
    });

    test('daysRemaining calculates correctly', () {
      final futureDate = DateTime.now().add(const Duration(days: 30));
      final json = {
        ...sampleJson,
        'expectedDueDate': futureDate.toIso8601String(),
      };
      final preg = PregnancyModel.fromJson(json);
      expect(preg.daysRemaining, closeTo(30, 1));
    });

    test('progressPercent is between 0 and 1', () {
      final mating = DateTime.now().subtract(const Duration(days: 30));
      final due = DateTime.now().add(const Duration(days: 33));
      final json = {
        ...sampleJson,
        'matingDate': mating.toIso8601String(),
        'expectedDueDate': due.toIso8601String(),
      };
      final preg = PregnancyModel.fromJson(json);
      expect(preg.progressPercent, greaterThanOrEqualTo(0.0));
      expect(preg.progressPercent, lessThanOrEqualTo(1.0));
    });

    test('progressPercent clamps to 1.0 when overdue', () {
      final mating = DateTime.now().subtract(const Duration(days: 70));
      final due = DateTime.now().subtract(const Duration(days: 5));
      final json = {
        ...sampleJson,
        'matingDate': mating.toIso8601String(),
        'expectedDueDate': due.toIso8601String(),
      };
      final preg = PregnancyModel.fromJson(json);
      expect(preg.progressPercent, 1.0);
    });

    test('toJson produces valid output', () {
      final preg = PregnancyModel.fromJson(sampleJson);
      final json = preg.toJson();
      expect(json['id'], 'preg-1');
      expect(json['status'], 'active');
      expect(json['mateInfo'], isNotNull);
      expect(json['weightLog'], isList);
    });
  });

  group('MateInfo', () {
    test('fromJson creates valid model', () {
      final json = {'name': 'Rex', 'breed': 'German Shepherd', 'ownerId': 'user-2'};
      final mate = MateInfo.fromJson(json);
      expect(mate.name, 'Rex');
      expect(mate.breed, 'German Shepherd');
      expect(mate.ownerId, 'user-2');
    });

    test('handles null values', () {
      final json = <String, dynamic>{'name': null, 'breed': null, 'ownerId': null};
      final mate = MateInfo.fromJson(json);
      expect(mate.name, isNull);
      expect(mate.breed, isNull);
    });
  });

  group('WeightEntry', () {
    test('fromJson creates valid model', () {
      final json = {'weight': 30.5, 'date': '2024-02-01T00:00:00.000Z'};
      final entry = WeightEntry.fromJson(json);
      expect(entry.weight, 30.5);
      expect(entry.date.month, 2);
    });

    test('toJson produces correct output', () {
      final entry = WeightEntry(weight: 32.0, date: DateTime(2024, 3, 1));
      final json = entry.toJson();
      expect(json['weight'], 32.0);
      expect(json['date'], contains('2024-03-01'));
    });
  });
}
