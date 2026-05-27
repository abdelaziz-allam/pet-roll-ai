import 'package:flutter_test/flutter_test.dart';
import 'package:pet_roll/features/pets/models/pet_model.dart';

void main() {
  group('PetModel', () {
    final sampleJson = {
      'id': 'pet-1',
      'name': 'Buddy',
      'species': 'dog',
      'breed': 'Labrador Retriever',
      'gender': 'male',
      'dateOfBirth': '2022-01-15T00:00:00.000Z',
      'weight': 30.0,
      'color': 'Golden',
      'microchipId': 'CHIP-123',
      'isNeutered': false,
      'isAvailableForMating': true,
      'notes': 'Friendly dog',
      'photos': [
        {'url': 'https://example.com/photo.jpg', 'path': 'pets/user1/pet1/photo.jpg', 'uploadedAt': '2024-01-01T00:00:00.000Z'}
      ],
      'ownerId': 'user-1',
      'createdAt': '2024-01-01T00:00:00.000Z',
      'updatedAt': '2024-01-01T00:00:00.000Z',
    };

    test('fromJson creates valid PetModel', () {
      final pet = PetModel.fromJson(sampleJson);
      expect(pet.id, 'pet-1');
      expect(pet.name, 'Buddy');
      expect(pet.species, 'dog');
      expect(pet.breed, 'Labrador Retriever');
      expect(pet.gender, 'male');
      expect(pet.weight, 30.0);
      expect(pet.color, 'Golden');
      expect(pet.microchipId, 'CHIP-123');
      expect(pet.isNeutered, false);
      expect(pet.isAvailableForMating, true);
      expect(pet.notes, 'Friendly dog');
      expect(pet.photos.length, 1);
      expect(pet.ownerId, 'user-1');
    });

    test('fromJson handles missing optional fields', () {
      final minimalJson = {
        'id': 'pet-2',
        'name': 'Max',
        'species': 'cat',
        'breed': 'Persian',
        'gender': 'female',
        'dateOfBirth': '2023-06-01T00:00:00.000Z',
        'ownerId': 'user-2',
        'createdAt': '2024-01-01T00:00:00.000Z',
        'updatedAt': '2024-01-01T00:00:00.000Z',
      };
      final pet = PetModel.fromJson(minimalJson);
      expect(pet.weight, isNull);
      expect(pet.color, isNull);
      expect(pet.microchipId, isNull);
      expect(pet.isNeutered, false);
      expect(pet.isAvailableForMating, false);
      expect(pet.notes, isNull);
      expect(pet.photos, isEmpty);
    });

    test('toJson produces valid output', () {
      final pet = PetModel.fromJson(sampleJson);
      final json = pet.toJson();
      expect(json['id'], 'pet-1');
      expect(json['name'], 'Buddy');
      expect(json['species'], 'dog');
      expect(json['weight'], 30.0);
      expect(json['photos'], isList);
      expect((json['photos'] as List).length, 1);
    });

    test('ageInMonths calculates correctly', () {
      final pet = PetModel(
        id: 'test',
        name: 'Test',
        species: 'dog',
        breed: 'Lab',
        gender: 'male',
        dateOfBirth: DateTime.now().subtract(const Duration(days: 365)),
        ownerId: 'user-1',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      );
      expect(pet.ageInMonths, greaterThanOrEqualTo(11));
      expect(pet.ageInMonths, lessThanOrEqualTo(13));
    });

    test('ageDisplay shows months for young pets', () {
      final pet = PetModel(
        id: 'test',
        name: 'Puppy',
        species: 'dog',
        breed: 'Lab',
        gender: 'male',
        dateOfBirth: DateTime.now().subtract(const Duration(days: 90)),
        ownerId: 'user-1',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      );
      expect(pet.ageDisplay, contains('months'));
    });

    test('ageDisplay shows years for older pets', () {
      final pet = PetModel(
        id: 'test',
        name: 'Old Boy',
        species: 'dog',
        breed: 'Lab',
        gender: 'male',
        dateOfBirth: DateTime.now().subtract(const Duration(days: 730)),
        ownerId: 'user-1',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      );
      expect(pet.ageDisplay, contains('year'));
    });

    test('copyWith creates modified copy', () {
      final pet = PetModel.fromJson(sampleJson);
      final updated = pet.copyWith(name: 'New Name', weight: 35.0);
      expect(updated.name, 'New Name');
      expect(updated.weight, 35.0);
      expect(updated.breed, pet.breed);
      expect(updated.id, pet.id);
    });

    test('copyWith preserves original when no changes', () {
      final pet = PetModel.fromJson(sampleJson);
      final copy = pet.copyWith();
      expect(copy.name, pet.name);
      expect(copy.species, pet.species);
      expect(copy.weight, pet.weight);
    });
  });

  group('PetPhoto', () {
    test('fromJson creates valid PetPhoto', () {
      final json = {
        'url': 'https://example.com/photo.jpg',
        'path': 'pets/user1/pet1/photo.jpg',
        'uploadedAt': '2024-01-01T00:00:00.000Z',
      };
      final photo = PetPhoto.fromJson(json);
      expect(photo.url, 'https://example.com/photo.jpg');
      expect(photo.path, 'pets/user1/pet1/photo.jpg');
      expect(photo.uploadedAt, '2024-01-01T00:00:00.000Z');
    });

    test('toJson produces correct output', () {
      final photo = PetPhoto(
        url: 'https://example.com/photo.jpg',
        path: 'pets/user1/pet1/photo.jpg',
        uploadedAt: '2024-01-01T00:00:00.000Z',
      );
      final json = photo.toJson();
      expect(json['url'], 'https://example.com/photo.jpg');
      expect(json['path'], 'pets/user1/pet1/photo.jpg');
    });
  });
}
