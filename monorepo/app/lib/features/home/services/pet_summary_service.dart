import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/api_client.dart';
import '../models/pet_summary_model.dart';

final petSummaryServiceProvider = Provider<PetSummaryService>((ref) {
  return PetSummaryService(ref.watch(apiClientProvider));
});

class PetSummaryService {
  final ApiClient _api;

  PetSummaryService(this._api);

  Future<PetSummaryModel> getSummary(String petId) async {
    try {
      final response = await _api.get('/pets/$petId/summary');
      return PetSummaryModel.fromJson(response.data as Map<String, dynamic>);
    } on DioException {
      return PetSummaryModel.empty;
    }
  }
}
