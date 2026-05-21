import 'package:flutter_test/flutter_test.dart';
import 'package:pet_roll/features/health/models/health_record_model.dart';

void main() {
  group('HealthRecordModel', () {
    final sampleJson = {
      'id': 'record-1',
      'petId': 'pet-1',
      'ownerId': 'user-1',
      'type': 'checkup',
      'date': '2024-03-15T10:00:00.000Z',
      'title': 'Annual checkup',
      'description': 'Routine examination',
      'veterinarian': 'Dr. Smith',
      'clinic': 'PetCare Clinic',
      'weight': 28.5,
      'temperature': 38.5,
      'notes': 'All good',
      'attachments': ['https://example.com/xray.jpg'],
      'createdAt': '2024-03-15T10:00:00.000Z',
      'updatedAt': '2024-03-15T10:00:00.000Z',
    };

    test('fromJson creates valid model', () {
      final record = HealthRecordModel.fromJson(sampleJson);
      expect(record.id, 'record-1');
      expect(record.petId, 'pet-1');
      expect(record.type, 'checkup');
      expect(record.title, 'Annual checkup');
      expect(record.weight, 28.5);
      expect(record.temperature, 38.5);
      expect(record.attachments.length, 1);
    });

    test('fromJson handles missing optional fields', () {
      final minimalJson = {
        'id': 'record-2',
        'petId': 'pet-1',
        'ownerId': 'user-1',
        'type': 'illness',
        'date': '2024-03-15T10:00:00.000Z',
        'title': 'Flu symptoms',
        'createdAt': '2024-03-15T10:00:00.000Z',
        'updatedAt': '2024-03-15T10:00:00.000Z',
      };
      final record = HealthRecordModel.fromJson(minimalJson);
      expect(record.description, isNull);
      expect(record.veterinarian, isNull);
      expect(record.clinic, isNull);
      expect(record.weight, isNull);
      expect(record.temperature, isNull);
      expect(record.notes, isNull);
      expect(record.attachments, isEmpty);
    });

    test('toJson produces valid output', () {
      final record = HealthRecordModel.fromJson(sampleJson);
      final json = record.toJson();
      expect(json['id'], 'record-1');
      expect(json['type'], 'checkup');
      expect(json['title'], 'Annual checkup');
      expect(json['weight'], 28.5);
    });

    test('supports all health record types', () {
      final types = ['checkup', 'illness', 'injury', 'surgery', 'dental', 'other'];
      for (final type in types) {
        final json = {...sampleJson, 'type': type};
        final record = HealthRecordModel.fromJson(json);
        expect(record.type, type);
      }
    });
  });
}
