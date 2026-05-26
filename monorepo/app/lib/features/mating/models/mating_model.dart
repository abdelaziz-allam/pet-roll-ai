import '../../../core/utils/date_parsing.dart';

enum MatchRequestStatus { pending, accepted, rejected }

class MatingListingLocation {
  final String city;
  final String country;

  const MatingListingLocation({
    required this.city,
    required this.country,
  });

  factory MatingListingLocation.fromJson(Map<String, dynamic> json) {
    return MatingListingLocation(
      city: json['city'] as String,
      country: json['country'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'city': city,
      'country': country,
    };
  }
}

class MatingListingPet {
  final String? breed;
  final String species;
  final String name;
  final String? photoURL;

  const MatingListingPet({
    this.breed,
    required this.species,
    required this.name,
    this.photoURL,
  });

  factory MatingListingPet.fromJson(Map<String, dynamic> json) {
    return MatingListingPet(
      breed: json['breed'] as String?,
      species: json['species'] as String? ?? 'unknown',
      name: json['name'] as String? ?? 'Unknown',
      photoURL: json['photoURL'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'breed': breed,
      'species': species,
      'name': name,
      'photoURL': photoURL,
    };
  }
}

class MatingListing {
  final String id;
  final String petId;
  final String ownerId;
  final String? description;
  final MatingListingLocation? location;
  final Map<String, dynamic>? preferences;
  final String status;
  final MatingListingPet pet;
  final String ownerName;
  final bool isVerifiedBreeder;
  final DateTime createdAt;

  const MatingListing({
    required this.id,
    required this.petId,
    required this.ownerId,
    this.description,
    this.location,
    this.preferences,
    required this.status,
    required this.pet,
    required this.ownerName,
    this.isVerifiedBreeder = false,
    required this.createdAt,
  });

  factory MatingListing.fromJson(Map<String, dynamic> json) {
    final MatingListingPet pet;
    if (json['pet'] != null && json['pet'] is Map<String, dynamic>) {
      pet = MatingListingPet.fromJson(json['pet'] as Map<String, dynamic>);
    } else {
      pet = MatingListingPet(
        breed: json['breed'] as String?,
        species: json['species'] as String? ?? 'unknown',
        name: json['petName'] as String? ?? json['name'] as String? ?? 'Unknown',
        photoURL: (json['photos'] is List && (json['photos'] as List).isNotEmpty)
            ? (json['photos'] as List).first['url'] as String?
            : null,
      );
    }

    return MatingListing(
      id: json['id'] as String,
      petId: json['petId'] as String? ?? '',
      ownerId: json['ownerId'] as String? ?? '',
      description: json['description'] as String?,
      location: json['location'] != null && json['location'] is Map<String, dynamic>
          ? MatingListingLocation.fromJson(
              json['location'] as Map<String, dynamic>)
          : null,
      preferences: json['preferences'] as Map<String, dynamic>?,
      status: json['status'] as String? ?? 'active',
      pet: pet,
      ownerName: json['ownerName'] as String? ?? 'Pet Owner',
      isVerifiedBreeder: json['isVerifiedBreeder'] as bool? ?? json['healthCertified'] as bool? ?? false,
      createdAt: parseDateTime(json['createdAt']) ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'petId': petId,
      'ownerId': ownerId,
      'description': description,
      'location': location?.toJson(),
      'preferences': preferences,
      'status': status,
      'pet': pet.toJson(),
      'ownerName': ownerName,
      'isVerifiedBreeder': isVerifiedBreeder,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}

class MatchRequest {
  final String id;
  final String listingId;
  final String senderId;
  final String receiverId;
  final String? message;
  final MatchRequestStatus status;
  final DateTime createdAt;

  const MatchRequest({
    required this.id,
    required this.listingId,
    required this.senderId,
    required this.receiverId,
    this.message,
    required this.status,
    required this.createdAt,
  });

  factory MatchRequest.fromJson(Map<String, dynamic> json) {
    return MatchRequest(
      id: json['id'] as String,
      listingId: json['listingId'] as String,
      senderId: json['senderId'] as String,
      receiverId: json['receiverId'] as String,
      message: json['message'] as String?,
      status: MatchRequestStatus.values.firstWhere(
        (e) => e.name == json['status'],
        orElse: () => MatchRequestStatus.pending,
      ),
      createdAt: parseDateTime(json['createdAt']) ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'listingId': listingId,
      'senderId': senderId,
      'receiverId': receiverId,
      'message': message,
      'status': status.name,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}
