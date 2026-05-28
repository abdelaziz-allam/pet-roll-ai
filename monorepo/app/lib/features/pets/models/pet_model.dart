class PetModel {
  final String id;
  final String name;
  final String species;
  final String breed;
  final String gender;
  final DateTime dateOfBirth;
  final double? weight;
  final String? color;
  final String? microchipId;
  final bool isNeutered;
  final bool isAvailableForMating;
  final String? notes;
  final List<PetPhoto> photos;
  final String ownerId;
  final String? country;
  final String? city;
  final String status;
  final String? banReason;
  final DateTime createdAt;
  final DateTime updatedAt;

  PetModel({
    required this.id,
    required this.name,
    required this.species,
    required this.breed,
    required this.gender,
    required this.dateOfBirth,
    this.weight,
    this.color,
    this.microchipId,
    this.isNeutered = false,
    this.isAvailableForMating = false,
    this.notes,
    this.photos = const [],
    required this.ownerId,
    this.country,
    this.city,
    this.status = 'active',
    this.banReason,
    required this.createdAt,
    required this.updatedAt,
  });

  bool get isBirthdayToday {
    final now = DateTime.now();
    return dateOfBirth.month == now.month && dateOfBirth.day == now.day;
  }

  String? get primaryPhotoUrl {
    if (photos.isEmpty) return null;
    return photos.first.url;
  }

  int get ageInMonths {
    final now = DateTime.now();
    return (now.year - dateOfBirth.year) * 12 + now.month - dateOfBirth.month;
  }

  String get ageDisplay {
    final months = ageInMonths;
    if (months < 12) return '$months months';
    final years = months ~/ 12;
    final remainingMonths = months % 12;
    if (remainingMonths == 0) return '$years years';
    return '$years years, $remainingMonths months';
  }

  factory PetModel.fromJson(Map<String, dynamic> json) {
    return PetModel(
      id: json['id'] as String,
      name: json['name'] as String,
      species: json['species'] as String,
      breed: json['breed'] as String,
      gender: json['gender'] as String,
      dateOfBirth: DateTime.parse(json['dateOfBirth'] as String),
      weight: (json['weight'] as num?)?.toDouble(),
      color: json['color'] as String?,
      microchipId: json['microchipId'] as String?,
      isNeutered: json['isNeutered'] as bool? ?? false,
      isAvailableForMating: json['isAvailableForMating'] as bool? ?? false,
      notes: json['notes'] as String?,
      photos: (json['photos'] as List<dynamic>?)
              ?.map((p) => PetPhoto.fromJson(p as Map<String, dynamic>))
              .toList() ??
          [],
      ownerId: json['ownerId'] as String,
      country: json['country'] as String?,
      city: json['city'] as String?,
      status: json['status'] as String? ?? 'active',
      banReason: json['banReason'] as String?,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'species': species,
      'breed': breed,
      'gender': gender,
      'dateOfBirth': dateOfBirth.toIso8601String(),
      'weight': weight,
      'color': color,
      'microchipId': microchipId,
      'isNeutered': isNeutered,
      'isAvailableForMating': isAvailableForMating,
      'notes': notes,
      'photos': photos.map((p) => p.toJson()).toList(),
      'ownerId': ownerId,
      'country': country,
      'city': city,
      'status': status,
      'banReason': banReason,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }

  PetModel copyWith({
    String? name,
    double? weight,
    String? color,
    bool? isNeutered,
    bool? isAvailableForMating,
    String? notes,
    List<PetPhoto>? photos,
    String? country,
    String? city,
    String? status,
    String? banReason,
  }) {
    return PetModel(
      id: id,
      name: name ?? this.name,
      species: species,
      breed: breed,
      gender: gender,
      dateOfBirth: dateOfBirth,
      weight: weight ?? this.weight,
      color: color ?? this.color,
      microchipId: microchipId,
      isNeutered: isNeutered ?? this.isNeutered,
      isAvailableForMating: isAvailableForMating ?? this.isAvailableForMating,
      notes: notes ?? this.notes,
      photos: photos ?? this.photos,
      ownerId: ownerId,
      country: country ?? this.country,
      city: city ?? this.city,
      status: status ?? this.status,
      banReason: banReason ?? this.banReason,
      createdAt: createdAt,
      updatedAt: DateTime.now(),
    );
  }
}

class PetPhoto {
  final String url;
  final String path;
  final String uploadedAt;

  PetPhoto({required this.url, required this.path, required this.uploadedAt});

  factory PetPhoto.fromJson(Map<String, dynamic> json) {
    return PetPhoto(
      url: json['url'] as String,
      path: json['path'] as String,
      uploadedAt: json['uploadedAt'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {'url': url, 'path': path, 'uploadedAt': uploadedAt};
  }
}
