typedef Vaccination = VaccinationModel;

class VaccinationModel {
  final String id;
  final String petId;
  final String ownerId;
  final String vaccineName;
  final DateTime dateAdministered;
  final DateTime? nextDueDate;
  final String? batchNumber;
  final String? veterinarian;
  final String? clinic;
  final String? notes;
  final String? sideEffects;
  final DateTime createdAt;

  VaccinationModel({
    required this.id,
    required this.petId,
    required this.ownerId,
    required this.vaccineName,
    required this.dateAdministered,
    this.nextDueDate,
    this.batchNumber,
    this.veterinarian,
    this.clinic,
    this.notes,
    this.sideEffects,
    required this.createdAt,
  });

  String get name => vaccineName;

  bool get isOverdue {
    if (nextDueDate == null) return false;
    return DateTime.now().isAfter(nextDueDate!);
  }

  bool get isUpcoming {
    if (nextDueDate == null) return false;
    final daysUntil = nextDueDate!.difference(DateTime.now()).inDays;
    return daysUntil >= 0 && daysUntil <= 30;
  }

  int? get daysUntilDue {
    if (nextDueDate == null) return null;
    return nextDueDate!.difference(DateTime.now()).inDays;
  }

  factory VaccinationModel.fromJson(Map<String, dynamic> json) {
    return VaccinationModel(
      id: json['id'] ?? json['_id'] ?? '',
      petId: json['petId'] ?? '',
      ownerId: json['ownerId'] ?? '',
      vaccineName: json['vaccineName'] ?? json['name'] ?? '',
      dateAdministered: DateTime.parse(json['dateAdministered'] as String),
      nextDueDate: json['nextDueDate'] != null ? DateTime.parse(json['nextDueDate'] as String) : null,
      batchNumber: json['batchNumber'] as String?,
      veterinarian: json['veterinarian'] as String?,
      clinic: json['clinic'] as String?,
      notes: json['notes'] as String?,
      sideEffects: json['sideEffects'] as String?,
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt'] as String) : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'petId': petId,
      'vaccineName': vaccineName,
      'dateAdministered': dateAdministered.toIso8601String(),
      'nextDueDate': nextDueDate?.toIso8601String(),
      'batchNumber': batchNumber,
      'veterinarian': veterinarian,
      'clinic': clinic,
      'notes': notes,
      'sideEffects': sideEffects,
    };
  }
}
