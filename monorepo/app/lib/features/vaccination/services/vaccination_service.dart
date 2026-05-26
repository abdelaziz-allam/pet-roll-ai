import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/api_client.dart';
import '../../../core/network/api_exception.dart';
import '../models/vaccination_model.dart';

final vaccinationServiceProvider = Provider<VaccinationService>((ref) {
  return VaccinationService(ref.watch(apiClientProvider));
});

class VaccinationService {
  final ApiClient _api;

  VaccinationService(this._api);

  Future<Vaccination> logVaccination(String petId, Map<String, dynamic> data) async {
    try {
      final response = await _api.post('/pets/$petId/vaccinations', data: data);
      return Vaccination.fromJson(response.data);
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<List<Vaccination>> getVaccinations(String petId) async {
    try {
      final response = await _api.get('/pets/$petId/vaccinations');
      final data = response.data;
      final List<dynamic> items = data is List ? data : (data['vaccinations'] ?? []);
      return items.map((e) => Vaccination.fromJson(e as Map<String, dynamic>)).toList();
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<List<Vaccination>> getUpcoming(String petId) async {
    try {
      final response = await _api.get('/pets/$petId/vaccinations/upcoming');
      final data = response.data;
      final List<dynamic> items = data is List ? data : (data['vaccinations'] ?? []);
      return items.map((e) => Vaccination.fromJson(e as Map<String, dynamic>)).toList();
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<Vaccination> updateVaccination(
    String petId,
    String id,
    Map<String, dynamic> data,
  ) async {
    try {
      final response = await _api.put('/pets/$petId/vaccinations/$id', data: data);
      return Vaccination.fromJson(response.data);
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<void> deleteVaccination(String petId, String id) async {
    try {
      await _api.delete('/pets/$petId/vaccinations/$id');
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }
}
