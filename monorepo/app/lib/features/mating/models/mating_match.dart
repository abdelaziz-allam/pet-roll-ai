class MatingMatch {
  final String id;
  final String status;
  final String? message;
  final String? respondedAt;
  final String createdAt;
  final MatchListing? listing;
  final MatchUser sender;
  final MatchPet? senderPet;
  final MatchUser receiver;
  final MatchPet? receiverPet;

  MatingMatch({
    required this.id,
    required this.status,
    this.message,
    this.respondedAt,
    required this.createdAt,
    this.listing,
    required this.sender,
    this.senderPet,
    required this.receiver,
    this.receiverPet,
  });

  factory MatingMatch.fromJson(Map<String, dynamic> json) {
    return MatingMatch(
      id: json['id'] ?? '',
      status: json['status'] ?? 'pending',
      message: json['message'],
      respondedAt: json['respondedAt'],
      createdAt: json['createdAt'] ?? '',
      listing: json['listing'] != null
          ? MatchListing.fromJson(json['listing'] as Map<String, dynamic>)
          : null,
      sender: MatchUser.fromJson(json['sender'] as Map<String, dynamic>),
      senderPet: json['senderPet'] != null
          ? MatchPet.fromJson(json['senderPet'] as Map<String, dynamic>)
          : null,
      receiver: MatchUser.fromJson(json['receiver'] as Map<String, dynamic>),
      receiverPet: json['receiverPet'] != null
          ? MatchPet.fromJson(json['receiverPet'] as Map<String, dynamic>)
          : null,
    );
  }

  bool get isAccepted => status == 'accepted';
  bool get isPending => status == 'pending';
  bool get isRejected => status == 'rejected';
}

class MatchListing {
  final String id;
  final String breed;
  final String species;
  final String gender;
  final int age;
  final double price;
  final MatchLocation? location;
  final String? description;
  final bool healthCertified;

  MatchListing({
    required this.id,
    required this.breed,
    required this.species,
    required this.gender,
    required this.age,
    required this.price,
    this.location,
    this.description,
    this.healthCertified = false,
  });

  factory MatchListing.fromJson(Map<String, dynamic> json) {
    return MatchListing(
      id: json['id'] ?? '',
      breed: json['breed'] ?? '',
      species: json['species'] ?? '',
      gender: json['gender'] ?? '',
      age: json['age'] ?? 0,
      price: (json['price'] as num?)?.toDouble() ?? 0,
      location: json['location'] != null
          ? MatchLocation.fromJson(json['location'] as Map<String, dynamic>)
          : null,
      description: json['description'],
      healthCertified: json['healthCertified'] ?? false,
    );
  }

  bool get isFree => price == 0;
  String get priceDisplay => isFree ? 'Free' : '\$${price.toStringAsFixed(0)}';
  String get ageDisplay => age < 12 ? '$age months' : '${age ~/ 12} years';
}

class MatchLocation {
  final String? city;
  final String? country;

  MatchLocation({this.city, this.country});

  factory MatchLocation.fromJson(Map<String, dynamic> json) {
    return MatchLocation(
      city: json['city'],
      country: json['country'],
    );
  }

  String get display {
    if (city != null && country != null) return '$city, $country';
    return city ?? country ?? '';
  }
}

class MatchUser {
  final String id;
  final String displayName;
  final String email;

  MatchUser({
    required this.id,
    required this.displayName,
    required this.email,
  });

  factory MatchUser.fromJson(Map<String, dynamic> json) {
    return MatchUser(
      id: json['id'] ?? '',
      displayName: json['displayName'] ?? 'Unknown',
      email: json['email'] ?? '',
    );
  }
}

class MatchPet {
  final String id;
  final String name;
  final String breed;
  final String species;
  final String gender;
  final List<String> photos;
  final String? color;

  MatchPet({
    required this.id,
    required this.name,
    required this.breed,
    required this.species,
    required this.gender,
    this.photos = const [],
    this.color,
  });

  factory MatchPet.fromJson(Map<String, dynamic> json) {
    final photosRaw = json['photos'] as List<dynamic>? ?? [];
    final photos = photosRaw.map((p) {
      if (p is String) return p;
      if (p is Map) return (p['url'] ?? '').toString();
      return '';
    }).where((s) => s.isNotEmpty).toList();

    return MatchPet(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      breed: json['breed'] ?? '',
      species: json['species'] ?? '',
      gender: json['gender'] ?? '',
      photos: photos,
      color: json['color'],
    );
  }

  String? get photoUrl => photos.isNotEmpty ? photos.first : null;
}
