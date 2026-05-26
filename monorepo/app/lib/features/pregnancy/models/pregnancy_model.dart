import '../../../core/utils/date_parsing.dart';

enum PregnancyStatus { active, completed, terminated }

class Milestone {
  final String id;
  final int week;
  final String title;
  final String description;
  final bool isCompleted;
  final DateTime? completedAt;

  const Milestone({
    required this.id,
    required this.week,
    required this.title,
    required this.description,
    this.isCompleted = false,
    this.completedAt,
  });

  factory Milestone.fromJson(Map<String, dynamic> json) {
    return Milestone(
      id: json['id'] as String,
      week: json['week'] as int,
      title: json['title'] as String,
      description: json['description'] as String,
      isCompleted: json['isCompleted'] as bool? ?? false,
      completedAt: parseDateTime(json['completedAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'week': week,
      'title': title,
      'description': description,
      'isCompleted': isCompleted,
      'completedAt': completedAt?.toIso8601String(),
    };
  }
}

class WeightEntry {
  final DateTime date;
  final double weight;
  final String unit;

  const WeightEntry({
    required this.date,
    required this.weight,
    required this.unit,
  });

  factory WeightEntry.fromJson(Map<String, dynamic> json) {
    return WeightEntry(
      date: parseDateTime(json['date']) ?? DateTime.now(),
      weight: (json['weight'] as num).toDouble(),
      unit: json['unit'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'date': date.toIso8601String(),
      'weight': weight,
      'unit': unit,
    };
  }
}

class Pregnancy {
  final String id;
  final String petId;
  final String ownerId;
  final DateTime breedingDate;
  final DateTime expectedDueDate;
  final PregnancyStatus status;
  final String species;
  final List<Milestone> milestones;
  final List<WeightEntry> weightLog;
  final String? notes;
  final DateTime createdAt;
  final DateTime updatedAt;

  const Pregnancy({
    required this.id,
    required this.petId,
    required this.ownerId,
    required this.breedingDate,
    required this.expectedDueDate,
    required this.status,
    required this.species,
    this.milestones = const [],
    this.weightLog = const [],
    this.notes,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Pregnancy.fromJson(Map<String, dynamic> json) {
    return Pregnancy(
      id: json['id'] as String,
      petId: json['petId'] as String,
      ownerId: json['ownerId'] as String,
      breedingDate: parseDateTime(json['breedingDate']) ?? DateTime.now(),
      expectedDueDate: parseDateTime(json['expectedDueDate']) ?? DateTime.now(),
      status: PregnancyStatus.values.firstWhere(
        (e) => e.name == json['status'],
        orElse: () => PregnancyStatus.active,
      ),
      species: json['species'] as String,
      milestones: (json['milestones'] as List<dynamic>?)
              ?.map((e) => Milestone.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      weightLog: (json['weightLog'] as List<dynamic>?)
              ?.map((e) => WeightEntry.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
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
      'breedingDate': breedingDate.toIso8601String(),
      'expectedDueDate': expectedDueDate.toIso8601String(),
      'status': status.name,
      'species': species,
      'milestones': milestones.map((e) => e.toJson()).toList(),
      'weightLog': weightLog.map((e) => e.toJson()).toList(),
      'notes': notes,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }

  int get currentWeek {
    return DateTime.now().difference(breedingDate).inDays ~/ 7;
  }

  int get totalWeeks {
    return expectedDueDate.difference(breedingDate).inDays ~/ 7;
  }

  double get progress {
    final total = expectedDueDate.difference(breedingDate).inDays;
    final elapsed = DateTime.now().difference(breedingDate).inDays;
    return (elapsed / total).clamp(0.0, 1.0);
  }
}
