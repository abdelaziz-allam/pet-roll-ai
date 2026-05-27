class MatingListing {
  final String id;
  final String petId;
  final String ownerId;
  final String species;
  final String breed;
  final String gender;
  final int age;
  final String? description;
  final double? price;
  final bool healthCertified;
  final MatingLocation? location;
  final List<String> photos;
  final String? requirements;
  final String status;
  final int viewCount;
  final String createdAt;

  MatingListing({
    required this.id,
    required this.petId,
    required this.ownerId,
    required this.species,
    required this.breed,
    required this.gender,
    required this.age,
    this.description,
    this.price,
    this.healthCertified = false,
    this.location,
    this.photos = const [],
    this.requirements,
    this.status = 'active',
    this.viewCount = 0,
    required this.createdAt,
  });

  factory MatingListing.fromJson(Map<String, dynamic> json) {
    return MatingListing(
      id: json['id'] ?? '',
      petId: json['petId'] ?? '',
      ownerId: json['ownerId'] ?? '',
      species: json['species'] ?? '',
      breed: json['breed'] ?? '',
      gender: json['gender'] ?? '',
      age: json['age'] ?? 0,
      description: json['description'],
      price: (json['price'] as num?)?.toDouble(),
      healthCertified: json['healthCertified'] ?? false,
      location: json['location'] != null
          ? MatingLocation.fromJson(json['location'] as Map<String, dynamic>)
          : null,
      photos: (json['photos'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      requirements: json['requirements'],
      status: json['status'] ?? 'active',
      viewCount: json['viewCount'] ?? 0,
      createdAt: json['createdAt'] ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
        'petId': petId,
        'species': species,
        'breed': breed,
        'gender': gender,
        'age': age,
        if (description != null) 'description': description,
        if (price != null) 'price': price,
        'healthCertified': healthCertified,
        if (location != null) 'location': location!.toJson(),
        'photos': photos,
        if (requirements != null) 'requirements': requirements,
      };

  bool get isFree => price == null || price == 0;
  String get priceDisplay => isFree ? 'Free' : '\$${price!.toStringAsFixed(0)}';
  String get ageDisplay => age < 12 ? '$age months' : '${age ~/ 12} years';
}

class MatingLocation {
  final String? city;
  final String? country;
  final double? lat;
  final double? lng;

  MatingLocation({this.city, this.country, this.lat, this.lng});

  factory MatingLocation.fromJson(Map<String, dynamic> json) {
    return MatingLocation(
      city: json['city'],
      country: json['country'],
      lat: (json['lat'] as num?)?.toDouble(),
      lng: (json['lng'] as num?)?.toDouble(),
    );
  }

  Map<String, dynamic> toJson() => {
        if (city != null) 'city': city,
        if (country != null) 'country': country,
        if (lat != null) 'lat': lat,
        if (lng != null) 'lng': lng,
      };

  String get display {
    if (city != null && country != null) return '$city, $country';
    return city ?? country ?? 'Unknown';
  }
}

class MatingRequest {
  final String id;
  final String listingId;
  final String senderId;
  final String receiverId;
  final String petId;
  final String? message;
  final String status;
  final String? respondedAt;
  final String createdAt;

  MatingRequest({
    required this.id,
    required this.listingId,
    required this.senderId,
    required this.receiverId,
    required this.petId,
    this.message,
    required this.status,
    this.respondedAt,
    required this.createdAt,
  });

  factory MatingRequest.fromJson(Map<String, dynamic> json) {
    return MatingRequest(
      id: json['id'] ?? '',
      listingId: json['listingId'] ?? '',
      senderId: json['senderId'] ?? '',
      receiverId: json['receiverId'] ?? '',
      petId: json['petId'] ?? '',
      message: json['message'],
      status: json['status'] ?? 'pending',
      respondedAt: json['respondedAt'],
      createdAt: json['createdAt'] ?? '',
    );
  }

  bool get isPending => status == 'pending';
  bool get isAccepted => status == 'accepted';
  bool get isRejected => status == 'rejected';
}
