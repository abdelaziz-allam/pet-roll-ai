import '../../../core/utils/date_parsing.dart';

enum HealthRecordType {
  vetVisit,
  surgery,
  diagnosis,
  medication,
  allergy,
  note;

  String get value {
    switch (this) {
      case HealthRecordType.vetVisit:
        return 'vet_visit';
      case HealthRecordType.surgery:
        return 'surgery';
      case HealthRecordType.diagnosis:
        return 'diagnosis';
      case HealthRecordType.medication:
        return 'medication';
      case HealthRecordType.allergy:
        return 'allergy';
      case HealthRecordType.note:
        return 'note';
    }
  }

  static HealthRecordType fromString(String value) {
    switch (value) {
      case 'vet_visit':
        return HealthRecordType.vetVisit;
      case 'surgery':
        return HealthRecordType.surgery;
      case 'diagnosis':
        return HealthRecordType.diagnosis;
      case 'medication':
        return HealthRecordType.medication;
      case 'allergy':
        return HealthRecordType.allergy;
      case 'note':
        return HealthRecordType.note;
      default:
        return HealthRecordType.note;
    }
  }

  String get displayName {
    switch (this) {
      case HealthRecordType.vetVisit:
        return 'Vet Visit';
      case HealthRecordType.surgery:
        return 'Surgery';
      case HealthRecordType.diagnosis:
        return 'Diagnosis';
      case HealthRecordType.medication:
        return 'Medication';
      case HealthRecordType.allergy:
        return 'Allergy';
      case HealthRecordType.note:
        return 'Note';
    }
  }
}

class HealthRecord {
  final String id;
  final String petId;
  final String ownerId;
  final HealthRecordType type;
  final String title;
  final String? description;
  final DateTime date;
  final String? veterinarian;
  final String? clinic;
  final List<String> attachments;
  final DateTime createdAt;
  final DateTime updatedAt;

  const HealthRecord({
    required this.id,
    required this.petId,
    required this.ownerId,
    required this.type,
    required this.title,
    this.description,
    required this.date,
    this.veterinarian,
    this.clinic,
    this.attachments = const [],
    required this.createdAt,
    required this.updatedAt,
  });

  factory HealthRecord.fromJson(Map<String, dynamic> json) {
    return HealthRecord(
      id: json['id'] as String,
      petId: json['petId'] as String,
      ownerId: json['ownerId'] as String,
      type: HealthRecordType.fromString(json['type'] as String),
      title: json['title'] as String,
      description: json['description'] as String?,
      date: parseDateTime(json['date']) ?? DateTime.now(),
      veterinarian: json['veterinarian'] as String?,
      clinic: json['clinic'] as String?,
      attachments: (json['attachments'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
      createdAt: parseDateTime(json['createdAt']) ?? DateTime.now(),
      updatedAt: parseDateTime(json['updatedAt']) ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'petId': petId,
      'ownerId': ownerId,
      'type': type.value,
      'title': title,
      'description': description,
      'date': date.toIso8601String(),
      'veterinarian': veterinarian,
      'clinic': clinic,
      'attachments': attachments,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }
}
