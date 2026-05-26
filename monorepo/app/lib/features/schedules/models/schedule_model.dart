import '../../../core/utils/date_parsing.dart';

enum ScheduleType { feeding, medication, grooming, exercise, other }

enum ScheduleFrequency { daily, twiceDaily, weekly, custom }

class CompletionEntry {
  final DateTime date;
  final DateTime completedAt;

  const CompletionEntry({
    required this.date,
    required this.completedAt,
  });

  factory CompletionEntry.fromJson(Map<String, dynamic> json) {
    return CompletionEntry(
      date: parseDateTime(json['date']) ?? DateTime.now(),
      completedAt: parseDateTime(json['completedAt']) ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'date': date.toIso8601String(),
      'completedAt': completedAt.toIso8601String(),
    };
  }
}

class Schedule {
  final String id;
  final String petId;
  final String ownerId;
  final String title;
  final ScheduleType type;
  final ScheduleFrequency frequency;
  final List<String> times;
  final bool active;
  final List<CompletionEntry> completionLog;
  final String? notes;
  final DateTime createdAt;
  final DateTime updatedAt;

  const Schedule({
    required this.id,
    required this.petId,
    required this.ownerId,
    required this.title,
    required this.type,
    required this.frequency,
    this.times = const [],
    this.active = true,
    this.completionLog = const [],
    this.notes,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Schedule.fromJson(Map<String, dynamic> json) {
    return Schedule(
      id: json['id'] as String,
      petId: json['petId'] as String,
      ownerId: json['ownerId'] as String,
      title: json['title'] as String,
      type: ScheduleType.values.firstWhere(
        (e) => e.name == json['type'],
        orElse: () => ScheduleType.other,
      ),
      frequency: _parseFrequency(json['frequency'] as String),
      times: (json['times'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
      active: json['active'] as bool? ?? true,
      completionLog: (json['completionLog'] as List<dynamic>?)
              ?.map((e) => CompletionEntry.fromJson(e as Map<String, dynamic>))
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
      'title': title,
      'type': type.name,
      'frequency': _frequencyToString(frequency),
      'times': times,
      'active': active,
      'completionLog': completionLog.map((e) => e.toJson()).toList(),
      'notes': notes,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }

  bool get isCompletedToday {
    final now = DateTime.now();
    return completionLog.any((entry) =>
        entry.date.year == now.year &&
        entry.date.month == now.month &&
        entry.date.day == now.day);
  }

  static ScheduleFrequency _parseFrequency(String value) {
    switch (value) {
      case 'twice_daily':
        return ScheduleFrequency.twiceDaily;
      default:
        return ScheduleFrequency.values.firstWhere(
          (e) => e.name == value,
          orElse: () => ScheduleFrequency.daily,
        );
    }
  }

  static String _frequencyToString(ScheduleFrequency frequency) {
    switch (frequency) {
      case ScheduleFrequency.twiceDaily:
        return 'twice_daily';
      default:
        return frequency.name;
    }
  }
}
