import '../../../core/utils/date_parsing.dart';

class VaccinationDose {
  final int doseNumber;
  final DateTime date;
  final String status; // scheduled, completed, missed
  final String? notes;

  const VaccinationDose({
    required this.doseNumber,
    required this.date,
    required this.status,
    this.notes,
  });

  bool get isCompleted => status == 'completed';
  bool get isScheduled => status == 'scheduled';
  bool get isMissed => status == 'missed';
  bool get isDue => isScheduled && date.isBefore(DateTime.now());

  factory VaccinationDose.fromJson(Map<String, dynamic> json) {
    return VaccinationDose(
      doseNumber: (json['doseNumber'] as num).toInt(),
      date: parseDateTime(json['date']) ?? DateTime.now(),
      status: (json['status'] as String?) ?? 'scheduled',
      notes: json['notes'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{
      'doseNumber': doseNumber,
      'date': date.toIso8601String(),
      'status': status,
    };
    if (notes != null) map['notes'] = notes;
    return map;
  }
}

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
  final List<VaccinationDose> doses;
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
    this.doses = const [],
    required this.createdAt,
    required this.updatedAt,
  });

  bool get isOverdue =>
      nextDueDate != null && nextDueDate!.isBefore(DateTime.now());

  bool get isUpcoming =>
      nextDueDate != null &&
      nextDueDate!.isAfter(DateTime.now()) &&
      nextDueDate!.difference(DateTime.now()).inDays <= 30;

  int get completedDoses => doses.where((d) => d.isCompleted).length;
  int get totalDoses => doses.length;
  VaccinationDose? get nextDose => doses.cast<VaccinationDose?>().firstWhere(
        (d) => d!.isScheduled,
        orElse: () => null,
      );

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
      doses: (json['doses'] as List<dynamic>?)
              ?.map((e) => VaccinationDose.fromJson(e as Map<String, dynamic>))
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
      'vaccineId': vaccineId,
      'name': name,
      'dateAdministered': dateAdministered.toIso8601String(),
      'nextDueDate': nextDueDate?.toIso8601String(),
      'batchNumber': batchNumber,
      'veterinarian': veterinarian,
      'notes': notes,
      'doses': doses.map((d) => d.toJson()).toList(),
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }
}
