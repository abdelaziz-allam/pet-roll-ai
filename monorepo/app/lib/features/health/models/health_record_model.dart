class HealthRecordModel {
  final String id;
  final String petId;
  final String ownerId;
  final String type;
  final DateTime date;
  final String title;
  final String? description;
  final String? veterinarian;
  final String? clinic;
  final double? weight;
  final double? temperature;
  final String? notes;
  final List<String> attachments;
  final DateTime createdAt;
  final DateTime updatedAt;

  HealthRecordModel({
    required this.id,
    required this.petId,
    required this.ownerId,
    required this.type,
    required this.date,
    required this.title,
    this.description,
    this.veterinarian,
    this.clinic,
    this.weight,
    this.temperature,
    this.notes,
    this.attachments = const [],
    required this.createdAt,
    required this.updatedAt,
  });

  factory HealthRecordModel.fromJson(Map<String, dynamic> json) {
    return HealthRecordModel(
      id: json['id'] as String,
      petId: json['petId'] as String,
      ownerId: json['ownerId'] as String,
      type: json['type'] as String,
      date: DateTime.parse(json['date'] as String),
      title: json['title'] as String,
      description: json['description'] as String?,
      veterinarian: json['veterinarian'] as String?,
      clinic: json['clinic'] as String?,
      weight: (json['weight'] as num?)?.toDouble(),
      temperature: (json['temperature'] as num?)?.toDouble(),
      notes: json['notes'] as String?,
      attachments: (json['attachments'] as List<dynamic>?)?.cast<String>() ?? [],
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'petId': petId,
      'ownerId': ownerId,
      'type': type,
      'date': date.toIso8601String(),
      'title': title,
      'description': description,
      'veterinarian': veterinarian,
      'clinic': clinic,
      'weight': weight,
      'temperature': temperature,
      'notes': notes,
      'attachments': attachments,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }
}
