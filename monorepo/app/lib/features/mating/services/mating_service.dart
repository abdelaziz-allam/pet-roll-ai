import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/api_client.dart';
import '../models/mating_model.dart';

final matingServiceProvider = Provider<MatingService>((ref) {
  return MatingService(ref.watch(apiClientProvider));
});

class MatingService {
  final ApiClient _apiClient;

  MatingService(this._apiClient);

  Future<MatingListing> createListing(Map<String, dynamic> data) async {
    final response = await _apiClient.post('/mating/listings', data: data);
    return MatingListing.fromJson(response.data as Map<String, dynamic>);
  }

  Future<List<MatingListing>> browseListings({
    String? species,
    String? breed,
    String? city,
    String? country,
    int? page,
    int? limit,
  }) async {
    final queryParams = <String, dynamic>{};
    if (species != null) queryParams['species'] = species;
    if (breed != null) queryParams['breed'] = breed;
    if (city != null) queryParams['city'] = city;
    if (country != null) queryParams['country'] = country;
    if (page != null) queryParams['page'] = page;
    if (limit != null) queryParams['limit'] = limit;

    final response = await _apiClient.get(
      '/mating/listings',
      queryParameters: queryParams,
    );
    final responseData = response.data;
    final List list = responseData is List ? responseData : (responseData['data'] ?? []);
    return list
        .map((e) => MatingListing.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<MatingListing> getListingById(String id) async {
    final response = await _apiClient.get('/mating/listings/$id');
    return MatingListing.fromJson(response.data as Map<String, dynamic>);
  }

  Future<MatingListing> updateListing(
      String id, Map<String, dynamic> data) async {
    final response =
        await _apiClient.put('/mating/listings/$id', data: data);
    return MatingListing.fromJson(response.data as Map<String, dynamic>);
  }

  Future<void> deleteListing(String id) async {
    await _apiClient.delete('/mating/listings/$id');
  }

  Future<MatchRequest> sendMatchRequest(Map<String, dynamic> data) async {
    final response =
        await _apiClient.post('/mating/requests', data: data);
    return MatchRequest.fromJson(response.data as Map<String, dynamic>);
  }

  Future<List<MatchRequest>> getSentRequests() async {
    final response = await _apiClient.get('/mating/requests/sent');
    final list = response.data as List;
    return list
        .map((e) => MatchRequest.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<List<MatchRequest>> getReceivedRequests() async {
    final response = await _apiClient.get('/mating/requests/received');
    final list = response.data as List;
    return list
        .map((e) => MatchRequest.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<MatchRequest> updateMatchRequest(
      String id, Map<String, dynamic> data) async {
    final response =
        await _apiClient.put('/mating/requests/$id', data: data);
    return MatchRequest.fromJson(response.data as Map<String, dynamic>);
  }
}
