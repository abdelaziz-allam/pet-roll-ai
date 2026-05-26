import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/api_client.dart';
import '../../../core/network/api_exception.dart';
import '../models/pregnancy_model.dart';

final pregnancyServiceProvider = Provider<PregnancyService>((ref) {
  return PregnancyService(ref.watch(apiClientProvider));
});

class PregnancyService {
  final ApiClient _api;

  PregnancyService(this._api);

  Future<Pregnancy> startTracking(String petId, Map<String, dynamic> data) async {
    try {
      final response = await _api.post('/pets/$petId/pregnancy', data: data);
      return Pregnancy.fromJson(response.data as Map<String, dynamic>);
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<Pregnancy?> getActive(String petId) async {
    try {
      final response = await _api.get('/pets/$petId/pregnancy');
      return Pregnancy.fromJson(response.data as Map<String, dynamic>);
    } on DioException catch (e) {
      if (e.response?.statusCode == 404) return null;
      throw ApiException.fromDioException(e);
    }
  }

  Future<Pregnancy> getById(String petId, String pregnancyId) async {
    try {
      final response = await _api.get('/pets/$petId/pregnancy/$pregnancyId');
      return Pregnancy.fromJson(response.data as Map<String, dynamic>);
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<Pregnancy> updateStatus(
    String petId,
    String pregnancyId,
    Map<String, dynamic> data,
  ) async {
    try {
      final response = await _api.put('/pets/$petId/pregnancy/$pregnancyId', data: data);
      return Pregnancy.fromJson(response.data as Map<String, dynamic>);
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<List<Milestone>> getMilestones(String petId, String pregnancyId) async {
    try {
      final response = await _api.get('/pets/$petId/pregnancy/$pregnancyId/milestones');
      final list = response.data as List<dynamic>;
      return list.map((e) => Milestone.fromJson(e as Map<String, dynamic>)).toList();
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<Milestone> completeMilestone(
    String petId,
    String pregnancyId,
    String milestoneId,
  ) async {
    try {
      final response = await _api.put(
        '/pets/$petId/pregnancy/$pregnancyId/milestones/$milestoneId/complete',
      );
      return Milestone.fromJson(response.data as Map<String, dynamic>);
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<WeightEntry> addWeight(
    String petId,
    String pregnancyId,
    Map<String, dynamic> data,
  ) async {
    try {
      final response = await _api.post(
        '/pets/$petId/pregnancy/$pregnancyId/weight',
        data: data,
      );
      return WeightEntry.fromJson(response.data as Map<String, dynamic>);
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }
}
