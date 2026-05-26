import '../../../core/utils/date_parsing.dart';

class Vaccination {
  final String id;
  final String petId;
  final String ownerId;
  final String? vaccineId;
  final String name;
  final DateTime dateAdministered;
  final DateTime? nextDueDate;
  final String? batchNumber;
  final String? veterinarian;
  final String? notes;
  final DateTime createdAt;
  final DateTime updatedAt;

  const Vaccination({
    required this.id,
    required this.petId,
    required this.ownerId,
    this.vaccineId,
    required this.name,
    required this.dateAdministered,
    this.nextDueDate,
    this.batchNumber,
    this.veterinarian,
    this.notes,
    required this.createdAt,
    required this.updatedAt,
  });

  bool get isOverdue =>
      nextDueDate != null && nextDueDate!.isBefore(DateTime.now());

  bool get isUpcoming =>
      nextDueDate != null &&
      nextDueDate!.isAfter(DateTime.now()) &&
      nextDueDate!.difference(DateTime.now()).inDays <= 30;

  factory Vaccination.fromJson(Map<String, dynamic> json) {
    return Vaccination(
      id: json['id'] as String,
      petId: json['petId'] as String,
      ownerId: json['ownerId'] as String,
      vaccineId: json['vaccineId'] as String?,
      name: (json['vaccineName'] ?? json['name'] ?? 'Unknown') as String,
      dateAdministered: parseDateTime(json['dateAdministered']) ?? DateTime.now(),
      nextDueDate: parseDateTime(json['nextDueDate']),
      batchNumber: json['batchNumber'] as String?,
      veterinarian: (json['vetName'] ?? json['veterinarian']) as String?,
      notes: json['notes'] as String?,
      createdAt: parseDateTime(json['createdAt']) ?? DateTime.now(),
      updatedAt: parseDateTime(json['updatedAt']) ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'petId': petId,
      'ownerId': ownerId,
      'vaccineId': vaccineId,
      'name': name,
      'dateAdministered': dateAdministered.toIso8601String(),
      'nextDueDate': nextDueDate?.toIso8601String(),
      'batchNumber': batchNumber,
      'veterinarian': veterinarian,
      'notes': notes,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }
}
