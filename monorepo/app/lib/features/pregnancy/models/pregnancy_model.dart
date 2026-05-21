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
