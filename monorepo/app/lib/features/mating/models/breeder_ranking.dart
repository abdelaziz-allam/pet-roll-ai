class BreederRanking {
  final String userId;
  final String displayName;
  final String email;
  final int totalListings;
  final int activeListings;
  final int totalMatches;
  final int totalViews;
  final int successRate;
  final String joinedAt;

  BreederRanking({
    required this.userId,
    required this.displayName,
    required this.email,
    required this.totalListings,
    required this.activeListings,
    required this.totalMatches,
    required this.totalViews,
    required this.successRate,
    required this.joinedAt,
  });

  factory BreederRanking.fromJson(Map<String, dynamic> json) {
    return BreederRanking(
      userId: json['userId'] ?? '',
      displayName: json['displayName'] ?? '',
      email: json['email'] ?? '',
      totalListings: json['totalListings'] ?? 0,
      activeListings: json['activeListings'] ?? 0,
      totalMatches: json['totalMatches'] ?? 0,
      totalViews: json['totalViews'] ?? 0,
      successRate: json['successRate'] ?? 0,
      joinedAt: json['joinedAt'] ?? '',
    );
  }
}
