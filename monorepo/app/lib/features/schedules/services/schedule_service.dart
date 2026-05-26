import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/api_client.dart';
import '../../../core/network/api_exception.dart';
import '../models/schedule_model.dart';

final scheduleServiceProvider = Provider<ScheduleService>((ref) {
  return ScheduleService(ref.watch(apiClientProvider));
});

class ScheduleService {
  final ApiClient _api;

  ScheduleService(this._api);

  Future<Schedule> createSchedule(String petId, Map<String, dynamic> data) async {
    try {
      final response = await _api.post('/pets/$petId/schedules', data: data);
      return Schedule.fromJson(response.data as Map<String, dynamic>);
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<List<Schedule>> getSchedules(String petId) async {
    try {
      final response = await _api.get('/pets/$petId/schedules');
      final list = response.data as List<dynamic>;
      return list.map((e) => Schedule.fromJson(e as Map<String, dynamic>)).toList();
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<Schedule> updateSchedule(
    String petId,
    String id,
    Map<String, dynamic> data,
  ) async {
    try {
      final response = await _api.put('/pets/$petId/schedules/$id', data: data);
      return Schedule.fromJson(response.data as Map<String, dynamic>);
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<void> deleteSchedule(String petId, String id) async {
    try {
      await _api.delete('/pets/$petId/schedules/$id');
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<Schedule> logCompletion(String petId, String id) async {
    try {
      final response = await _api.post('/pets/$petId/schedules/$id/log');
      return Schedule.fromJson(response.data as Map<String, dynamic>);
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }
}
