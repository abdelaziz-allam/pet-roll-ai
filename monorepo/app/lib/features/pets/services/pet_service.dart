import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/api_client.dart';
import '../models/pet_model.dart';

final petServiceProvider = Provider<PetService>((ref) {
  return PetService(ref.watch(apiClientProvider));
});

class PetService {
  final ApiClient _apiClient;

  PetService(this._apiClient);

  Future<PetModel> createPet(Map<String, dynamic> data) async {
    final response = await _apiClient.post('/pets', data: data);
    return PetModel.fromJson(response.data as Map<String, dynamic>);
  }

  Future<List<PetModel>> getUserPets() async {
    final response = await _apiClient.get('/pets');
    final list = response.data as List;
    return list.map((e) => PetModel.fromJson(e as Map<String, dynamic>)).toList();
  }

  Future<PetModel> getPetById(String petId) async {
    final response = await _apiClient.get('/pets/$petId');
    return PetModel.fromJson(response.data as Map<String, dynamic>);
  }

  Future<PetModel> updatePet(String petId, Map<String, dynamic> data) async {
    final response = await _apiClient.put('/pets/$petId', data: data);
    return PetModel.fromJson(response.data as Map<String, dynamic>);
  }

  Future<void> deletePet(String petId) async {
    await _apiClient.delete('/pets/$petId');
  }

  Future<PetModel> uploadPhoto(String petId, String filePath) async {
    final formData = FormData.fromMap({
      'photo': await MultipartFile.fromFile(filePath),
    });
    final response = await _apiClient.upload(
      '/pets/$petId/photos',
      data: formData,
    );
    return PetModel.fromJson(response.data as Map<String, dynamic>);
  }

  Future<void> removePhoto(String petId, String photoPath) async {
    final encodedPath = Uri.encodeComponent(photoPath);
    await _apiClient.delete('/pets/$petId/photos/$encodedPath');
  }

  Future<List<Map<String, dynamic>>> searchBreeds({
    String? species,
    String? search,
  }) async {
    final queryParams = <String, dynamic>{};
    if (species != null) queryParams['species'] = species;
    if (search != null) queryParams['search'] = search;

    final response = await _apiClient.get(
      '/pets/breeds',
      queryParameters: queryParams,
    );
    final list = response.data as List;
    return list.map((e) => e as Map<String, dynamic>).toList();
  }
}
