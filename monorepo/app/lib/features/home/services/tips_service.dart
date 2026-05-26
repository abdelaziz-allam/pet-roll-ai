import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/api_client.dart';
import '../models/tip_model.dart';

final tipsServiceProvider = Provider<TipsService>((ref) {
  return TipsService(ref.watch(apiClientProvider));
});

class TipsService {
  final ApiClient _api;

  TipsService(this._api);

  Future<TipModel> getDailyTip({String? species}) async {
    try {
      final queryParams = <String, dynamic>{};
      if (species != null) queryParams['species'] = species;

      final response = await _api.get(
        '/tips/daily',
        queryParameters: queryParams.isNotEmpty ? queryParams : null,
      );
      return TipModel.fromJson(response.data as Map<String, dynamic>);
    } on DioException {
      return TipModel.fallback;
    }
  }
}
