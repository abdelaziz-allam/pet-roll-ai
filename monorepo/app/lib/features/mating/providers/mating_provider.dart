import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/mating_model.dart';
import '../services/mating_service.dart';

export '../services/mating_service.dart' show matingServiceProvider;

final matingListingsProvider =
    FutureProvider.family<List<MatingListing>, Map<String, dynamic>?>(
        (ref, filters) async {
  final matingService = ref.watch(matingServiceProvider);
  return matingService.browseListings(
    species: filters?['species'] as String?,
    breed: filters?['breed'] as String?,
    city: filters?['city'] as String?,
    country: filters?['country'] as String?,
    page: filters?['page'] as int?,
    limit: filters?['limit'] as int?,
  );
});

final listingDetailProvider =
    FutureProvider.family<MatingListing, String>((ref, id) async {
  final matingService = ref.watch(matingServiceProvider);
  return matingService.getListingById(id);
});

final sentRequestsProvider = FutureProvider<List<MatchRequest>>((ref) async {
  final matingService = ref.watch(matingServiceProvider);
  return matingService.getSentRequests();
});

final receivedRequestsProvider =
    FutureProvider<List<MatchRequest>>((ref) async {
  final matingService = ref.watch(matingServiceProvider);
  return matingService.getReceivedRequests();
});
