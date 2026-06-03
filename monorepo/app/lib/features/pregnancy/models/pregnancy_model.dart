class PregnancyModel {
  final String id;
  final String petId;
  final String ownerId;
  final DateTime matingDate;
  final DateTime expectedDueDate;
  final String status;
  final MateInfo? mateInfo;
  final List<WeightEntry> weightLog;
  final String? notes;
  final DateTime? actualDeliveryDate;
  final int? litterSize;
  final DateTime createdAt;

  PregnancyModel({
    required this.id,
    required this.petId,
    required this.ownerId,
    required this.matingDate,
    required this.expectedDueDate,
    required this.status,
    this.mateInfo,
    this.weightLog = const [],
    this.notes,
    this.actualDeliveryDate,
    this.litterSize,
    required this.createdAt,
  });

  int get currentWeek {
    final daysSinceMating = DateTime.now().difference(matingDate).inDays;
    return (daysSinceMating / 7).ceil();
  }

  int get daysRemaining {
    return expectedDueDate.difference(DateTime.now()).inDays;
  }

  double get progressPercent {
    final totalDays = expectedDueDate.difference(matingDate).inDays;
    final elapsed = DateTime.now().difference(matingDate).inDays;
    return (elapsed / totalDays).clamp(0.0, 1.0);
  }

  bool get isActive => status == 'active';

  factory PregnancyModel.fromJson(Map<String, dynamic> json) {
    return PregnancyModel(
      id: json['id'] as String,
      petId: json['petId'] as String,
      ownerId: json['ownerId'] as String,
      matingDate: DateTime.parse(json['matingDate'] as String),
      expectedDueDate: DateTime.parse(json['expectedDueDate'] as String),
      status: json['status'] as String,
      mateInfo: json['mateInfo'] != null
          ? MateInfo.fromJson(json['mateInfo'] as Map<String, dynamic>)
          : null,
      weightLog: (json['weightLog'] as List<dynamic>?)
              ?.map((w) => WeightEntry.fromJson(w as Map<String, dynamic>))
              .toList() ??
          [],
      notes: json['notes'] as String?,
      actualDeliveryDate: json['actualDeliveryDate'] != null
          ? DateTime.parse(json['actualDeliveryDate'] as String)
          : null,
      litterSize: json['litterSize'] as int?,
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'petId': petId,
      'matingDate': matingDate.toIso8601String(),
      'expectedDueDate': expectedDueDate.toIso8601String(),
      'status': status,
      'mateInfo': mateInfo?.toJson(),
      'weightLog': weightLog.map((w) => w.toJson()).toList(),
      'notes': notes,
    };
  }
}

class MateInfo {
  final String? name;
  final String? breed;
  final String? ownerId;

  MateInfo({this.name, this.breed, this.ownerId});

  factory MateInfo.fromJson(Map<String, dynamic> json) {
    return MateInfo(
      name: json['name'] as String?,
      breed: json['breed'] as String?,
      ownerId: json['ownerId'] as String?,
    );
  }

  Map<String, dynamic> toJson() => {'name': name, 'breed': breed, 'ownerId': ownerId};
}

class WeightEntry {
  final double weight;
  final DateTime date;

  WeightEntry({required this.weight, required this.date});

  factory WeightEntry.fromJson(Map<String, dynamic> json) {
    return WeightEntry(
      weight: (json['weight'] as num).toDouble(),
      date: DateTime.parse(json['date'] as String),
    );
  }

  Map<String, dynamic> toJson() => {'weight': weight, 'date': date.toIso8601String()};
}

class Milestone {
  final String id;
  final String title;
  final String description;
  final int week;
  final bool isCompleted;
  final String? completedAt;

  Milestone({
    required this.id,
    required this.title,
    required this.description,
    required this.week,
    this.isCompleted = false,
    this.completedAt,
  });

  factory Milestone.fromJson(Map<String, dynamic> json) {
    return Milestone(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      description: json['description'] as String? ?? '',
      week: json['week'] as int? ?? 0,
      isCompleted: json['completed'] as bool? ?? false,
      completedAt: json['completedAt'] as String?,
    );
  }
}

class Pregnancy {
  final String id;
  final String petId;
  final String ownerId;
  final DateTime breedingDate;
  final DateTime expectedDueDate;
  final String status;
  final List<WeightEntry> weightLog;
  final List<Milestone> milestones;
  final String? notes;
  final DateTime? actualDeliveryDate;
  final int? litterSize;
  final Map<String, dynamic>? fatherInfo;

  Pregnancy({
    required this.id,
    required this.petId,
    required this.ownerId,
    required this.breedingDate,
    required this.expectedDueDate,
    required this.status,
    this.weightLog = const [],
    this.milestones = const [],
    this.notes,
    this.actualDeliveryDate,
    this.litterSize,
    this.fatherInfo,
  });

  int get currentWeek {
    final daysSinceMating = DateTime.now().difference(breedingDate).inDays;
    return (daysSinceMating / 7).ceil().clamp(1, totalWeeks);
  }

  int get totalWeeks {
    final totalDays = expectedDueDate.difference(breedingDate).inDays;
    return (totalDays / 7).ceil();
  }

  double get progress {
    final totalDays = expectedDueDate.difference(breedingDate).inDays;
    final elapsed = DateTime.now().difference(breedingDate).inDays;
    return (elapsed / totalDays).clamp(0.0, 1.0);
  }

  int get daysRemaining => expectedDueDate.difference(DateTime.now()).inDays;

  bool get isActive => status == 'active';

  factory Pregnancy.fromJson(Map<String, dynamic> json) {
    final matingDate = json['matingDate'] ?? json['startDate'] ?? json['breedingDate'];
    return Pregnancy(
      id: json['id'] as String? ?? '',
      petId: json['petId'] as String? ?? '',
      ownerId: json['ownerId'] as String? ?? '',
      breedingDate: DateTime.parse(matingDate as String),
      expectedDueDate: DateTime.parse(json['expectedDueDate'] as String),
      status: json['status'] as String? ?? 'active',
      weightLog: (json['weightLog'] as List<dynamic>?)
              ?.map((w) => WeightEntry.fromJson(w as Map<String, dynamic>))
              .toList() ??
          [],
      milestones: (json['milestones'] as List<dynamic>?)
              ?.map((m) => Milestone.fromJson(m as Map<String, dynamic>))
              .toList() ??
          [],
      notes: json['notes'] as String?,
      actualDeliveryDate: json['actualDeliveryDate'] != null
          ? DateTime.parse(json['actualDeliveryDate'] as String)
          : null,
      litterSize: json['litterSize'] as int?,
      fatherInfo: json['fatherInfo'] as Map<String, dynamic>?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'matingDate': breedingDate.toIso8601String(),
      'startDate': breedingDate.toIso8601String(),
      'expectedDueDate': expectedDueDate.toIso8601String(),
      'status': status,
      'notes': notes,
      'litterSize': litterSize,
      'fatherInfo': fatherInfo,
    };
  }
}
