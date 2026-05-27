import '../../../core/utils/date_parsing.dart';

class PetPhoto {
  final String url;
  final String path;
  final DateTime uploadedAt;

  const PetPhoto({
    required this.url,
    required this.path,
    required this.uploadedAt,
  });

  factory PetPhoto.fromJson(Map<String, dynamic> json) {
    return PetPhoto(
      url: json['url'] as String,
      path: json['path'] as String,
      uploadedAt: parseDateTime(json['uploadedAt']) ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'url': url,
      'path': path,
      'uploadedAt': uploadedAt.toIso8601String(),
    };
  }
}

class PetModel {
  final String id;
  final String ownerId;
  final String name;
  final String species;
  final String breed;
  final String? breedId;
  final String gender;
  final DateTime? dateOfBirth;
  final double? weight;
  final String? weightUnit;
  final bool isNeutered;
  final bool isAvailableForMating;
  final List<PetPhoto> photos;
  final DateTime createdAt;
  final DateTime updatedAt;

  const PetModel({
    required this.id,
    required this.ownerId,
    required this.name,
    required this.species,
    required this.breed,
    this.breedId,
    required this.gender,
    this.dateOfBirth,
    this.weight,
    this.weightUnit,
    this.isNeutered = false,
    this.isAvailableForMating = false,
    this.photos = const [],
    required this.createdAt,
    required this.updatedAt,
  });

  factory PetModel.fromJson(Map<String, dynamic> json) {
    return PetModel(
      id: json['id'] as String,
      ownerId: json['ownerId'] as String,
      name: json['name'] as String,
      species: json['species'] as String,
      breed: json['breed'] as String,
      breedId: json['breedId'] as String?,
      gender: json['gender'] as String,
      dateOfBirth: parseDateTime(json['dateOfBirth']),
      weight: json['weight'] != null
          ? (json['weight'] as num).toDouble()
          : null,
      weightUnit: json['weightUnit'] as String?,
      isNeutered: json['isNeutered'] as bool? ?? false,
      isAvailableForMating: json['isAvailableForMating'] as bool? ?? false,
      photos: json['photos'] != null
          ? (json['photos'] as List)
              .where((p) => p is Map<String, dynamic>)
              .map((p) => PetPhoto.fromJson(p as Map<String, dynamic>))
              .toList()
          : [],
      createdAt: parseDateTime(json['createdAt']) ?? DateTime.now(),
      updatedAt: parseDateTime(json['updatedAt']) ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'ownerId': ownerId,
      'name': name,
      'species': species,
      'breed': breed,
      'breedId': breedId,
      'gender': gender,
      'dateOfBirth': dateOfBirth?.toIso8601String(),
      'weight': weight,
      'weightUnit': weightUnit,
      'isNeutered': isNeutered,
      'isAvailableForMating': isAvailableForMating,
      'photos': photos.map((p) => p.toJson()).toList(),
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }

  PetModel copyWith({
    String? id,
    String? ownerId,
    String? name,
    String? species,
    String? breed,
    String? breedId,
    String? gender,
    DateTime? dateOfBirth,
    double? weight,
    String? weightUnit,
    bool? isNeutered,
    bool? isAvailableForMating,
    List<PetPhoto>? photos,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return PetModel(
      id: id ?? this.id,
      ownerId: ownerId ?? this.ownerId,
      name: name ?? this.name,
      species: species ?? this.species,
      breed: breed ?? this.breed,
      breedId: breedId ?? this.breedId,
      gender: gender ?? this.gender,
      dateOfBirth: dateOfBirth ?? this.dateOfBirth,
      weight: weight ?? this.weight,
      weightUnit: weightUnit ?? this.weightUnit,
      isNeutered: isNeutered ?? this.isNeutered,
      isAvailableForMating: isAvailableForMating ?? this.isAvailableForMating,
      photos: photos ?? this.photos,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  String get age {
    if (dateOfBirth == null) return 'Unknown';
    final now = DateTime.now();
    final years = now.year - dateOfBirth!.year;
    final months = now.month - dateOfBirth!.month;
    if (years > 0) {
      return '$years ${years == 1 ? 'year' : 'years'}';
    }
    if (months > 0) {
      return '$months ${months == 1 ? 'month' : 'months'}';
    }
    final days = now.difference(dateOfBirth!).inDays;
    return '$days ${days == 1 ? 'day' : 'days'}';
  }

  String? get primaryPhotoUrl => photos.isNotEmpty ? photos.first.url : null;

  bool get isBirthdayToday {
    if (dateOfBirth == null) return false;
    final now = DateTime.now();
    return dateOfBirth!.month == now.month && dateOfBirth!.day == now.day;
  }

  String get formattedDateOfBirth {
    if (dateOfBirth == null) return 'Not set';
    final months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return '${dateOfBirth!.day} ${months[dateOfBirth!.month - 1]} ${dateOfBirth!.year}';
  }
}
