import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/api_client.dart';
import '../../../core/network/api_exception.dart';
import '../models/health_record_model.dart';

final healthServiceProvider = Provider<HealthService>((ref) {
  return HealthService(ref.watch(apiClientProvider));
});

class HealthService {
  final ApiClient _api;

  HealthService(this._api);

  Future<HealthRecord> addRecord(String petId, Map<String, dynamic> data) async {
    try {
      final response = await _api.post('/pets/$petId/health', data: data);
      return HealthRecord.fromJson(response.data);
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<List<HealthRecord>> getRecords(
    String petId, {
    int page = 1,
    int limit = 20,
  }) async {
    try {
      final response = await _api.get(
        '/pets/$petId/health',
        queryParameters: {'page': page, 'limit': limit},
      );
      final List<dynamic> items = response.data['data'] ?? response.data['records'] ?? (response.data is List ? response.data : []);
      return items.map((e) => HealthRecord.fromJson(e)).toList();
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<HealthRecord> getRecord(String petId, String recordId) async {
    try {
      final response = await _api.get('/pets/$petId/health/$recordId');
      return HealthRecord.fromJson(response.data);
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<HealthRecord> updateRecord(
    String petId,
    String recordId,
    Map<String, dynamic> data,
  ) async {
    try {
      final response = await _api.put('/pets/$petId/health/$recordId', data: data);
      return HealthRecord.fromJson(response.data);
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<void> deleteRecord(String petId, String recordId) async {
    try {
      await _api.delete('/pets/$petId/health/$recordId');
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }
}
